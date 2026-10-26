import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import api from '../services/api';
import './GoogleAuthButton.css';

function GoogleAuthButton({ redirectPath = '/' }) {
  const [clientId, setClientId] = useState(
    import.meta.env.VITE_GOOGLE_CLIENT_ID || 
    import.meta.env.GOOGLE_CLIENT_ID || 
    '220280867914-jc46hpuih04umftqsu396vi2pbhbmns3.apps.googleusercontent.com'
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If Client ID isn't in Vite frontend env, fetch it from backend /api/auth/google/config
  useEffect(() => {
    if (!clientId) {
      let isMounted = true;
      api.get('/auth/google/config')
        .then((res) => {
          if (isMounted && res.data?.clientId) {
            setClientId(res.data.clientId.trim());
          }
        })
        .catch((err) => {
          console.warn('[Google Auth Config Notice]', err.message);
        });
      return () => { isMounted = false; };
    }
  }, [clientId]);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      dispatch(loginFailure('No Google credentials returned. Please try again.'));
      return;
    }

    setIsLoading(true);
    dispatch(loginStart());

    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });

      dispatch(loginSuccess(response.data));
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('[Google Login Error]', err);
      const msg = err.response?.data?.error || err.message || 'Google authentication failed.';
      dispatch(loginFailure(msg));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('[Google Sign-In Error]');
    dispatch(loginFailure('Google Sign-In was cancelled or encountered an error.'));
  };

  if (!clientId) {
    return (
      <div className="google-auth-placeholder" title="Add GOOGLE_CLIENT_ID or VITE_GOOGLE_CLIENT_ID to .env to activate Google OAuth">
        <span className="google-g-icon-fallback">G</span>
        <span>Google Sign-In (Save GOOGLE_CLIENT_ID in .env to activate)</span>
      </div>
    );
  }

  return (
    <div className="google-auth-wrapper">
      <GoogleOAuthProvider clientId={clientId}>
        <div className="google-btn-inner">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
          />
        </div>
      </GoogleOAuthProvider>
      {isLoading && (
        <div className="google-auth-loading-banner">
          Authenticating with Google...
        </div>
      )}
    </div>
  );
}

export default GoogleAuthButton;
