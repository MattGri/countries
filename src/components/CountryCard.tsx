import React from 'react';
import { Box, Typography, ImageListItem, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface CountryCardProps {
  country: {
    name: {
      common: string;
    };
    flags: {
      png: string;
    };
    population: number;
    region: string;
    capital: string[];
  };
  darkMode: boolean;
}

const CountryCard = ({ country, darkMode }: CountryCardProps) => {
  const theme = useTheme();

  return (
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
  );
};

export default CountryCard;
