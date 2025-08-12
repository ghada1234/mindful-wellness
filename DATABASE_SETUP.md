# Database Setup Guide

This guide explains how to set up and use the comprehensive database system for the Mindful Wellness app.

## 🗄️ Database Overview

The app uses **Firebase Firestore** as the primary database, providing:
- Real-time data synchronization
- Offline support
- Scalable cloud storage
- Built-in authentication
- Automatic backups

## 📊 Database Collections

The database is organized into the following collections:

### 1. **Users** (`users`)
- User profiles and preferences
- Authentication data
- Wellness goals and settings

### 2. **Mood Entries** (`moodEntries`)
- Daily mood tracking data
- Emotion selections
- Activity logs
- Notes and timestamps

### 3. **Sleep Entries** (`sleepEntries`)
- Sleep duration and quality
- Bedtime and wake times
- Sleep factors and influences
- Sleep notes

### 4. **Journal Entries** (`journalEntries`)
- Personal journal entries
- Mood associations
- Tags and categories
- Rich text content

### 5. **Appointments** (`appointments`)
- Therapy session bookings
- Provider information
- Video chat links
- Session status tracking

### 6. **Breathing Sessions** (`breathingSessions`)
- Breathing exercise logs
- Technique types and durations
- Completion status
- Session analytics

### 7. **Meditation Sessions** (`meditationSessions`)
- Meditation practice logs
- Session types and durations
- Completion tracking
- Progress analytics

### 8. **Self Love Entries** (`selfLoveEntries`)
- Affirmations and gratitude
- Self-care activities
- Personal reflections
- Wellness practices

### 9. **AI Chat History** (`aiChatHistory`)
- AI wellness conversations
- User questions and AI responses
- Chat timestamps
- Conversation context

### 10. **Wellness Stats** (`wellnessStats`)
- Daily wellness metrics
- Aggregated statistics
- Progress tracking
- Analytics data

## 🔧 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `mindful-wellness-app`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable Email/Password authentication
4. Enable Google authentication
5. Add your domain to authorized domains

### Step 3: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### Step 4: Get Configuration

1. In Firebase Console, go to "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app with a nickname
5. Copy the configuration object

### Step 5: Update Configuration

Replace the placeholder configuration in `src/firebase.ts`:

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

## 🚀 Using the Database

### 1. Import the Hook

```typescript
import { useDatabase } from '../hooks/useDatabase';
```

### 2. Use in Component

```typescript
const MyComponent = () => {
  const { 
    saveMoodEntry, 
    getMoodEntries, 
    loading, 
    error 
  } = useDatabase();

  // Save data
  const handleSave = async () => {
    try {
      await saveMoodEntry({
        moodLevel: 4,
        emotions: ['happy', 'grateful'],
        activities: ['exercise', 'meditation'],
        notes: 'Feeling great today!',
        timestamp: new Date() as any,
      });
      console.log('Saved successfully!');
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  // Load data
  const loadData = async () => {
    try {
      const entries = await getMoodEntries(30); // Last 30 entries
      console.log('Loaded entries:', entries);
    } catch (err) {
      console.error('Load failed:', err);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleSave}>Save Mood</button>
      <button onClick={loadData}>Load Data</button>
    </div>
  );
};
```

## 📝 Available Database Operations

### User Profile
- `createUserProfile()` - Create new user profile
- `getUserProfile()` - Get current user profile
- `updateUserProfile()` - Update user preferences

### Mood Tracking
- `saveMoodEntry()` - Save mood entry
- `getMoodEntries()` - Get mood history

### Sleep Tracking
- `saveSleepEntry()` - Save sleep data
- `getSleepEntries()` - Get sleep history

### Journal
- `saveJournalEntry()` - Save journal entry
- `getJournalEntries()` - Get journal entries
- `updateJournalEntry()` - Update entry
- `deleteJournalEntry()` - Delete entry

### Breathing Sessions
- `saveBreathingSession()` - Save session
- `getBreathingSessions()` - Get session history

### Meditation Sessions
- `saveMeditationSession()` - Save session
- `getMeditationSessions()` - Get session history

### Analytics
- `getUserAnalytics()` - Get comprehensive analytics

## 🔒 Security Rules

Set up Firestore security rules in Firebase Console:

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

## 📊 Data Export

The database service includes data export functionality:

```typescript
const { exportUserData } = useDatabase();

const handleExport = async () => {
  try {
    const data = await exportUserData();
    const jsonString = JSON.stringify(data, null, 2);
    
    // Download as file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wellness-data.json';
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export failed:', err);
  }
};
```

## 🧹 Data Cleanup

To delete all user data:

```typescript
const { deleteUserData } = useDatabase();

const handleDeleteAccount = async () => {
  if (confirm('Are you sure? This will delete all your data permanently.')) {
    try {
      await deleteUserData();
      console.log('All data deleted');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};
```

## 🔍 Monitoring and Analytics

### Firebase Analytics
- Track user engagement
- Monitor feature usage
- Analyze user behavior
- Performance monitoring

### Firestore Usage
- Monitor read/write operations
- Track storage usage
- Set up alerts for quotas
- Performance optimization

## 🚨 Error Handling

The database service includes comprehensive error handling:

```typescript
const { error, clearError } = useDatabase();

// Display errors to user
if (error) {
  return (
    <Alert severity="error" onClose={clearError}>
      {error}
    </Alert>
  );
}
```

## 🔄 Offline Support

Firestore provides automatic offline support:
- Data is cached locally
- Changes sync when online
- Works without internet connection
- Automatic conflict resolution

## 📱 Mobile Optimization

The database is optimized for mobile:
- Efficient queries
- Minimal data transfer
- Battery-friendly operations
- Responsive design

## 🛡️ Privacy and Compliance

- All data is encrypted in transit and at rest
- User data is isolated by user ID
- GDPR compliant data handling
- User consent for data collection
- Right to data deletion

## 🚀 Production Deployment

### 1. Update Security Rules
```javascript
// Production security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 2. Enable Authentication Methods
- Email/Password
- Google Sign-In
- Phone authentication (optional)
- Apple Sign-In (iOS)

### 3. Set Up Monitoring
- Firebase Performance Monitoring
- Crashlytics for error tracking
- Analytics for user insights

### 4. Configure Backups
- Enable automatic backups
- Set up disaster recovery
- Regular data validation

## 📞 Support

For database-related issues:
1. Check Firebase Console for errors
2. Review security rules
3. Verify authentication setup
4. Check network connectivity
5. Review error logs

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
