import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) { toast.error('Email is required'); return; }
    if (!form.password) { toast.error('Password is required'); return; }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/student/login`, {
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      }, { withCredentials: true });

      toast.success(res.data.message || 'Login successful!');
      setTimeout(() => navigate('/student'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="at-root at-auth">
      {/* Left panel */}
      <div className="at-auth-left">
        <div>
          <div className="at-auth-brand">
            <div className="at-logo">A</div>
            <span>Attentify</span>
          </div>
          <div style={{marginTop:48}}>
            <div className="at-auth-quote">
              Your face is your attendance. <em>Your presence is seen.</em>
            </div>
          </div>
        </div>
        <div className="at-auth-chips">
          <span className="at-chip">Face recognition</span>
          <span className="at-chip">Live tracking</span>
          <span className="at-chip">Medical leave</span>
          <span className="at-chip">Analytics</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="at-auth-right">
        <div className="at-auth-card">
          <h1 className="at-auth-title">Sign in</h1>
          <p className="at-auth-sub">Enter your credentials to access your dashboard.</p>

          <form onSubmit={handleSubmit} style={{marginTop:28, display:'flex', flexDirection:'column', gap:18}}>
            <Field label="Email address" required>
              <div className="at-input-wrap">
                <input
                  className="at-input"
                  type="email"
                  placeholder="student@institution.edu"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
                <span className="icon"><I.mail size={15}/></span>
              </div>
            </Field>

            <Field label="Password" required>
              <div className="at-input-wrap">
                <input
                  className="at-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="current-password"
                />
                <span className="icon" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <I.eyeOff size={15}/> : <I.eye size={15}/>}
                </span>
              </div>
            </Field>

            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <label className="at-checkbox">
                <input type="checkbox" checked={form.rememberMe} onChange={set('rememberMe')}/>
                Remember me
              </label>
              <Link to="/student/forgotpassword" style={{fontSize:12, color:'var(--indigo-700)', fontWeight:500}}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="at-btn primary block lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{marginTop:24, textAlign:'center', fontSize:12.5, color:'var(--ink-3)'}}>
            Don't have an account?{' '}
            <Link to="/student/register" style={{color:'var(--indigo-700)', fontWeight:600}}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
