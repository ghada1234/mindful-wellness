import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Chip } from '@mui/material';
import { SmartToy as AIIcon, Send as SendIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AIWellnessHub: React.FC = () => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const suggestions = [
    t('aiWellness.howToMeditate'),
    t('aiWellness.reduceStress'),
    t('aiWellness.betterSleep'),
    t('aiWellness.anxietyHelp'),
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('aiWellness.title')}
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('aiWellness.chat')}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={t('aiWellness.askQuestion')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t('aiWellness.suggestions')}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {suggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  variant="outlined"
                  onClick={() => setMessage(suggestion)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
          <Button variant="contained" startIcon={<SendIcon />}>
            {t('aiWellness.send')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AIWellnessHub;
