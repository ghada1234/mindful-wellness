import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction for RTL support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    handleClose();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        sx={{
          color: 'text.primary',
          textTransform: 'none',
          minWidth: 'auto',
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          fontSize: '0.8rem',
          border: '1px solid rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
            borderColor: 'primary.main',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            {currentLanguage.flag}
          </Typography>
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {currentLanguage.name}
          </Typography>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            borderRadius: 2,
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            selected={i18n.language === language.code}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                {language.flag}
              </Typography>
            </ListItemIcon>
            <ListItemText
              primary={language.name}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: i18n.language === language.code ? 'bold' : 'normal',
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
