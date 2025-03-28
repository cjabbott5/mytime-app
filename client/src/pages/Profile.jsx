import React, { useState } from 'react';
import { useUserData } from '../context/UserDataContext';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  FaPalette,
  FaPills,
  FaMusic,
  FaRunning,
  FaUserMd,
  FaDog,
  FaUserFriends,
} from 'react-icons/fa';

const iconMap = {
  'Art / Creativity': <FaPalette />,
  Medication: <FaPills />,
  Music: <FaMusic />,
  'Exercise / Movement': <FaRunning />,
  Therapist: <FaUserMd />,
  Friends: <FaUserFriends />,
  'Pet / animal': <FaDog />,
};

const Profile = () => {
  const { userData, updateUserData } = useUserData();
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const toggleEditMode = () => setEditMode(prev => !prev);

  const {
    name,
    pronouns,
    genderIdentity,
    culturalIdentity,
    spirituality,
    mentalHealth,
    copingTools,
    avatar,
    goals,
    frustrations,
    moods,
    supportSystem,
    currentReflection,
    personalitySpectrum = {},
    moodLog = [],
  } = userData;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `profile-pics/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('[UPLOAD ERROR]:', error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateUserData({ avatar: downloadURL });
          setUploading(false);
        });
      }
    );
  };

  const renderVerticalTags = (items = []) =>
    items.length > 0 ? (
      <div className="flex flex-col items-center gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="bg-white text-[#cc1f4a] text-sm px-4 py-1 rounded-full shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-400">None provided</p>
    );

  const PersonalitySlider = ({ labelLeft, labelRight, field }) => {
    const value = personalitySpectrum[field] ?? 50;
    const handleChange = (e) => {
      updateUserData({
        personalitySpectrum: {
          ...personalitySpectrum,
          [field]: parseInt(e.target.value),
        },
      });
    };

    return (
      <div>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="w-full accent-rose-500"
        />
      </div>
    );
  };

  const MoodTracker = () => {
    const moods = ['😊', '😐', '😢', '😠', '😴'];

    const handleSelect = (mood) => {
      setSelectedMood(mood);
      updateUserData({
        moodLog: [...(moodLog || []), { mood, date: new Date().toISOString() }],
      });
    };

    return (
      <div className="bg-rose-50 rounded-lg p-4 shadow-sm">
        <h3 className="text-md font-semibold text-rose-700 mb-2">Mood Tracker</h3>
        <div className="flex gap-2 text-2xl">
          {moods.map((m, i) => (
            <button
              key={i}
              className={`hover:scale-125 transition-transform duration-150 ${
                m === selectedMood ? 'opacity-100 scale-110' : 'opacity-50'
              }`}
              onClick={() => handleSelect(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderIconCards = (items = []) => (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center bg-white rounded-lg p-3 shadow-sm text-sm text-rose-700"
        >
          <div className="text-xl mb-1">{iconMap[item] || '🔖'}</div>
          <div className="text-center">{item}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 px-0">
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-300">
          <img
            src={avatar || 'https://www.gravatar.com/avatar/?d=mp&f=y'}
            alt="User avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </header>
  
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 px-6 pb-10">
  

        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-[300px] bg-rose-50 rounded-xl shadow-inner p-6 flex flex-col items-center text-center h-fit self-start">
          <div className="relative mb-4 transition-transform hover:scale-105">
            <div className="w-40 h-40 rounded-full overflow-hidden border-[5px] border-[#cc1f4a] bg-rose-100">
              <img
                key={avatar}
                src={avatar || 'https://www.gravatar.com/avatar/?d=mp&f=y'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <label
              className={`absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded cursor-pointer ${
                uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#cc1f4a]'
              }`}
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

          <h2 className="text-xl font-semibold text-rose-700">{name || 'Your Name'}</h2>
          <p className="text-sm text-gray-500">{pronouns || 'Your pronouns'}</p>

          {currentReflection && (
            <p className="italic text-rose-700 mt-3 text-sm max-w-[240px]">“{currentReflection}”</p>
          )}

          <div className="mt-6 space-y-6 w-full">
            <div>
              <h4 className="text-rose-600 font-semibold mb-1">My Identity</h4>
              {renderVerticalTags([...genderIdentity || [], ...culturalIdentity || [], ...spirituality || []])}
            </div>
            <div>
              <h4 className="text-rose-600 font-semibold mb-1">My Moods</h4>
              {renderVerticalTags(moods)}
            </div>
            <div>
              <h4 className="text-rose-600 font-semibold mb-1">Mental Health</h4>
              {renderVerticalTags(mentalHealth)}
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN PANEL */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Row 1: Goals & Support */}
          <div className="bg-rose-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold text-rose-700 mb-3">My Goals</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-rose-700">
              {(goals?.length > 0 ? goals : ['Explore identity', 'Organize memories', 'Feel peace']).map((goal, i) => (
                <li
                  key={i}
                  className="bg-white rounded-md py-2 px-4 text-center border border-rose-200 shadow-sm"
                >
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold text-rose-700 mb-3">Support System</h3>
            {renderIconCards(supportSystem)}
          </div>

          {/* Row 2: Coping & Frustrations */}
          <div className="bg-rose-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold text-rose-700 mb-3">Coping Tools</h3>
            {renderIconCards(copingTools)}
          </div>

          <div className="bg-rose-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-semibold text-rose-700 mb-3">Frustrations</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-rose-700">
              {(frustrations?.length > 0
                ? frustrations
                : ['Overwhelm with daily organization', 'Feeling disconnected from past identity']
              ).map((item, i) => (
                <li
                  key={i}
                  className="bg-white rounded-md py-2 px-4 text-center border border-rose-200 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Row 3 Left: Personality */}
          <div className="bg-rose-50 rounded-lg p-6 shadow-sm col-span-1 md:col-span-1">
            <h3 className="text-md font-semibold text-rose-700 mb-4">Personality Spectrum</h3>
            <div className="grid grid-cols-1 gap-4">
              <PersonalitySlider labelLeft="Introvert" labelRight="Extrovert" field="introvertExtrovert" />
              <PersonalitySlider labelLeft="Analytical" labelRight="Creative" field="analyticalCreative" />
              <PersonalitySlider labelLeft="Loyal" labelRight="Fickle" field="loyalFickle" />
              <PersonalitySlider labelLeft="Passive" labelRight="Active" field="passiveActive" />
              <PersonalitySlider labelLeft="Structured" labelRight="Flexible" field="structuredFlexible" />
              <PersonalitySlider labelLeft="Grounded" labelRight="Dreamy" field="groundedDreamy" />
            </div>
          </div>

          {/* Row 3 Right: Mood + Sleep stacked */}
          <div className="flex flex-col gap-6">
            <MoodTracker />

            <div className="bg-rose-50 rounded-lg p-4 shadow-sm">
              <h3 className="text-md font-semibold text-rose-700 mb-2">Sleep Tracker</h3>
              <div className="flex justify-between text-center text-sm text-gray-600">
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
};

export default Profile;
