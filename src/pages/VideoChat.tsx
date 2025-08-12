import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { VideoCall as VideoIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const VideoChat: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('videoChat.title')}
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <VideoIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('videoChat.subtitle')}
          </Typography>
          <Button variant="contained" startIcon={<VideoIcon />}>
            {t('videoChat.joinSession')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoChat;
