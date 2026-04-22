import React from 'react';

const StudentTimetable = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat'];
  const slots = [
    ['09:00',['Math','CS','Math','Phys','CS','Free']],
    ['10:30',['Phys','Eng','Chem','CS','Math','Free']],
    ['12:00',['—','—','—','—','—','—']],
    ['13:30',['Chem','Hist','CS Lab','Eng','Phys','Sports']],
    ['15:00',['CS Lab','Math','CS Lab','Hist','Chem','—']],
  ];

  return (
    <>
      <div className="at-banner" style={{marginBottom:16}}>
        <h2>Week of {new Date().toLocaleDateString('en-US',{day:'numeric',month:'long'})}.</h2>
        <p>Your personal schedule.</p>
      </div>
      <div className="at-card" style={{padding:0, overflow:'auto'}}>
        <table className="at-table">
          <thead>
            <tr><th></th>{days.map(d=><th key={d}>{d}</th>)}</tr>
          </thead>
          <tbody>
            {slots.map(([t, row], i) => (
              <tr key={i}>
                <td className="at-mono" style={{fontSize:11}}>{t}</td>
                {row.map((c,j)=>(
                  <td key={j} style={{background: c==='—'?'var(--paper-2)':'transparent', color: c==='—'?'var(--ink-4)':'inherit'}}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:10, fontStyle:'italic'}}>
        If the timetable doesn't appear, it might not have been uploaded yet.
      </div>
    </>
  );
};

export default StudentTimetable;
