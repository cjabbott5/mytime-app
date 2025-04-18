import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMemoryById } from '@/utils/memoryUtils'; // Replace with actual logic

export default function MemoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const fetched = getMemoryById(id); // 🔧 Replace this with real logic
    if (fetched) {
      setMemory(fetched);
    } else {
      navigate('/where-ive-been/memory-organization/memory-center');
    }
  }, [id, navigate]);

  if (!memory) {
    return <p className="text-center text-loop-accent text-xl mt-20">Loading memory...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-loop-dark">
      <h1 className="text-4xl font-extrabold text-loop-primary mb-6">{memory.title || 'Untitled Memory'}</h1>

      <div className="text-lg mb-4 space-y-1">
        <p><span className="font-semibold text-loop-dark/80">📅 Date:</span> {memory.date || 'Not specified'}</p>
        <p><span className="font-semibold text-loop-dark/80">💬 Mood:</span> {memory.mood?.join(', ') || 'None'}</p>
        <p><span className="font-semibold text-loop-dark/80">🏷️ Tags:</span> {memory.tags?.join(', ') || 'None'}</p>
      </div>

      <div className="prose prose-lg max-w-none bg-white/90 backdrop-blur-md rounded-xl p-6 shadow mb-8">
        <p>{memory.description || 'No description provided.'}</p>
      </div>

      {memory.image && (
        <div className="mb-8">
          <img
            src={memory.image}
            alt="Memory visual"
            className="rounded-lg shadow-lg max-h-[28rem] object-cover mx-auto"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-base font-medium text-loop-primary"
        >
          ← Back
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit-memory/${id}`)} // ⚠️ implement this route
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(id, navigate)}
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-base font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// 🔄 Replace with your actual delete logic
function handleDelete(id, navigate) {
  const confirmed = window.confirm('Are you sure you want to delete this memory?');
  if (confirmed) {
    console.log('🗑 deleting memory:', id); // Replace with Firestore/localStorage call
    navigate('/where-ive-been/memory-organization/memory-center');
  }
}
