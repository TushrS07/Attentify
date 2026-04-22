import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const AdminLogin = () => {
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
      const res = await axios.post(`${API_URL}/api/admin/login`, form, { withCredentials:true });
      toast.success(res.data.message || 'Login successful');
      setTimeout(()=>navigate('/admin'),1500);
    } catch (err) { toast.error(err.response?.data?.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left admin">
          <div className="at-auth-brand" style={{color:'#E6E8EE'}}><div className="at-logo" style={{background:'#E6E8EE', color:'var(--admin-slate)'}}>A</div> Attentify</div>
          <div>
            <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.15em', color:'#6366F1', marginBottom:12}}>◉ RESTRICTED ACCESS</div>
            <div className="at-auth-quote" style={{color:'#E6E8EE'}}>Onboard a whole institution in <em>one upload.</em></div>
            <div style={{marginTop:28, padding:14, border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, fontSize:11.5, color:'#8B93A7', maxWidth:360}}>
              <b style={{color:'#C5CADB'}}>Admin consoles are monitored.</b> All actions are logged with IP, device, and timestamp.
            </div>
          </div>
          <div style={{fontSize:11, color:'#6B738A', letterSpacing:'0.08em'}}>INSTITUTION ID · INST_0241 · PROD</div>
        </div>
        <div className="at-auth-right" style={{background:'#0B1220', color:'#E6E8EE'}}>
          <form className="at-auth-card" onSubmit={submit}>
            <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid rgba(255,255,255,0.15)', borderRadius:999, fontSize:11, color:'#8B93A7', marginBottom:12}}><I.lock size={11}/> Admin only</div>
            <div className="at-auth-title" style={{color:'#fff'}}>Administrator sign-in.</div>
            <div className="at-auth-sub" style={{color:'#8B93A7'}}>Credential Generator & institutional controls.</div>
            <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:22}}>
              <Field label="Email" required><input className="at-input" value={form.email} onChange={set('email')} placeholder="admin@institution.edu" style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/></Field>
              <Field label="Password" required>
                <div className="at-input-wrap">
                  <input className="at-input" type={showPw?'text':'password'} value={form.password} onChange={set('password')} style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/>
                  <span className="icon" onClick={()=>setShowPw(!showPw)}>{showPw?<I.eyeOff size={14} style={{color:'#8B93A7'}}/>:<I.eye size={14} style={{color:'#8B93A7'}}/>}</span>
                </div>
              </Field>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', color:'#8B93A7'}}>
                <label className="at-checkbox" style={{color:'#8B93A7'}}><input type="checkbox" checked={form.rememberMe} onChange={set('rememberMe')}/> Remember me</label>
                <Link to="/admin/forgotpassword" style={{fontSize:12, color:'#6366F1'}}>Forgot password?</Link>
              </div>
              <button className="at-btn lg block" type="submit" disabled={loading} style={{background:'#6366F1', borderColor:'#6366F1', marginTop:4}}>
                <I.shield size={13}/> {loading ? 'Signing in...' : 'Admin sign in'}
              </button>
            </div>
            <div style={{fontSize:11, color:'#6B738A', marginTop:18, textAlign:'center'}}>Not an admin? <Link to="/student/login" style={{color:'#8B93A7'}}>Go to student sign-in</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
