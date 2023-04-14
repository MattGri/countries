import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  ImageList,
  useTheme,
  LinearProgress,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import CountryCard from '../components/CountryCard';
import PaginationWrapper from '../components/PaginationWrapper';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital: string[];
}

interface RootState {
  darkMode: {
    darkMode: boolean;
  };
}

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const theme = useTheme();

  useEffect(() => {
    document.title = 'Where in the world?';

    axios.get<Country[]>('https://restcountries.com/v3.1/all').then((res) => {
      setCountries(res.data);
      setFilteredCountries(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country: Country) => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredCountries(filteredCountries);
  }, [countries, search]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/region/${selectedRegion}`)
      .then((res) => {
        setFilteredCountries(res.data);
      });
  }, [selectedRegion]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRegionChange = (e: SelectChangeEvent<string>) => {
    setSelectedRegion(e.target.value);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: darkMode
            ? theme.palette.primary.main
            : theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Container
          sx={{
            backgroundColor: darkMode
              ? theme.palette.primary.main
              : theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '25px 0px',
              flexWrap: 'wrap',
            }}
          >
            <SearchBar
              darkMode={darkMode}
              search={search}
              handleSearchChange={handleSearchChange}
            />
            <Filter
              darkMode={darkMode}
              selectedRegion={selectedRegion}
              handleRegionChange={handleRegionChange}
            />
          </Box>
          <Box>
            {loading && <LinearProgress />}
            <ImageList
              cols={4}
              sx={{
                '@media (max-width: 425px)': {
                  display: 'flex',
                  flexDirection: 'column',
                },
              }}
            >
              {filteredCountries
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((country: Country) => (
                  <CountryCard
                    key={country.name.common}
                    country={country}
                    darkMode={darkMode}
                  />
                ))}
            </ImageList>
            <PaginationWrapper
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
