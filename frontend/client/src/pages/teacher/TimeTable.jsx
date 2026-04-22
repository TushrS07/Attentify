import React, { useState } from 'react';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';

const TeacherTimetable = () => {
  const [group, setGroup] = useState('');
  const [timetables, setTimetables] = useState([
    { id:1, group:'04', file:'timetable_g04_w14.pdf', updated:'2 days ago', current:true },
    { id:2, group:'07', file:'timetable_g07_w14.xlsx', updated:'5 days ago', current:false },
    { id:3, group:'12', file:'timetable_g12_w13.pdf', updated:'2 weeks ago', current:false },
  ]);

  const addTimetable = () => {
    if (!group) return toast.error('Select a group');
    toast.success('Timetable added');
  };

  const deleteTT = (id) => {
    setTimetables(timetables.filter(t=>t.id!==id));
    toast.success('Timetable removed');
  };

  return (
    <>
      <div className="at-card" style={{marginBottom:14}}>
        <div style={{display:'grid', gridTemplateColumns:'220px 1fr auto', gap:14, alignItems:'end'}}>
          <Field label="Group" required><input className="at-input" value={group} onChange={e=>setGroup(e.target.value)} placeholder="04"/></Field>
          <Field label="Upload document" required>
            <div className="at-drop" style={{padding:18, flexDirection:'row', justifyContent:'flex-start', gap:14}} onClick={()=>document.getElementById('tt-file').click()}>
              <div className="icon"><I.upload size={16}/></div>
              <div style={{textAlign:'left', flex:1}}>
                <div style={{fontSize:12.5, color:'var(--ink)'}}>Drop .xlsx · .pdf · .png</div>
                <div style={{fontSize:11, color:'var(--ink-4)'}}>or click to browse</div>
              </div>
            </div>
            <input id="tt-file" type="file" style={{display:'none'}}/>
          </Field>
          <button className="at-btn primary" onClick={addTimetable}>Add timetable</button>
        </div>
      </div>
      <div className="at-card-title" style={{marginBottom:10}}>Saved timetables</div>
      {timetables.map(t => (
        <div key={t.id} className="at-card" style={{padding:'12px 16px', marginBottom:8, display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'}}>
          <div style={{width:36, height:44, borderRadius:4, background:'var(--paper-2)', border:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--ink-3)', flexShrink:0}}><I.file size={15}/></div>
          <div style={{flex:1, minWidth:150}}>
            <div style={{fontSize:13, fontWeight:500}}>Group {t.group} <span style={{fontFamily:'var(--ff-mono)', fontWeight:400, fontSize:11.5, color:'var(--ink-3)'}}>· {t.file}</span></div>
            <div style={{fontSize:11.5, color:'var(--ink-3)'}}>{t.updated}</div>
          </div>
          {t.current && <span className="at-pill">Current</span>}
          <button className="at-btn ghost sm" style={{color:'var(--err)', borderColor:'#FCA5A5'}} onClick={()=>deleteTT(t.id)}><I.trash size={11}/></button>
        </div>
      ))}
    </>
  );
};

export default TeacherTimetable;
