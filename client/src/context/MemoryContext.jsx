import React, { createContext, useContext, useState, useEffect } from 'react';

const MemoryContext = createContext();

export const useMemory = () => useContext(MemoryContext);

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('mytime_memories');
    if (stored) {
      setMemories(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever memories change
  useEffect(() => {
    localStorage.setItem('mytime_memories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = (newMemory) => {
    const memoryWithId = {
      ...newMemory,
      id: Date.now().toString() // simple unique ID for now
    };
    setMemories((prev) => [memoryWithId, ...prev]);
  };

  const deleteMemory = (id) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMemory = (updated) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  return (
    <MemoryContext.Provider
      value={{ memories, addMemory, deleteMemory, updateMemory }}
    >
      {children}
    </MemoryContext.Provider>
  );
};
