import React from 'react';
import { TextField, useTheme } from '@mui/material';

interface SearchBarProps {
  darkMode: boolean;
  search: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  darkMode,
  search,
  handleSearchChange,
}: SearchBarProps) => {
  const theme = useTheme();

  return (
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
  );
};

export default SearchBar;
