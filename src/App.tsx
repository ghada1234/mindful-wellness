import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BreathingExercises from './pages/BreathingExercises';
import Meditation from './pages/Meditation';
import MoodTracker from './pages/MoodTracker';
import SleepTracker from './pages/SleepTracker';
import Journal from './pages/Journal';
import Appointments from './pages/Appointments';
import SelfLove from './pages/SelfLove';
import AIWellnessHub from './pages/AIWellnessHub';
import VideoChat from './pages/VideoChat';
import Navigation from './components/Navigation';
import './i18n';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize language and direction based on stored preference or browser language
    const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6B73FF',
      },
      secondary: {
        main: '#FF6B9D',
      },
      background: {
        default: '#F8F9FF',
        paper: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    direction: 'ltr', // Will be overridden by RTL detection
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={
                <Navigation>
                  <Login />
                </Navigation>
              } />
              <Route path="/register" element={
                <Navigation>
                  <Register />
                </Navigation>
              } />
              <Route path="/" element={
                <PrivateRoute>
                  <Navigation>
                    <Dashboard />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/breathing" element={
                <PrivateRoute>
                  <Navigation>
                    <BreathingExercises />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/meditation" element={
                <PrivateRoute>
                  <Navigation>
                    <Meditation />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/mood" element={
                <PrivateRoute>
                  <Navigation>
                    <MoodTracker />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/sleep" element={
                <PrivateRoute>
                  <Navigation>
                    <SleepTracker />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/journal" element={
                <PrivateRoute>
                  <Navigation>
                    <Journal />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/appointments" element={
                <PrivateRoute>
                  <Navigation>
                    <Appointments />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/self-love" element={
                <PrivateRoute>
                  <Navigation>
                    <SelfLove />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/ai-wellness" element={
                <PrivateRoute>
                  <Navigation>
                    <AIWellnessHub />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="/video-chat" element={
                <PrivateRoute>
                  <Navigation>
                    <VideoChat />
                  </Navigation>
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
