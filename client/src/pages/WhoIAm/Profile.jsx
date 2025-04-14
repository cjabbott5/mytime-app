import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useUserData } from '@/context/UserDataContext';
import { storage } from '@/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import cloudBg from '@/assets/cloud-bg.jpg';
import IdentityCard from '@/components/sections/profile/IdentityCard';

export default function Profile() {
  const { userData, updateUserData } = useUserData();
  const [uploading, setUploading] = useState(false);

  const {
    name,
    pronouns,
    gender_identity = [],
    cultural_identity = [],
    spirituality = [],
    mental_health = [],
    avatar,
    top_goals = [],
    traits = [],
    support_system = [],
    coping_tools = [],
    lifestyle = [],
    currentReflection,
    moodLog = [],
  } = userData;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const user = getAuth().currentUser;
    if (!user) return console.error('No authenticated user');
    setUploading(true);
    const storageRef = ref(storage, `profile-pics/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, console.error, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      updateUserData({ avatar: downloadURL });
      setUploading(false);
    });
  };

  const renderPillList = (title, values) =>
    values?.length > 0 && (
      <div className="bg-white/80 rounded-xl p-4 shadow">
        <h3 className="text-md font-semibold text-pink-700 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {values.map((item, i) => (
            <span
              key={i}
              className="bg-pink-100 text-pink-700 px-3 py-1 text-xs rounded-full shadow"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );

  const MoodTracker = () => {
    const moods = ['😊', '😐', '😢', '😠', '😴'];
    const handleSelect = (mood) => {
      updateUserData({
        moodLog: [...(moodLog || []), { mood, date: new Date().toISOString() }],
      });
    };
    return (
      <div className="bg-white/80 rounded-lg p-4 shadow">
        <h3 className="text-md font-semibold text-pink-700 mb-2">Mood Tracker</h3>
        <div className="flex gap-2 text-2xl justify-center">
          {moods.map((m, i) => (
            <button
              key={i}
              className="hover:scale-125 transition-transform duration-150"
              onClick={() => handleSelect(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-6 pb-12 pt-4"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-[320px] bg-white/80 rounded-xl shadow-inner p-6 flex flex-col items-center text-center">
          <div className="relative mb-4 hover:scale-105 transition">
            <div className="w-56 h-56 rounded-full overflow-hidden border-[6px] border-pink-600">
              <img
                src={avatar || 'https://www.gravatar.com/avatar/?d=mp&f=y'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <label
              className={`absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded cursor-pointer ${uploading ? 'bg-gray-400' : 'bg-pink-600'}`}
            >
              {uploading ? 'Uploading…' : 'Edit'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>
          <h2 className="text-xl font-semibold text-pink-700">{name || 'Your Name'}</h2>
          <p className="text-sm text-gray-500">{pronouns || 'Your pronouns'}</p>
          {currentReflection && (
            <p className="italic text-pink-700 mt-3 text-sm max-w-[240px]">“{currentReflection}”</p>
          )}
          <div className="mt-6 grid grid-cols-2 gap-2 w-full">
            {[...gender_identity, ...cultural_identity, ...spirituality].map((tag, i) => (
              <span
                key={i}
                className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full shadow text-center"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {mental_health.map((tag, i) => (
              <span
                key={i}
                className="bg-white text-pink-600 border border-pink-200 text-xs px-3 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>

        {/* RIGHT SIDE */}
        <section className="flex-1 space-y-8">
          {/* Horizontal Core Traits + Mood */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/80 p-6 rounded-xl shadow">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-mauve-700 mb-2">🌟 Core Traits</h3>
              <div className="flex gap-2 flex-wrap">
                {traits.map((t, i) => (
                  <span
                    key={i}
                    className="bg-mauve-100 text-mauve-800 text-sm px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-mauve-700 mb-2">🌈 Current Mood</h3>
              {moodLog.length > 0 ? (
                <p className="text-pink-800 text-sm">{moodLog.at(-1).mood}</p>
              ) : (
                <p className="text-pink-400 italic text-sm">No mood data yet. Log your emotional weather!</p>
              )}
            </div>
          </div>

          {/* 2x2 Grid for Info Sections */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderPillList('🎯 My Goals', top_goals)}
            {renderPillList('🛠️ Coping Tools', coping_tools)}
            {renderPillList('💞 Support System', support_system)}
            {renderPillList('🌀 Lifestyle', lifestyle)}
          </section>

          {/* Mood + Sleep Trackers */}
          <div className="flex flex-col lg:flex-row gap-6">
            <MoodTracker />
            <div className="bg-white/80 rounded-lg p-4 shadow-sm flex-1">
              <h3 className="text-md font-semibold text-pink-700 mb-2">🛌 Sleep Tracker</h3>
              <div className="flex justify-between text-sm text-gray-600">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{d}</span>
                    <span className="bg-white text-xs rounded-full px-2 py-1 shadow-sm">7 hrs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
