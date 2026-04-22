import React from 'react';
import { I } from './Icons';

const Header = ({ crumb, title, name = '', initials = '', style = {} }) => (
  <div className="at-header" style={style}>
    <div>
      {crumb && <div className="at-header-crumb">{crumb}</div>}
      <div className="at-header-title">{title}</div>
    </div>
    <div className="at-header-spacer"/>
    <div className="at-header-bell"><I.bell size={17}/><span className="dot"/></div>
    {name && (
      <div style={{display:'flex', alignItems:'center', gap:9}}>
        <div style={{textAlign:'right', lineHeight:1.2}}>
          <div style={{fontSize:12, fontWeight:500}}>{name}</div>
        </div>
        <div className="at-avatar">{initials}</div>
      </div>
    )}
  </div>
);

export default Header;
