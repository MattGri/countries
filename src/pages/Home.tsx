import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Typography,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  TextField,
  useTheme,
  LinearProgress,
  Pagination,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
    <Box
      sx={{
        backgroundColor: darkMode
          ? theme.palette.primary.main
          : theme.palette.background.default,
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
          <TextField
            label="Search for a country..."
            InputLabelProps={{
              style: {
                color: darkMode
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              },
            }}
            InputProps={{
              style: {
                color: darkMode
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              },
            }}
            value={search}
            onChange={handleSearchChange}
            sx={{
              width: '255px',
              backgroundColor: darkMode
                ? theme.palette.primary.main
                : theme.palette.background.default,
              '@media (max-width: 425px)': {
                marginBottom: '40px',
                width: '100%',
              },
            }}
          />
          <FormControl
            sx={{
              width: '255px',
            }}
          >
            <InputLabel
              sx={{
                color: darkMode
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              }}
            >
              Filter by region
            </InputLabel>
            <Select
              label="age"
              value={selectedRegion}
              onChange={handleRegionChange}
              sx={{
                backgroundColor: darkMode
                  ? theme.palette.primary.main
                  : theme.palette.background.default,
                padding: '0px',
                color: darkMode
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
              }}
            >
              <MenuItem
                value={'Africa'}
                sx={{
                  backgroundColor: darkMode
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: darkMode
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              >
                Africa
              </MenuItem>
              <MenuItem
                value={'America'}
                sx={{
                  backgroundColor: darkMode
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: darkMode
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              >
                America
              </MenuItem>
              <MenuItem
                value={'Asia'}
                sx={{
                  backgroundColor: darkMode
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: darkMode
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              >
                Asia
              </MenuItem>
              <MenuItem
                value={'Europe'}
                sx={{
                  backgroundColor: darkMode
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: darkMode
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              >
                Europe
              </MenuItem>
              <MenuItem
                value={'Oceania'}
                sx={{
                  backgroundColor: darkMode
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: darkMode
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              >
                Oceania
              </MenuItem>
            </Select>
          </FormControl>
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
                <Link
                  to={`/country/${country.name.common}`}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ImageListItem key={country.name.common}>
                    <img src={country.flags.png} alt="country flag" />
                    <Box
                      sx={{
                        padding: '15px 0px 25px 10px',
                        borderRadius: '5px',
                        backgroundColor: darkMode ? '#2b3844' : '#fff',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          mb: '10px',
                          color: darkMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,
                          fontSize: '18px',
                        }}
                      >
                        {country.name.common}
                      </Typography>
                      <Typography
                        sx={{
                          color: darkMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,
                          fontSize: '14px',
                        }}
                      >
                        Population: {country.population}
                      </Typography>
                      <Typography
                        sx={{
                          color: darkMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,
                          fontSize: '14px',
                        }}
                      >
                        Region: {country.region}
                      </Typography>
                      <Typography
                        sx={{
                          color: darkMode
                            ? theme.palette.primary.contrastText
                            : theme.palette.text.primary,
                          fontSize: '14px',
                        }}
                      >
                        Capital: {country.capital}
                      </Typography>
                    </Box>
                  </ImageListItem>
                </Link>
              ))}
          </ImageList>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={handlePageChange}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
