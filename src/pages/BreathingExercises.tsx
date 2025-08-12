import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Slider,
  Chip,
  Avatar,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Air as AirIcon,
  Timer as TimerIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const BreathingExercises: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { t } = useTranslation();

  const breathingTechniques: BreathingTechnique[] = [
    {
      id: 'box-breathing',
      name: t('breathing.techniques.boxBreathing.name'),
      description: t('breathing.techniques.boxBreathing.description'),
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 5,
      benefits: t('breathing.techniques.boxBreathing.benefits', { returnObjects: true }) as string[],
      difficulty: 'Beginner',
    },
    {
      id: '4-7-8',
      name: t('breathing.techniques.478.name'),
      description: t('breathing.techniques.478.description'),
      inhale: 4,
      hold: 7,
      exhale: 8,
      cycles: 4,
      benefits: t('breathing.techniques.478.benefits', { returnObjects: true }) as string[],
      difficulty: 'Intermediate',
    },
    {
      id: 'deep-breathing',
      name: t('breathing.techniques.deepBreathing.name'),
      description: t('breathing.techniques.deepBreathing.description'),
      inhale: 6,
      hold: 2,
      exhale: 6,
      cycles: 10,
      benefits: t('breathing.techniques.deepBreathing.benefits', { returnObjects: true }) as string[],
      difficulty: 'Beginner',
    },
    {
      id: 'alternate-nostril',
      name: t('breathing.techniques.alternateNostril.name'),
      description: t('breathing.techniques.alternateNostril.description'),
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 6,
      benefits: t('breathing.techniques.alternateNostril.benefits', { returnObjects: true }) as string[],
      difficulty: 'Advanced',
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

  const startBreathing = () => {
    if (!selectedTechnique) return;
    
    setIsActive(true);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(selectedTechnique.inhale);
  };

  const pauseBreathing = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const stopBreathing = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(0);
    setCurrentCycle(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && selectedTechnique) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (currentPhase === 'inhale') {
              setCurrentPhase('hold');
              return selectedTechnique.hold;
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return selectedTechnique.exhale;
            } else {
              // Exhale complete, check if cycle is done
              if (currentCycle >= selectedTechnique.cycles) {
                stopBreathing();
                return 0;
              } else {
                setCurrentCycle(prev => prev + 1);
                setCurrentPhase('inhale');
                return selectedTechnique.inhale;
              }
            }
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
  }, [isActive, currentPhase, currentCycle, selectedTechnique]);

  const getBreathingCircleSize = () => {
    if (!isActive) return isMobile ? 150 : 200;
    
    const maxSize = isMobile ? 200 : 300;
    const minSize = isMobile ? 100 : 150;
    const phase = currentPhase;
    
    if (phase === 'inhale') {
      const progress = 1 - (timeLeft / (selectedTechnique?.inhale || 1));
      return minSize + (maxSize - minSize) * progress;
    } else if (phase === 'hold') {
      return maxSize;
    } else {
      const progress = 1 - (timeLeft / (selectedTechnique?.exhale || 1));
      return maxSize - (maxSize - minSize) * progress;
    }
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
        {t('breathing.title')}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary', 
          mb: { xs: 3, md: 4 },
          fontSize: { xs: '0.9rem', sm: '1rem' },
        }}
      >
        {t('breathing.subtitle')}
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
        gap: { xs: 2, sm: 3, lg: 4 }
      }}>
        {/* Breathing Techniques List */}
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              mb: { xs: 2, md: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            {t('breathing.chooseTechnique')}
          </Typography>
          {breathingTechniques.map((technique) => (
            <Card
              key={technique.id}
              sx={{
                mb: 2,
                cursor: 'pointer',
                border: selectedTechnique?.id === technique.id ? 2 : 1,
                borderColor: selectedTechnique?.id === technique.id ? 'primary.main' : 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
              onClick={() => setSelectedTechnique(technique)}
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
                    {technique.name}
                  </Typography>
                  <Chip
                    label={t(`difficulty.${technique.difficulty.toLowerCase()}`)}
                    size="small"
                    sx={{
                      backgroundColor: getDifficultyColor(technique.difficulty),
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
                  {technique.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {technique.benefits.slice(0, 2).map((benefit, index) => (
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

        {/* Breathing Visualizer */}
        <Box>
          <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              py: { xs: 3, sm: 4 },
              px: { xs: 2, sm: 3 },
            }}>
              {selectedTechnique ? (
                <>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: { xs: 2, md: 3 },
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    {selectedTechnique.name}
                  </Typography>
                  
                  {/* Breathing Circle */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: { xs: 3, md: 4 },
                      minHeight: { xs: 250, sm: 300, md: 400 },
                    }}
                  >
                    <Box
                      sx={{
                        width: getBreathingCircleSize(),
                        height: getBreathingCircleSize(),
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${currentPhase === 'inhale' ? '#4CAF50' : currentPhase === 'hold' ? '#FF9800' : '#2196F3'}20, ${currentPhase === 'inhale' ? '#4CAF50' : currentPhase === 'hold' ? '#FF9800' : '#2196F3'}40)`,
                        border: `4px solid ${currentPhase === 'inhale' ? '#4CAF50' : currentPhase === 'hold' ? '#FF9800' : '#2196F3'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.5s ease',
                        position: 'relative',
                      }}
                    >
                      <AirIcon
                        sx={{
                          fontSize: { xs: 40, sm: 60 },
                          color: currentPhase === 'inhale' ? '#4CAF50' : currentPhase === 'hold' ? '#FF9800' : '#2196F3',
                          animation: isActive ? 'pulse 2s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.1)' },
                            '100%': { transform: 'scale(1)' },
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Status */}
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 2, 
                      textTransform: 'capitalize',
                      fontSize: { xs: '1.5rem', sm: '2.125rem' },
                    }}
                  >
                    {t(`breathing.phases.${currentPhase}`)}
                  </Typography>
                  
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 2, 
                      color: 'primary.main',
                      fontSize: { xs: '3rem', sm: '3.75rem' },
                    }}
                  >
                    {timeLeft}s
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      mb: { xs: 2, md: 3 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {t('breathing.cycle', { current: currentCycle, total: selectedTechnique.cycles })}
                  </Typography>

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
                        onClick={startBreathing}
                        sx={{ 
                          px: { xs: 3, sm: 4 }, 
                          py: { xs: 1, sm: 1.5 }, 
                          borderRadius: 2,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                        }}
                      >
                        {t('breathing.controls.start')}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<PauseIcon />}
                          onClick={pauseBreathing}
                          sx={{ 
                            px: { xs: 3, sm: 4 }, 
                            py: { xs: 1, sm: 1.5 }, 
                            borderRadius: 2,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                          }}
                        >
                          {t('breathing.controls.pause')}
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<StopIcon />}
                          onClick={stopBreathing}
                          sx={{ 
                            px: { xs: 3, sm: 4 }, 
                            py: { xs: 1, sm: 1.5 }, 
                            borderRadius: 2,
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                          }}
                        >
                          {t('breathing.controls.stop')}
                        </Button>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <Box sx={{ py: { xs: 6, sm: 8 } }}>
                  <AirIcon sx={{ 
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
                    {t('breathing.selectTechnique')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Info Dialog */}
      <Dialog 
        open={showInfo} 
        onClose={() => setShowInfo(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>{t('breathing.info.title')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t('breathing.info.description1')}
          </Typography>
          <Typography variant="body1">
            {t('breathing.info.description2')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfo(false)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BreathingExercises;
