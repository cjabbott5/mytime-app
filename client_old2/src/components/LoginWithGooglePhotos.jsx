// LoginWithGooglePhotos.jsx
import { useEffect } from "react";

const LoginWithGooglePhotos = ({ onTokenReceived }) => {
  useEffect(() => {
    // This function initializes the OAuth client when the component mounts
    const tokenClient = window.google?.accounts.oauth2.initTokenClient({
      client_id: '834239450509-dk42iectmnt2mqi72pb8tg4d0hkk0jqh.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
      callback: (response) => {
        if (response?.access_token) {
          onTokenReceived(response.access_token);
        } else {
          console.error("Token not received:", response);
        }
      },
    });

    // Save it to the window for later trigger
    window.myGooglePhotosTokenClient = tokenClient;
  }, [onTokenReceived]);

  const handleLogin = () => {
    if (window.myGooglePhotosTokenClient) {
      window.myGooglePhotosTokenClient.requestAccessToken();
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-pink-400 text-white px-4 py-2 rounded-xl hover:bg-pink-500 transition-all"
    >
      Connect Google Photos 📸
    </button>
  );
};

export default LoginWithGooglePhotos;
