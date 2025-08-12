import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { Book as JournalIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Journal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { t } = useTranslation();

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        {t('journal.title')}
      </Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            label={t('journal.title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            multiline
            rows={8}
            label={t('journal.content')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" startIcon={<JournalIcon />}>
            {t('journal.save')}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Journal;
