import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentRegister2 = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ rollNumber: '', groupNumber: '', dob: '', guardianName: '', guardianPhoneNo: '' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.rollNumber || !form.groupNumber || !form.dob || !form.guardianName || !form.guardianPhoneNo) {
      return toast.error('All fields are required');
    }
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/student/details`, form, { withCredentials: true });
      toast.success('Details saved!');
      setTimeout(() => navigate('/student/register2/image'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save details');
    } finally { setLoading(false); }
  };

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left">
          <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
          <div>
            <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.12em', opacity:0.7, marginBottom:10}}>STEP 02 / 03 · ACADEMIC</div>
            <div className="at-auth-quote">So your mentor can reach <em>the right people</em> when it matters.</div>
            <div style={{display:'flex', gap:6, marginTop:28}}>
              <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
              <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
              <div style={{flex:1, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2}}/>
            </div>
          </div>
          <div style={{fontSize:11, opacity:0.55}}>All fields required.</div>
        </div>
        <div className="at-auth-right">
          <form className="at-auth-card" onSubmit={submit}>
            <div className="at-auth-title">Academic & guardian.</div>
            <div className="at-auth-sub">Step 2 of 3 — help us route information correctly.</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:24}}>
              <Field label="Roll number" required><input className="at-input" value={form.rollNumber} onChange={set('rollNumber')} placeholder="21CSE047"/></Field>
              <Field label="Group number" required><input className="at-input" value={form.groupNumber} onChange={set('groupNumber')} placeholder="04"/></Field>
              <div style={{gridColumn:'span 2'}}><Field label="Date of birth" required><input className="at-input" type="date" value={form.dob} onChange={set('dob')}/></Field></div>
              <div style={{gridColumn:'span 2'}}><Field label="Guardian name" required><input className="at-input" value={form.guardianName} onChange={set('guardianName')} placeholder="Mr. Rajesh Sharma"/></Field></div>
              <div style={{gridColumn:'span 2'}}><Field label="Guardian phone" required><input className="at-input" value={form.guardianPhoneNo} onChange={set('guardianPhoneNo')} placeholder="+91 98 7654 1122"/></Field></div>
            </div>
            <button className="at-btn primary lg block" type="submit" disabled={loading} style={{marginTop:18}}>
              {loading ? 'Saving...' : 'Continue to face capture'} {!loading && <I.arrow size={13}/>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister2;
