import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import { BarChart, LineChart } from '../../components/Charts';
import { API_URL } from '../../config/api';
import { toast } from '../../components/Toast';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/student/details`, { withCredentials: true })
      .then(res => setStudent(res.data.student || res.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const name = student?.name?.split(' ')[0] || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = new Date().toLocaleDateString('en-US', { weekday:'long', day:'numeric', month:'long' });

  const subjectData = [
    { label:'Math', value:87 }, { label:'CS', value:94 }, { label:'Phys', value:78 },
    { label:'Chem', value:82 }, { label:'Eng', value:91 }, { label:'Hist', value:74 },
  ];
  const weeklyData = [
    { label:'Mon', value:5 }, { label:'Tue', value:4 }, { label:'Wed', value:6 },
    { label:'Thu', value:5 }, { label:'Fri', value:3 }, { label:'Sat', value:2 },
  ];

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}><div className="at-spinner"/></div>;

  return (
    <>
      <div style={{marginBottom:20}}>
        <div className="at-serif" style={{fontSize:32, letterSpacing:'-0.02em'}}>{greeting}, {name}.</div>
        <div style={{color:'var(--ink-3)', fontSize:13, marginTop:4}}>{dateStr}</div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:14, marginBottom:20}}>
        <div className="at-stat">
          <div className="at-stat-label">Overall score</div>
          <div className="at-stat-value" style={{color:'var(--indigo-700)'}}>A+</div>
          <div className="at-stat-sub"><span className="at-stat-delta up">&uarr; 0.3</span> vs last term</div>
        </div>
        <div className="at-stat">
          <div className="at-stat-label">Attendance</div>
          <div className="at-stat-value">91.3<span style={{fontSize:22, color:'var(--ink-3)'}}>%</span></div>
          <div className="at-stat-sub"><span className="at-stat-delta up">&uarr; 2.1</span> 4 classes missed</div>
        </div>
        <div className="at-stat">
          <div className="at-stat-label">Assignments</div>
          <div className="at-stat-value">12<span style={{fontSize:22, color:'var(--ink-3)'}}>/14</span></div>
          <div className="at-stat-sub">2 pending &middot; next due Friday</div>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:14}}>
        <div className="at-card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap:8}}>
            <div><div className="at-card-title">Subject performance</div><div className="at-card-h">Marks out of 100</div></div>
            <div className="at-pill">This term</div>
          </div>
          <div style={{marginTop:14}}><BarChart data={subjectData} max={100} color="var(--indigo-700)"/></div>
        </div>
        <div className="at-card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap:8}}>
            <div><div className="at-card-title">This week</div><div className="at-card-h">Classes attended</div></div>
            <div className="at-pill">25 / 30</div>
          </div>
          <div style={{marginTop:14}}><LineChart data={weeklyData}/></div>
        </div>
      </div>
      <div className="at-card" style={{marginTop:14}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, flexWrap:'wrap', gap:8}}>
          <div className="at-card-h">Up next</div>
          <Link to="/student/timetable" style={{fontSize:12, color:'var(--indigo-700)'}}>View timetable &rarr;</Link>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:10}}>
          {[['14:00','Data Structures','Dr. Iyer \u00b7 Room 302','now'],['15:30','Computer Networks','Prof. Rao \u00b7 Lab B','in 90m'],['17:00','English','Ms. Lall \u00b7 Room 118','in 3h']].map((r,i)=>(
            <div key={i} style={{border:'1px solid var(--line)', borderRadius:8, padding:12, background: i===0?'var(--indigo-50)':'transparent'}}>
              <div className="at-mono" style={{fontSize:11, color:'var(--ink-3)'}}>{r[0]} &middot; {r[3]}</div>
              <div style={{fontSize:13, fontWeight:500, marginTop:4}}>{r[1]}</div>
              <div style={{fontSize:11.5, color:'var(--ink-3)'}}>{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
