import React, { useState } from 'react';
import { X, Mail, Lock, Phone } from 'lucide-react';
import './Login.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Handle login logic here
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    // Handle Google Sign-In logic here
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="login-modal-header">
          <h2 className="login-modal-title">Welcome Back</h2>
          <button className="login-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="login-modal-body">
          {/* Login Method Toggle */}
          <div className="login-method-toggle">
            <button
              className={`method-button ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => setLoginMethod('email')}
            >
              <Mail size={16} />
              Email
            </button>
            <button
              className={`method-button ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setLoginMethod('phone')}
            >
              <Phone size={16} />
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email/Phone Input */}
            <div className="form-group">
              <label htmlFor={loginMethod} className="form-label">
                {loginMethod === 'email' ? 'Email Address' : 'Contact Number'}
              </label>
              <div className="input-wrapper">
                {loginMethod === 'email' ? (
                  <Mail className="input-icon" size={16} />
                ) : (
                  <Phone className="input-icon" size={16} />
                )}
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  id={loginMethod}
                  name={loginMethod}
                  value={loginMethod === 'email' ? formData.email : formData.phone}
                  onChange={handleInputChange}
                  placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="forgot-password">
              <button type="button" className="forgot-password-link">
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" className="login-submit-button">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>or</span>
          </div>

          {/* Google Sign-In */}
          <button onClick={handleGoogleSignIn} className="google-signin-button">
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="signup-link">
            <span>Don't have an account? </span>
            <button className="signup-link-button">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;