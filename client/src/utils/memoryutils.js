// utils/memoryutils.js

// 🔁 Get all memories from localStorage
export function getAllMemories() {
    try {
      const raw = localStorage.getItem('memories');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Error reading memories from localStorage:', error);
      return [];
    }
  }
  
  // 🔍 Get a single memory by its unique ID
  export function getMemoryById(id) {
    const memories = getAllMemories();
    return memories.find((mem) => mem.id === id);
  }
  
  // 💾 Save the full array of memories back to localStorage
  export function saveMemories(memories) {
    try {
      localStorage.setItem('memories', JSON.stringify(memories));
    } catch (error) {
      console.error('Error saving memories to localStorage:', error);
    }
  }
  
  // 🧼 Delete a memory by ID
  export function deleteMemoryById(id) {
    const memories = getAllMemories();
    const updated = memories.filter((mem) => mem.id !== id);
    saveMemories(updated);
  }
  
  // ✏️ Update a memory (by ID) with new data
  export function updateMemoryById(id, updatedData) {
    const memories = getAllMemories();
    const updatedMemories = memories.map((mem) =>
      mem.id === id ? { ...mem, ...updatedData } : mem
    );
    saveMemories(updatedMemories);
  }
  
  // ➕ Add a new memory
  export function addMemory(newMemory) {
    const memories = getAllMemories();
    const updated = [...memories, newMemory];
    saveMemories(updated);
  }
  