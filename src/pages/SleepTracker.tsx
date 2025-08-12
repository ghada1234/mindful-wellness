import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Slider } from '@mui/material';
import { Bedtime as SleepIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SleepTracker: React.FC = () => {
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState(7);
  const { t } = useTranslation();

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('sleep.title')}
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('sleep.logSleep')}
          </Typography>
          <TextField
            fullWidth
            type="time"
            label={t('sleep.bedtime')}
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="time"
            label={t('sleep.wakeTime')}
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t('sleep.sleepQuality')}: {quality}/10
          </Typography>
          <Slider
            value={quality}
            onChange={(_, value) => setQuality(value as number)}
            min={1}
            max={10}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" startIcon={<SleepIcon />}>
            {t('sleep.save')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SleepTracker;
