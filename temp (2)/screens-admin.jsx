/* global React, Sidebar, Field, I */
// Admin screens

const AdminLogin = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left admin">
        <div className="at-auth-brand" style={{color:'#E6E8EE'}}><div className="at-logo" style={{background:'#E6E8EE', color:'var(--admin-slate)'}}>A</div> Attentify</div>
        <div>
          <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.15em', color:'#6366F1', marginBottom:12}}>◉ RESTRICTED ACCESS</div>
          <div className="at-auth-quote" style={{color:'#E6E8EE'}}>Onboard a whole institution in <em>one upload.</em></div>
          <div style={{marginTop:28, padding:14, border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, fontSize:11.5, color:'#8B93A7', maxWidth:360}}>
            <b style={{color:'#C5CADB'}}>Admin consoles are monitored.</b> All actions are logged with IP, device, and timestamp. Session expires after 30 minutes of inactivity.
          </div>
        </div>
        <div style={{fontSize:11, color:'#6B738A', letterSpacing:'0.08em'}}>INSTITUTION ID · INST_0241 · PROD</div>
      </div>
      <div className="at-auth-right" style={{background:'#0B1220', color:'#E6E8EE'}}>
        <div className="at-auth-card">
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid rgba(255,255,255,0.15)', borderRadius:999, fontSize:11, color:'#8B93A7', marginBottom:12}}><I.lock size={11}/> Admin only</div>
          <div className="at-auth-title" style={{color:'#fff'}}>Administrator sign-in.</div>
          <div className="at-auth-sub" style={{color:'#8B93A7'}}>Credential Generator & institutional controls.</div>
          <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:22}}>
            <Field label="Email" required>
              <input className="at-input" defaultValue="admin@institution.edu" style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/>
            </Field>
            <Field label="Password" required>
              <input className="at-input" type="password" defaultValue="••••••••••••" style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/>
            </Field>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', color:'#8B93A7'}}>
              <label className="at-checkbox" style={{color:'#8B93A7'}}><input type="checkbox"/> Remember me</label>
              <a style={{fontSize:12, color:'#6366F1'}}>Forgot password?</a>
            </div>
            <button className="at-btn lg block" style={{background:'#6366F1', borderColor:'#6366F1', marginTop:4}}><I.shield size={13}/> Admin sign in</button>
          </div>
          <div style={{fontSize:11, color:'#6B738A', marginTop:18, textAlign:'center'}}>Not an admin? <a style={{color:'#8B93A7'}}>Go to student sign-in</a></div>
        </div>
      </div>
    </div>
  </div>
);

const AdminOTP = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left admin">
        <div className="at-auth-brand" style={{color:'#E6E8EE'}}><div className="at-logo" style={{background:'#E6E8EE', color:'var(--admin-slate)'}}>A</div> Attentify</div>
        <div>
          <div className="at-mono" style={{fontSize:10.5, letterSpacing:'0.15em', color:'#6366F1', marginBottom:12}}>◉ 2-STEP VERIFICATION</div>
          <div className="at-auth-quote" style={{color:'#E6E8EE'}}>Admin accounts require <em>both</em> codes. Always.</div>
        </div>
        <div style={{fontSize:11, color:'#6B738A'}}>Session fingerprint: 9A2F · 417B · C1E9</div>
      </div>
      <div className="at-auth-right" style={{background:'#0B1220', color:'#E6E8EE'}}>
        <div className="at-auth-card" style={{maxWidth:420}}>
          <div className="at-auth-title" style={{color:'#fff'}}>Verify administrator.</div>
          <div className="at-auth-sub" style={{color:'#8B93A7'}}>Codes sent to <b style={{color:'#E6E8EE'}}>admin@…edu</b> · <b style={{color:'#E6E8EE'}}>+91 ••• ••• 0044</b></div>

          <div style={{marginTop:28, paddingBottom:20, borderBottom:'1px solid #1F2A45'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:12}}>
              <span style={{color:'#E6E8EE'}}><I.mail size={12} style={{verticalAlign:-2, marginRight:6}}/>Email code</span>
              <span className="at-mono" style={{color:'#8B93A7'}}>Resend in 42s</span>
            </div>
            <div className="at-otp">
              {['8','1','4','7','0','2'].map((d,i) => <input key={i} defaultValue={d} style={{background:'#131B2E', borderColor:'#2D3B5F', color:'#E6E8EE'}}/>)}
            </div>
            <span className="at-badge approved" style={{marginTop:10, display:'inline-flex'}}><I.check size={11}/> Verified</span>
          </div>

          <div style={{paddingTop:20}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:12}}>
              <span style={{color:'#E6E8EE'}}><I.phone size={12} style={{verticalAlign:-2, marginRight:6}}/>SMS code</span>
              <a style={{color:'#6366F1', fontSize:11}}>Resend SMS</a>
            </div>
            <div className="at-otp">
              {['3','9','2','','',''].map((d,i) => <input key={i} defaultValue={d} style={{background:'#131B2E', borderColor:'#2D3B5F', color:'#E6E8EE'}}/>)}
            </div>
            <button className="at-btn block" style={{background:'#6366F1', borderColor:'#6366F1', marginTop:14}}>Verify and continue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="at-root">
    <div className="at-app admin-theme" style={{background:'#0B1220'}}>
      <Sidebar role="admin" active="dashboard"/>
      <div className="at-main" style={{background:'#0F1628', color:'#E6E8EE'}}>
        <div className="at-header" style={{background:'#0F1628', borderBottomColor:'#1C2333'}}>
          <div>
            <div className="at-header-crumb" style={{color:'#6B738A'}}>Admin console</div>
            <div className="at-header-title" style={{color:'#fff'}}>Credential generator</div>
          </div>
          <div className="at-header-spacer"/>
          <span className="at-mono" style={{fontSize:11, color:'#6B738A'}}>INST_0241 · session 28:14</span>
          <div className="at-avatar">AD</div>
        </div>
        <div className="at-body">
          <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:16, marginBottom:16}}>
            <div style={{border:'1px solid #1F2A45', borderRadius:10, padding:22, background:'#131B2E'}}>
              <div style={{fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6366F1', marginBottom:8}}>Bulk onboard</div>
              <div className="at-serif" style={{fontSize:28, letterSpacing:'-0.02em', color:'#fff'}}>Upload a roster. We'll do the rest.</div>
              <div style={{color:'#8B93A7', fontSize:13, marginTop:8, maxWidth:480}}>One row per person. We create accounts, email credentials, and enroll students in the right groups automatically.</div>

              <div style={{border:'1.5px dashed #2D3B5F', borderRadius:10, padding:36, textAlign:'center', marginTop:22, background:'#0F1628'}}>
                <div style={{width:42, height:42, borderRadius:'50%', background:'#1F2A45', margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', color:'#6366F1'}}><I.upload size={18}/></div>
                <div style={{fontSize:14, color:'#E6E8EE', marginBottom:4}}>Drag & drop or <a style={{color:'#6366F1'}}>click to browse</a></div>
                <div style={{fontSize:11.5, color:'#6B738A'}}>.xlsx or .xls · columns: email, name, role (student / teacher)</div>
              </div>

              <div style={{marginTop:14, border:'1px solid #1F2A45', borderRadius:8, padding:'12px 14px', background:'#0F1628', display:'flex', alignItems:'center', gap:12}}>
                <div style={{width:32, height:38, borderRadius:4, background:'#1F2A45', display:'flex', alignItems:'center', justifyContent:'center', color:'#10B981'}}><I.file size={15}/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, color:'#E6E8EE'}}>spring_2026_roster.xlsx <span className="at-mono" style={{color:'#6B738A', fontSize:11, fontWeight:400}}>· 248 KB</span></div>
                  <div style={{fontSize:11, color:'#6B738A'}}>324 rows detected · ready to process</div>
                </div>
                <span className="at-badge approved"><I.check size={11}/> Ready</span>
              </div>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <button className="at-btn ghost" style={{borderColor:'#2D3B5F', color:'#C5CADB', background:'transparent'}}>Replace</button>
                <button className="at-btn block" style={{background:'#6366F1', borderColor:'#6366F1'}}>Process 324 rows <I.arrow size={12}/></button>
              </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <div style={{border:'1px solid #1F2A45', borderRadius:10, padding:16, background:'#131B2E'}}>
                <div style={{fontSize:10.5, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6B738A', marginBottom:8}}>Last upload</div>
                <div style={{display:'flex', alignItems:'baseline', gap:6}}>
                  <div className="at-serif" style={{fontSize:36, letterSpacing:'-0.02em', color:'#fff'}}>318</div>
                  <div style={{color:'#8B93A7', fontSize:12}}>/ 324 rows processed</div>
                </div>
                <div style={{height:6, background:'#1F2A45', borderRadius:3, marginTop:10, overflow:'hidden'}}>
                  <div style={{width:'98.1%', height:'100%', background:'linear-gradient(90deg, #6366F1, #10B981)'}}/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:10, fontSize:11.5}}>
                  <span style={{color:'#10B981'}}>✓ 318 created</span>
                  <span style={{color:'#F59E0B'}}>⚠ 6 warnings</span>
                  <span style={{color:'#8B93A7'}}>0 errors</span>
                </div>
              </div>

              <div style={{border:'1px solid #1F2A45', borderRadius:10, padding:16, background:'#131B2E', flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                  <div style={{fontSize:10.5, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6B738A'}}>Response log</div>
                  <span className="at-mono" style={{fontSize:10, color:'#6B738A'}}>just now</span>
                </div>
                <div style={{fontFamily:'var(--ff-mono)', fontSize:11.5, lineHeight:1.7, color:'#C5CADB'}}>
                  <div style={{color:'#10B981'}}>✓ 318 / 324 rows processed successfully</div>
                  <div style={{marginTop:10, color:'#F59E0B'}}>⚠ 6 warnings:</div>
                  <div style={{marginLeft:14, color:'#8B93A7', fontSize:11}}>
                    <div>row 48 · duplicate email — skipped</div>
                    <div>row 112 · missing group — defaulted to 00</div>
                    <div>row 201 · role unrecognized ("tutor")</div>
                    <div style={{color:'#6B738A'}}>+3 more…</div>
                  </div>
                  <div style={{marginTop:10, color:'#6B738A'}}>→ credentials emailed to 318 users</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
            {[['Total students','2,814','+318 this week','#6366F1'],['Total faculty','142','+12 this week','#10B981'],['Groups active','32','all enrolled','#F59E0B'],['Uploads · 30d','14','last by you','#EC4899']].map(([l,v,s,c],i)=>(
              <div key={i} style={{border:'1px solid #1F2A45', borderRadius:10, padding:'14px 16px', background:'#131B2E'}}>
                <div style={{fontSize:10.5, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6B738A'}}>{l}</div>
                <div className="at-serif" style={{fontSize:28, letterSpacing:'-0.02em', color:'#fff', margin:'8px 0 4px'}}>{v}</div>
                <div style={{fontSize:11, color:c}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminForgot = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left admin">
        <div className="at-auth-brand" style={{color:'#E6E8EE'}}><div className="at-logo" style={{background:'#E6E8EE', color:'var(--admin-slate)'}}>A</div> Attentify</div>
        <div className="at-auth-quote" style={{color:'#E6E8EE'}}>Rotate the <em>admin key</em>. Carefully.</div>
        <div style={{fontSize:11, color:'#6B738A'}}>Changes logged to audit trail.</div>
      </div>
      <div className="at-auth-right" style={{background:'#0B1220', color:'#E6E8EE'}}>
        <div className="at-auth-card">
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid rgba(255,255,255,0.15)', borderRadius:999, fontSize:11, color:'#8B93A7', marginBottom:12}}><I.lock size={11}/> Admin</div>
          <div className="at-auth-title" style={{color:'#fff'}}>Reset admin password.</div>
          <div className="at-auth-sub" style={{color:'#8B93A7'}}>Minimum 12 characters. Include number and symbol.</div>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:22}}>
            <Field label="New password" required><input className="at-input" type="password" defaultValue="••••••••••••••" style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/></Field>
            <Field label="Confirm new password" required><input className="at-input" type="password" defaultValue="••••••••••••••" style={{background:'#131B2E', borderColor:'#1F2A45', color:'#E6E8EE'}}/></Field>
            <div style={{display:'flex', gap:4}}>
              {[1,1,1,1].map((f,i)=> <div key={i} style={{flex:1, height:3, borderRadius:2, background:'#10B981'}}/>)}
            </div>
            <div style={{fontSize:11, color:'#10B981'}}>Excellent — all criteria met.</div>
          </div>
          <button className="at-btn lg block" style={{background:'#6366F1', borderColor:'#6366F1', marginTop:16}}>Set new admin password</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { AdminLogin, AdminOTP, AdminDashboard, AdminForgot });
