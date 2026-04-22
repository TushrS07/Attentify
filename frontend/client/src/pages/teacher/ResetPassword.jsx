import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const TeacherResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ oldPassword:'', newPassword:'', confirmPassword:'' });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({...form, [k]:e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) return toast.error('Password must be at least 8 characters');
    if (form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/teacher/reset-password`, { oldPassword:form.oldPassword, newPassword:form.newPassword }, { withCredentials:true });
      toast.success('Password updated');
      setTimeout(()=>navigate('/teacher/login'),1500);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to reset password'); }
    finally { setLoading(false); }
  };

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left teacher">
          <div className="at-auth-brand"><div className="at-logo" style={{background:'#fff',color:'#0E3A3A'}}>A</div> Attentify</div>
          <div className="at-auth-quote">First-time login? Let's set up a strong <em>password</em> first.</div>
          <div style={{fontSize:11, opacity:0.55}}>Faculty portal</div>
        </div>
        <div className="at-auth-right">
          <form className="at-auth-card" onSubmit={submit}>
            <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid var(--line)', borderRadius:999, fontSize:11, color:'var(--ink-3)', marginBottom:12}}><I.shield size={11}/> Faculty</div>
            <div className="at-auth-title">Reset password.</div>
            <div className="at-auth-sub">Your institution requires a password change on first login.</div>
            <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:20}}>
              <Field label="Current password" required><input className="at-input" type="password" value={form.oldPassword} onChange={set('oldPassword')}/></Field>
              <Field label="New password" required hint="Minimum 8 characters, include a number"><input className="at-input" type="password" value={form.newPassword} onChange={set('newPassword')}/></Field>
              <Field label="Confirm new password" required><input className="at-input" type="password" value={form.confirmPassword} onChange={set('confirmPassword')}/></Field>
            </div>
            <button className="at-btn lg block" type="submit" disabled={loading} style={{background:'#0E3A3A', borderColor:'#0E3A3A', marginTop:16}}>
              {loading ? 'Setting...' : 'Set new password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherResetPassword;
