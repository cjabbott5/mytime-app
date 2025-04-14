import AuthWrapper from '@/pages/Auth/AuthWrapper'; 

export default function Auth() {
  return (
    <AuthWrapper>
      <h2 className="text-primary text-2xl font-bold mb-4">🔐 Log In / Sign Up</h2>
      <p className="text-sm text-gray-600">Auth form goes here</p>
    </AuthWrapper>
  );
}
