import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { I } from '../../components/Icons';
import { BarChart, Donut } from '../../components/Charts';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const subjects = ['Math','Science','English','History','Computer','Physics','Chemistry','Biology'];
const mockData = {
  Math: { total: 42, attended: 38 }, Science: { total: 40, attended: 36 },
  English: { total: 38, attended: 35 }, History: { total: 36, attended: 30 },
  Computer: { total: 48, attended: 44 }, Physics: { total: 44, attended: 40 },
  Chemistry: { total: 40, attended: 34 }, Biology: { total: 38, attended: 33 },
};

const StudentAttendance = () => {
  const [selected, setSelected] = useState('Computer');
  const d = mockData[selected];
  const missed = d.total - d.attended;
  const pct = ((d.attended / d.total) * 100).toFixed(1);

  return (
    <>
      <div className="at-banner" style={{marginBottom:16}}>
        <h2>Your subject attendance.</h2>
        <p>Stay above 75% to remain exam-eligible.</p>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:16, flexWrap:'wrap'}}>
        {subjects.map(s => (
          <span key={s} className={s === selected ? 'at-pill' : ''} onClick={() => setSelected(s)}
            style={s === selected ? {cursor:'pointer'} : {padding:'3px 8px', fontSize:11, color:'var(--ink-3)', cursor:'pointer'}}>
            {s}
          </span>
        ))}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        <div className="at-card">
          <div className="at-card-title">{selected}</div>
          <div className="at-card-h">Total vs attended</div>
          <div style={{display:'flex', gap:20, margin:'14px 0'}}>
            <div><div style={{fontSize:10, color:'var(--ink-3)'}}>TOTAL</div><div className="at-serif" style={{fontSize:32}}>{d.total}</div></div>
            <div><div style={{fontSize:10, color:'var(--ink-3)'}}>ATTENDED</div><div className="at-serif" style={{fontSize:32, color:'var(--indigo-700)'}}>{d.attended}</div></div>
            <div><div style={{fontSize:10, color:'var(--ink-3)'}}>MISSED</div><div className="at-serif" style={{fontSize:32, color:'var(--err)'}}>{missed}</div></div>
          </div>
          <BarChart data={[
            {label:'Jan', value:Math.round(d.total/4), value2:Math.round(d.attended/4)},
            {label:'Feb', value:Math.round(d.total/4)+1, value2:Math.round(d.attended/4)+1},
            {label:'Mar', value:Math.round(d.total/4)+2, value2:Math.round(d.attended/4)},
            {label:'Apr', value:Math.round(d.total/4)-1, value2:Math.round(d.attended/4)-2},
          ]} color="var(--line-2)" color2="var(--indigo-700)" max={Math.round(d.total/4)+4}/>
        </div>
        <div className="at-card" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div className="at-card-title" style={{alignSelf:'flex-start'}}>Rate</div>
          <div className="at-card-h" style={{alignSelf:'flex-start'}}>Present vs absent</div>
          <div style={{marginTop:10}}>
            <Donut slices={[{value:parseFloat(pct), color:'var(--indigo-700)'},{value:100-parseFloat(pct), color:'var(--paper-2)'}]}
              center={<div><div className="at-serif" style={{fontSize:36, letterSpacing:'-0.02em'}}>{pct}<span style={{fontSize:16}}>%</span></div><div style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase'}}>Present</div></div>}/>
          </div>
          <div style={{display:'flex', gap:18, marginTop:14, fontSize:11.5, color:'var(--ink-3)'}}>
            <span><span style={{display:'inline-block', width:9, height:9, background:'var(--indigo-700)', marginRight:5, borderRadius:2, verticalAlign:-1}}/>Present {d.attended}</span>
            <span><span style={{display:'inline-block', width:9, height:9, background:'var(--paper-2)', marginRight:5, borderRadius:2, border:'1px solid var(--line)', verticalAlign:-1}}/>Absent {missed}</span>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.at-card{min-width:0}}`}</style>
    </>
  );
};

export default StudentAttendance;
