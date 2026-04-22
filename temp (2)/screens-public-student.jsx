/* global React, Sidebar, Header, BarChart, LineChart, Donut, Pie, Field, I, Toast */
// Public + Student screens

const Landing = () => (
  <div className="at-root" style={{height:'100%', overflow:'auto', background:'var(--paper)'}}>
    <div style={{padding:'20px 48px', display:'flex', alignItems:'center', gap:14, borderBottom:'1px solid var(--line)', position:'sticky', top:0, background:'var(--paper)', zIndex:10}}>
      <div className="at-logo" style={{width:28, height:28, fontSize:18}}>A</div>
      <span style={{fontFamily:'var(--ff-display)', fontSize:22}}>Attentify</span>
      <div style={{flex:1}}/>
      <a style={{fontSize:12.5, color:'var(--ink-3)'}}>Teachers</a>
      <a style={{fontSize:12.5, color:'var(--ink-3)'}}>Admins</a>
      <button className="at-btn ghost sm">Sign in</button>
      <button className="at-btn primary sm">Get started <I.arrow size={13}/></button>
    </div>
    <div style={{padding:'72px 48px 56px', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, alignItems:'center'}}>
      <div>
        <div style={{fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:18}}>Classroom attendance · reimagined</div>
        <h1 className="at-serif" style={{fontSize:74, lineHeight:1, margin:0, letterSpacing:'-0.025em'}}>Attendance, <em style={{fontStyle:'italic', color:'var(--indigo-700)'}}>without</em> the roll&nbsp;call.</h1>
        <p style={{fontSize:15, color:'var(--ink-3)', maxWidth:520, marginTop:20, lineHeight:1.6}}>Attentify uses face recognition to mark a full class in under a minute — so teachers can teach, and students can learn.</p>
        <div style={{display:'flex', gap:10, marginTop:28}}>
          <button className="at-btn primary lg">Create student account</button>
          <button className="at-btn ghost lg">Book a demo</button>
        </div>
        <div style={{display:'flex', gap:28, marginTop:36, fontSize:11.5, color:'var(--ink-3)'}}>
          <div><b className="at-mono" style={{color:'var(--ink)', fontSize:18, display:'block'}}>38<span style={{fontSize:11}}>s</span></b>avg class marked</div>
          <div><b className="at-mono" style={{color:'var(--ink)', fontSize:18, display:'block'}}>99.2<span style={{fontSize:11}}>%</span></b>match accuracy</div>
          <div><b className="at-mono" style={{color:'var(--ink)', fontSize:18, display:'block'}}>240+</b>institutions</div>
        </div>
      </div>
      <div style={{position:'relative', aspectRatio:'4/5'}}>
        {/* Main card — live session panel */}
        <div style={{position:'absolute', inset:'0 14% 18% 0', background:'white', border:'1px solid var(--line)', borderRadius:4, boxShadow:'0 20px 50px -20px rgba(15,14,23,0.18), 0 4px 12px -4px rgba(15,14,23,0.06)', overflow:'hidden', display:'flex', flexDirection:'column'}}>
          {/* window chrome */}
          <div style={{padding:'11px 14px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', gap:8, background:'var(--paper-2)'}}>
            <div style={{display:'flex', gap:5}}>
              <span style={{width:9, height:9, borderRadius:'50%', background:'#E8E6DE'}}/>
              <span style={{width:9, height:9, borderRadius:'50%', background:'#E8E6DE'}}/>
              <span style={{width:9, height:9, borderRadius:'50%', background:'#E8E6DE'}}/>
            </div>
            <div style={{fontFamily:'var(--ff-mono)', fontSize:10.5, color:'var(--ink-3)', marginLeft:8, letterSpacing:'0.04em'}}>attentify.edu / take-attendance</div>
            <div style={{flex:1}}/>
            <span style={{fontFamily:'var(--ff-mono)', fontSize:10, color:'#047857', background:'#D1FAE5', padding:'2px 7px', borderRadius:3, letterSpacing:'0.05em'}}>● LIVE</span>
          </div>
          {/* session meta */}
          <div style={{padding:'14px 16px 10px', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div>
              <div style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:500}}>Session · CS201 · Grp 04</div>
              <div className="at-serif" style={{fontSize:22, letterSpacing:'-0.015em', marginTop:2}}>Data Structures</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="at-mono" style={{fontSize:20, color:'var(--ink)', letterSpacing:'-0.02em'}}>28<span style={{color:'var(--ink-4)', fontSize:13}}>/32</span></div>
              <div style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'0.06em'}}>MARKED</div>
            </div>
          </div>
          {/* progress */}
          <div style={{padding:'0 16px 12px'}}>
            <div style={{height:3, background:'var(--line)', borderRadius:2, overflow:'hidden'}}>
              <div style={{height:'100%', width:'87.5%', background:'var(--indigo-700)'}}/>
            </div>
          </div>
          {/* attendance feed */}
          <div style={{flex:1, borderTop:'1px solid var(--line)'}}>
            {[
              ['Priya Sharma', '21CSE047', '98.4', '14:02:18', 'just now'],
              ['Arjun Mehta', '21CSE012', '97.1', '14:02:14', '4s ago'],
              ['Divya Rao', '21CSE089', '96.8', '14:02:09', '9s ago'],
              ['Karan Iyer', '21CSE034', '94.2', '14:02:03', '15s ago'],
            ].map(([n, r, c, t, ago], i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'22px 1fr auto auto', gap:10, alignItems:'center', padding:'9px 16px', borderBottom: i<3 ? '1px solid var(--line)' : 'none', background: i===0 ? 'var(--indigo-50)' : 'transparent'}}>
                <div style={{width:22, height:22, borderRadius:'50%', background:`linear-gradient(135deg, ${['#4338CA','#0EA5A4','#F59E0B','#EF4444'][i]} 0%, ${['#6366F1','#14B8A6','#FBBF24','#F87171'][i]} 100%)`, color:'white', fontSize:9.5, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', letterSpacing:'0.02em'}}>{n.split(' ').map(s=>s[0]).join('')}</div>
                <div>
                  <div style={{fontSize:12, fontWeight:500}}>{n}</div>
                  <div className="at-mono" style={{fontSize:9.5, color:'var(--ink-3)'}}>{r}</div>
                </div>
                <div className="at-mono" style={{fontSize:10.5, color:'var(--ink-3)'}}>{c}%</div>
                <div style={{fontSize:10, color: i===0 ? 'var(--indigo-700)' : 'var(--ink-4)', fontWeight: i===0 ? 500 : 400}}>{ago}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating stat card — bottom right */}
        <div style={{position:'absolute', right:0, bottom:0, width:'58%', background:'var(--ink)', color:'white', borderRadius:4, padding:'16px 18px', boxShadow:'0 20px 40px -15px rgba(15,14,23,0.35)'}}>
          <div style={{fontSize:10, color:'rgba(255,255,255,0.55)', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500}}>Avg mark time</div>
          <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:6}}>
            <div className="at-serif" style={{fontSize:38, lineHeight:1, letterSpacing:'-0.03em'}}>38<span style={{fontSize:18, opacity:0.6}}>s</span></div>
            <div className="at-mono" style={{fontSize:10, color:'#86EFAC', marginLeft:'auto'}}>↓ 94% vs manual</div>
          </div>
          {/* tiny sparkline */}
          <svg width="100%" height="28" viewBox="0 0 160 28" style={{marginTop:10, display:'block'}}>
            <path d="M0 20 L20 18 L40 22 L60 14 L80 16 L100 10 L120 12 L140 6 L160 8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none"/>
            <path d="M0 20 L20 18 L40 22 L60 14 L80 16 L100 10 L120 12 L140 6 L160 8 L160 28 L0 28Z" fill="rgba(255,255,255,0.08)"/>
          </svg>
        </div>
      </div>
    </div>
    <div style={{padding:'48px 48px 72px'}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
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
    <div style={{borderTop:'1px solid var(--line)', padding:'20px 48px', display:'flex', justifyContent:'space-between', fontSize:11.5, color:'var(--ink-3)'}}>
      <span>© 2026 Attentify</span>
      <span>Student · Teacher · Admin</span>
    </div>
  </div>
);

const NotFound = () => (
  <div className="at-root" style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--paper)'}}>
    <div style={{textAlign:'center', maxWidth:420}}>
      <div className="at-mono" style={{fontSize:12, color:'var(--ink-3)', letterSpacing:'0.15em'}}>ERROR · 404</div>
      <h1 className="at-serif" style={{fontSize:88, margin:'12px 0 8px', letterSpacing:'-0.03em'}}>Not on the register.</h1>
      <p style={{color:'var(--ink-3)', fontSize:14, marginBottom:24}}>We couldn't find the page you were looking for. It may have been renamed, moved, or simply never existed.</p>
      <button className="at-btn primary lg"><I.left size={13}/> Back to home</button>
    </div>
  </div>
);

const ErrorBoundary = () => (
  <div className="at-root" style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--paper)'}}>
    <div style={{textAlign:'center', maxWidth:440}}>
      <div style={{width:52, height:52, margin:'0 auto 18px', borderRadius:'50%', background:'#FEE2E2', color:'var(--err)', display:'flex', alignItems:'center', justifyContent:'center'}}><I.alert size={26}/></div>
      <h1 className="at-serif" style={{fontSize:42, margin:'0 0 10px', letterSpacing:'-0.02em'}}>Something went wrong.</h1>
      <p style={{color:'var(--ink-3)', fontSize:13.5, marginBottom:20}}>We've logged the issue. Try reloading — if it keeps happening, let your institution's admin know.</p>
      <div className="at-mono" style={{fontSize:10.5, color:'var(--ink-4)', background:'var(--paper-2)', padding:'8px 12px', borderRadius:6, textAlign:'left', marginBottom:20}}>ref · err_8f2c91a · 21 Apr 2026, 14:02</div>
      <button className="at-btn primary lg"><I.refresh size={13}/> Reload</button>
    </div>
  </div>
);

// Auth — split screen
const StudentLogin = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left">
        <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
        <div>
          <div className="at-auth-quote">Your face is your <em>attendance</em>. Your presence is seen.</div>
          <div className="at-auth-chips" style={{marginTop:24}}>
            <span className="at-chip">Student sign-in</span>
            <span className="at-chip">Secure · OTP protected</span>
          </div>
        </div>
        <div style={{fontSize:11, opacity:0.55, letterSpacing:'0.08em'}}>CS DEPT · INSTITUTE OF TECHNOLOGY</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card">
          <div className="at-auth-title">Welcome back.</div>
          <div className="at-auth-sub">Sign in to your student account.</div>
          <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:28}}>
            <Field label="Email" required>
              <div className="at-input-wrap">
                <input className="at-input" defaultValue="priya.sharma@college.edu" style={{paddingLeft:34}}/>
                <I.mail size={14} style={{position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--ink-4)'}}/>
              </div>
            </Field>
            <Field label="Password" required>
              <div className="at-input-wrap">
                <input className="at-input" type="password" defaultValue="••••••••••" style={{paddingLeft:34}}/>
                <I.lock size={14} style={{position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--ink-4)'}}/>
                <I.eye size={14} className="icon"/>
              </div>
            </Field>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:2}}>
              <label className="at-checkbox"><input type="checkbox" defaultChecked/> Remember me</label>
              <a style={{fontSize:12, color:'var(--indigo-700)'}}>Forgot password?</a>
            </div>
            <button className="at-btn primary lg block" style={{marginTop:8}}>Sign in</button>
            <div style={{textAlign:'center', fontSize:12, color:'var(--ink-3)', marginTop:4}}>New here? <a style={{color:'var(--indigo-700)'}}>Register →</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentRegister = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left">
        <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
        <div>
          <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.12em', opacity:0.7, marginBottom:10}}>STEP 01 / 03 · CREDENTIALS</div>
          <div className="at-auth-quote">A few details and a clear photo — that's all we'll ever need.</div>
          <div style={{display:'flex', gap:6, marginTop:28}}>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2}}/>
          </div>
        </div>
        <div style={{fontSize:11, opacity:0.55}}>Already registered? <a style={{color:'#E0E7FF'}}>Sign in</a></div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card">
          <div className="at-auth-title">Create your account.</div>
          <div className="at-auth-sub">Step 1 of 3 — your credentials.</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:24}}>
            <div style={{gridColumn:'span 2'}}><Field label="Full name" required><input className="at-input" defaultValue="Priya Sharma"/></Field></div>
            <Field label="Phone number" required><input className="at-input" defaultValue="+91 98 7654 3210"/></Field>
            <Field label="Email" required><input className="at-input" defaultValue="priya.sharma@college.edu"/></Field>
            <Field label="Password" required hint="Minimum 8 characters"><input className="at-input" type="password" defaultValue="••••••••"/></Field>
            <Field label="Confirm password" required><input className="at-input" type="password" defaultValue="••••••••"/></Field>
          </div>
          <button className="at-btn primary lg block" style={{marginTop:18}}>Continue to verification <I.arrow size={13}/></button>
          <div style={{textAlign:'center', fontSize:12, color:'var(--ink-3)', marginTop:14}}>Already have an account? <a style={{color:'var(--indigo-700)'}}>Sign in</a></div>
        </div>
      </div>
    </div>
  </div>
);

const OTPBoxes = ({ digits = ['4','8','2','9','','' ], verified }) => (
  <div style={{display:'flex', gap:14, alignItems:'center'}}>
    <div className="at-otp">
      {digits.map((d,i) => <input key={i} value={d} className={d?'filled':''} readOnly/>)}
    </div>
    {verified && <span className="at-badge approved"><I.check size={11}/> Verified</span>}
  </div>
);

const OTPVerification = ({ role = 'student' }) => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className={`at-auth-left ${role === 'admin' ? 'admin':''}`}>
        <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
        <div>
          <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.12em', opacity:0.7, marginBottom:10}}>{role === 'admin' ? 'ADMIN ACCESS' : 'STEP 02 / 03 · VERIFY'}</div>
          <div className="at-auth-quote">We'll double-check both your <em>email</em> and your <em>phone</em>.</div>
          {role === 'student' && <div style={{display:'flex', gap:6, marginTop:28}}>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2}}/>
          </div>}
        </div>
        <div style={{fontSize:11, opacity:0.55}}>Codes expire in 10 minutes.</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card" style={{maxWidth:420}}>
          <div className="at-auth-title">Verify it's you.</div>
          <div className="at-auth-sub">We sent codes to <b>priya.s…@college.edu</b> and <b>+91 ••• ••• 3210</b>.</div>

          <div style={{marginTop:28, paddingBottom:20, borderBottom:'1px solid var(--line)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <span style={{fontSize:12, fontWeight:500}}><I.mail size={12} style={{verticalAlign:-2, marginRight:6}}/>Email code</span>
              <span style={{fontSize:11, color:'var(--ink-3)'}} className="at-mono">Resend in 48s</span>
            </div>
            <OTPBoxes digits={['4','8','2','9','1','7']} verified/>
          </div>

          <div style={{paddingTop:20}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <span style={{fontSize:12, fontWeight:500}}><I.phone size={12} style={{verticalAlign:-2, marginRight:6}}/>SMS code</span>
              <a style={{fontSize:11, color:'var(--indigo-700)'}}>Resend SMS</a>
            </div>
            <OTPBoxes digits={['7','3','1','','','']}/>
            <button className="at-btn primary block" style={{marginTop:14}}>Verify SMS code</button>
          </div>

          <div style={{textAlign:'center', fontSize:11.5, color:'var(--ink-3)', marginTop:20}}>Didn't get anything? <a style={{color:'var(--indigo-700)'}}>Change contact</a></div>
        </div>
      </div>
    </div>
  </div>
);

const StudentRegister2 = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left">
        <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
        <div>
          <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.12em', opacity:0.7, marginBottom:10}}>STEP 02 / 03 · ACADEMIC</div>
          <div className="at-auth-quote">So your mentor can reach <em>the right people</em> when it matters.</div>
          <div style={{display:'flex', gap:6, marginTop:28}}>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2}}/>
          </div>
        </div>
        <div style={{fontSize:11, opacity:0.55}}>All fields required.</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card">
          <div className="at-auth-title">Academic & guardian.</div>
          <div className="at-auth-sub">Step 2 of 3 — help us route information correctly.</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:24}}>
            <Field label="Roll number" required><input className="at-input" defaultValue="21CSE047"/></Field>
            <Field label="Group number" required><input className="at-input" defaultValue="04"/></Field>
            <div style={{gridColumn:'span 2'}}><Field label="Date of birth" required><input className="at-input" type="text" defaultValue="14 · 08 · 2004"/></Field></div>
            <div style={{gridColumn:'span 2'}}><Field label="Guardian name" required><input className="at-input" defaultValue="Mr. Rajesh Sharma"/></Field></div>
            <div style={{gridColumn:'span 2'}}><Field label="Guardian phone" required><input className="at-input" defaultValue="+91 98 7654 1122"/></Field></div>
          </div>
          <button className="at-btn primary lg block" style={{marginTop:18}}>Continue to face capture <I.arrow size={13}/></button>
        </div>
      </div>
    </div>
  </div>
);

const StudentFaceCapture = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left">
        <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
        <div>
          <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.12em', opacity:0.7, marginBottom:10}}>STEP 03 / 03 · FACE</div>
          <div className="at-auth-quote">One clear photo. We'll use it <em>only</em> for attendance.</div>
          <div style={{display:'flex', gap:6, marginTop:28}}>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
            <div style={{flex:1, height:3, background:'#fff', borderRadius:2}}/>
          </div>
        </div>
        <div style={{fontSize:11, opacity:0.55, maxWidth:280}}>Stored encrypted · never shared with third parties · deletable on request.</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card" style={{maxWidth:440}}>
          <div className="at-auth-title">Face capture.</div>
          <div className="at-auth-sub">Good lighting, face centered, no obstructions.</div>

          <div style={{marginTop:22, maxWidth:360, marginInline:'auto'}}>
            <div className="at-camera live" style={{borderRadius:12}}>
              <div className="at-camera-crosshair"/>
              <div className="at-camera-scan" style={{top:'52%'}}/>
              <div className="at-camera-hud"><span className="pill rec">REC</span><span className="pill">1080p</span></div>
              <div style={{position:'absolute', bottom:10, left:10, right:10, background:'rgba(15,14,23,0.7)', backdropFilter:'blur(8px)', borderRadius:6, padding:'6px 10px', color:'white', fontSize:11, display:'flex', justifyContent:'space-between'}}>
                <span>Face detected</span><span className="at-mono" style={{color:'#86EFAC'}}>quality · 94%</span>
              </div>
            </div>
            <div style={{display:'flex', gap:10, marginTop:14}}>
              <button className="at-btn ghost block"><I.refresh size={13}/> Retake</button>
              <button className="at-btn primary block">Use this photo <I.check size={13}/></button>
            </div>
          </div>

          <ul style={{listStyle:'none', padding:0, margin:'18px 0 0', fontSize:12, color:'var(--ink-3)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
            <li><I.check size={11} style={{color:'var(--ok)'}}/> Face centered</li>
            <li><I.check size={11} style={{color:'var(--ok)'}}/> Well-lit</li>
            <li><I.x size={11} style={{color:'var(--ink-4)'}}/> No glasses</li>
            <li><I.x size={11} style={{color:'var(--ink-4)'}}/> Plain background</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const StudentDashboard = () => {
  const subjectData = [
    { label:'Math', value:87 }, { label:'CS', value:94 }, { label:'Phys', value:78 },
    { label:'Chem', value:82 }, { label:'Eng', value:91 }, { label:'Hist', value:74 },
  ];
  const weeklyData = [
    { label:'Mon', value:5 }, { label:'Tue', value:4 }, { label:'Wed', value:6 },
    { label:'Thu', value:5 }, { label:'Fri', value:3 }, { label:'Sat', value:2 },
  ];
  return (
    <div className="at-root">
      <div className="at-app">
        <Sidebar role="student" active="dashboard"/>
        <div className="at-main">
          <Header crumb="Student · Overview" title="Dashboard"/>
          <div className="at-body">
            <div style={{marginBottom:20}}>
              <div className="at-serif" style={{fontSize:32, letterSpacing:'-0.02em'}}>Good afternoon, Priya.</div>
              <div style={{color:'var(--ink-3)', fontSize:13, marginTop:4}}>Tuesday, 21 April · Week 14 · 4 classes today</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:20}}>
              <div className="at-stat">
                <div className="at-stat-label">Overall score</div>
                <div className="at-stat-value" style={{color:'var(--indigo-700)'}}>A+</div>
                <div className="at-stat-sub"><span className="at-stat-delta up">↑ 0.3</span> vs last term</div>
              </div>
              <div className="at-stat">
                <div className="at-stat-label">Attendance</div>
                <div className="at-stat-value">91.3<span style={{fontSize:22, color:'var(--ink-3)'}}>%</span></div>
                <div className="at-stat-sub"><span className="at-stat-delta up">↑ 2.1</span> 4 classes missed</div>
              </div>
              <div className="at-stat">
                <div className="at-stat-label">Assignments</div>
                <div className="at-stat-value">12<span style={{fontSize:22, color:'var(--ink-3)'}}>/14</span></div>
                <div className="at-stat-sub">2 pending · next due Friday</div>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:14}}>
              <div className="at-card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                  <div><div className="at-card-title">Subject performance</div><div className="at-card-h">Marks out of 100</div></div>
                  <div className="at-pill">This term</div>
                </div>
                <div style={{marginTop:14}}><BarChart data={subjectData} max={100} color="var(--indigo-700)"/></div>
              </div>
              <div className="at-card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                  <div><div className="at-card-title">This week</div><div className="at-card-h">Classes attended</div></div>
                  <div className="at-pill">25 / 30</div>
                </div>
                <div style={{marginTop:14}}><LineChart data={weeklyData}/></div>
              </div>
            </div>
            <div className="at-card" style={{marginTop:14}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div className="at-card-h">Up next</div>
                <a style={{fontSize:12, color:'var(--indigo-700)'}}>View timetable →</a>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10}}>
                {[['14:00','Data Structures','Dr. Iyer · Room 302','now'],['15:30','Computer Networks','Prof. Rao · Lab B','in 90m'],['17:00','English','Ms. Lall · Room 118','in 3h'],['—','—','Day complete','—']].map((r,i)=>(
                  <div key={i} style={{border:'1px solid var(--line)', borderRadius:8, padding:12, background: i===0?'var(--indigo-50)':'transparent'}}>
                    <div className="at-mono" style={{fontSize:11, color:'var(--ink-3)'}}>{r[0]} · {r[3]}</div>
                    <div style={{fontSize:13, fontWeight:500, marginTop:4}}>{r[1]}</div>
                    <div style={{fontSize:11.5, color:'var(--ink-3)'}}>{r[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentAttendance = () => {
  const bar = [{label:'Total', value:48, value2: 44},{label:'', value:0, value2:0}];
  return (
    <div className="at-root">
      <div className="at-app">
        <Sidebar role="student" active="attendance"/>
        <div className="at-main">
          <Header crumb="Student" title="Attendance"/>
          <div className="at-body">
            <div className="at-banner" style={{marginBottom:16}}>
              <h2>Your subject attendance.</h2>
              <p>Stay above 75% to remain exam-eligible.</p>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:16}}>
              <button className="at-btn ghost sm"><I.left size={12}/></button>
              <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                {['Math','Science','English','History','Computer','Physics','Chemistry','Biology'].map((s,i)=>(
                  <span key={i} className={i===4?'at-pill':''} style={i===4?{}:{padding:'3px 8px', fontSize:11, color:'var(--ink-3)'}}>{s}</span>
                ))}
              </div>
              <div style={{flex:1}}/>
              <button className="at-btn ghost sm"><I.right size={12}/></button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              <div className="at-card">
                <div className="at-card-title">Computer Science</div>
                <div className="at-card-h">Total vs attended</div>
                <div style={{display:'flex', gap:20, margin:'14px 0', fontFamily:'var(--ff-mono)'}}>
                  <div><div style={{fontSize:10, color:'var(--ink-3)'}}>TOTAL</div><div style={{fontSize:32, letterSpacing:'-0.02em', fontFamily:'var(--ff-display)'}}>48</div></div>
                  <div><div style={{fontSize:10, color:'var(--ink-3)'}}>ATTENDED</div><div style={{fontSize:32, letterSpacing:'-0.02em', fontFamily:'var(--ff-display)', color:'var(--indigo-700)'}}>44</div></div>
                  <div><div style={{fontSize:10, color:'var(--ink-3)'}}>MISSED</div><div style={{fontSize:32, letterSpacing:'-0.02em', fontFamily:'var(--ff-display)', color:'var(--err)'}}>4</div></div>
                </div>
                <BarChart data={[{label:'Jan',value:10,value2:9},{label:'Feb',value:12,value2:12},{label:'Mar',value:14,value2:13},{label:'Apr',value:12,value2:10}]} color="var(--line-2)" color2="var(--indigo-700)" max={16}/>
              </div>
              <div className="at-card" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div className="at-card-title" style={{alignSelf:'flex-start'}}>Rate</div>
                <div className="at-card-h" style={{alignSelf:'flex-start'}}>Present vs absent</div>
                <div style={{marginTop:10}}>
                  <Donut slices={[{value:91.6, color:'var(--indigo-700)'},{value:8.4, color:'var(--paper-2)'}]}
                    center={<div><div className="at-serif" style={{fontSize:36, letterSpacing:'-0.02em'}}>91.6<span style={{fontSize:16}}>%</span></div><div style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase'}}>Present</div></div>}/>
                </div>
                <div style={{display:'flex', gap:18, marginTop:14, fontSize:11.5, color:'var(--ink-3)'}}>
                  <span><span style={{display:'inline-block', width:9, height:9, background:'var(--indigo-700)', marginRight:5, borderRadius:2, verticalAlign:-1}}/>Present 44</span>
                  <span><span style={{display:'inline-block', width:9, height:9, background:'var(--paper-2)', marginRight:5, borderRadius:2, border:'1px solid var(--line)', verticalAlign:-1}}/>Absent 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentProfile = ({ edit = false }) => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="student" active="profile"/>
      <div className="at-main">
        <Header crumb="Student" title="Profile"/>
        <div className="at-body">
          <div className="at-banner" style={{marginBottom:20, paddingBottom:56}}>
            <h2>Priya Sharma</h2>
            <p>Roll 21CSE047 · Computer Science & Engineering · Group 04</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24, marginTop:-70}}>
            <div>
              <div style={{width:132, height:132, borderRadius:'50%', border:'4px solid var(--paper)', overflow:'hidden', background:'var(--paper-2)', position:'relative'}} className="at-ph">
                <span style={{position:'absolute'}}>PRIYA</span>
              </div>
              <button className="at-btn ghost sm" style={{marginTop:12, width:132}}><I.camera size={12}/> Change image</button>
            </div>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, marginTop:70}}>
                <div className="at-card-h">Details</div>
                <button className="at-btn ghost sm">{edit?<><I.check size={12}/> Save changes</>:<><I.edit size={12}/> Edit</>}</button>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {[['Name','Priya Sharma'],['Email','priya.sharma@college.edu'],['Phone','+91 98 7654 3210'],['Roll number','21CSE047'],['Group','04'],['Department','CSE'],['Guardian name','Mr. Rajesh Sharma'],['Guardian phone','+91 98 7654 1122']].map(([l,v],i)=>(
                  <div key={i} className="at-card" style={{padding:'12px 14px'}}>
                    <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4}}>{l}{l==='Email'&&' · read only'}</div>
                    {edit && l!=='Email' ? <input className="at-input" defaultValue={v} style={{padding:'5px 8px', fontSize:13}}/> : <div style={{fontSize:13.5, fontWeight:500}}>{v}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentMedical = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="student" active="medical"/>
      <div className="at-main">
        <Header crumb="Student" title="Medical leave"/>
        <div className="at-body">
          <div className="at-tabs" style={{marginBottom:16}}>
            <div className="at-tab active">Apply</div>
            <div className="at-tab">Applied <span className="count">7</span></div>
            <div className="at-tab">Pending <span className="count">1</span></div>
            <div className="at-tab">Approved <span className="count">5</span></div>
            <div className="at-tab">Rejected <span className="count">1</span></div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            <div className="at-card">
              <div className="at-card-h" style={{marginBottom:14}}>New leave request</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                <Field label="From date" required><input className="at-input" defaultValue="22 Apr 2026"/></Field>
                <Field label="To date" required><input className="at-input" defaultValue="24 Apr 2026"/></Field>
                <div style={{gridColumn:'span 2'}}><Field label="Mentor name" required><input className="at-input" defaultValue="Dr. Meera Iyer"/></Field></div>
                <div style={{gridColumn:'span 2'}}>
                  <Field label="Medical proof" required>
                    <div className="at-drop" style={{padding:18}}>
                      <div className="icon"><I.upload size={16}/></div>
                      <div style={{fontSize:12}}><b>proof_22apr.pdf</b> · 412 KB</div>
                      <div style={{fontSize:11, color:'var(--ink-4)'}}>PDF or image · max 5 MB</div>
                    </div>
                  </Field>
                </div>
              </div>
              <button className="at-btn primary lg block" style={{marginTop:14}}>Submit request</button>
            </div>
            <div>
              <div className="at-card" style={{padding:14, marginBottom:10}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:13, fontWeight:500}}>Viral fever</div>
                  <span className="at-badge pending">Pending</span>
                </div>
                <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4}}>18 Apr → 20 Apr · Mentor: Dr. Iyer</div>
                <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:6, display:'flex', gap:6, alignItems:'center'}}><I.file size={11}/> fever_note.pdf</div>
              </div>
              <div className="at-card" style={{padding:14, marginBottom:10}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:13, fontWeight:500}}>Dental procedure</div>
                  <span className="at-badge approved">Approved</span>
                </div>
                <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4}}>02 Apr → 03 Apr · Mentor: Dr. Iyer</div>
              </div>
              <div className="at-card" style={{padding:14}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{fontSize:13, fontWeight:500}}>Personal</div>
                  <span className="at-badge rejected">Rejected</span>
                </div>
                <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4}}>14 Mar · Mentor: Dr. Iyer</div>
                <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:6}}>Reason required for personal leave.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentTimetable = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="student" active="timetable"/>
      <div className="at-main">
        <Header crumb="Student" title="Timetable"/>
        <div className="at-body">
          <div className="at-banner" style={{marginBottom:16}}><h2>Week of 21 April.</h2><p>Your personal schedule for Group 04.</p></div>
          <div className="at-card" style={{padding:0, overflow:'hidden'}}>
            <table className="at-table">
              <thead><tr><th></th>{['Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><th key={d}>{d}</th>)}</tr></thead>
              <tbody>
                {[['09:00',['Math','CS','Math','Phys','CS','Free']],
                  ['10:30',['Phys','Eng','Chem','CS','Math','Free']],
                  ['12:00',['—','—','—','—','—','—']],
                  ['13:30',['Chem','Hist','CS Lab','Eng','Phys','Sports']],
                  ['15:00',['CS Lab','Math','CS Lab','Hist','Chem','—']]].map(([t, row], i) => (
                  <tr key={i}><td className="at-mono" style={{fontSize:11}}>{t}</td>
                    {row.map((c,j)=>(
                      <td key={j} style={{background: c==='—'?'var(--paper-2)':'transparent', color: c==='—'?'var(--ink-4)':'inherit'}}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:10, fontStyle:'italic'}}>If the timetable doesn't appear, it might not have been uploaded yet.</div>
        </div>
      </div>
    </div>
  </div>
);

const StudentForgot = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left">
        <div className="at-auth-brand"><div className="at-logo">A</div> Attentify</div>
        <div className="at-auth-quote">Pick a new password. Make it something <em>only you'd guess.</em></div>
        <div style={{fontSize:11, opacity:0.55}}>Session link valid for 15 minutes.</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card">
          <div className="at-auth-title">New password.</div>
          <div className="at-auth-sub">Minimum 8 characters. Mix letters and numbers.</div>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:22}}>
            <Field label="New password" required><input className="at-input" type="password" defaultValue="••••••••••"/></Field>
            <Field label="Confirm new password" required><input className="at-input" type="password" defaultValue="••••••••••"/></Field>
            <div style={{display:'flex', gap:4, marginTop:4}}>
              {[1,1,1,0].map((f,i)=> <div key={i} style={{flex:1, height:3, borderRadius:2, background: f?'var(--ok)':'var(--line)'}}/>)}
            </div>
            <div style={{fontSize:11, color:'var(--ink-3)'}}>Strong — three of four criteria met.</div>
          </div>
          <button className="at-btn primary lg block" style={{marginTop:16}}>Set new password</button>
          <a style={{display:'block', textAlign:'center', fontSize:12, color:'var(--ink-3)', marginTop:12}}><I.left size={11}/> Back to login</a>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { Landing, NotFound, ErrorBoundary, StudentLogin, StudentRegister, OTPVerification, StudentRegister2, StudentFaceCapture, StudentDashboard, StudentAttendance, StudentProfile, StudentMedical, StudentTimetable, StudentForgot });
