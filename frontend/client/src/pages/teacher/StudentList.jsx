import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentList = () => {
  const [group, setGroup] = useState('');
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    if (!group) return toast.error('Select a group');
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/teacher/allstudents`, { params: { group }, withCredentials: true });
      setStudents(res.data.students || []);
      if ((res.data.students || []).length === 0) toast.error('No students found');
      else toast.success(`${res.data.students.length} students loaded`);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to fetch'); }
    finally { setLoading(false); }
  };

  const download = () => {
    if (!students.length) return toast.error('No data');
    const data = students.map(s => ({ Roll: s.rollNumber, Name: s.name, Email: s.email, Phone: s.phone }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, `Group${group}_Students.xlsx`);
  };

  const filtered = students.filter(s =>
    (s.name||'').toLowerCase().includes(search.toLowerCase()) ||
    (s.rollNumber||'').toLowerCase().includes(search.toLowerCase()) ||
    (s.email||'').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="at-card" style={{padding:14, marginBottom:14}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr auto auto', gap:10, alignItems:'end'}}>
          <Field label="Group" required><input className="at-input" value={group} onChange={e=>setGroup(e.target.value)} placeholder="04"/></Field>
          <button className="at-btn" onClick={fetch} disabled={loading}>{loading?'Loading...':'Fetch'}</button>
          <button className="at-btn primary" onClick={download}><I.download size={12}/> Download</button>
        </div>
      </div>

      {students.length > 0 && (
        <div className="at-card" style={{padding:0}}>
          <div style={{padding:'12px 18px', borderBottom:'1px solid var(--line)', display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
            <div className="at-input-wrap" style={{flex:1, maxWidth:280}}>
              <I.search size={13} style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--ink-4)'}}/>
              <input className="at-input" placeholder="Search by name or roll..." value={search} onChange={e=>setSearch(e.target.value)} style={{paddingLeft:32}}/>
            </div>
            <span style={{fontSize:12, color:'var(--ink-3)'}}>{filtered.length} students · Group {group}</span>
          </div>
          <div style={{overflow:'auto'}}>
            <table className="at-table">
              <thead><tr><th>Roll</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
              <tbody>
                {filtered.map((s,i) => (
                  <tr key={i}>
                    <td className="at-mono">{s.rollNumber}</td>
                    <td style={{fontWeight:500}}>{s.name}</td>
                    <td className="at-mono" style={{fontSize:11.5}}>{s.email}</td>
                    <td className="at-mono" style={{fontSize:11.5}}>{s.phone}</td>
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

export default StudentList;
