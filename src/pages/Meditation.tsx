import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  SelfImprovement as MeditationIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
}

const Meditation: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const { t } = useTranslation();

  const meditationSessions: MeditationSession[] = [
    {
      id: 'mindfulness',
      title: t('meditation.sessions.mindfulness.title'),
      description: t('meditation.sessions.mindfulness.description'),
      duration: 10,
      category: 'Mindfulness',
      difficulty: 'Beginner',
      benefits: t('meditation.sessions.mindfulness.benefits', { returnObjects: true }) as string[],
    },
    {
      id: 'loving-kindness',
      title: t('meditation.sessions.lovingKindness.title'),
      description: t('meditation.sessions.lovingKindness.description'),
      duration: 15,
      category: 'Compassion',
      difficulty: 'Intermediate',
      benefits: t('meditation.sessions.lovingKindness.benefits', { returnObjects: true }) as string[],
    },
    {
      id: 'body-scan',
      title: t('meditation.sessions.bodyScan.title'),
      description: t('meditation.sessions.bodyScan.description'),
      duration: 20,
      category: 'Relaxation',
      difficulty: 'Beginner',
      benefits: t('meditation.sessions.bodyScan.benefits', { returnObjects: true }) as string[],
    },
    {
      id: 'transcendental',
      title: t('meditation.sessions.transcendental.title'),
      description: t('meditation.sessions.transcendental.description'),
      duration: 30,
      category: 'Transcendental',
      difficulty: 'Advanced',
      benefits: t('meditation.sessions.transcendental.benefits', { returnObjects: true }) as string[],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#757575';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startMeditation = () => {
    if (!selectedSession) return;
    
    setIsActive(true);
    setTimeLeft(selectedSession.duration * 60);
    setShowTimer(true);
  };

  const pauseMeditation = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const stopMeditation = () => {
    setIsActive(false);
    setTimeLeft(0);
    setShowTimer(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopMeditation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const progress = selectedSession ? ((selectedSession.duration * 60 - timeLeft) / (selectedSession.duration * 60)) * 100 : 0;

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
        {t('meditation.title')}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary', 
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        {t('meditation.subtitle')}
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
        gap: { xs: 2, md: 3 }
      }}>
        {/* Meditation Sessions */}
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              mb: { xs: 2, md: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            {t('meditation.chooseSession')}
          </Typography>
          {meditationSessions.map((session) => (
            <Card
              key={session.id}
              sx={{
                mb: 2,
                cursor: 'pointer',
                border: selectedSession?.id === session.id ? 2 : 1,
                borderColor: selectedSession?.id === session.id ? 'primary.main' : 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => setSelectedSession(session)}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                  >
                    {session.title}
                  </Typography>
                  <Chip
                    label={t(`difficulty.${session.difficulty.toLowerCase()}`)}
                    size="small"
                    sx={{
                      backgroundColor: getDifficultyColor(session.difficulty),
                      color: 'white',
                      fontWeight: 'medium',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    mb: 2,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  }}
                >
                  {session.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimerIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    }}
                  >
                    {t('meditation.duration', { minutes: session.duration })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {session.benefits.slice(0, 2).map((benefit, index) => (
                    <Chip
                      key={index}
                      label={benefit}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Meditation Timer */}
        <Box>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              py: { xs: 3, sm: 4 },
              px: { xs: 2, sm: 3 },
            }}>
              {selectedSession && showTimer ? (
                <>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: { xs: 2, md: 3 },
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    {selectedSession.title}
                  </Typography>
                  
                  {/* Timer Display */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: { xs: 3, md: 4 },
                      minHeight: { xs: 200, sm: 300 },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 200, sm: 250 },
                        height: { xs: 200, sm: 250 },
                        borderRadius: '50%',
                        background: `conic-gradient(from 0deg, ${theme.palette.primary.main} ${progress * 3.6}deg, #f0f0f0 ${progress * 3.6}deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          width: '80%',
                          height: '80%',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography 
                          variant="h2" 
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', sm: '3rem' },
                          }}
                        >
                          {formatTime(timeLeft)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  <Box sx={{ mb: { xs: 2, md: 3 } }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: { xs: 6, sm: 8 },
                        borderRadius: 4,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1, 
                        color: 'text.secondary',
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      }}
                    >
                      {Math.round(progress)}% complete
                    </Typography>
                  </Box>

                  {/* Controls */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, sm: 2 }, 
                    justifyContent: 'center',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  }}>
                    {!isActive ? (
                      <Button
                        variant="contained"
                        startIcon={<PlayIcon />}
                        onClick={startMeditation}
                        sx={{ 
                          px: { xs: 3, sm: 4 }, 
                          py: { xs: 1, sm: 1.5 }, 
                          borderRadius: 2,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                        }}
                      >
                        {t('meditation.controls.start')}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<PauseIcon />}
                          onClick={pauseMeditation}
                          sx={{ 
                            px: { xs: 3, sm: 4 }, 
                            py: { xs: 1, sm: 1.5 }, 
                            borderRadius: 2,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                          }}
                        >
                          {t('meditation.controls.pause')}
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<StopIcon />}
                          onClick={stopMeditation}
                          sx={{ 
                            px: { xs: 3, sm: 4 }, 
                            py: { xs: 1, sm: 1.5 }, 
                            borderRadius: 2,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                          }}
                        >
                          {t('meditation.controls.stop')}
                        </Button>
                      </>
                    )}
                  </Box>
                </>
              ) : selectedSession ? (
                <Box sx={{ py: { xs: 6, sm: 8 } }}>
                  <MeditationIcon sx={{ 
                    fontSize: { xs: 60, sm: 80 }, 
                    color: 'text.secondary', 
                    mb: 2 
                  }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      mb: 3,
                    }}
                  >
                    {t('meditation.readyToBegin')}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={startMeditation}
                    sx={{ 
                      px: { xs: 3, sm: 4 }, 
                      py: { xs: 1, sm: 1.5 }, 
                      borderRadius: 2,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {t('meditation.controls.startSession')}
                  </Button>
                </Box>
              ) : (
                <Box sx={{ py: { xs: 6, sm: 8 } }}>
                  <MeditationIcon sx={{ 
                    fontSize: { xs: 60, sm: 80 }, 
                    color: 'text.secondary', 
                    mb: 2 
                  }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                    }}
                  >
                    {t('meditation.selectSession')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Meditation;
