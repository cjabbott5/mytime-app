import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 🔄 replace with actual memory fetching logic (localStorage, Firestore, etc.)
import { getMemoryById } from '@/utils/memoryUtils'; 

export default function MemoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetched = getMemoryById(id); // 🔧 replace this with real data logic
    if (fetched) {
      setMemory(fetched);
    } else {
      navigate('/where-ive-been/memory-organization/memory-center');
    }
  }, [id, navigate]);

  if (!memory) {
    return <p className="text-center text-pink-600 mt-20">Loading memory...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-pink-800">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">{memory.title || 'Untitled Memory'}</h1>

      <div className="text-sm text-pink-500 mb-2">
        <p><strong>Date:</strong> {memory.date || 'Not specified'}</p>
        <p><strong>Mood:</strong> {memory.mood?.join(', ') || 'None'}</p>
        <p><strong>Tags:</strong> {memory.tags?.join(', ') || 'None'}</p>
      </div>

      <div className="prose prose-pink max-w-none bg-white rounded-xl p-6 shadow-md mb-6">
        <p>{memory.description || 'No description provided.'}</p>
      </div>

      {memory.image && (
        <div className="mb-6">
          <img
            src={memory.image}
            alt="Memory visual"
            className="rounded-lg shadow max-h-96 object-cover mx-auto"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-medium text-pink-700"
        >
          ← Back
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit-memory/${id}`)} // ⚠️ implement this route if editing is supported
            className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(id, navigate)}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ⚠️ Stub: Replace with your actual delete logic
function handleDelete(id, navigate) {
  const confirmed = window.confirm('Are you sure you want to delete this memory?');
  if (confirmed) {
    // Replace with real deletion logic (localStorage, Firestore, etc.)
    console.log('🗑 deleting memory:', id);
    navigate('/where-ive-been/memory-organization/memory-center');
  }
}
