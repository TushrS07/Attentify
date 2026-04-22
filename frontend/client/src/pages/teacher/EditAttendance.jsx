import React, { useState } from 'react';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const EditAttendance = () => {
  const [group, setGroup] = useState('');
  const [subject, setSubject] = useState('');
  const [roll, setRoll] = useState('');
  const [records, setRecords] = useState([]);
  const [studentName, setStudentName] = useState('');

  const mockRecords = [
    { date:'21 Apr', slot:'3-5', status:'present', time:'14:03', conf:'98.4' },
    { date:'20 Apr', slot:'1-3', status:'present', time:'09:02', conf:'96.1' },
    { date:'19 Apr', slot:'5-8', status:'absent', time:'—', conf:'—' },
    { date:'18 Apr', slot:'1-3', status:'late', time:'09:18', conf:'72.3' },
    { date:'17 Apr', slot:'3-5', status:'present', time:'15:04', conf:'94.8' },
  ];

  const showStudent = () => {
    if (!roll) return toast.error('Enter a roll number');
    setRecords(mockRecords);
    setStudentName('Priya Sharma');
    toast.success('Records loaded');
  };

  const markBulk = (status) => {
    if (!group || !subject) return toast.error('Select group and subject');
    toast.success(`Marked all students as ${status}`);
  };

  return (
    <>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16}}>
        <div className="at-card">
          <div className="at-card-title">A · Bulk update</div>
          <div className="at-card-h">Mark everyone at once</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:14}}>
            <Field label="Group" required><input className="at-input" value={group} onChange={e=>setGroup(e.target.value)} placeholder="04"/></Field>
            <Field label="Subject" required><input className="at-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="CS201"/></Field>
            <div style={{gridColumn:'span 2'}}>
              <Field label="Status" required>
                <div style={{display:'flex', gap:8}}>
                  <button className="at-btn ghost sm" style={{flex:1, borderColor:'var(--ok)', color:'var(--ok)'}} onClick={()=>markBulk('Present')}><I.check size={11}/> Present</button>
                  <button className="at-btn ghost sm" style={{flex:1}} onClick={()=>markBulk('Absent')}>Absent</button>
                  <button className="at-btn ghost sm" style={{flex:1}} onClick={()=>markBulk('Late')}>Late</button>
                </div>
              </Field>
            </div>
          </div>
        </div>
        <div className="at-card">
          <div className="at-card-title">B · Individual</div>
          <div className="at-card-h">Find a student</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:14}}>
            <Field label="Roll number" required><input className="at-input" value={roll} onChange={e=>setRoll(e.target.value)} placeholder="21CSE047"/></Field>
            <Field label="Subject" required><input className="at-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="CS201"/></Field>
          </div>
          <button className="at-btn block" style={{marginTop:14}} onClick={showStudent}>Show student</button>
        </div>
      </div>

      {records.length > 0 && (
        <div className="at-card" style={{padding:0}}>
          <div style={{padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><div className="at-card-title">Record for {roll}</div><div className="at-card-h">{studentName} · Group {group || '04'}</div></div>
            <button className="at-btn sm primary" onClick={()=>toast.success('Changes saved')}><I.check size={11}/> Save changes</button>
          </div>
          <div style={{overflow:'auto'}}>
            <table className="at-table">
              <thead><tr><th>Date</th><th>Slot</th><th>Status</th><th>Recognized at</th><th style={{textAlign:'right'}}>Conf.</th></tr></thead>
              <tbody>
                {records.map((r,i)=>(
                  <tr key={i}>
                    <td>{r.date}</td><td className="at-mono">{r.slot}</td>
                    <td><span className={`at-badge ${r.status}`}>{r.status}</span></td>
                    <td className="at-mono">{r.time}</td>
                    <td className="at-mono" style={{textAlign:'right'}}>{r.conf==='—'?'—':r.conf+'%'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`@media(max-width:768px){.at-card:first-child{grid-template-columns:1fr!important}}`}</style>
    </>
  );
};

export default EditAttendance;
