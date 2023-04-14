import React from 'react';
import { Pagination, Box } from '@mui/material';

interface PaginationWrapperProps {
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationWrapper = ({
  totalPages,
  handlePageChange,
}: PaginationWrapperProps) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100%',
    }}>
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
  );
};

export default PaginationWrapper;
