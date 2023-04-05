import React from 'react';
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.darkMode.darkMode);

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? '#2b3844' : '#fff',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 0px',
          backgroundColor: darkMode ? '#2b3844' : '#fff',

          '@media (max-width: 768px)': {
            justifyContent: 'space-evenly',
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: darkMode ? '#fff' : '#000',
            fontSize: '24px',
            '@media (max-width: 768px)': {
              fontSize: '14px',
            },
          }}
        >
          Where in the world?
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked onChange={handleDarkMode} />}
            label={
              darkMode ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? '#fff' : '#000',
                    '@media (max-width: 768px)': {
                      fontSize: '12px',
                    },
                  }}
                >
                  Dark Mode
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    '@media (max-width: 768px)': {
                      fontSize: '12px',
                    },
                  }}
                >
                  Light Mode
                </Typography>
              )
            }
          />
        </FormGroup>
      </Container>
    </Box>
  );
};

export default Header;
