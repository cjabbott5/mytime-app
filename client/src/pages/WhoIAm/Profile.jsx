import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useUserData } from '@/context/UserDataContext';
import { storage } from '@/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import cloudBg from '@/assets/cloud-bg.jpg';
import EditSectionModal from '../../components/sections/profile/EditSectionModal';
import MoodTrendChart from '../../components/sections/profile/MoodTrendChart';
import SleepBarChart from '../../components/sections/profile/SleepBarChart';
import MoodSelector from '../../components/sections/profile/MoodSelector';
import SleepEditor from '../../components/sections/profile/SleepEditor';
import {
  FaUserMd, FaPills, FaDog, FaMusic, FaDumbbell, FaPaintBrush, FaBrain, FaSun,
  FaBolt, FaClock, FaSeedling, FaTransgenderAlt, FaRegCalendarAlt, FaUserFriends, FaEdit
} from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';

const safeArray = (val) => (Array.isArray(val) ? val : []);

export default function Profile() {
  const { userData, updateUserData } = useUserData();
  const [uploading, setUploading] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [reflection, setReflection] = useState(userData.weeklyReflection || '');

  const {
    name = '',
    pronouns = '',
    avatar = '',
    top_goals = [],
    traits = [],
    support_system = [],
    coping_tools = [],
    lifestyle = [],
    moodLog = [],
    sleepLog = [],
    weeklyReflection = '',
  } = userData;

  const gender_identity = safeArray(userData.gender_identity);
  const cultural_identity = safeArray(userData.cultural_identity);
  const spirituality = safeArray(userData.spirituality);
  const mental_health = safeArray(userData.mental_health);

  const iconMap = {
    Therapist: <FaUserMd />, Psychiatrist: <FaUserMd />, "Pet / animal": <FaDog />,
    Friends: <FaUserFriends />, Medication: <FaPills />, Music: <FaMusic />,
    "Exercise / Movement": <FaDumbbell />, "Art / Creativity": <FaPaintBrush />,
    Meditation: <GiMeditation />, "Increase memory clarity": <FaBrain />,
    "Organize life story": <FaRegCalendarAlt />, "Feel grounded in identity": <FaSeedling />,
    "Explore gender identity": <FaTransgenderAlt />, "Early riser": <FaSun />,
    Spontaneous: <FaBolt />, "Busy schedule": <FaClock />
  };

  const TOTAL_SECTIONS = 5;
  const filledCount = [top_goals, coping_tools, support_system, lifestyle, traits].filter(arr => arr.length).length;
  const completionPercent = Math.round((filledCount / TOTAL_SECTIONS) * 100);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const user = getAuth().currentUser;
    if (!user) return;
    setUploading(true);
    const storageRef = ref(storage, `profile-pics/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, console.error, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      updateUserData({ avatar: downloadURL });
      setUploading(false);
    });
  };

  const handleReflectionSave = () => {
    updateUserData({ weeklyReflection: reflection });
  };

  const renderPillList = (title, values, sectionKey) => (
    <div className="bg-white/80 rounded-xl p-8 shadow relative">
      <h3 className="text-3xl font-bold text-pink-700 mb-6">{title}</h3>
      <button
        onClick={() => setEditModal({ title, sectionKey, initialValues: values })}
        className="absolute top-6 right-6 text-pink-500 hover:text-pink-700 text-xl"
      >
        <FaEdit />
      </button>
      <div className="flex flex-wrap gap-4">
        {values.slice(0, 3).map((item, i) => (
          <span key={i} className="bg-pink-100 text-pink-700 px-4 py-3 text-base rounded-2xl shadow flex flex-col items-center gap-1 w-28 h-28 text-center justify-center">
            <span className="text-3xl">{iconMap[item]}</span>
            <span className="text-base mt-1">{item}</span>
          </span>
        ))}
        {values.length > 3 && (
          <span className="text-base text-pink-600">{`+${values.length - 3} more`}</span>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center px-6 pb-16 pt-4 text-lg"
      style={{ backgroundImage: `url(${cloudBg})` }}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-[320px] bg-white/80 rounded-xl shadow-inner p-8 flex flex-col items-center text-center">
          <div className="relative mb-4 hover:scale-105 transition">
            <div className="w-56 h-56 rounded-full overflow-hidden border-[6px] border-pink-600">
              <img
                src={avatar || 'https://www.gravatar.com/avatar/?d=mp&f=y'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <label
              className={`absolute bottom-2 right-2 text-white text-sm px-3 py-1 rounded cursor-pointer ${
                uploading ? 'bg-gray-400' : 'bg-pink-600'
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

          <h2 className="text-2xl font-bold text-pink-700">{name || 'Your Name'}</h2>
          <p className="text-lg text-gray-600">{pronouns || 'Your pronouns'}</p>

          <textarea
            className="mt-4 w-full text-base text-pink-700 bg-white rounded-md p-3 shadow resize-none"
            placeholder="This week I..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
          <button
            onClick={handleReflectionSave}
            className="bg-pink-600 text-white mt-4 px-5 py-2 rounded-lg text-base hover:bg-pink-700"
          >
            Save Reflection
          </button>

          <div className="mt-6 flex flex-col gap-2 w-full">
            {[...gender_identity, ...cultural_identity, ...spirituality].map((tag, i) => (
              <span
                key={i}
                className="bg-pink-100 text-pink-700 text-base px-4 py-2 rounded-full shadow text-center font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 w-full">
            {mental_health.map((tag, i) => (
              <span
                key={i}
                className="bg-white text-pink-600 border border-pink-200 text-base px-4 py-2 rounded-full shadow-sm text-center font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>

        {/* Main Section */}
        <section className="flex-1 space-y-10">
          <div className="w-full bg-white/80 rounded-xl p-8 shadow">
            <p className="text-xl font-semibold text-pink-700 mb-2">Profile {completionPercent}% Complete</p>
            <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden">
              <div className="h-full bg-pink-600 transition-all" style={{ width: `${completionPercent}%` }}></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/80 p-8 rounded-xl shadow">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-mauve-700 mb-3">Core Traits</h3>
              <div className="flex gap-3 flex-wrap">
                {traits.length ? traits.map((t, i) => (
                  <span key={i} className="bg-mauve-100 text-mauve-800 text-base px-3 py-2 rounded-full">{t}</span>
                )) : <p className="text-lg italic text-mauve-500">No traits available</p>}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-mauve-700 mb-3">Current Mood</h3>
              {moodLog.length ? (
                <p className="text-pink-800 text-lg">{moodLog.at(-1).mood}</p>
              ) : (
                <p className="text-pink-400 italic text-lg">No mood data yet. Log your emotional weather!</p>
              )}
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderPillList('My Goals', top_goals, 'top_goals')}
            {renderPillList('Coping Tools', coping_tools, 'coping_tools')}
            {renderPillList('Support System', support_system, 'support_system')}
            {renderPillList('Lifestyle', lifestyle, 'lifestyle')}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-lg p-8 shadow space-y-6">
              <h3 className="text-3xl font-semibold text-pink-700">Mood Tracker</h3>
              <MoodSelector />
              <MoodTrendChart moodLog={moodLog} />
            </div>
            <div className="bg-white/80 rounded-lg p-8 shadow space-y-6">
              <h3 className="text-3xl font-semibold text-pink-700">Sleep Tracker</h3>
              <SleepEditor />
              <SleepBarChart sleepLog={sleepLog} />
            </div>
          </div>
        </section>
      </div>

      {editModal && (
        <EditSectionModal
          title={editModal.title}
          sectionKey={editModal.sectionKey}
          initialValues={editModal.initialValues}
          onSave={(newValues) => {
            updateUserData({ [editModal.sectionKey]: newValues });
            setEditModal(null);
          }}
        />
      )}
    </div>
  );
}
