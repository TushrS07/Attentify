import React from 'react';
import { Link } from 'react-router-dom';
import { I } from '../components/Icons';

const NotFound = () => (
  <div className="at-root" style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
    <div style={{textAlign:'center', maxWidth:420, padding:20}}>
      <div className="at-mono" style={{fontSize:12, color:'var(--ink-3)', letterSpacing:'0.15em'}}>ERROR &middot; 404</div>
      <h1 className="at-serif" style={{fontSize:88, margin:'12px 0 8px', letterSpacing:'-0.03em'}}>Not on the register.</h1>
      <p style={{color:'var(--ink-3)', fontSize:14, marginBottom:24}}>We couldn't find the page you were looking for.</p>
      <Link to="/" className="at-btn primary lg"><I.left size={13}/> Back to home</Link>
    </div>
  </div>
);

export default NotFound;
