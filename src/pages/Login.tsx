import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  Container,
  Avatar,
} from '@mui/material';
import { Google as GoogleIcon, Lock as LockIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError(t('auth.login.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to login with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockIcon />
          </Avatar>
          
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            {t('auth.login.title')}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
            {t('auth.login.subtitle')}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('auth.login.email')}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('auth.login.password')}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              {loading ? <CircularProgress size={24} /> : t('auth.login.signIn')}
            </Button>
          </Box>

          <Divider sx={{ width: '100%', my: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 3,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              borderColor: '#4285f4',
              color: '#4285f4',
              '&:hover': {
                borderColor: '#3367d6',
                backgroundColor: 'rgba(66, 133, 244, 0.04)',
              },
            }}
          >
            {t('auth.login.googleSignIn')}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('auth.login.noAccount')}{' '}
              <Link
                to="/register"
                style={{
                  color: '#6B73FF',
                  textDecoration: 'none',
                  fontWeight: 'medium',
                }}
              >
                {t('auth.login.signUp')}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
