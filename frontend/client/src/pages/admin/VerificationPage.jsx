import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const OTPInput = ({ digits, onChange, disabled, dark }) => {
  const refs = useRef([]);
  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    onChange(next);
    if (val && i < 5) refs.current[i+1]?.focus();
  };
  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i-1]?.focus();
  };
  const style = dark ? { background:'#131B2E', borderColor:'#2D3B5F', color:'#E6E8EE' } : {};
  return (
    <div className="at-otp">
      {digits.map((d, i) => (
        <input key={i} ref={el => refs.current[i] = el} value={d} maxLength={1}
          disabled={disabled} style={style}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}/>
      ))}
    </div>
  );
};

const AdminOTP = () => {
  const navigate = useNavigate();
  const [emailOtp, setEmailOtp] = useState(['','','','','','']);
  const [smsOtp, setSmsOtp] = useState(['','','','','','']);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [emailTimer, setEmailTimer] = useState(60);
  const [smsTimer, setSmsTimer] = useState(60);

  useEffect(() => {
    const t = setInterval(() => {
      setEmailTimer(p => p > 0 ? p - 1 : 0);
      setSmsTimer(p => p > 0 ? p - 1 : 0);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (emailVerified && smsVerified) {
      toast.success('Verified! Redirecting...');
      setTimeout(() => navigate('/admin'), 1500);
    }
  }, [emailVerified, smsVerified]);

  const verifyEmail = async () => {
    const code = emailOtp.join('');
    if (code.length < 6) return;
    try {
      await axios.post(`${API_URL}/api/admin/verify-email-otp`, { emailOtp: code }, { withCredentials:true });
      setEmailVerified(true);
    } catch (err) { toast.error(err.response?.data?.message || 'Invalid code'); }
  };

  const verifySms = async () => {
    const code = smsOtp.join('');
    if (code.length < 6) return;
    try {
      await axios.post(`${API_URL}/api/admin/verify-phone-otp`, { phoneOtp: code }, { withCredentials:true });
      setSmsVerified(true);
    } catch (err) { toast.error(err.response?.data?.message || 'Invalid code'); }
  };

  useEffect(() => { if (emailOtp.every(d=>d) && !emailVerified) verifyEmail(); }, [emailOtp]);
  useEffect(() => { if (smsOtp.every(d=>d) && !smsVerified) verifySms(); }, [smsOtp]);

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left admin">
          <div className="at-auth-brand" style={{color:'#E6E8EE'}}><div className="at-logo" style={{background:'#E6E8EE', color:'var(--admin-slate)'}}>A</div> Attentify</div>
          <div>
            <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.15em', color:'#6366F1', marginBottom:12}}>◉ 2-STEP VERIFICATION</div>
            <div className="at-auth-quote" style={{color:'#E6E8EE'}}>Admin accounts require <em>both</em> codes. Always.</div>
          </div>
          <div style={{fontSize:11, color:'#6B738A'}}>Codes expire in 10 minutes.</div>
        </div>
        <div className="at-auth-right" style={{background:'#0B1220', color:'#E6E8EE'}}>
          <div className="at-auth-card" style={{maxWidth:420}}>
            <div className="at-auth-title" style={{color:'#fff'}}>Verify administrator.</div>
            <div className="at-auth-sub" style={{color:'#8B93A7'}}>Codes sent to your email and phone.</div>

            <div style={{marginTop:28, paddingBottom:20, borderBottom:'1px solid #1F2A45'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:12}}>
                <span style={{color:'#E6E8EE'}}><I.mail size={12} style={{verticalAlign:-2, marginRight:6}}/>Email code</span>
                <span className="at-mono" style={{color:'#8B93A7'}}>{emailTimer>0?`Resend in ${emailTimer}s`:'Resend'}</span>
              </div>
              <OTPInput digits={emailOtp} onChange={setEmailOtp} disabled={emailVerified} dark/>
              {emailVerified && <span className="at-badge approved" style={{marginTop:10, display:'inline-flex'}}><I.check size={11}/> Verified</span>}
            </div>

            <div style={{paddingTop:20}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:12}}>
                <span style={{color:'#E6E8EE'}}><I.phone size={12} style={{verticalAlign:-2, marginRight:6}}/>SMS code</span>
                <span style={{color:'#6366F1', fontSize:11}}>{smsTimer>0?`${smsTimer}s`:'Resend'}</span>
              </div>
              <OTPInput digits={smsOtp} onChange={setSmsOtp} disabled={smsVerified} dark/>
              {smsVerified && <span className="at-badge approved" style={{marginTop:10, display:'inline-flex'}}><I.check size={11}/> Verified</span>}
              {!smsVerified && smsOtp.every(d=>d) && (
                <button className="at-btn block" style={{background:'#6366F1', borderColor:'#6366F1', marginTop:14}} onClick={verifySms}>Verify and continue</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOTP;
