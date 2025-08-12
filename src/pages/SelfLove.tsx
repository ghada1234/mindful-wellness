import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Favorite as HeartIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SelfLove: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('selfLove.title')}
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <HeartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('selfLove.subtitle')}
          </Typography>
          <Button variant="contained" startIcon={<HeartIcon />}>
            {t('selfLove.addAffirmation')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SelfLove;
