import React from 'react';
import { useUserData } from '../context/UserDataContext';

const ProfileCard = () => {
  const { userData } = useUserData() || {}; // fallback to prevent crash
  const profile = userData?.basic_info || {}; // ✅ safe access

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-2 border border-rose-100">
      <h2 className="text-xl font-semibold text-rose-500 mb-2">Your Profile</h2>

      <div className="space-y-1 text-gray-700 text-sm">
        <p><span className="font-medium">Name:</span> {profile.name || <em className="text-gray-400">Not provided</em>}</p>
        <p><span className="font-medium">Age:</span> {profile.age || <em className="text-gray-400">Not provided</em>}</p>
        <p><span className="font-medium">Pronouns:</span> {profile.pronouns || <em className="text-gray-400">Not provided</em>}</p>
        <p><span className="font-medium">Gender Identity:</span> {profile.gender_identity || <em className="text-gray-400">Not provided</em>}</p>
        <p><span className="font-medium">Cultural Identity:</span> {profile.cultural_identity || <em className="text-gray-400">Not provided</em>}</p>
        <p><span className="font-medium">Spirituality:</span> {profile.spirituality || <em className="text-gray-400">Not provided</em>}</p>
        <p><span className="font-medium">Living Situation:</span> {profile.living_situation || <em className="text-gray-400">Not provided</em>}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
