import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const OTPInput = ({ digits, onChange, disabled }) => {
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
  return (
    <div className="at-otp">
      {digits.map((d, i) => (
        <input key={i} ref={el => refs.current[i] = el} value={d} maxLength={1}
          className={d ? 'filled' : ''} disabled={disabled}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}/>
      ))}
    </div>
  );
};

const VerificationPage = () => {
  const navigate = useNavigate();
  const [emailOtp, setEmailOtp] = useState(['','','','','','']);
  const [smsOtp, setSmsOtp] = useState(['','','','','','']);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [emailTimer, setEmailTimer] = useState(60);
  const [smsTimer, setSmsTimer] = useState(60);
  const [loading, setLoading] = useState({ email: false, sms: false });

  useEffect(() => {
    const t = setInterval(() => {
      setEmailTimer(p => p > 0 ? p - 1 : 0);
      setSmsTimer(p => p > 0 ? p - 1 : 0);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (emailVerified && smsVerified) {
      toast.success('Both verified! Redirecting...');
      setTimeout(() => navigate('/student/register2'), 1500);
    }
  }, [emailVerified, smsVerified, navigate]);

  const verifyEmail = async () => {
    const code = emailOtp.join('');
    if (code.length < 6) return toast.error('Enter all 6 digits');
    setLoading(p => ({...p, email: true}));
    try {
      await axios.post(`${API_URL}/api/student/verify-email-otp`, { emailOtp: code }, { withCredentials: true });
      setEmailVerified(true);
      toast.success('Email verified!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email OTP');
    } finally { setLoading(p => ({...p, email: false})); }
  };

  const verifySms = async () => {
    const code = smsOtp.join('');
    if (code.length < 6) return toast.error('Enter all 6 digits');
    setLoading(p => ({...p, sms: true}));
    try {
      await axios.post(`${API_URL}/api/student/verify-phone-otp`, { phoneOtp: code }, { withCredentials: true });
      setSmsVerified(true);
      toast.success('Phone verified!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid SMS OTP');
    } finally { setLoading(p => ({...p, sms: false})); }
  };

  const resendEmail = async () => {
    try {
      await axios.post(`${API_URL}/api/student/sendotpemail`, {}, { withCredentials: true });
      setEmailTimer(60);
      toast.success('Email OTP resent');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to resend'); }
  };

  const resendSms = async () => {
    try {
      await axios.post(`${API_URL}/api/student/sendotpphone`, {}, { withCredentials: true });
      setSmsTimer(60);
      toast.success('SMS OTP resent');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to resend'); }
  };

  useEffect(() => {
    if (emailOtp.every(d => d) && !emailVerified) verifyEmail();
  }, [emailOtp]);

  useEffect(() => {
    if (smsOtp.every(d => d) && !smsVerified) verifySms();
  }, [smsOtp]);

  return (
    <div className="at-root" style={{height:'100%'}}>
      <div className="at-auth">
        <div className="at-auth-left">
          <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
          <div>
            <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.12em', opacity:0.7, marginBottom:10}}>STEP 02 / 03 · VERIFY</div>
            <div className="at-auth-quote">We'll double-check both your <em>email</em> and your <em>phone</em>.</div>
            <div style={{display:'flex', gap:6, marginTop:28}}>
              <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
              <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
              <div style={{flex:1, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2}}/>
            </div>
          </div>
          <div style={{fontSize:11, opacity:0.55}}>Codes expire in 10 minutes.</div>
        </div>
        <div className="at-auth-right">
          <div className="at-auth-card" style={{maxWidth:420}}>
            <div className="at-auth-title">Verify it's you.</div>
            <div className="at-auth-sub">We sent codes to your email and phone number.</div>

            <div style={{marginTop:28, paddingBottom:20, borderBottom:'1px solid var(--line)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <span style={{fontSize:12, fontWeight:500}}><I.mail size={12} style={{verticalAlign:-2, marginRight:6}}/>Email code</span>
                {emailTimer > 0
                  ? <span style={{fontSize:11, color:'var(--ink-3)'}} className="at-mono">Resend in {emailTimer}s</span>
                  : <a onClick={resendEmail} style={{fontSize:11, color:'var(--indigo-700)', cursor:'pointer'}}>Resend email</a>}
              </div>
              <div style={{display:'flex', gap:14, alignItems:'center'}}>
                <OTPInput digits={emailOtp} onChange={setEmailOtp} disabled={emailVerified}/>
                {emailVerified && <span className="at-badge approved"><I.check size={11}/> Verified</span>}
              </div>
              {!emailVerified && emailOtp.every(d=>d) && (
                <button className="at-btn primary block" onClick={verifyEmail} disabled={loading.email} style={{marginTop:10}}>
                  {loading.email ? 'Verifying...' : 'Verify email code'}
                </button>
              )}
            </div>

            <div style={{paddingTop:20}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <span style={{fontSize:12, fontWeight:500}}><I.phone size={12} style={{verticalAlign:-2, marginRight:6}}/>SMS code</span>
                {smsTimer > 0
                  ? <span style={{fontSize:11, color:'var(--ink-3)'}} className="at-mono">Resend in {smsTimer}s</span>
                  : <a onClick={resendSms} style={{fontSize:11, color:'var(--indigo-700)', cursor:'pointer'}}>Resend SMS</a>}
              </div>
              <div style={{display:'flex', gap:14, alignItems:'center'}}>
                <OTPInput digits={smsOtp} onChange={setSmsOtp} disabled={smsVerified}/>
                {smsVerified && <span className="at-badge approved"><I.check size={11}/> Verified</span>}
              </div>
              {!smsVerified && smsOtp.every(d=>d) && (
                <button className="at-btn primary block" onClick={verifySms} disabled={loading.sms} style={{marginTop:10}}>
                  {loading.sms ? 'Verifying...' : 'Verify SMS code'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
