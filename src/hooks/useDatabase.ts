import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DatabaseService, { 
  UserProfile, 
  MoodEntry, 
  SleepEntry, 
  JournalEntry, 
  Appointment, 
  BreathingSession, 
  MeditationSession, 
  SelfLoveEntry, 
  AIChatMessage, 
  WellnessStats 
} from '../services/database';

export const useDatabase = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // Helper function to get user ID
  const getUserId = useCallback(() => {
    if (!currentUser) throw new Error('User not authenticated');
    return currentUser.id;
  }, [currentUser]);

  // User Profile Operations
  const createUserProfile = useCallback(async (profile: Omit<UserProfile, 'uid' | 'createdAt' | 'lastLoginAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      await DatabaseService.createUserProfile({
        ...profile,
        uid: getUserId(),
        createdAt: new Date() as any,
        lastLoginAt: new Date() as any
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const getUserProfile = useCallback(async () => {
    if (!currentUser) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getUserProfile(currentUser.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get user profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);
    
    try {
      await DatabaseService.updateUserProfile(getUserId(), updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Mood Operations
  const saveMoodEntry = useCallback(async (moodEntry: Omit<MoodEntry, 'id' | 'userId' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.saveMoodEntry({
        ...moodEntry,
        userId: getUserId(),
        timestamp: new Date() as any
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save mood entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const getMoodEntries = useCallback(async (limitCount: number = 30) => {
    if (!currentUser) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getMoodEntries(currentUser.id, limitCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get mood entries');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Sleep Operations
  const saveSleepEntry = useCallback(async (sleepEntry: Omit<SleepEntry, 'id' | 'userId' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.saveSleepEntry({
        ...sleepEntry,
        userId: getUserId()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save sleep entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const getSleepEntries = useCallback(async (limitCount: number = 30) => {
    if (!currentUser) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getSleepEntries(currentUser.id, limitCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get sleep entries');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Journal Operations
  const saveJournalEntry = useCallback(async (journalEntry: Omit<JournalEntry, 'id' | 'userId' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.saveJournalEntry({
        ...journalEntry,
        userId: getUserId(),
        timestamp: new Date() as any
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save journal entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const getJournalEntries = useCallback(async (limitCount: number = 50) => {
    if (!currentUser) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getJournalEntries(currentUser.id, limitCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get journal entries');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const updateJournalEntry = useCallback(async (entryId: string, updates: Partial<JournalEntry>) => {
    setLoading(true);
    setError(null);
    
    try {
      await DatabaseService.updateJournalEntry(entryId, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update journal entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJournalEntry = useCallback(async (entryId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await DatabaseService.deleteJournalEntry(entryId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete journal entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Breathing Session Operations
  const saveBreathingSession = useCallback(async (session: Omit<BreathingSession, 'id' | 'userId' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.saveBreathingSession({
        ...session,
        userId: getUserId(),
        timestamp: new Date() as any
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save breathing session');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const getBreathingSessions = useCallback(async (limitCount: number = 50) => {
    if (!currentUser) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getBreathingSessions(currentUser.id, limitCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get breathing sessions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Meditation Session Operations
  const saveMeditationSession = useCallback(async (session: Omit<MeditationSession, 'id' | 'userId' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.saveMeditationSession({
        ...session,
        userId: getUserId(),
        timestamp: new Date() as any
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save meditation session');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const getMeditationSessions = useCallback(async (limitCount: number = 50) => {
    if (!currentUser) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getMeditationSessions(currentUser.id, limitCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get meditation sessions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Analytics Operations
  const getUserAnalytics = useCallback(async (days: number = 30) => {
    if (!currentUser) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      return await DatabaseService.getUserAnalytics(currentUser.id, days);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get user analytics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  return {
    // State
    loading,
    error,
    clearError,
    
    // User Profile
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    
    // Mood
    saveMoodEntry,
    getMoodEntries,
    
    // Sleep
    saveSleepEntry,
    getSleepEntries,
    
    // Journal
    saveJournalEntry,
    getJournalEntries,
    updateJournalEntry,
    deleteJournalEntry,
    
    // Breathing
    saveBreathingSession,
    getBreathingSessions,
    
    // Meditation
    saveMeditationSession,
    getMeditationSessions,
    
    // Analytics
    getUserAnalytics
  };
};
