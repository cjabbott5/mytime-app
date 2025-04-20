import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, getCurrentUserId } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs
} from 'firebase/firestore';

const MemoryContext = createContext();
export const useMemory = () => useContext(MemoryContext);

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);

  // Load memories from Firestore on mount
  useEffect(() => {
    const fetchMemories = async () => {
      const uid = getCurrentUserId();
      if (!uid) return;

      try {
        const snapshot = await getDocs(collection(db, 'users', uid, 'memories'));
        const loaded = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMemories(loaded);
      } catch (err) {
        console.error('Error loading memories:', err);
      }
    };

    fetchMemories();
  }, []);

  // Add memory to Firestore
  const addMemory = async (newMemory) => {
    const uid = getCurrentUserId();
    if (!uid) return;

    try {
      const colRef = collection(db, 'users', uid, 'memories');
      const docRef = await addDoc(colRef, newMemory);
      setMemories((prev) => [{ ...newMemory, id: docRef.id }, ...prev]);
    } catch (err) {
      console.error('Error adding memory:', err);
    }
  };

  // Delete memory from Firestore
  const deleteMemory = async (id) => {
    const uid = getCurrentUserId();
    if (!uid) return;

    try {
      await deleteDoc(doc(db, 'users', uid, 'memories', id));
      setMemories((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Error deleting memory:', err);
    }
  };

  // Update memory in Firestore
  const updateMemory = async (updated) => {
    const uid = getCurrentUserId();
    if (!uid) return;
  
    try {
      const { id, ...data } = updated;
      const docRef = doc(db, 'users', uid, 'memories', id);
      await updateDoc(docRef, data);
  
      // 🛠 Add null checks before updating local state
      setMemories((prev) =>
        Array.isArray(prev)
          ? prev.map((m) => (m.id === id ? { ...data, id } : m))
          : []
      );
    } catch (err) {
      console.error('❌ Error updating memory:', err);
    }
  };
  
  
  

  return (
    <MemoryContext.Provider
      value={{ memories, addMemory, deleteMemory, updateMemory }}
    >
      {children}
    </MemoryContext.Provider>
  );
};
