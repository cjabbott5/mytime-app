export default function AuthWrapper({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f2b4c8] to-[#fe7191] px-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }
  