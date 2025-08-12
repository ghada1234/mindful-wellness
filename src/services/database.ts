import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Database collections
export const COLLECTIONS = {
  USERS: 'users',
  MOOD_ENTRIES: 'moodEntries',
  SLEEP_ENTRIES: 'sleepEntries',
  JOURNAL_ENTRIES: 'journalEntries',
  APPOINTMENTS: 'appointments',
  BREATHING_SESSIONS: 'breathingSessions',
  MEDITATION_SESSIONS: 'meditationSessions',
  SELF_LOVE_ENTRIES: 'selfLoveEntries',
  AI_CHAT_HISTORY: 'aiChatHistory',
  WELLNESS_STATS: 'wellnessStats'
};

// User Profile Interface
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  preferences: {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  wellnessGoals: {
    dailyMeditation: number; // minutes
    dailyBreathing: number; // sessions
    sleepGoal: number; // hours
    moodTracking: boolean;
  };
}

// Mood Entry Interface
export interface MoodEntry {
  id?: string;
  userId: string;
  moodLevel: 1 | 2 | 3 | 4 | 5;
  emotions: string[];
  activities: string[];
  notes?: string;
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// Sleep Entry Interface
export interface SleepEntry {
  id?: string;
  userId: string;
  bedtime: Timestamp;
  wakeTime: Timestamp;
  sleepQuality: 1 | 2 | 3 | 4 | 5;
  factors: string[];
  notes?: string;
  createdAt: Timestamp;
}

// Journal Entry Interface
export interface JournalEntry {
  id?: string;
  userId: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// Appointment Interface
export interface Appointment {
  id?: string;
  userId: string;
  title: string;
  description: string;
  startTime: Timestamp;
  endTime: Timestamp;
  type: 'therapy' | 'consultation' | 'follow-up' | 'emergency';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  provider: {
    name: string;
    email: string;
    phone?: string;
  };
  location?: string;
  videoUrl?: string;
  notes?: string;
  createdAt: Timestamp;
}

// Breathing Session Interface
export interface BreathingSession {
  id?: string;
  userId: string;
  technique: string;
  duration: number; // seconds
  cycles: number;
  completed: boolean;
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// Meditation Session Interface
export interface MeditationSession {
  id?: string;
  userId: string;
  type: string;
  duration: number; // minutes
  completed: boolean;
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// Self Love Entry Interface
export interface SelfLoveEntry {
  id?: string;
  userId: string;
  type: 'affirmation' | 'gratitude' | 'selfCare' | 'reflection';
  content: string;
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// AI Chat History Interface
export interface AIChatMessage {
  id?: string;
  userId: string;
  message: string;
  isUser: boolean;
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// Wellness Stats Interface
export interface WellnessStats {
  id?: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  moodAverage: number;
  sleepHours: number;
  sleepQuality: number;
  meditationMinutes: number;
  breathingSessions: number;
  journalEntries: number;
  selfLoveActivities: number;
  createdAt: Timestamp;
}

// Database Service Class
export class DatabaseService {
  
  // User Profile Methods
  static async createUserProfile(userProfile: UserProfile): Promise<void> {
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, userProfile.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, COLLECTIONS.USERS, uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.USERS, uid);
      await updateDoc(docRef, {
        ...updates,
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Mood Entry Methods
  static async saveMoodEntry(moodEntry: Omit<MoodEntry, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MOOD_ENTRIES), {
        ...moodEntry,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving mood entry:', error);
      throw error;
    }
  }

  static async getMoodEntries(userId: string, limitCount: number = 30): Promise<MoodEntry[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.MOOD_ENTRIES),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MoodEntry[];
    } catch (error) {
      console.error('Error getting mood entries:', error);
      throw error;
    }
  }

  // Sleep Entry Methods
  static async saveSleepEntry(sleepEntry: Omit<SleepEntry, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SLEEP_ENTRIES), {
        ...sleepEntry,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving sleep entry:', error);
      throw error;
    }
  }

  static async getSleepEntries(userId: string, limitCount: number = 30): Promise<SleepEntry[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.SLEEP_ENTRIES),
        where('userId', '==', userId),
        orderBy('bedtime', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SleepEntry[];
    } catch (error) {
      console.error('Error getting sleep entries:', error);
      throw error;
    }
  }

  // Journal Entry Methods
  static async saveJournalEntry(journalEntry: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.JOURNAL_ENTRIES), {
        ...journalEntry,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  }

  static async getJournalEntries(userId: string, limitCount: number = 50): Promise<JournalEntry[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.JOURNAL_ENTRIES),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalEntry[];
    } catch (error) {
      console.error('Error getting journal entries:', error);
      throw error;
    }
  }

  static async updateJournalEntry(entryId: string, updates: Partial<JournalEntry>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.JOURNAL_ENTRIES, entryId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  }

  static async deleteJournalEntry(entryId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.JOURNAL_ENTRIES, entryId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }

  // Appointment Methods
  static async saveAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.APPOINTMENTS), {
        ...appointment,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving appointment:', error);
      throw error;
    }
  }

  static async getAppointments(userId: string, status?: string): Promise<Appointment[]> {
    try {
      let q = query(
        collection(db, COLLECTIONS.APPOINTMENTS),
        where('userId', '==', userId),
        orderBy('startTime', 'asc')
      );
      
      if (status) {
        q = query(q, where('status', '==', status));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
    } catch (error) {
      console.error('Error getting appointments:', error);
      throw error;
    }
  }

  static async updateAppointment(appointmentId: string, updates: Partial<Appointment>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.APPOINTMENTS, appointmentId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }

  static async deleteAppointment(appointmentId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.APPOINTMENTS, appointmentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  // Breathing Session Methods
  static async saveBreathingSession(session: Omit<BreathingSession, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.BREATHING_SESSIONS), {
        ...session,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving breathing session:', error);
      throw error;
    }
  }

  static async getBreathingSessions(userId: string, limitCount: number = 50): Promise<BreathingSession[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.BREATHING_SESSIONS),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BreathingSession[];
    } catch (error) {
      console.error('Error getting breathing sessions:', error);
      throw error;
    }
  }

  // Meditation Session Methods
  static async saveMeditationSession(session: Omit<MeditationSession, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MEDITATION_SESSIONS), {
        ...session,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving meditation session:', error);
      throw error;
    }
  }

  static async getMeditationSessions(userId: string, limitCount: number = 50): Promise<MeditationSession[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.MEDITATION_SESSIONS),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MeditationSession[];
    } catch (error) {
      console.error('Error getting meditation sessions:', error);
      throw error;
    }
  }

  // Self Love Entry Methods
  static async saveSelfLoveEntry(entry: Omit<SelfLoveEntry, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SELF_LOVE_ENTRIES), {
        ...entry,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving self love entry:', error);
      throw error;
    }
  }

  static async getSelfLoveEntries(userId: string, type?: string, limitCount: number = 50): Promise<SelfLoveEntry[]> {
    try {
      let q = query(
        collection(db, COLLECTIONS.SELF_LOVE_ENTRIES),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      if (type) {
        q = query(q, where('type', '==', type));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SelfLoveEntry[];
    } catch (error) {
      console.error('Error getting self love entries:', error);
      throw error;
    }
  }

  // AI Chat History Methods
  static async saveAIChatMessage(message: Omit<AIChatMessage, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.AI_CHAT_HISTORY), {
        ...message,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving AI chat message:', error);
      throw error;
    }
  }

  static async getAIChatHistory(userId: string, limitCount: number = 100): Promise<AIChatMessage[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.AI_CHAT_HISTORY),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AIChatMessage[];
    } catch (error) {
      console.error('Error getting AI chat history:', error);
      throw error;
    }
  }

  // Wellness Stats Methods
  static async saveWellnessStats(stats: Omit<WellnessStats, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.WELLNESS_STATS), {
        ...stats,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving wellness stats:', error);
      throw error;
    }
  }

  static async getWellnessStats(userId: string, startDate: string, endDate: string): Promise<WellnessStats[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.WELLNESS_STATS),
        where('userId', '==', userId),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WellnessStats[];
    } catch (error) {
      console.error('Error getting wellness stats:', error);
      throw error;
    }
  }

  // Analytics and Dashboard Methods
  static async getUserAnalytics(userId: string, days: number = 30): Promise<any> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const [moodEntries, sleepEntries, meditationSessions, breathingSessions] = await Promise.all([
        this.getMoodEntries(userId, days),
        this.getSleepEntries(userId, days),
        this.getMeditationSessions(userId, days),
        this.getBreathingSessions(userId, days)
      ]);

      return {
        moodEntries,
        sleepEntries,
        meditationSessions,
        breathingSessions,
        period: { startDate, endDate }
      };
    } catch (error) {
      console.error('Error getting user analytics:', error);
      throw error;
    }
  }

  // Data Export Methods
  static async exportUserData(userId: string): Promise<any> {
    try {
      const [
        profile,
        moodEntries,
        sleepEntries,
        journalEntries,
        appointments,
        breathingSessions,
        meditationSessions,
        selfLoveEntries,
        aiChatHistory,
        wellnessStats
      ] = await Promise.all([
        this.getUserProfile(userId),
        this.getMoodEntries(userId, 1000),
        this.getSleepEntries(userId, 1000),
        this.getJournalEntries(userId, 1000),
        this.getAppointments(userId),
        this.getBreathingSessions(userId, 1000),
        this.getMeditationSessions(userId, 1000),
        this.getSelfLoveEntries(userId, undefined, 1000),
        this.getAIChatHistory(userId, 1000),
        this.getWellnessStats(userId, '2020-01-01', new Date().toISOString().split('T')[0])
      ]);

      return {
        exportDate: new Date().toISOString(),
        profile,
        moodEntries,
        sleepEntries,
        journalEntries,
        appointments,
        breathingSessions,
        meditationSessions,
        selfLoveEntries,
        aiChatHistory,
        wellnessStats
      };
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw error;
    }
  }

  // Data Cleanup Methods
  static async deleteUserData(userId: string): Promise<void> {
    try {
      // Delete all user data from all collections
      const collections = Object.values(COLLECTIONS);
      
      for (const collectionName of collections) {
        if (collectionName === COLLECTIONS.USERS) {
          // Delete user profile
          const userDoc = doc(db, COLLECTIONS.USERS, userId);
          await deleteDoc(userDoc);
        } else {
          // Delete all documents in other collections for this user
          const q = query(
            collection(db, collectionName),
            where('userId', '==', userId)
          );
          
          const querySnapshot = await getDocs(q);
          const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
        }
      }
    } catch (error) {
      console.error('Error deleting user data:', error);
      throw error;
    }
  }
}

export default DatabaseService;
