import React, { useState } from 'react';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';

const mockLeaves = [
  { id:1, reason:'Viral fever', status:'pending', from:'18 Apr', to:'20 Apr', mentor:'Dr. Iyer', file:'fever_note.pdf' },
  { id:2, reason:'Dental procedure', status:'approved', from:'02 Apr', to:'03 Apr', mentor:'Dr. Iyer' },
  { id:3, reason:'Personal', status:'rejected', from:'14 Mar', to:'14 Mar', mentor:'Dr. Iyer', note:'Reason required for personal leave.' },
];

const StudentMedical = () => {
  const [tab, setTab] = useState('apply');
  const [form, setForm] = useState({ from:'', to:'', mentor:'', file:null });
  const set = (k) => (e) => setForm({...form, [k]: e.target.value});
  const pending = mockLeaves.filter(l=>l.status==='pending');
  const approved = mockLeaves.filter(l=>l.status==='approved');
  const rejected = mockLeaves.filter(l=>l.status==='rejected');

  const submit = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.mentor) return toast.error('Please fill all required fields');
    toast.success('Leave request submitted');
    setForm({ from:'', to:'', mentor:'', file:null });
  };

  const tabs = [
    { key:'apply', label:'Apply' },
    { key:'applied', label:'Applied', count: mockLeaves.length },
    { key:'pending', label:'Pending', count: pending.length },
    { key:'approved', label:'Approved', count: approved.length },
    { key:'rejected', label:'Rejected', count: rejected.length },
  ];

  const filtered = tab==='pending'?pending : tab==='approved'?approved : tab==='rejected'?rejected : mockLeaves;

  return (
    <>
      <div className="at-tabs" style={{marginBottom:16}}>
        {tabs.map(t => (
          <div key={t.key} className={`at-tab ${tab===t.key?'active':''}`} onClick={()=>setTab(t.key)}>
            {t.label}{t.count!=null && <span className="count">{t.count}</span>}
          </div>
        ))}
      </div>

      {tab === 'apply' ? (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          <form className="at-card" onSubmit={submit}>
            <div className="at-card-h" style={{marginBottom:14}}>New leave request</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <Field label="From date" required><input className="at-input" type="date" value={form.from} onChange={set('from')}/></Field>
              <Field label="To date" required><input className="at-input" type="date" value={form.to} onChange={set('to')}/></Field>
              <div style={{gridColumn:'span 2'}}><Field label="Mentor name" required><input className="at-input" value={form.mentor} onChange={set('mentor')} placeholder="Dr. Meera Iyer"/></Field></div>
              <div style={{gridColumn:'span 2'}}>
                <Field label="Medical proof" required>
                  <div className="at-drop" style={{padding:18}} onClick={() => document.getElementById('med-file').click()}>
                    <div className="icon"><I.upload size={16}/></div>
                    <div style={{fontSize:12}}>{form.file ? <b>{form.file.name}</b> : 'Click to upload proof'}</div>
                    <div style={{fontSize:11, color:'var(--ink-4)'}}>PDF or image · max 5 MB</div>
                  </div>
                  <input id="med-file" type="file" accept=".pdf,.jpg,.png" style={{display:'none'}} onChange={e => setForm({...form, file: e.target.files[0]})}/>
                </Field>
              </div>
            </div>
            <button className="at-btn primary lg block" type="submit" style={{marginTop:14}}>Submit request</button>
          </form>
          <div>
            {mockLeaves.map(l => (
              <div key={l.id} className="at-card" style={{padding:14, marginBottom:10}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:13, fontWeight:500}}>{l.reason}</div>
                  <span className={`at-badge ${l.status}`}>{l.status}</span>
                </div>
                <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4}}>{l.from} → {l.to} · Mentor: {l.mentor}</div>
                {l.file && <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:6, display:'flex', gap:6, alignItems:'center'}}><I.file size={11}/> {l.file}</div>}
                {l.note && <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:6}}>{l.note}</div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:12}}>
          {filtered.map(l => (
            <div key={l.id} className="at-card" style={{padding:14}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontSize:13, fontWeight:500}}>{l.reason}</div>
                <span className={`at-badge ${l.status}`}>{l.status}</span>
              </div>
              <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4}}>{l.from} → {l.to} · Mentor: {l.mentor}</div>
              {l.file && <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:6}}><I.file size={11}/> {l.file}</div>}
              {l.note && <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:6}}>{l.note}</div>}
            </div>
          ))}
          {filtered.length === 0 && <div style={{color:'var(--ink-3)', fontSize:13, padding:20}}>No {tab} leaves found.</div>}
        </div>
      )}

      <style>{`@media(max-width:768px){.at-card form+div,.at-tabs+div{grid-template-columns:1fr!important}}`}</style>
    </>
  );
};

export default StudentMedical;
