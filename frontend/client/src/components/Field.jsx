import React from 'react';

const Field = ({ label, required, hint, children }) => (
  <label className="at-field">
    <span className="at-label">{label}{required && <span className="req"> *</span>}</span>
    {children}
    {hint && <span style={{fontSize:11, color:'var(--ink-3)'}}>{hint}</span>}
  </label>
);

export default Field;
