import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Avatar, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

interface RootState {
  darkMode: {
    darkMode: boolean;
  };
}

const Country = () => {
  const { name } = useParams();

  const [country, setCountry] = useState<any>([]);

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const theme = useTheme();

  useEffect(() => {
    document.title = `${name} | Where in the world?`;

    axios.get(`https://restcountries.com/v3.1/name/${name}`).then((res) => {
      setCountry(res.data[0]);
    });
  }, [name]);

  return (
    <Box
      sx={{
        backgroundColor: darkMode
          ? theme.palette.primary.main
          : theme.palette.background.default,
        height: '100vh',
      }}
    >
      <Container
        sx={{
          '@media (max-width: 1024px)': {
            padding: '0px 20px',
            width: '60%',
          },
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            margin: '45px 0px 50px 0px',
            display: 'inline-block',
            color: darkMode
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: '16px',
              '@media (max-width: 1024px)': {
                fontSize: '14px',
              },

              '@media (max-width: 768px)': {},
            }}
          >
            Back
          </Typography>
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '@media (max-width: 1024px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Box>
            {country.flags && (
              <Avatar
                src={country.flags.png}
                alt=""
                sx={{
                  width: '100%',
                  height: '482px',
                  borderRadius: '10px',
                  display: 'block',
                  margin: '0px auto',

                  '@media (max-width: 768px)': {
                    width: '100%',
                    height: 'auto',
                    marginBottom: '50px',
                  },

                  '@media (max-width: 425px)': {
                    marginBottom: '0px',
                  },
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              marginTop: '25px',
              marginLeft: '120px',

              '@media (max-width: 1024px)': {
                marginLeft: '0px',
                marginTop: '50px',
              },
            }}
          >
            {country.name && (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '32px',
                    marginBottom: '40px',
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,

                    '@media (max-width: 1024px)': {
                      fontSize: '22px',
                    },
                  }}
                >
                  {country.name.common}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    marginBottom: '35px',
                    fontSize: '16px',
                    '@media (max-width: 1024px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  Population: {country.population}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    marginBottom: '35px',
                    fontSize: '16px',
                    '@media (max-width: 1024px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  Region: {country.region}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    marginBottom: '35px',
                    fontSize: '16px',
                    '@media (max-width: 1024px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  Sub Region: {country.subregion}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    marginBottom: '35px',
                    fontSize: '16px',
                    '@media (max-width: 1024px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  Capital: {country.capital}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    fontSize: '16px',
                    '@media (max-width: 1024px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  Top Level Domain: {country.tld}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Country;
