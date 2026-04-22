import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const GenerateSheet = () => {
  const [subject, setSubject] = useState('');
  const [group, setGroup] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState('');
  const [records, setRecords] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!subject || !group || !slot) return toast.error('Fill all fields');
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/attendance/records`, {
        params: { subjectId: subject, sectionId: group, date, lectures: slot }, withCredentials: true
      });
      setRecords(res.data.attendance || []);
      setTeacherId(res.data.teacherId || '');
      if ((res.data.attendance || []).length === 0) toast.error('No records found');
      else toast.success(`${res.data.attendance.length} records loaded`);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to fetch records'); }
    finally { setLoading(false); }
  };

  const download = () => {
    if (!records.length) return toast.error('No data to download');
    const data = records.map(r => ({
      'Student ID': r.studentId || r._id, 'Roll': r.rollNumber || '', 'Status': r.status,
      'Slot': slot, 'Section': group, 'Subject': subject, 'Teacher': teacherId, 'Date': date
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, `${subject}_Group${group}_${date}_attendance.xlsx`);
    toast.success('Downloaded');
  };

  const present = records.filter(r=>r.status==='Present').length;
  const absent = records.filter(r=>r.status==='Absent').length;
  const late = records.filter(r=>r.status==='Late').length;

  return (
    <>
      <div className="at-card" style={{padding:16, marginBottom:14}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr)) auto auto', gap:10, alignItems:'end'}}>
          <Field label="Subject" required><input className="at-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="CS201"/></Field>
          <Field label="Group" required><input className="at-input" value={group} onChange={e=>setGroup(e.target.value)} placeholder="04"/></Field>
          <Field label="Date" required><input className="at-input" type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
          <Field label="Lecture slot" required>
            <select className="at-select" value={slot} onChange={e=>setSlot(e.target.value)}>
              <option value="">Select</option><option value="1-3">1-3 pm</option><option value="3-5">3-5 pm</option><option value="5-8">5-8 pm</option>
            </select>
          </Field>
          <button className="at-btn primary" onClick={generate} disabled={loading}>{loading?'Loading...':'Generate'}</button>
          <button className="at-btn ghost" onClick={download}><I.download size={12}/> Download .xlsx</button>
        </div>
      </div>

      {records.length > 0 && (
        <div className="at-card" style={{padding:0}}>
          <div style={{padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8}}>
            <div><div className="at-card-title">{subject} · Group {group} · {date} · Slot {slot}</div><div className="at-card-h">{records.length} records</div></div>
            <div style={{display:'flex', gap:14, fontSize:12, color:'var(--ink-3)'}}>
              <span>Present <b className="at-mono" style={{color:'var(--ok)'}}>{present}</b></span>
              <span>Absent <b className="at-mono" style={{color:'var(--err)'}}>{absent}</b></span>
              <span>Late <b className="at-mono" style={{color:'var(--warn)'}}>{late}</b></span>
            </div>
          </div>
          <div style={{overflow:'auto'}}>
            <table className="at-table">
              <thead><tr><th>Student ID</th><th>Status</th><th>Slot</th><th>Section</th><th>Subject</th><th>Date</th></tr></thead>
              <tbody>
                {records.map((r,i) => (
                  <tr key={i}>
                    <td className="at-mono">{r.studentId || r._id}</td>
                    <td><span className={`at-badge ${(r.status||'').toLowerCase()}`}>{r.status}</span></td>
                    <td className="at-mono">{slot}</td><td className="at-mono">{group}</td><td className="at-mono">{subject}</td><td className="at-mono">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateSheet;
