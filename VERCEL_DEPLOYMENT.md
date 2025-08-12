# 🚀 Vercel Deployment Guide

This guide will help you deploy the Mindful Wellness app to Vercel.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Firebase Project**: Set up Firebase for the database (see DATABASE_SETUP.md)

## 🔧 Step 1: Prepare Your App

### 1.1 Update Firebase Configuration

Replace the placeholder configuration in `src/firebase.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 1.2 Build the App Locally

```bash
cd mindful-wellness
npm run build
```

Make sure the build completes successfully without errors.

## 🌐 Step 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `mindful-wellness` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add these environment variables:
   ```
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd mindful-wellness
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set up environment variables
   - Deploy

## 🔧 Step 3: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to your project in Vercel Dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Update DNS**
   - Follow Vercel's DNS configuration instructions
   - Point your domain to Vercel's servers

## 🔒 Step 4: Security Configuration

### 1. Update Firebase Security Rules

In Firebase Console, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // All other collections require authentication and user ownership
    match /{collection}/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### 2. Configure Firebase Authentication

1. **Add Authorized Domains**
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to "Authorized domains"

2. **Enable Authentication Methods**
   - Email/Password
   - Google Sign-In
   - Configure OAuth consent screen

## 📊 Step 5: Monitoring and Analytics

### 1. Enable Vercel Analytics
- Go to your project settings
- Enable "Vercel Analytics"
- Track user behavior and performance

### 2. Set Up Error Monitoring
- Enable "Vercel Speed Insights"
- Monitor Core Web Vitals
- Track performance metrics

## 🔄 Step 6: Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers a new deployment
- Preview deployments for pull requests
- Automatic rollback on failed deployments

### Environment Management
- **Production**: `main` branch
- **Preview**: `develop` branch
- **Development**: feature branches

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build locally first
   npm run build
   
   # Fix any TypeScript errors
   npm run type-check
   ```

2. **Environment Variables**
   - Ensure all Firebase config variables are set
   - Check variable names match exactly
   - Restart deployment after adding variables

3. **Firebase Connection Issues**
   - Verify Firebase project is active
   - Check security rules
   - Ensure domain is authorized

4. **Performance Issues**
   - Enable Vercel Analytics
   - Optimize bundle size
   - Use code splitting

### Debug Commands

```bash
# Check build output
npm run build

# Run type checking
npm run type-check

# Test locally
npm start

# Check dependencies
npm audit
```

## 📱 Step 7: Mobile Optimization

### PWA Configuration
The app includes PWA features:
- Offline support
- App-like experience
- Install prompts

### Mobile Testing
- Test on various devices
- Check responsive design
- Verify touch interactions

## 🔄 Step 8: Updates and Maintenance

### Updating the App
1. Make changes in your local repository
2. Push to GitHub
3. Vercel automatically deploys updates

### Monitoring
- Check Vercel Dashboard for deployment status
- Monitor Firebase usage
- Track user analytics

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Status](https://vercel-status.com)

### Firebase Support
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase Support](https://firebase.google.com/support)

## 🎉 Success!

Your Mindful Wellness app is now live on Vercel! 

**Next Steps:**
1. Test all features thoroughly
2. Set up monitoring and analytics
3. Configure custom domain (optional)
4. Share your app with users

**Your app URL:** `https://your-project.vercel.app`

---

## 📋 Deployment Checklist

- [ ] Firebase project configured
- [ ] Environment variables set
- [ ] Build passes locally
- [ ] Domain authorized in Firebase
- [ ] Security rules updated
- [ ] Authentication methods enabled
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Mobile testing completed
- [ ] Performance optimized
