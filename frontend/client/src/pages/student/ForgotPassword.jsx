import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentForgotPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const strength = () => {
    const p = form.newPassword;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.newPassword || form.newPassword.length < 8) return toast.error('Password must be at least 8 characters');
    if (form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/student/forgot-password`, { newPassword: form.newPassword }, { withCredentials: true });
      toast.success('Password updated!');
      setTimeout(() => navigate('/student/login'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally { setLoading(false); }
  };

  const s = strength();
  const labels = ['Weak', 'Fair', 'Strong', 'Excellent'];

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left">
          <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
          <div className="at-auth-quote">Pick a new password. Make it something <em>only you'd guess.</em></div>
          <div style={{fontSize:11, opacity:0.55}}>Session link valid for 15 minutes.</div>
        </div>
        <div className="at-auth-right">
          <form className="at-auth-card" onSubmit={submit}>
            <div className="at-auth-title">New password.</div>
            <div className="at-auth-sub">Minimum 8 characters. Mix letters and numbers.</div>
            <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:22}}>
              <Field label="New password" required><input className="at-input" type="password" value={form.newPassword} onChange={set('newPassword')} placeholder="Enter new password"/></Field>
              <Field label="Confirm new password" required><input className="at-input" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Re-enter password"/></Field>
              {form.newPassword && (
                <>
                  <div style={{display:'flex', gap:4, marginTop:4}}>
                    {[0,1,2,3].map(i => <div key={i} style={{flex:1, height:3, borderRadius:2, background: i < s ? 'var(--ok)' : 'var(--line)'}}/>)}
                  </div>
                  <div style={{fontSize:11, color:'var(--ink-3)'}}>{s > 0 ? labels[s-1] : 'Too short'} — {s} of 4 criteria met.</div>
                </>
              )}
            </div>
            <button className="at-btn primary lg block" type="submit" disabled={loading} style={{marginTop:16}}>
              {loading ? 'Setting...' : 'Set new password'}
            </button>
            <Link to="/student/login" style={{display:'block', textAlign:'center', fontSize:12, color:'var(--ink-3)', marginTop:12}}>
              <I.left size={11} style={{verticalAlign:-2}}/> Back to login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForgotPassword;
