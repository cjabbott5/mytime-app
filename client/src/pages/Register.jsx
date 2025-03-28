import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate('/onboarding'); // Let onAuthStateChanged handle user state
    } catch (err) {
      console.error('❌ Register error:', err.message);
      alert('Account creation failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
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
        <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p className="text-sm text-center mt-2 text-gray-500">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-rose-600 underline">
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
