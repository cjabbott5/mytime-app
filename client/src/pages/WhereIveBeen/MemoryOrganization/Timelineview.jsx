import { useEffect, useState } from 'react';
import { getAllMemories } from '@/utils/memoryutils';
import { Link } from 'react-router-dom';

export default function TimelineView() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetched = getAllMemories();
    const sorted = fetched.sort((a, b) => new Date(a.date) - new Date(b.date));
    setMemories(sorted);
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto text-pink-800">
      <h1 className="text-4xl font-bold text-pink-600 mb-4 text-center">Your Memory Timeline</h1>
      <p className="text-base sm:text-lg text-pink-900 mb-10 text-center">
        Here's a chronological view of your memories. You may begin to notice gaps, patterns, or shifts in emotion over time.
      </p>

      <div className="border-l-4 border-pink-300 pl-4 space-y-8">
        {memories.length === 0 && (
          <p className="text-pink-500 italic">No memories yet. Once you’ve added some, they’ll appear here.</p>
        )}

        {memories.map((mem) => (
          <div key={mem.id} className="relative pl-6">
            <div className="absolute left-0 top-1.5 w-3 h-3 bg-pink-500 rounded-full shadow-md" />
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-bold text-pink-700">{mem.title || 'Untitled Memory'}</h2>
              <p className="text-sm text-pink-500 mb-2">{mem.date || 'No date provided'}</p>
              {mem.mood?.length > 0 && (
                <p className="text-xs mb-1">
                  <strong>Mood:</strong> {mem.mood.join(', ')}
                </p>
              )}
              {mem.tags?.length > 0 && (
                <p className="text-xs mb-1">
                  <strong>Tags:</strong> {mem.tags.join(', ')}
                </p>
              )}
              <p className="text-sm text-gray-700 mb-2">
                {mem.description?.slice(0, 140) || 'No description provided.'}
              </p>
              <Link
                to={`/where-ive-been/memory-organization/memory/${mem.id}`}
                className="text-sm font-medium text-pink-600 underline hover:text-pink-700"
              >
                View Full Memory →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
