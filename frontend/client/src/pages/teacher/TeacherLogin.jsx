import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'', rememberMe:false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({...form, [k]: e.target.type==='checkbox'?e.target.checked:e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('All fields required');
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/teacher/login`, form, { withCredentials:true });
      toast.success(res.data.message || 'Login successful');
      if (res.data.firstTimeLogin) { setTimeout(()=>navigate('/teacher/resetpassword'),1500); }
      else { setTimeout(()=>navigate('/teacher'),1500); }
    } catch (err) { toast.error(err.response?.data?.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left teacher">
          <div className="at-auth-brand"><div className="at-logo" style={{background:'#fff',color:'#0E3A3A'}}>A</div> Attentify</div>
          <div>
            <span className="at-chip" style={{marginBottom:14, display:'inline-block'}}>Faculty</span>
            <div className="at-auth-quote">Roll call is over. <em>Teach</em> instead.</div>
          </div>
          <div style={{fontSize:11, opacity:0.55}}>Faculty portal · restricted to approved staff.</div>
        </div>
        <div className="at-auth-right">
          <form className="at-auth-card" onSubmit={submit}>
            <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid var(--line)', borderRadius:999, fontSize:11, color:'var(--ink-3)', marginBottom:12}}><I.shield size={11}/> Faculty</div>
            <div className="at-auth-title">Faculty sign-in.</div>
            <div className="at-auth-sub">Use the email your department assigned.</div>
            <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:22}}>
              <Field label="Email" required><input className="at-input" name="email" value={form.email} onChange={set('email')} placeholder="faculty@college.edu"/></Field>
              <Field label="Password" required>
                <div className="at-input-wrap">
                  <input className="at-input" type={showPw?'text':'password'} value={form.password} onChange={set('password')} placeholder="Enter password"/>
                  <span className="icon" onClick={()=>setShowPw(!showPw)}>{showPw?<I.eyeOff size={14}/>:<I.eye size={14}/>}</span>
                </div>
              </Field>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <label className="at-checkbox"><input type="checkbox" checked={form.rememberMe} onChange={set('rememberMe')}/> Remember me</label>
                <Link to="/teacher/forgotpassword" style={{fontSize:12, color:'#0E3A3A'}}>Forgot password?</Link>
              </div>
              <button className="at-btn lg block" type="submit" disabled={loading} style={{background:'#0E3A3A', borderColor:'#0E3A3A'}}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
