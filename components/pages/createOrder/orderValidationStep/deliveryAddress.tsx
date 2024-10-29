import React from 'react';
import { Box, Paper, InputLabel, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FormTextField from '@/components/common/Form/formTextField';

export const DeliveryAddress = () => {
  const { control } = useFormContext();
  return (
    <Paper elevation={3}>
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', padding: '16px 32px' }}>
        <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
          Delivery Address
        </Typography>
      </Box>
      <Box sx={{ padding: '16px 48px 32px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <InputLabel htmlFor="street">Street</InputLabel>
            <FormTextField
              name="address.street"
              control={control}
              defaultValue=""
              rules={{ required: 'Street is required' }}
              type="text"
              id="street"
              placeholder="123 Main Street"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <InputLabel htmlFor="city">City</InputLabel>
              <FormTextField
                name="address.city"
                control={control}
                defaultValue=""
                rules={{ required: 'City is required' }}
                type="text"
                id="city"
                placeholder="Springfield"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <InputLabel htmlFor="zip">Zip Code</InputLabel>
              <FormTextField
                name="address.zip_code"
                control={control}
                defaultValue=""
                rules={{ required: 'Zip Code is required' }}
                type="text"
                id="zip"
                placeholder="12345"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <InputLabel htmlFor="country">Country</InputLabel>
              <FormTextField
                name="address.country"
                control={control}
                defaultValue=""
                rules={{ required: 'Country is required' }}
                type="text"
                id="country"
                placeholder="United States"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <FormTextField
                name="address.phone"
                control={control}
                defaultValue=""
                rules={{ required: 'Phone is required' }}
                type="text"
                id="phone"
                placeholder="+1 (555) 123-4567"
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
