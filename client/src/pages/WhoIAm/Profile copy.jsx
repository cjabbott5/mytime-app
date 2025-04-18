import { useState } from 'react';
import { useUserData } from '@/context/UserDataContext';
import { useTheme } from '@/context/ThemeContext';
import themeConfig from '@/config/themeConfig';
import infinityLoop from '@/assets/InfinityLoop-Large.png';
import EditSectionModal from '@/components/sections/profile/EditSectionModal';
import MoodSelector from '@/components/sections/profile/MoodSelector';
import SleepEditor from '@/components/sections/profile/SleepEditor';
import { FaUserCircle } from 'react-icons/fa'; // <-- flat person fallback
import {
  FaUserMd, FaPills, FaDog, FaMusic, FaDumbbell, FaPaintBrush, FaBrain, FaSun,
  FaBolt, FaClock, FaSeedling, FaTransgenderAlt, FaRegCalendarAlt, FaUserFriends, FaEdit, FaCamera
} from 'react-icons/fa';
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
        <h3 className="text-2xl font-bold text-accent">{title}</h3>
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
      <h3 className="text-xl font-bold text-accent mb-2">Medication Tracker</h3>
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
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${theme.bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0" />

      <img
        src={infinityLoop}
        alt="Infinity Loop"
        className="absolute top-1/2 left-1/2 w-[1900px] h-[1300px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10 opacity-70"
      />

      <div className="relative flex items-center justify-center gap-32 z-20 translate-y-1/2">

        {/* Left */}
        <div className="flex flex-col gap-6 w-[380px]">
          {renderPillList('Coping Tools', coping_tools, 'coping_tools')}
          {renderPillList('Support System', support_system, 'support_system')}
        </div>

        {/* Center Avatar */}
        <div className="flex flex-col items-center justify-center text-center gap-4 z-30 relative group">
  <div className="relative w-120 h-120 sm:w-120 sm:h-120 rounded-full overflow-hidden border-4 border-accent shadow-xl animate-pulse-glow bg-white/40">
    {avatar ? (
      <img
        src={avatar}
        alt="Profile Avatar"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="flex items-center justify-center w-full h-full text-accent">
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
  <p className="text-3xl sm:text-4xl font-bold text-accent">{name}</p>
  <p className="text-xl sm:text-2xl text-body">{pronouns}</p>
</div>

        {/* Right */}
        <div className="flex flex-col gap-6 w-[340px]">
          <div className="bg-white/90 rounded-xl p-6 shadow text-center border border-card">
            <h3 className="text-xl font-bold text-accent mb-2">Mood Tracker</h3>
            <MoodSelector />
          </div>
          <div className="bg-white/90 rounded-xl p-6 shadow text-center border border-card">
            <h3 className="text-xl font-bold text-accent mb-2">Sleep Tracker</h3>
            <SleepEditor />
          </div>
          {renderMedTracker()}
        </div>
      </div>

      {/* Modal */}
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
