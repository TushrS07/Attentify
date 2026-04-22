import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { I } from '../../components/Icons';
import { BarChart, Pie } from '../../components/Charts';
import { API_URL } from '../../config/api';
import { toast } from '../../components/Toast';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/teacher/profile`, { withCredentials: true })
      .then(res => setTeacher(res.data.profile || res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const name = teacher?.name || 'Faculty';
  const firstName = name.split(' ').pop();

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}><div className="at-spinner"/></div>;

  return (
    <>
      <div style={{marginBottom:20}}>
        <div className="at-serif" style={{fontSize:32}}>Welcome back, {name.includes(' ') ? name : firstName}.</div>
        <div style={{color:'var(--ink-3)', fontSize:13, marginTop:4}}>4 classes today.</div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:14, marginBottom:16}}>
        <div className="at-stat">
          <div className="at-stat-label">Total students</div>
          <div className="at-stat-value">128</div>
          <div className="at-stat-sub"><span className="at-stat-delta up">+4</span> this term</div>
        </div>
        <div className="at-stat">
          <div className="at-stat-label">Average attendance</div>
          <div className="at-stat-value">87.4<span style={{fontSize:22, color:'var(--ink-3)'}}>%</span></div>
          <div className="at-stat-sub"><span className="at-stat-delta up">↑ 1.8</span> vs last month</div>
        </div>
        <div className="at-stat">
          <div className="at-stat-label">Active classes</div>
          <div className="at-stat-value">6</div>
          <div className="at-stat-sub"><span style={{width:6, height:6, borderRadius:'50%', background:'var(--ok)', display:'inline-block'}}/> 1 in session now</div>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:14}}>
        <div className="at-card">
          <div className="at-card-title">This week</div>
          <div className="at-card-h">Attendance distribution</div>
          <div style={{display:'flex', alignItems:'center', gap:18, marginTop:16, flexWrap:'wrap'}}>
            <Pie slices={[{value:78, color:'var(--indigo-700)'},{value:14, color:'#FCA5A5'},{value:8, color:'#FCD34D'}]} size={130}/>
            <div style={{flex:1, minWidth:120}}>
              {[['Present','78%','var(--indigo-700)'],['Absent','14%','#FCA5A5'],['On leave','8%','#FCD34D']].map(([l,v,c],i)=>(
                <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:i<2?'1px solid var(--line)':'none'}}>
                  <span style={{display:'flex', alignItems:'center', gap:8, fontSize:12.5}}><span style={{width:10, height:10, background:c, borderRadius:2}}/>{l}</span>
                  <span className="at-mono" style={{fontSize:13}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="at-card">
          <div className="at-card-title">Classes I teach</div>
          <div className="at-card-h">Performance overview</div>
          <div style={{marginTop:14}}>
            <BarChart data={[{label:'CS201·G04',value:92,value2:88},{label:'CS201·G07',value:78,value2:81},{label:'CS301·G04',value:85,value2:90},{label:'CS401·G02',value:81,value2:77}]} color="var(--indigo-700)" color2="#10B981" max={100}/>
            <div style={{display:'flex', gap:18, fontSize:11, color:'var(--ink-3)', marginTop:8}}>
              <span><span style={{display:'inline-block', width:9, height:9, background:'var(--indigo-700)', marginRight:5, borderRadius:2}}/>Avg score</span>
              <span><span style={{display:'inline-block', width:9, height:9, background:'#10B981', marginRight:5, borderRadius:2}}/>Attendance %</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
