import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Fab,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Air as BreathingIcon,
  SelfImprovement as MeditationIcon,
  Mood as MoodIcon,
  Bedtime as SleepIcon,
  Book as JournalIcon,
  Event as AppointmentsIcon,
  Favorite as SelfLoveIcon,
  SmartToy as AIWellnessIcon,
  VideoCall as VideoChatIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const drawerWidth = { xs: 280, sm: 280, md: 280, lg: 320 };

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();

  const menuItems = currentUser ? [
    { text: t('navigation.dashboard'), icon: <DashboardIcon />, path: '/' },
    { text: t('navigation.breathing'), icon: <BreathingIcon />, path: '/breathing' },
    { text: t('navigation.meditation'), icon: <MeditationIcon />, path: '/meditation' },
    { text: t('navigation.mood'), icon: <MoodIcon />, path: '/mood' },
    { text: t('navigation.sleep'), icon: <SleepIcon />, path: '/sleep' },
    { text: t('navigation.journal'), icon: <JournalIcon />, path: '/journal' },
    { text: t('navigation.appointments'), icon: <AppointmentsIcon />, path: '/appointments' },
    { text: t('navigation.selfLove'), icon: <SelfLoveIcon />, path: '/self-love' },
    { text: t('navigation.aiWellness'), icon: <AIWellnessIcon />, path: '/ai-wellness' },
    { text: t('navigation.videoChat'), icon: <VideoChatIcon />, path: '/video-chat' },
  ] : [
    { text: t('navigation.login'), icon: <LoginIcon />, path: '/login' },
    { text: t('navigation.register'), icon: <RegisterIcon />, path: '/register' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          {t('app.title')}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {t('app.subtitle')}
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ flex: 1, pt: 2, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component="button"
            onClick={() => handleNavigation(item.path)}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              backgroundColor: location.pathname === item.path ? 'primary.light' : 'transparent',
              color: location.pathname === item.path ? 'primary.contrastText' : 'text.primary',
              '&:hover': {
                backgroundColor: location.pathname === item.path ? 'primary.light' : 'action.hover',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s ease',
              border: 'none',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: location.pathname === item.path ? 'bold' : 'medium',
                fontSize: '0.95rem',
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      {!currentUser && (
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              color: 'text.secondary',
              mb: 2,
              fontSize: '0.9rem',
            }}
          >
            {t('navigation.welcomeMessage')}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth.lg}px)` },
          ml: { lg: `${drawerWidth.lg}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: theme.zIndex.drawer + 1,
          left: { lg: `${drawerWidth.lg}px` },
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2, md: 3 },
          justifyContent: 'space-between'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 'bold',
            }}
          >
            {menuItems.find(item => item.path === location.pathname)?.text || t('app.title')}
          </Typography>
          
          {/* Language Switcher and Auth Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageSwitcher />
            
            {/* User Profile or Login/Register Buttons */}
            {currentUser ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src={currentUser?.photoURL}
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    fontSize: '0.875rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {currentUser?.name?.charAt(0) || 'U'}
                </Avatar>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'medium',
                    display: { xs: 'none', sm: 'block' },
                    color: 'text.primary',
                  }}
                >
                  {currentUser?.name}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    color: 'text.secondary',
                    borderColor: 'rgba(0,0,0,0.1)',
                    '&:hover': {
                      borderColor: 'error.main',
                      color: 'error.main',
                      backgroundColor: 'rgba(244, 67, 54, 0.04)',
                    },
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    px: { xs: 1, sm: 1.5 },
                    py: { xs: 0.25, sm: 0.5 },
                  }}
                >
                  {t('navigation.logout')}
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  sx={{
                    color: 'text.primary',
                    borderColor: 'rgba(0,0,0,0.2)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.5, sm: 0.75 },
                  }}
                >
                  {t('navigation.login')}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<RegisterIcon />}
                  onClick={() => navigate('/register')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      transform: 'translateY(-1px)',
                    },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.5, sm: 0.75 },
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  {t('navigation.register')}
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth.lg }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { xs: drawerWidth.xs, sm: drawerWidth.sm, md: drawerWidth.md, lg: drawerWidth.lg },
              border: 'none',
              boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
              background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          width: { lg: `calc(100% - ${drawerWidth.lg}px)` },
          ml: { lg: `${drawerWidth.lg}px` },
          mt: { xs: '56px', sm: '64px' },
          minHeight: 'calc(100vh - 56px)',
          background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
        }}
      >
        {children}
      </Box>

      {/* Mobile Floating Action Button for quick access */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: theme.zIndex.fab,
            display: { md: 'none' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          <MenuIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Navigation;
