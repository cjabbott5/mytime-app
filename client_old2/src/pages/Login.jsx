import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Let onAuthStateChanged in App.js handle the redirect
    } catch (err) {
      console.error('❌ Email login error:', err.code, err.message);
      switch (err.code) {
        case 'auth/user-not-found':
          alert('No account found with this email.');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password. Try again.');
          break;
        case 'auth/invalid-email':
          alert('Please enter a valid email address.');
          break;
        default:
          alert('Login failed. Please check your credentials.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // Let onAuthStateChanged in App.js handle the redirect
    } catch (err) {
      console.error('❌ Google Sign-In error:', err.message);
      alert('Google login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-rose-600 mb-4">Log In</h2>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold w-full py-2 rounded-md"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm text-gray-500">
            <span className="bg-white px-2">or</span>
          </div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="bg-white border border-gray-300 text-gray-800 font-medium w-full py-2 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-sm mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-rose-600 underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
