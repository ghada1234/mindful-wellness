import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import {
  Air as BreathingIcon,
  SelfImprovement as MeditationIcon,
  Mood as MoodIcon,
  Bedtime as SleepIcon,
  TrendingUp as TrendingUpIcon,
  Favorite as HeartIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  const { t } = useTranslation();

  const wellnessStats = [
    { label: t('dashboard.wellnessStats.moodScore'), value: 8.5, max: 10, color: '#4CAF50', icon: <MoodIcon /> },
    { label: t('dashboard.wellnessStats.sleepQuality'), value: 7.2, max: 10, color: '#2196F3', icon: <SleepIcon /> },
    { label: t('dashboard.wellnessStats.meditationStreak'), value: 5, max: 7, color: '#9C27B0', icon: <MeditationIcon /> },
    { label: t('dashboard.wellnessStats.breathingSessions'), value: 12, max: 15, color: '#FF9800', icon: <BreathingIcon /> },
  ];

  const quickActions = [
    { title: t('dashboard.quickActions.startBreathing'), icon: <BreathingIcon />, path: '/breathing', color: '#4CAF50' },
    { title: t('dashboard.quickActions.meditateNow'), icon: <MeditationIcon />, path: '/meditation', color: '#9C27B0' },
    { title: t('dashboard.quickActions.logMood'), icon: <MoodIcon />, path: '/mood', color: '#FF9800' },
    { title: t('dashboard.quickActions.trackSleep'), icon: <SleepIcon />, path: '/sleep', color: '#2196F3' },
  ];

  const recentActivities = [
    { activity: t('dashboard.recentActivities.meditation', { duration: 10 }), time: '2 hours ago', type: 'meditation' },
    { activity: t('dashboard.recentActivities.moodLogged', { mood: 'Happy', score: 8 }), time: '4 hours ago', type: 'mood' },
    { activity: t('dashboard.recentActivities.breathingCompleted'), time: '6 hours ago', type: 'breathing' },
    { activity: t('dashboard.recentActivities.appointmentScheduled', { doctor: 'Dr. Smith' }), time: '1 day ago', type: 'appointment' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meditation': return <MeditationIcon />;
      case 'mood': return <MoodIcon />;
      case 'breathing': return <BreathingIcon />;
      case 'appointment': return <ScheduleIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Welcome Section */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.125rem' },
          }}
        >
          {t('dashboard.welcome', { name: currentUser?.name })}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          {t('dashboard.subtitle')}
        </Typography>
      </Box>

      {/* Wellness Overview */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: { xs: 1, sm: 2, md: 3 },
        mb: { xs: 3, md: 4 }
      }}>
        {wellnessStats.map((stat, index) => (
          <Box key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      backgroundColor: stat.color,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'medium',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: stat.color,
                      fontSize: { xs: '1.75rem', sm: '2.125rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      ml: 1, 
                      color: 'text.secondary',
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    }}
                  >
                    /{stat.max}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stat.value / stat.max) * 100}
                  sx={{
                    height: { xs: 6, sm: 8 },
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stat.color,
                      borderRadius: 4,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Quick Actions */}
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 3 },
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
        }}
      >
        {t('dashboard.quickActions.title')}
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: { xs: 1, sm: 2 },
        mb: { xs: 3, md: 4 }
      }}>
        {quickActions.map((action, index) => (
          <Box key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ 
                textAlign: 'center', 
                py: { xs: 2, sm: 3 },
                px: { xs: 1, sm: 2 },
              }}>
                <Avatar
                  sx={{
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    mx: 'auto',
                    mb: { xs: 1, sm: 2 },
                    backgroundColor: action.color,
                  }}
                >
                  {action.icon}
                </Avatar>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'medium',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {action.title}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Recent Activities and Wellness Tips */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: { xs: 2, md: 3 }
      }}>
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
                {t('dashboard.recentActivities.title')}
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      px: 0,
                      py: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                      <Avatar 
                        sx={{ 
                          width: { xs: 28, sm: 32 }, 
                          height: { xs: 28, sm: 32 }, 
                          bgcolor: 'primary.light' 
                        }}
                      >
                        {getActivityIcon(activity.type)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.activity}
                      secondary={activity.time}
                      primaryTypographyProps={{ 
                        fontWeight: 'medium',
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      }}
                      secondaryTypographyProps={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

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
                {t('dashboard.wellnessTips.title')}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={<HeartIcon />}
                  label={t('dashboard.wellnessTips.gratitude.title')}
                  sx={{ 
                    mb: 1, 
                    width: '100%', 
                    justifyContent: 'flex-start',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    ml: 4,
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  }}
                >
                  {t('dashboard.wellnessTips.gratitude.description')}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={t('dashboard.wellnessTips.breathing.title')}
                  sx={{ 
                    mb: 1, 
                    width: '100%', 
                    justifyContent: 'flex-start',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    ml: 4,
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  }}
                >
                  {t('dashboard.wellnessTips.breathing.description')}
                </Typography>
              </Box>
              <Box>
                <Chip
                  icon={<CheckCircleIcon />}
                  label={t('dashboard.wellnessTips.hydration.title')}
                  sx={{ 
                    mb: 1, 
                    width: '100%', 
                    justifyContent: 'flex-start',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    ml: 4,
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  }}
                >
                  {t('dashboard.wellnessTips.hydration.description')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
