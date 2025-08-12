import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Slider,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Mood as MoodIcon,
  SentimentSatisfied as HappyIcon,
  SentimentNeutral as NeutralIcon,
  SentimentDissatisfied as SadIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDatabase } from '../hooks/useDatabase';

const MoodTracker: React.FC = () => {
  const [moodLevel, setMoodLevel] = useState<number>(5);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const { saveMoodEntry, loading, error } = useDatabase();

  const moodLevels = [
    { value: 1, label: t('mood.moodLevels.terrible'), color: '#f44336' },
    { value: 2, label: t('mood.moodLevels.bad'), color: '#ff9800' },
    { value: 3, label: t('mood.moodLevels.okay'), color: '#ffc107' },
    { value: 4, label: t('mood.moodLevels.good'), color: '#4caf50' },
    { value: 5, label: t('mood.moodLevels.excellent'), color: '#2196f3' },
  ];

  const emotions = [
    { key: 'happy', label: t('mood.emotions.happy'), icon: <HappyIcon /> },
    { key: 'sad', label: t('mood.emotions.sad'), icon: <SadIcon /> },
    { key: 'angry', label: t('mood.emotions.angry'), icon: <SadIcon /> },
    { key: 'anxious', label: t('mood.emotions.anxious'), icon: <NeutralIcon /> },
    { key: 'excited', label: t('mood.emotions.excited'), icon: <HappyIcon /> },
    { key: 'calm', label: t('mood.emotions.calm'), icon: <HappyIcon /> },
    { key: 'stressed', label: t('mood.emotions.stressed'), icon: <NeutralIcon /> },
    { key: 'grateful', label: t('mood.emotions.grateful'), icon: <HappyIcon /> },
  ];

  const activities = [
    { key: 'exercise', label: t('mood.activities.exercise') },
    { key: 'meditation', label: t('mood.activities.meditation') },
    { key: 'socializing', label: t('mood.activities.socializing') },
    { key: 'work', label: t('mood.activities.work') },
    { key: 'sleep', label: t('mood.activities.sleep') },
    { key: 'hobbies', label: t('mood.activities.hobbies') },
  ];

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSave = async () => {
    try {
      await saveMoodEntry({
        moodLevel: moodLevel as 1 | 2 | 3 | 4 | 5,
        emotions: selectedEmotions,
        activities: selectedActivities,
        notes: notes || undefined,
        timestamp: new Date() as any,
      });
      
      // Reset form after successful save
      setMoodLevel(5);
      setSelectedEmotions([]);
      setSelectedActivities([]);
      setNotes('');
      
      // Show success message (you can add a toast notification here)
      console.log('Mood entry saved successfully!');
    } catch (err) {
      console.error('Failed to save mood entry:', err);
    }
  };

  const getMoodColor = (level: number) => {
    const mood = moodLevels.find(m => m.value === level);
    return mood?.color || '#757575';
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 3 },
          fontSize: { xs: '1.75rem', sm: '2.125rem' },
        }}
      >
        {t('mood.title')}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary', 
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        {t('mood.subtitle')}
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, md: 3 }
      }}>
        {/* Mood Level */}
        <Box>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                {t('mood.logMood')}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: getMoodColor(moodLevel) }}>
                  {moodLevels.find(m => m.value === moodLevel)?.label}
                </Typography>
                <Slider
                  value={moodLevel}
                  onChange={(_, value) => setMoodLevel(value as number)}
                  min={1}
                  max={5}
                  step={1}
                  marks={moodLevels.map(mood => ({
                    value: mood.value,
                    label: mood.label,
                  }))}
                  sx={{
                    '& .MuiSlider-track': {
                      background: `linear-gradient(90deg, #f44336 0%, #ff9800 25%, #ffc107 50%, #4caf50 75%, #2196f3 100%)`,
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: getMoodColor(moodLevel),
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Emotions */}
        <Box>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                {t('mood.emotions.happy')} {/* Using happy as a placeholder for "Emotions" */}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {emotions.map((emotion) => (
                  <Chip
                    key={emotion.key}
                    icon={emotion.icon}
                    label={emotion.label}
                    onClick={() => handleEmotionToggle(emotion.key)}
                    variant={selectedEmotions.includes(emotion.key) ? 'filled' : 'outlined'}
                    color={selectedEmotions.includes(emotion.key) ? 'primary' : 'default'}
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Activities */}
        <Box>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                {t('mood.activities.title')}
              </Typography>
              
              <FormGroup>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 1
                }}>
                  {activities.map((activity) => (
                    <Box key={activity.key}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedActivities.includes(activity.key)}
                            onChange={() => handleActivityToggle(activity.key)}
                            color="primary"
                          />
                        }
                        label={activity.label}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </FormGroup>
            </CardContent>
          </Card>
        </Box>

        {/* Notes */}
        <Box>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                {t('mood.notes')}
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder={t('mood.notes')}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Save Button */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              startIcon={<MoodIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                textTransform: 'none',
              }}
            >
              {t('mood.save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MoodTracker;
