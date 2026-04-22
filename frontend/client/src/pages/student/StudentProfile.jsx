import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/student/details`, { withCredentials: true })
      .then(res => {
        const s = res.data.student || res.data;
        setProfile(s);
        setForm({ name: s.name||'', phone: s.phone||'', rollNumber: s.rollNumber||'', groupNumber: s.groupNumber||'', department: s.department||'CSE', guardianName: s.guardianName||'', guardianPhoneNo: s.guardianPhoneNo||'' });
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_URL}/api/student/details`, form, { withCredentials: true });
      toast.success('Profile updated');
      setProfile({ ...profile, ...form });
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setSaving(false); }
  };

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}><div className="at-spinner"/></div>;
  if (!profile) return <div style={{textAlign:'center',padding:40,color:'var(--ink-3)'}}>No profile data found.</div>;

  const initials = (profile.name || '').split(' ').map(w=>w[0]).join('').toUpperCase();

  const fields = [
    ['Name', 'name', true], ['Email', 'email', false], ['Phone', 'phone', true], ['Roll number', 'rollNumber', true],
    ['Group', 'groupNumber', true], ['Department', 'department', true], ['Guardian name', 'guardianName', true], ['Guardian phone', 'guardianPhoneNo', true],
  ];

  return (
    <>
      <div className="at-banner" style={{marginBottom:20, paddingBottom:56}}>
        <h2>{profile.name || 'Student'}</h2>
        <p>Roll {profile.rollNumber || '—'} · {profile.department || 'CSE'} · Group {profile.groupNumber || '—'}</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24, marginTop:-70}}>
        <div>
          {profile.uploadedImageUrl ? (
            <img src={profile.uploadedImageUrl} alt="Profile" style={{width:132, height:132, borderRadius:'50%', border:'4px solid var(--paper)', objectFit:'cover'}}/>
          ) : (
            <div className="at-ph" style={{width:132, height:132, borderRadius:'50%', border:'4px solid var(--paper)', position:'relative'}}>
              <span style={{position:'absolute', fontSize:14}}>{initials}</span>
            </div>
          )}
          <button className="at-btn ghost sm" style={{marginTop:12, width:132}} onClick={() => navigate('/student/register2/image')}>
            <I.camera size={12}/> Change image
          </button>
        </div>
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, marginTop:70}}>
            <div className="at-card-h">Details</div>
            {editing ? (
              <div style={{display:'flex', gap:8}}>
                <button className="at-btn ghost sm" onClick={() => setEditing(false)}>Cancel</button>
                <button className="at-btn primary sm" onClick={save} disabled={saving}><I.check size={12}/> {saving?'Saving...':'Save changes'}</button>
              </div>
            ) : (
              <button className="at-btn ghost sm" onClick={() => setEditing(true)}><I.edit size={12}/> Edit</button>
            )}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {fields.map(([label, key, editable]) => (
              <div key={key} className="at-card" style={{padding:'12px 14px'}}>
                <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4}}>{label}{!editable && ' · read only'}</div>
                {editing && editable ? (
                  <input className="at-input" value={form[key]||''} onChange={set(key)} style={{padding:'5px 8px', fontSize:13}}/>
                ) : (
                  <div style={{fontSize:13.5, fontWeight:500}}>{key==='email' ? profile.email : (form[key] || '—')}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.at-banner+div{grid-template-columns:1fr!important;margin-top:-40px!important}}`}</style>
    </>
  );
};

export default StudentProfile;
