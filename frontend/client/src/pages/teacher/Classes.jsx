import React, { useState } from 'react';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';

const TeacherClasses = () => {
  const [classes, setClasses] = useState([
    { id:1, subject:'CS201 · Data Structures', group:'04', endDate:'20 Jun 2026', mentor:true },
    { id:2, subject:'CS201 · Data Structures', group:'07', endDate:'20 Jun 2026', mentor:false },
    { id:3, subject:'CS301 · Algorithms', group:'04', endDate:'15 Jul 2026', mentor:true },
    { id:4, subject:'CS401 · Compilers', group:'02', endDate:'10 Aug 2026', mentor:false },
  ]);
  const [form, setForm] = useState({ subject:'', group:'', endDate:'', mentor:true });
  const set = (k) => (e) => setForm({...form, [k]:e.target.value});

  const addClass = () => {
    if (!form.subject || !form.group) return toast.error('Subject and group required');
    setClasses([...classes, { id: Date.now(), ...form }]);
    setForm({ subject:'', group:'', endDate:'', mentor:true });
    toast.success('Class added');
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c=>c.id!==id));
    toast.success('Class removed');
  };

  return (
    <>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:14}}>
        <div className="at-card">
          <div className="at-card-h" style={{marginBottom:12}}>Add a class</div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <Field label="Subject" required><input className="at-input" value={form.subject} onChange={set('subject')} placeholder="CS201 · Data Structures"/></Field>
            <Field label="Group" required><input className="at-input" value={form.group} onChange={set('group')} placeholder="04"/></Field>
            <Field label="Course end date" required><input className="at-input" type="date" value={form.endDate} onChange={set('endDate')}/></Field>
            <Field label="I'm the mentor" required>
              <div style={{display:'flex', gap:8}}>
                <button className={`at-btn ghost sm`} style={{flex:1, ...(form.mentor?{borderColor:'var(--indigo-700)', color:'var(--indigo-700)'}:{})}} onClick={()=>setForm({...form,mentor:true})}>Yes</button>
                <button className={`at-btn ghost sm`} style={{flex:1, ...(!form.mentor?{borderColor:'var(--indigo-700)', color:'var(--indigo-700)'}:{})}} onClick={()=>setForm({...form,mentor:false})}>No</button>
              </div>
            </Field>
            <button className="at-btn primary block" onClick={addClass} style={{marginTop:6}}><I.plus size={12}/> Add class</button>
          </div>
        </div>
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
            <div className="at-card-h">{classes.length} active classes</div>
          </div>
          {classes.map(c => (
            <div key={c.id} className="at-card" style={{padding:'12px 16px', marginBottom:8, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'}}>
              <div style={{width:36, height:36, borderRadius:8, background:'var(--indigo-50)', color:'var(--indigo-700)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ff-display)', fontSize:16, flexShrink:0}}>{(c.subject.split('·')[1]||c.subject)[1]}</div>
              <div style={{flex:1, minWidth:150}}>
                <div style={{fontSize:13, fontWeight:500}}>{c.subject}</div>
                <div style={{fontSize:11.5, color:'var(--ink-3)'}}>Group {c.group} · ends {c.endDate} · mentor: {c.mentor?'Yes':'No'}</div>
              </div>
              {c.mentor && <span className="at-pill">Mentor</span>}
              <button className="at-btn ghost sm" style={{color:'var(--err)', borderColor:'#FCA5A5'}} onClick={()=>deleteClass(c.id)}><I.trash size={11}/></button>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.at-card:first-child+div{grid-template-columns:1fr!important}}`}</style>
    </>
  );
};

export default TeacherClasses;
