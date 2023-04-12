import React from 'react';
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../store';

interface RootState {
  darkMode: {
    darkMode: boolean;
  };
}

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const theme = useTheme();

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 0px',
          backgroundColor: darkMode
            ? theme.palette.primary.main
            : theme.palette.background.default,

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
            color: darkMode
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
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
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
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
                    color: darkMode
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
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
