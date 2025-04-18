import { useState } from 'react';
import { useUserData } from '@/context/UserDataContext';
import { useTheme } from '@/context/ThemeContext';
import themeConfig from '@/config/themeConfig';
import infinityLoop from '@/assets/InfinityLoop-Large.png';
import EditSectionModal from '@/components/sections/profile/EditSectionModal';
import MoodSelector from '@/components/sections/profile/MoodSelector';
import SleepEditor from '@/components/sections/profile/SleepEditor';
import { FaUserCircle, FaUserMd, FaPills, FaDog, FaMusic, FaDumbbell, FaPaintBrush, FaBrain, FaSun, FaBolt, FaClock, FaSeedling, FaTransgenderAlt, FaRegCalendarAlt, FaUserFriends, FaEdit, FaCamera } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';

const safeArray = (val) => (Array.isArray(val) ? val : []);

export default function Profile() {
  const { userData, updateUserData } = useUserData();
  const { selectedTheme } = useTheme();
  const theme = themeConfig[selectedTheme];
  const [editModal, setEditModal] = useState(null);
  const [medsTaken, setMedsTaken] = useState(Array(7).fill(false));

  const {
    name = '',
    pronouns = '',
    avatar = '',
    support_system = [],
    coping_tools = [],
    gender_identity = [],
    cultural_identity = [],
    spirituality = [],
    mental_health = [],
    current_reflection = '',
    top_goals = [],
    traits = []
  } = userData;

  const iconMap = {
    Therapist: <FaUserMd />, Psychiatrist: <FaUserMd />, "Pet / animal": <FaDog />,
    Friends: <FaUserFriends />, Medication: <FaPills />, Music: <FaMusic />,
    "Exercise / Movement": <FaDumbbell />, "Art / Creativity": <FaPaintBrush />,
    Meditation: <GiMeditation />, "Increase memory clarity": <FaBrain />,
    "Organize life story": <FaRegCalendarAlt />, "Feel grounded in identity": <FaSeedling />,
    "Explore gender identity": <FaTransgenderAlt />, "Early riser": <FaSun />,
    Spontaneous: <FaBolt />, "Busy schedule": <FaClock />
  };

  const renderPillList = (title, values, sectionKey) => (
    <div className="bg-white/90 rounded-xl p-6 shadow text-center border border-card w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-accent-dark">{title}</h3>
        <button
          onClick={() => setEditModal({ title, sectionKey, initialValues: values })}
          className="text-accent hover:text-body text-2xl"
        >
          <FaEdit />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {values.slice(0, 3).map((item, i) => (
          <span key={i} className="bg-card text-body px-4 py-3 text-lg rounded-full shadow flex items-center gap-2">
            <span className="text-2xl">{iconMap[item]}</span>
            {item}
          </span>
        ))}
        {values.length > 3 && (
          <span className="text-lg text-accent">+{values.length - 3} more</span>
        )}
      </div>
    </div>
  );

  const renderMedTracker = () => (
    <div className="bg-white/90 rounded-xl p-6 shadow text-center border border-card">
      <h3 className="text-xl font-bold text-accent-dark mb-2">Medication Tracker</h3>
      <div className="flex justify-center gap-3">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <button
            key={i}
            onClick={() => setMedsTaken(medsTaken.map((val, idx) => idx === i ? !val : val))}
            className={`w-8 h-8 text-sm rounded-full font-semibold ${
              medsTaken[i] ? 'bg-accent text-white' : 'bg-card text-body'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${theme.bgImage})` }}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0" />

      <img src={infinityLoop} alt="Infinity Loop" className="absolute top-1/2 left-1/2 w-[1900px] h-[1300px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10 opacity-70" />

     {/* 🧭 Breadcrumb - move to top left corner */}
<p className="absolute top-4 left-4 text-sm text-loop-accent italic z-30">
Dashboard &gt; Who I Am
</p>

{/* 👋 Welcome Message - centered, with more spacing */}
<div className="relative z-30 flex flex-col items-center mt-48">
  <p className="text-6xl font-semibold text-loop-dark mb-4">
    Welcome back, {name?.split(' ')[0] || 'friend'}. Here’s your snapshot today.
  </p>
</div>


      <div className="relative flex items-center justify-center gap-32 z-20 mt-[400px] -translate-x-12">
        <div className="grid grid-cols-2 gap-6 w-[700px] -translate-y-2 -translate-x-24">
          {renderPillList('Coping Tools', coping_tools, 'coping_tools')}
          {renderPillList('Support System', support_system, 'support_system')}
          {renderPillList('Mental Health', mental_health, 'mental_health')}
          {renderPillList('Goals', top_goals, 'top_goals')}
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-4 z-30 relative group -translate-x-32">
          <div className="relative w-120 h-120 sm:w-120 sm:h-120 rounded-full overflow-hidden border-4 border-accent shadow-xl animate-pulse-glow bg-white/40">
            {avatar ? (
              <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-accent-dark">
                <FaUserCircle className="text-[80px] sm:text-[110px]" />
              </div>
            )}
            <label className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateUserData({ avatar: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
              <FaCamera className="text-2xl" />
            </label>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-accent-dark">{name}</p>
          <p className="text-xl sm:text-2xl text-body">{pronouns}</p>
          {current_reflection && <p className="italic text-3xl font-bold text-accent-dark mt-2 max-w-[300px]">“{current_reflection}”</p>}
        </div>

        <div className="flex flex-col gap-6 w-[340px] -translate-y-2">
          <div className="bg-white/90 rounded-xl p-6 shadow text-center border border-card">
            <h3 className="text-xl font-bold text-accent-dark mb-2">Mood Tracker</h3>
            <MoodSelector />
          </div>
          <div className="bg-white/90 rounded-xl p-6 shadow text-center border border-card">
            <h3 className="text-xl font-bold text-accent-dark mb-2">Sleep Tracker</h3>
            <SleepEditor />
          </div>
          {renderMedTracker()}
        </div>
      </div>

      <div className="relative z-30 mt-24 mb-12 px-8 w-full max-w-6xl mx-auto">
  <div className="bg-white rounded-2xl p-8 border border-loop-accent shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold text-loop-primary">Identity</h3>
      <button
        onClick={() =>
          setEditModal({
            title: 'Identity',
            sectionKey: 'identity',
            initialValues: [...safeArray(gender_identity), ...safeArray(cultural_identity), ...safeArray(spirituality)],
          })
        }
        className="text-loop-dark hover:text-body text-2xl"
      >
        <FaEdit />
      </button>
    </div>

    {/* Center pills */}
    <div className="flex flex-wrap justify-center gap-3">
      {[...safeArray(gender_identity), ...safeArray(cultural_identity), ...safeArray(spirituality)].map((item, i) => (
        <span
          key={i}
          className="bg-loop-highlight/60 text-body px-4 py-2 rounded-full flex items-center gap-2 text-lg shadow-inner border border-cloud-overlay"
        >
          <span className="text-xl">{iconMap[item]}</span>
          {item}
        </span>
      ))}
    </div>
  </div>
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
