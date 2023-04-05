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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const darkMode = useSelector((state: any) => state.darkMode.darkMode);

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
    <Box
      sx={{
        backgroundColor: darkMode ? '#202c36' : '#fafafa',
      }}
    >
      <Container
        sx={{
          backgroundColor: darkMode ? '#202c36' : '#fafafa',
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
                color: darkMode ? '#fff' : '#000',
              },
            }}
            InputProps={{
              style: {
                color: darkMode ? '#fff' : '#000',
              },
            }}
            value={search}
            onChange={handleSearchChange}
            sx={{
              width: '255px',
              backgroundColor: darkMode ? '#2b3844' : '#fff',

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
                color: darkMode ? '#fff' : '#000',
              }}
            >
              Filter by region
            </InputLabel>
            <Select
              label="age"
              value={selectedRegion}
              onChange={handleRegionChange}
              sx={{
                backgroundColor: darkMode ? '#2b3844' : '#fff',
                padding: '0px',
                color: darkMode ? '#fff' : '#000',
              }}
            >
              <MenuItem
                value={'Africa'}
                sx={{
                  backgroundColor: darkMode ? '#2b3844' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                }}
              >
                Africa
              </MenuItem>
              <MenuItem
                value={'Americas'}
                sx={{
                  backgroundColor: darkMode ? '#2b3844' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                }}
              >
                Americas
              </MenuItem>
              <MenuItem
                value={'Asia'}
                sx={{
                  backgroundColor: darkMode ? '#2b3844' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                }}
              >
                Asia
              </MenuItem>
              <MenuItem
                value={'Europe'}
                sx={{
                  backgroundColor: darkMode ? '#2b3844' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                }}
              >
                Europe
              </MenuItem>
              <MenuItem
                value={'Oceania'}
                sx={{
                  backgroundColor: darkMode ? '#2b3844' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                }}
              >
                Oceania
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <ImageList
            cols={4}
            sx={{
              '@media (max-width: 425px)': {
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            {filteredCountries.map((country: any) => (
              <Link
                to={`/country/${country.name.common}`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <ImageListItem key={country.name.common}>
                  <img src={country.flags.png} alt="" />
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
                        color: darkMode ? '#fff' : '#000',
                        fontSize: '18px',
                      }}
                    >
                      {country.name.common}
                    </Typography>
                    <Typography
                      sx={{
                        color: darkMode ? '#fff' : '#000',
                        fontSize: '14px',
                      }}
                    >
                      Population: {country.population}
                    </Typography>
                    <Typography
                      sx={{
                        color: darkMode ? '#fff' : '#000',
                        fontSize: '14px',
                      }}
                    >
                      Region: {country.region}
                    </Typography>
                    <Typography
                      sx={{
                        color: darkMode ? '#fff' : '#000',
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
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
