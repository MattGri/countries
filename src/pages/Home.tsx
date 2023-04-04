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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountries(res.data);
        setFilteredCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country: any) => {
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
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: '25px 0px',
        }}
      >
        <TextField
          label="Search for a country..."
          value={search}
          onChange={handleSearchChange}
          sx={{
            width: '255px',
          }}
        />
        <FormControl
          sx={{
            width: '255px',
          }}
        >
          <InputLabel>Filter by region</InputLabel>
          <Select
            label="age"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <MenuItem value={'Africa'}>Africa</MenuItem>
            <MenuItem value={'America'}>America</MenuItem>
            <MenuItem value={'Asia'}>Asia</MenuItem>
            <MenuItem value={'Europe'}>Europe</MenuItem>
            <MenuItem value={'Oceania'}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <ImageList cols={4}>
          {filteredCountries.map((country: any) => (
            <ImageListItem key={country}>
              <img src={country.flags.png} alt="" />
              <Box
                sx={{
                  padding: '15px 0px 25px 10px',
                  borderRadius: '5px',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    mb: '10px',
                  }}
                >
                  {country.name.common}
                </Typography>
                <Typography>Population: {country.population}</Typography>
                <Typography>Region: {country.region}</Typography>
                <Typography>Capital: {country.capital}</Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export default Home;
