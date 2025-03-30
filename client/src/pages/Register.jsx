import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../firebase'; // Ensure your firebase config exports "db"
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();
  // Added isProvider flag to the form state
  const [form, setForm] = useState({ email: '', password: '', isProvider: false });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Updated to include a console.log to verify checkbox changes
  const handleCheckboxChange = (e) => {
    setForm((prev) => {
      const updated = { ...prev, isProvider: e.target.checked };
      console.log('isProvider state:', updated.isProvider);
      return updated;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Log the entire form state to verify before registration
    console.log('Form state at register:', form);
    try {
      // Create user with email and password via Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Build the user data object
      // If the user is a provider, we won't need a providerId, but for a client we'll set it to null
      const userData = {
        email: form.email,
        role: form.isProvider ? 'provider' : 'user'
      };
      if (!form.isProvider) {
        userData.providerId = null; // For clients, providerId is null until linked
      }

      // Save additional user data (including role and providerId for clients) to Firestore
      await setDoc(doc(db, 'users', user.uid), userData);
      navigate('/onboarding'); // Let onAuthStateChanged handle user state
    } catch (err) {
      console.error('❌ Register error:', err.message);
      alert('Account creation failed: ' + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      // For Google sign in, defaulting to a regular user role with providerId set to null
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
        providerId: null
      });
      navigate('/onboarding'); // Redirect after successful Google sign in
    } catch (error) {
      console.error('❌ Google sign in error:', error.message);
      alert('Google sign in failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-rose-600">Create Account</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        {/* Checkbox to register as a provider */}
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isProvider"
            checked={form.isProvider}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Register as Provider
        </label>
        <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Sign in with Google
        </button>
        <p className="text-sm text-center mt-2 text-gray-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-rose-600 underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
