import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';

interface FilterProps {
  darkMode: boolean;
  selectedRegion: string;
  handleRegionChange: (e: any) => void;
}

const Filter = ({
  darkMode,
  selectedRegion,
  handleRegionChange,
}: FilterProps) => {
  const theme = useTheme();

  return (
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
  );
};

export default Filter;
