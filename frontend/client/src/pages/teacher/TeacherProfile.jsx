import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', groups:'', subjects:[] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/api/teacher/profile`, { withCredentials:true }),
      axios.get(`${API_URL}/api/teacher/subjects`, { withCredentials:true }).catch(()=>({data:{subjects:[]}})),
    ]).then(([pRes, sRes]) => {
      const p = pRes.data.profile || pRes.data;
      setProfile(p);
      setSubjects(sRes.data.subjects || []);
      setForm({
        name: p.name||'', phone: p.phone||'',
        groups: (p.groups||[]).join(', '),
        subjects: p.subjects||p.teachesSubjects||[],
      });
    }).catch(() => toast.error('Failed to load profile'))
    .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_URL}/api/teacher/profile`, {
        name: form.name, phone: form.phone,
        subjects: form.subjects,
        groups: form.groups.split(',').map(g=>g.trim()).filter(Boolean),
      }, { withCredentials:true });
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}><div className="at-spinner"/></div>;
  if (!profile) return <div style={{textAlign:'center', padding:40, color:'var(--ink-3)'}}>No profile data.</div>;

  const initials = (profile.name||'').split(' ').map(w=>w[0]).join('').toUpperCase();

  return (
    <>
      <div className="at-banner" style={{background:'linear-gradient(100deg,#0E3A3A 0%, #0EA5A4 60%, #5EEAD4 100%)', marginBottom:20, paddingBottom:56}}>
        <h2>{profile.name || 'Faculty'}</h2>
        <p>Associate Professor · Computer Science</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24, marginTop:-70}}>
        <div>
          <div className="at-ph" style={{width:132, height:132, borderRadius:'50%', border:'4px solid var(--paper)', position:'relative'}}>
            <span style={{position:'absolute', fontSize:14}}>{initials}</span>
          </div>
        </div>
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, marginTop:70, flexWrap:'wrap', gap:8}}>
            <div className="at-card-h">Faculty details</div>
            {editing ? (
              <div style={{display:'flex', gap:8}}>
                <button className="at-btn ghost sm" onClick={()=>setEditing(false)}>Cancel</button>
                <button className="at-btn primary sm" onClick={save} disabled={saving}><I.check size={12}/> {saving?'Saving...':'Save'}</button>
              </div>
            ) : (
              <button className="at-btn ghost sm" onClick={()=>setEditing(true)}><I.edit size={12}/> Edit</button>
            )}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {[['Name','name',true],['Email · read only','email',false],['Phone','phone',true],['Groups (comma-separated)','groups',true]].map(([l,k,e])=>(
              <div key={k} className="at-card" style={{padding:'12px 14px'}}>
                <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4}}>{l}</div>
                {editing && e ? (
                  <input className="at-input" value={form[k]||''} onChange={ev=>setForm({...form,[k]:ev.target.value})} style={{padding:'5px 8px', fontSize:13}}/>
                ) : (
                  <div style={{fontSize:13.5, fontWeight:500}}>{k==='email'?profile.email:(k==='groups'?(profile.groups||[]).join(', '):(form[k]||'—'))}</div>
                )}
              </div>
            ))}
            <div className="at-card" style={{padding:'12px 14px', gridColumn:'span 2'}}>
              <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6}}>Subjects taught</div>
              <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                {(form.subjects||[]).map((s,i) => (
                  <span key={i} className="at-badge neutral" style={{padding:'4px 10px', fontSize:11.5}}>
                    {typeof s === 'object' ? s.name : s}
                    {editing && <span onClick={()=>setForm({...form, subjects:form.subjects.filter((_,j)=>j!==i)})} style={{cursor:'pointer', marginLeft:4}}><I.x size={10}/></span>}
                  </span>
                ))}
                {editing && <span className="at-badge neutral" style={{padding:'4px 10px', fontSize:11.5, borderStyle:'dashed', cursor:'pointer'}} onClick={()=>toast.success('Add subject from dropdown')}>+ Add</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.at-banner+div{grid-template-columns:1fr!important;margin-top:-40px!important}}`}</style>
    </>
  );
};

export default TeacherProfile;
