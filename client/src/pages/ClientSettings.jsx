import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, signOut, deleteUser } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ClientSettings = () => {
  const { user, authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    profilePic: '',
    providerId: null,
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: 'light',
    fontSize: 'medium',
  });

  const [security, setSecurity] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dataSharing: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            displayName: data.displayName || '',
            email: data.email || '',
            profilePic: data.profilePic || '',
            providerId: data.providerId || null,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (displaySettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [displaySettings.theme]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('User is not authenticated.');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profile.displayName,
        profilePic: profile.profilePic,
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile.');
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) {
      setMessage('No file selected or user not authenticated.');
      return;
    }
    try {
      const storageRef = ref(storage, `profilePics/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', user.uid), {
        profilePic: downloadURL,
      });
      setProfile((prev) => ({ ...prev, profilePic: downloadURL }));
      setMessage('Profile picture updated.');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setMessage('Error uploading profile picture.');
    }
  };

  const handleDisplaySettingsUpdate = (e) => {
    e.preventDefault();
    setMessage('Display settings updated.');
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('User is not authenticated.');
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      await updatePassword(user, security.newPassword);
      setMessage('Password updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Error updating password.');
    }
  };

  const handleProviderLink = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('User is not authenticated.');
      return;
    }
    const providerCode = e.target.providerCode.value;
    if (!providerCode) {
      setMessage('Please enter a valid provider code.');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        providerId: providerCode,
      });
      setProfile((prev) => ({ ...prev, providerId: providerCode }));
      setMessage('Provider linked successfully.');
    } catch (error) {
      console.error('Error linking provider:', error);
      setMessage('Error linking provider.');
    }
  };

  const handleNotificationsUpdate = (e) => {
    e.preventDefault();
    setMessage('Notification and privacy settings updated.');
  };

  const handleDeleteAccount = async () => {
    if (!user) {
      setMessage('User is not authenticated.');
      return;
    }
    try {
      await deleteUser(user);
      setMessage('Account deleted.');
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('Error deleting account.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      setMessage('Error signing out.');
    }
  };

  if (authLoading || loading) return <div>Loading...</div>;

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[displaySettings.fontSize] || 'text-base';

  return (
    <div className={`p-8 max-w-4xl mx-auto ${fontSizeClass}`}>
      <h1 className="text-3xl font-bold mb-4">Client Settings</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* ...rest of component unchanged... */}
    </div>
  );
};

export default ClientSettings;
