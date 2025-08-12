import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Event as AppointmentIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Appointments: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('appointments.title')}
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <AppointmentIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('appointments.noAppointments')}
          </Typography>
          <Button variant="contained" startIcon={<AppointmentIcon />}>
            {t('appointments.bookNow')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Appointments;
