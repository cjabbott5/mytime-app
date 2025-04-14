import { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

// 🧠 Create the context
const MemoryContext = createContext();

// 🧠 Provider Component
const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // 🔄 Fetch memories on mount (filtered by userId)
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.warn('⚠️ No authenticated user. Aborting memory fetch.');
          return;
        }

        const q = query(
          collection(db, 'memories'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const memoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMemories(memoryList);
      } catch (error) {
        console.error('[🔥 Firestore] Failed to fetch memories:', error);
      }
    };

    fetchMemories();
  }, []);

  // ➕ Add memory (with userId)
  const addMemory = async (memory) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const memoryWithUID = {
        ...memory,
        userId: user.uid,
      };

      const docRef = await addDoc(collection(db, 'memories'), memoryWithUID);
      setMemories((prev) => [{ id: docRef.id, ...memoryWithUID }, ...prev]);
    } catch (error) {
      console.error('[🔥 Firestore] Failed to add memory:', error);
    }
  };

  // 🛠️ Update memory
  const updateMemory = async (id, updatedData) => {
    try {
      const memoryRef = doc(db, 'memories', id);
      await updateDoc(memoryRef, updatedData);
      setMemories((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updatedData } : m))
      );
    } catch (error) {
      console.error('[🔥 Firestore] Failed to update memory:', error);
    }
  };

  // ❌ Delete memory
  const deleteMemory = async (id) => {
    try {
      await deleteDoc(doc(db, 'memories', id));
      setMemories((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('[🔥 Firestore] Failed to delete memory:', error);
    }
  };

  // 🔍 Search memories
  const searchMemories = ({
    title = '',
    tags = [],
    mood = '',
    dateRange = null,
  }) => {
    return memories.filter((m) => {
      const matchTitle = m.title?.toLowerCase().includes(title.toLowerCase());
      const matchMood = !mood || m.mood === mood;
      const matchTags =
        tags.length === 0 || tags.every((t) => m.tags?.includes(t));
      const matchDate =
        !dateRange ||
        (new Date(m.date) >= new Date(dateRange[0]) &&
          new Date(m.date) <= new Date(dateRange[1]));

      return matchTitle && matchMood && matchTags && matchDate;
    });
  };

  return (
    <MemoryContext.Provider
      value={{
        memories,
        addMemory,
        updateMemory,
        deleteMemory,
        searchMemories,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

// 🧠 Hook to use memory context
const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};

// 🔓 Exports
export { MemoryProvider, useMemory };
