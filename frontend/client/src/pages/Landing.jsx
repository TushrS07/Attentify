import React from 'react';
import { Link } from 'react-router-dom';
import { I } from '../components/Icons';

const Landing = () => (
  <div className="at-root" style={{height:'100%', overflow:'auto', background:'var(--paper)'}}>
    {/* Sticky header */}
    <div style={{padding:'20px 48px', display:'flex', alignItems:'center', gap:14, borderBottom:'1px solid var(--line)', position:'sticky', top:0, background:'var(--paper)', zIndex:10, flexWrap:'wrap'}}>
      <div className="at-logo" style={{width:28, height:28, fontSize:18}}>A</div>
      <span style={{fontFamily:'var(--ff-display)', fontSize:22}}>Attentify</span>
      <div style={{flex:1}}/>
      <Link to="/teacher/login" style={{fontSize:12.5, color:'var(--ink-3)'}}>Teachers</Link>
      <Link to="/admin/login" style={{fontSize:12.5, color:'var(--ink-3)'}}>Admins</Link>
      <Link to="/student/login" className="at-btn ghost sm">Sign in</Link>
      <Link to="/student/register" className="at-btn primary sm">Get started <I.arrow size={13}/></Link>
    </div>

    {/* Hero */}
    <div className="at-landing-hero" style={{padding:'72px 48px 56px', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, alignItems:'center'}}>
      <div>
        <div style={{fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:18}}>Classroom attendance &middot; reimagined</div>
        <h1 className="at-serif" style={{fontSize:74, lineHeight:1, margin:0, letterSpacing:'-0.025em'}}>Attendance, <em style={{fontStyle:'italic', color:'var(--indigo-700)'}}>without</em> the roll&nbsp;call.</h1>
        <p style={{fontSize:15, color:'var(--ink-3)', maxWidth:520, marginTop:20, lineHeight:1.6}}>Attentify uses face recognition to mark a full class in under a minute — so teachers can teach, and students can learn.</p>
        <div style={{display:'flex', gap:10, marginTop:28, flexWrap:'wrap'}}>
          <Link to="/student/register" className="at-btn primary lg">Create student account</Link>
          <Link to="/teacher/login" className="at-btn ghost lg">Faculty login</Link>
        </div>
        <div style={{display:'flex', gap:28, marginTop:36, fontSize:11.5, color:'var(--ink-3)', flexWrap:'wrap'}}>
          <div><b className="at-mono" style={{color:'var(--ink)', fontSize:18, display:'block'}}>38<span style={{fontSize:11}}>s</span></b>avg class marked</div>
          <div><b className="at-mono" style={{color:'var(--ink)', fontSize:18, display:'block'}}>99.2<span style={{fontSize:11}}>%</span></b>match accuracy</div>
          <div><b className="at-mono" style={{color:'var(--ink)', fontSize:18, display:'block'}}>240+</b>institutions</div>
        </div>
      </div>
      <div style={{position:'relative', aspectRatio:'4/5', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{width:'100%', maxWidth:440, background:'white', border:'1px solid var(--line)', borderRadius:4, boxShadow:'0 20px 50px -20px rgba(15,14,23,0.18)', overflow:'hidden'}}>
          <div style={{padding:'11px 14px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', gap:8, background:'var(--paper-2)'}}>
            <div style={{display:'flex', gap:5}}>
              <span style={{width:9, height:9, borderRadius:'50%', background:'#E8E6DE'}}/>
              <span style={{width:9, height:9, borderRadius:'50%', background:'#E8E6DE'}}/>
              <span style={{width:9, height:9, borderRadius:'50%', background:'#E8E6DE'}}/>
            </div>
            <div style={{fontFamily:'var(--ff-mono)', fontSize:10.5, color:'var(--ink-3)', marginLeft:8}}>attentify / take-attendance</div>
            <div style={{flex:1}}/>
            <span style={{fontFamily:'var(--ff-mono)', fontSize:10, color:'#047857', background:'#D1FAE5', padding:'2px 7px', borderRadius:3}}>&#9679; LIVE</span>
          </div>
          <div style={{padding:'14px 16px'}}>
            <div style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:500}}>Session &middot; CS201 &middot; Grp 04</div>
            <div className="at-serif" style={{fontSize:22, marginTop:2}}>Data Structures</div>
          </div>
          <div style={{padding:'0 16px 12px'}}>
            <div style={{height:3, background:'var(--line)', borderRadius:2, overflow:'hidden'}}>
              <div style={{height:'100%', width:'87.5%', background:'var(--indigo-700)'}}/>
            </div>
          </div>
          {[['Priya Sharma','98.4%','just now'],['Arjun Mehta','97.1%','4s ago'],['Divya Rao','96.8%','9s ago']].map(([n,c,t],i)=>(
            <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'9px 16px', borderTop:'1px solid var(--line)', background: i===0?'var(--indigo-50)':'transparent'}}>
              <div style={{width:22, height:22, borderRadius:'50%', background:`linear-gradient(135deg, ${['#4338CA','#0EA5A4','#F59E0B'][i]}, ${['#6366F1','#14B8A6','#FBBF24'][i]})`, color:'white', fontSize:9.5, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center'}}>{n.split(' ').map(s=>s[0]).join('')}</div>
              <div style={{flex:1, fontSize:12, fontWeight:500}}>{n}</div>
              <span className="at-mono" style={{fontSize:10.5, color:'var(--ink-3)'}}>{c}</span>
              <span style={{fontSize:10, color: i===0?'var(--indigo-700)':'var(--ink-4)'}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Features */}
    <div style={{padding:'48px 48px 72px'}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:20}}>
        {[
          ['Face recognition', 'A full classroom marked before the lecture even starts.', I.camera],
          ['Live attendance', 'Real-time table updates as students arrive, with confidence scoring.', I.chart],
          ['Medical leave', 'Students apply with proof. Mentors approve in a click.', I.heart],
          ['Bulk onboarding', 'Upload an Excel roster. Accounts, emails, passwords — done.', I.upload],
        ].map(([t, d, IconC], i) => (
          <div key={i} className="at-card" style={{padding:22}}>
            <div style={{width:32, height:32, borderRadius:7, background:'var(--indigo-50)', color:'var(--indigo-700)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14}}><IconC size={18}/></div>
            <div className="at-card-h" style={{fontSize:17, marginBottom:6}}>{t}</div>
            <div style={{fontSize:12.5, color:'var(--ink-3)', lineHeight:1.55}}>{d}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div style={{borderTop:'1px solid var(--line)', padding:'20px 48px', display:'flex', justifyContent:'space-between', fontSize:11.5, color:'var(--ink-3)', flexWrap:'wrap', gap:10}}>
      <span>&copy; 2026 Attentify</span>
      <span>Student &middot; Teacher &middot; Admin</span>
    </div>

    {/* Responsive styles */}
    <style>{`
      @media (max-width: 768px) {
        .at-landing-hero {
          grid-template-columns: 1fr !important;
          padding: 36px 20px 40px !important;
        }
        .at-landing-hero h1 {
          font-size: 42px !important;
        }
      }
      @media (max-width: 480px) {
        .at-landing-hero h1 {
          font-size: 32px !important;
        }
      }
    `}</style>
  </div>
);

export default Landing;
