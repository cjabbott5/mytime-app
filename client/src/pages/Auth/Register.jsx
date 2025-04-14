import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../../config/firebase';  // Correct path
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', isProvider: false });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    setForm((prev) => ({ ...prev, isProvider: e.target.checked }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      const userData = { email: form.email, role: form.isProvider ? 'provider' : 'user' };

      await setDoc(doc(db, 'users', user.uid), userData);
      navigate('/onboarding'); // Adjust the redirect path as needed
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
      await setDoc(doc(db, 'users', user.uid), { email: user.email, role: 'user' });
      navigate('/onboarding'); // Redirect after Google sign-in
    } catch (error) {
      console.error('❌ Google sign-in error:', error.message);
      alert('Google sign-in failed: ' + error.message);
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
            onClick={() => navigate('/auth/login')}
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
