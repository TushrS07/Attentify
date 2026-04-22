import React, { useState } from 'react';
import { I } from '../../components/Icons';
import { toast } from '../../components/Toast';

const mockLeaves = [
  { id:1, name:'Priya Sharma', roll:'21CSE047', group:'04', dates:'18–20 Apr', days:3, reason:'Viral fever', status:'pending', file:'proof_21cse047.pdf' },
  { id:2, name:'Arjun Mehta', roll:'21CSE048', group:'04', dates:'19–21 Apr', days:3, reason:'Family emergency', status:'pending', file:'proof_21cse048.pdf' },
  { id:3, name:'Nisha Patel', roll:'21CSE051', group:'04', dates:'20 Apr', days:1, reason:'Dental procedure', status:'pending', file:'proof_21cse051.pdf' },
  { id:4, name:'Rohan Das', roll:'21CSE050', group:'04', dates:'22–23 Apr', days:2, reason:'Flu symptoms', status:'pending', file:'proof_21cse050.pdf' },
  { id:5, name:'Kavya Rao', roll:'21CSE049', group:'04', dates:'10–11 Apr', days:2, reason:'Migraine', status:'approved' },
  { id:6, name:'Vikram Shah', roll:'21CSE052', group:'04', dates:'05 Apr', days:1, reason:'Eye checkup', status:'rejected' },
];

const MedicalReport = () => {
  const [leaves, setLeaves] = useState(mockLeaves);
  const [tab, setTab] = useState('pending');

  const act = (id, status) => {
    setLeaves(leaves.map(l => l.id===id ? {...l, status} : l));
    toast.success(`Leave ${status}`);
  };

  const pending = leaves.filter(l=>l.status==='pending');
  const approved = leaves.filter(l=>l.status==='approved');
  const rejected = leaves.filter(l=>l.status==='rejected');
  const filtered = tab==='pending'?pending : tab==='approved'?approved : rejected;

  return (
    <>
      <div className="at-tabs" style={{marginBottom:16}}>
        {[['pending','Pending',pending.length],['approved','Approved',approved.length],['rejected','Rejected',rejected.length]].map(([k,l,c])=>(
          <div key={k} className={`at-tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>{l} <span className="count">{c}</span></div>
        ))}
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:12}}>
        {filtered.map(l => (
          <div key={l.id} className="at-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
              <div style={{display:'flex', gap:10, alignItems:'center'}}>
                <div style={{width:34, height:34, borderRadius:'50%', background:'var(--indigo-50)', color:'var(--indigo-700)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:500}}>{l.name.split(' ').map(x=>x[0]).join('')}</div>
                <div>
                  <div style={{fontSize:13, fontWeight:500}}>{l.name}</div>
                  <div style={{fontSize:11, color:'var(--ink-3)'}}>Roll {l.roll} · Group {l.group}</div>
                </div>
              </div>
              <span className={`at-badge ${l.status}`}>{l.status}</span>
            </div>
            <div style={{fontSize:12.5, color:'var(--ink-2)', padding:'10px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
              <div style={{display:'flex', gap:16, marginBottom:6}}><span style={{color:'var(--ink-3)', width:60}}>Dates</span><span>{l.dates} · {l.days} day{l.days>1?'s':''}</span></div>
              <div style={{display:'flex', gap:16, marginBottom:6}}><span style={{color:'var(--ink-3)', width:60}}>Reason</span><span>{l.reason}</span></div>
              {l.file && <div style={{display:'flex', gap:16}}><span style={{color:'var(--ink-3)', width:60}}>Proof</span><a style={{color:'var(--indigo-700)', display:'inline-flex', alignItems:'center', gap:4}}><I.file size={11}/> {l.file}</a></div>}
            </div>
            {l.status === 'pending' && (
              <div style={{display:'flex', gap:8, marginTop:10}}>
                <button className="at-btn danger sm block" onClick={()=>act(l.id,'rejected')}><I.x size={11}/> Reject</button>
                <button className="at-btn success sm block" onClick={()=>act(l.id,'approved')} style={{background:'var(--ok)', borderColor:'var(--ok)'}}><I.check size={11}/> Approve</button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div style={{color:'var(--ink-3)', fontSize:13, padding:20}}>No {tab} leaves.</div>}
      </div>
    </>
  );
};

export default MedicalReport;
