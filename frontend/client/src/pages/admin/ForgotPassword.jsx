import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword:'', confirmPassword:'' });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({...form, [k]:e.target.value});

  const strength = () => {
    const p = form.newPassword; let s = 0;
    if (p.length >= 12) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 12) return toast.error('Minimum 12 characters');
    if (form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/admin/reset-password`, { newPassword:form.newPassword }, { withCredentials:true });
      toast.success('Password updated');
      setTimeout(()=>navigate('/admin/login'),1500);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const s = strength();

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left admin">
          <div className="at-auth-brand" style={{color:'#E6E8EE'}}><div className="at-logo" style={{background:'#E6E8EE', color:'var(--admin-slate)'}}>A</div> Attentify</div>
          <div className="at-auth-quote" style={{color:'#E6E8EE'}}>Rotate the <em>admin key</em>. Carefully.</div>
          <div style={{fontSize:11, color:'#6B738A'}}>Changes logged to audit trail.</div>
        </div>
        <div className="at-auth-right" style={{background:'#0B1220', color:'#E6E8EE'}}>
          <form className="at-auth-card" onSubmit={submit}>
            <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid rgba(255,255,255,0.15)', borderRadius:999, fontSize:11, color:'#8B93A7', marginBottom:12}}><I.lock size={11}/> Admin</div>
            <div className="at-auth-title" style={{color:'#fff'}}>Reset admin password.</div>
            <div className="at-auth-sub" style={{color:'#8B93A7'}}>Minimum 12 characters. Include number and symbol.</div>
            <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:22}}>
              <Field label="New password" required><input className="at-input" type="password" value={form.newPassword} onChange={set('newPassword')} style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/></Field>
              <Field label="Confirm new password" required><input className="at-input" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/></Field>
              {form.newPassword && (
                <>
                  <div style={{display:'flex', gap:4}}>{[0,1,2,3].map(i=><div key={i} style={{flex:1, height:3, borderRadius:2, background:i<s?'#10B981':'#1F2A45'}}/>)}</div>
                  <div style={{fontSize:11, color:s>=4?'#10B981':'#8B93A7'}}>{s>=4?'Excellent — all criteria met.':s>=3?'Strong':'Keep going...'}</div>
                </>
              )}
            </div>
            <button className="at-btn lg block" type="submit" disabled={loading} style={{background:'#6366F1', borderColor:'#6366F1', marginTop:16}}>
              {loading ? 'Setting...' : 'Set new admin password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
