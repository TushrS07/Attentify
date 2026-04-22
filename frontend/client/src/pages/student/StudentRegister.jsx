import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) { toast.error('Full name is required'); return false; }
    if (!form.phone.trim()) { toast.error('Phone number is required'); return false; }
    if (!/^\d{10}$/.test(form.phone.trim())) { toast.error('Phone number must be 10 digits'); return false; }
    if (!form.email.trim()) { toast.error('Email is required'); return false; }
    if (!form.password) { toast.error('Password is required'); return false; }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return false; }
    if (!form.confirmPassword) { toast.error('Please confirm your password'); return false; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/student/register`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      }, { withCredentials: true });

      toast.success(res.data.message || 'Registration successful!');
      setTimeout(() => navigate('/student/verificationpage'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
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
          <div style={{marginTop:40}}>
            <div className="at-mono" style={{fontSize:11, opacity:0.5, letterSpacing:'0.1em'}}>STEP 1 OF 3</div>
            <div className="at-auth-quote" style={{marginTop:12}}>
              Join the future of <em>attendance tracking.</em>
            </div>
          </div>
        </div>
        <div className="at-auth-chips">
          <span className="at-chip">Personal info</span>
          <span className="at-chip" style={{opacity:0.4}}>Verify OTP</span>
          <span className="at-chip" style={{opacity:0.4}}>Academic details</span>
          <span className="at-chip" style={{opacity:0.4}}>Face capture</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="at-auth-right">
        <div className="at-auth-card">
          <h1 className="at-auth-title">Create account</h1>
          <p className="at-auth-sub">Fill in your details to get started.</p>

          <form onSubmit={handleSubmit} style={{marginTop:28, display:'flex', flexDirection:'column', gap:16}}>
            <Field label="Full name" required>
              <div className="at-input-wrap">
                <input
                  className="at-input"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
                <span className="icon"><I.user size={15}/></span>
              </div>
            </Field>

            <Field label="Phone number" required>
              <div className="at-input-wrap">
                <input
                  className="at-input"
                  type="tel"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={set('phone')}
                  maxLength={10}
                  autoComplete="tel"
                />
                <span className="icon"><I.phone size={15}/></span>
              </div>
            </Field>

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

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <Field label="Password" required>
                <input
                  className="at-input"
                  type="password"
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="new-password"
                />
              </Field>
              <Field label="Confirm password" required>
                <input
                  className="at-input"
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={set('confirmPassword')}
                  autoComplete="new-password"
                />
              </Field>
            </div>

            <button type="submit" className="at-btn primary block lg" disabled={loading} style={{marginTop:4}}>
              {loading ? 'Creating account...' : 'Continue'} {!loading && <I.arrow size={14}/>}
            </button>
          </form>

          <p style={{marginTop:24, textAlign:'center', fontSize:12.5, color:'var(--ink-3)'}}>
            Already have an account?{' '}
            <Link to="/student/login" style={{color:'var(--indigo-700)', fontWeight:600}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
