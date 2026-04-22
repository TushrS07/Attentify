/* global React, Sidebar, Header, BarChart, LineChart, Donut, Pie, Field, I */
// Teacher screens

const TeacherLogin = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left teacher">
        <div className="at-auth-brand"><div className="at-logo" style={{background:'#fff', color:'#0E3A3A'}}>A</div> Attentify</div>
        <div>
          <span className="at-chip" style={{marginBottom:14, display:'inline-block'}}>Faculty</span>
          <div className="at-auth-quote">Roll call is over. <em>Teach</em> instead.</div>
        </div>
        <div style={{fontSize:11, opacity:0.55}}>Faculty portal · restricted to approved staff.</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card">
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid var(--line)', borderRadius:999, fontSize:11, color:'var(--ink-3)', marginBottom:12}}><I.shield size={11}/> Faculty</div>
          <div className="at-auth-title">Faculty sign-in.</div>
          <div className="at-auth-sub">Use the email your department assigned.</div>
          <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:22}}>
            <Field label="Email" required><input className="at-input" defaultValue="m.iyer@college.edu"/></Field>
            <Field label="Password" required><input className="at-input" type="password" defaultValue="••••••••••"/></Field>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <label className="at-checkbox"><input type="checkbox"/> Remember me</label>
              <a style={{fontSize:12, color:'#0E3A3A'}}>Forgot password?</a>
            </div>
            <button className="at-btn lg block" style={{background:'#0E3A3A', borderColor:'#0E3A3A'}}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherDashboard = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="dashboard"/>
      <div className="at-main">
        <Header crumb="Faculty · Overview" title="Dashboard" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div style={{marginBottom:20}}>
            <div className="at-serif" style={{fontSize:32}}>Welcome back, Dr. Iyer.</div>
            <div style={{color:'var(--ink-3)', fontSize:13, marginTop:4}}>4 classes today · Data Structures in 18 minutes.</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:16}}>
            <div className="at-stat">
              <div className="at-stat-label">Total students</div>
              <div className="at-stat-value">128</div>
              <div className="at-stat-sub"><span className="at-stat-delta up">+4</span> this term</div>
            </div>
            <div className="at-stat">
              <div className="at-stat-label">Average attendance</div>
              <div className="at-stat-value">87.4<span style={{fontSize:22, color:'var(--ink-3)'}}>%</span></div>
              <div className="at-stat-sub"><span className="at-stat-delta up">↑ 1.8</span> vs last month</div>
            </div>
            <div className="at-stat">
              <div className="at-stat-label">Active classes</div>
              <div className="at-stat-value">6</div>
              <div className="at-stat-sub"><span style={{width:6, height:6, borderRadius:'50%', background:'var(--ok)', display:'inline-block'}}/> 1 in session now</div>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:14}}>
            <div className="at-card">
              <div className="at-card-title">This week</div>
              <div className="at-card-h">Attendance distribution</div>
              <div style={{display:'flex', alignItems:'center', gap:18, marginTop:16}}>
                <Pie slices={[{value:78, color:'var(--indigo-700)'},{value:14, color:'#FCA5A5'},{value:8, color:'#FCD34D'}]} size={130}/>
                <div style={{flex:1}}>
                  {[['Present','78%','var(--indigo-700)'],['Absent','14%','#FCA5A5'],['On leave','8%','#FCD34D']].map(([l,v,c],i)=>(
                    <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:i<2?'1px solid var(--line)':'none'}}>
                      <span style={{display:'flex', alignItems:'center', gap:8, fontSize:12.5}}><span style={{width:10, height:10, background:c, borderRadius:2}}/>{l}</span>
                      <span className="at-mono" style={{fontSize:13}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="at-card">
              <div className="at-card-title">Classes I teach</div>
              <div className="at-card-h">Performance overview</div>
              <div style={{marginTop:14}}>
                <BarChart data={[{label:'CS201 · G04', value:92, value2:88},{label:'CS201 · G07', value:78, value2:81},{label:'CS301 · G04', value:85, value2:90},{label:'CS401 · G02', value:81, value2:77}]} color="var(--indigo-700)" color2="#10B981" max={100}/>
                <div style={{display:'flex', gap:18, fontSize:11, color:'var(--ink-3)', marginTop:8}}>
                  <span><span style={{display:'inline-block', width:9, height:9, background:'var(--indigo-700)', marginRight:5, borderRadius:2}}/>Avg score</span>
                  <span><span style={{display:'inline-block', width:9, height:9, background:'#10B981', marginRight:5, borderRadius:2}}/>Attendance %</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TakeAttendance = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="newattendance"/>
      <div className="at-main">
        <Header crumb="Faculty · Live" title="Take attendance" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body" style={{padding:'20px 24px'}}>
          <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:16}}>
            <div>
              <div className="at-card" style={{padding:14, marginBottom:12}}>
                <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr) auto', gap:10, alignItems:'end'}}>
                  <Field label="Subject" required>
                    <select className="at-select"><option>CS201 · Data Structures</option></select>
                  </Field>
                  <Field label="Group" required><select className="at-select"><option>Group 04</option></select></Field>
                  <Field label="Date" required><input className="at-input" defaultValue="21 Apr 2026"/></Field>
                  <Field label="Lecture slot" required><select className="at-select"><option>3–5 pm</option></select></Field>
                  <button className="at-btn success" style={{background:'#10B981', borderColor:'#10B981'}}><I.play size={11}/> Session live</button>
                </div>
              </div>
              <div style={{position:'relative', aspectRatio:'16/10', borderRadius:10, overflow:'hidden', background:'#0F0E17'}}>
                <div style={{position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, #1a1830 0 2px, #0F0E17 2px 4px)'}}/>
                <div className="at-camera-scan" style={{top:'38%'}}/>
                <div style={{position:'absolute', inset:'18% 54% 26% 10%', border:'2px solid #6366F1', borderRadius:6, boxShadow:'0 0 0 3px rgba(99,102,241,0.25)'}}>
                  <div style={{position:'absolute', top:-22, left:-2, background:'#6366F1', color:'white', fontFamily:'var(--ff-mono)', fontSize:10, padding:'2px 6px', borderRadius:3}}>PRIYA S. · 98.4%</div>
                </div>
                <div style={{position:'absolute', inset:'30% 22% 34% 44%', border:'2px solid #10B981', borderRadius:6}}>
                  <div style={{position:'absolute', top:-22, left:-2, background:'#10B981', color:'white', fontFamily:'var(--ff-mono)', fontSize:10, padding:'2px 6px', borderRadius:3}}>ARJUN M. · 94.1%</div>
                </div>
                <div style={{position:'absolute', inset:'40% 8% 28% 68%', border:'2px solid #F59E0B', borderRadius:6, opacity:0.95}}>
                  <div style={{position:'absolute', top:-22, right:-2, background:'#F59E0B', color:'white', fontFamily:'var(--ff-mono)', fontSize:10, padding:'2px 6px', borderRadius:3}}>UNKNOWN · 41.2%</div>
                </div>
                <div style={{position:'absolute', top:12, left:12, right:12, display:'flex', justifyContent:'space-between', color:'white', fontFamily:'var(--ff-mono)', fontSize:10}}>
                  <span style={{background:'rgba(0,0,0,0.4)', padding:'3px 7px', borderRadius:3}}>● REC · 00:47</span>
                  <span style={{background:'rgba(0,0,0,0.4)', padding:'3px 7px', borderRadius:3}}>3 FACES · CONF ≥ 50%</span>
                </div>
                <div style={{position:'absolute', bottom:12, left:12, right:12, background:'rgba(15,14,23,0.75)', backdropFilter:'blur(10px)', borderRadius:8, padding:'10px 14px', color:'white', fontSize:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span><span style={{display:'inline-block', width:7, height:7, borderRadius:'50%', background:'#86EFAC', marginRight:8, verticalAlign:1}}/>Recognizing — 28 marked</span>
                  <button className="at-btn sm" style={{background:'#EF4444', borderColor:'#EF4444'}}><I.stop size={10}/> Stop capturing</button>
                </div>
              </div>
            </div>

            <div className="at-card" style={{padding:0, overflow:'hidden', display:'flex', flexDirection:'column'}}>
              <div style={{padding:'14px 16px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><div className="at-card-title">Live roster</div><div className="at-card-h">28 / 32 present</div></div>
                <div className="at-pill">Auto-saving</div>
              </div>
              <div style={{flex:1, overflow:'auto'}}>
                <table className="at-table">
                  <thead><tr><th>Student</th><th>Time</th><th style={{textAlign:'right'}}>Conf.</th></tr></thead>
                  <tbody>
                    {[['Priya Sharma','14:03:12','98.4'],['Arjun Mehta','14:03:18','94.1'],['Kavya Rao','14:03:24','96.8'],['Rohan Das','14:03:29','91.2'],['Nisha Patel','14:03:31','93.7'],['Vikram Shah','14:03:36','88.5'],['Anaya Kapoor','14:03:42','97.1'],['Dev Bhatt','14:03:48','85.3']].map((r,i)=>(
                      <tr key={i}>
                        <td style={{display:'flex', alignItems:'center', gap:8}}><span style={{width:22, height:22, borderRadius:'50%', background:'var(--indigo-100)', color:'var(--indigo-700)', fontSize:10, display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:500}}>{r[0].split(' ').map(x=>x[0]).join('')}</span>{r[0]}</td>
                        <td className="at-mono" style={{fontSize:11}}>{r[1]}</td>
                        <td className="at-mono" style={{textAlign:'right', fontSize:11.5, color: parseFloat(r[2])>=90?'var(--ok)':'var(--warn)'}}>{r[2]}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{padding:'10px 16px', borderTop:'1px solid var(--line)', fontSize:11.5, color:'var(--ink-3)', display:'flex', justifyContent:'space-between'}}>
                <span>4 unrecognized · <a style={{color:'var(--indigo-700)'}}>mark manually</a></span>
                <span className="at-mono">updated just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EditAttendance = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="editattendance"/>
      <div className="at-main">
        <Header crumb="Faculty" title="Edit attendance" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16}}>
            <div className="at-card">
              <div className="at-card-title">A · Bulk update</div>
              <div className="at-card-h">Mark everyone at once</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:14}}>
                <Field label="Group" required><select className="at-select"><option>Group 04</option></select></Field>
                <Field label="Subject" required><select className="at-select"><option>CS201 · Data Structures</option></select></Field>
                <div style={{gridColumn:'span 2'}}>
                  <Field label="Status" required>
                    <div style={{display:'flex', gap:8}}>
                      <button className="at-btn ghost sm" style={{flex:1, borderColor:'var(--ok)', color:'var(--ok)'}}><I.check size={11}/> Present</button>
                      <button className="at-btn ghost sm" style={{flex:1}}>Absent</button>
                      <button className="at-btn ghost sm" style={{flex:1}}>Late</button>
                    </div>
                  </Field>
                </div>
              </div>
              <button className="at-btn primary block" style={{marginTop:14}}>Mark attendance for 32 students</button>
            </div>
            <div className="at-card">
              <div className="at-card-title">B · Individual</div>
              <div className="at-card-h">Find a student</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:14}}>
                <Field label="Roll number" required><input className="at-input" defaultValue="21CSE047"/></Field>
                <Field label="Subject" required><select className="at-select"><option>CS201 · Data Structures</option></select></Field>
              </div>
              <button className="at-btn block" style={{marginTop:14}}>Show student</button>
            </div>
          </div>
          <div className="at-card" style={{padding:0}}>
            <div style={{padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div><div className="at-card-title">Record for 21CSE047</div><div className="at-card-h">Priya Sharma · Group 04</div></div>
              <button className="at-btn sm primary"><I.check size={11}/> Save changes</button>
            </div>
            <table className="at-table">
              <thead><tr><th>Date</th><th>Slot</th><th>Status</th><th>Recognized at</th><th style={{textAlign:'right'}}>Conf.</th><th></th></tr></thead>
              <tbody>
                {[['21 Apr','3-5','present','14:03','98.4'],['20 Apr','1-3','present','09:02','96.1'],['19 Apr','5-8','absent','—','—'],['18 Apr','1-3','late','09:18','72.3'],['17 Apr','3-5','present','15:04','94.8']].map((r,i)=>(
                  <tr key={i}>
                    <td>{r[0]}</td><td className="at-mono">{r[1]}</td>
                    <td><span className={`at-badge ${r[2]}`}>{r[2]}</span></td>
                    <td className="at-mono">{r[3]}</td>
                    <td className="at-mono" style={{textAlign:'right'}}>{r[4]==='—'?'—':r[4]+'%'}</td>
                    <td><a style={{color:'var(--indigo-700)', fontSize:12}}>Edit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GenerateSheet = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="generatesheet"/>
      <div className="at-main">
        <Header crumb="Faculty" title="Generate attendance sheet" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div className="at-card" style={{padding:16, marginBottom:14}}>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr) auto auto', gap:10, alignItems:'end'}}>
              <Field label="Subject" required><select className="at-select"><option>CS201 · Data Structures</option></select></Field>
              <Field label="Group" required><select className="at-select"><option>Group 04</option></select></Field>
              <Field label="Date" required><input className="at-input" defaultValue="21 Apr 2026"/></Field>
              <Field label="Lecture slot" required><select className="at-select"><option>3–5 pm</option></select></Field>
              <button className="at-btn primary">Generate</button>
              <button className="at-btn ghost"><I.download size={12}/> Download .xlsx</button>
            </div>
          </div>
          <div className="at-card" style={{padding:0}}>
            <div style={{padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between'}}>
              <div><div className="at-card-title">CS201 · Group 04 · 21 Apr 2026 · Slot 3–5</div><div className="at-card-h">32 records</div></div>
              <div style={{display:'flex', gap:14, fontSize:12, color:'var(--ink-3)'}}>
                <span>Present <b className="at-mono" style={{color:'var(--ok)'}}>28</b></span>
                <span>Absent <b className="at-mono" style={{color:'var(--err)'}}>3</b></span>
                <span>Late <b className="at-mono" style={{color:'var(--warn)'}}>1</b></span>
              </div>
            </div>
            <table className="at-table">
              <thead><tr><th>Student ID</th><th>Roll</th><th>Status</th><th>Slot</th><th>Section</th><th>Subject</th><th>Teacher</th><th>Date</th></tr></thead>
              <tbody>
                {[['S00241','21CSE047','present'],['S00242','21CSE048','present'],['S00243','21CSE049','absent'],['S00244','21CSE050','late'],['S00245','21CSE051','present'],['S00246','21CSE052','present'],['S00247','21CSE053','present'],['S00248','21CSE054','absent']].map((r,i)=>(
                  <tr key={i}>
                    <td className="at-mono">{r[0]}</td><td className="at-mono">{r[1]}</td>
                    <td><span className={`at-badge ${r[2]}`}>{r[2]}</span></td>
                    <td className="at-mono">3-5</td><td className="at-mono">SEC-04</td><td className="at-mono">CS201</td><td className="at-mono">T-0114</td><td className="at-mono">21-04-26</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherClasses = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="classes"/>
      <div className="at-main">
        <Header crumb="Faculty" title="My classes" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:14}}>
            <div className="at-card">
              <div className="at-card-h" style={{marginBottom:12}}>Add a class</div>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                <Field label="Subject" required><select className="at-select"><option>CS201 · Data Structures</option></select></Field>
                <Field label="Group" required><select className="at-select"><option>Group 04</option></select></Field>
                <Field label="Course end date" required><input className="at-input" defaultValue="20 Jun 2026"/></Field>
                <Field label="I'm the mentor" required>
                  <div style={{display:'flex', gap:8}}>
                    <button className="at-btn ghost sm" style={{flex:1, borderColor:'var(--indigo-700)', color:'var(--indigo-700)'}}>Yes</button>
                    <button className="at-btn ghost sm" style={{flex:1}}>No</button>
                  </div>
                </Field>
                <button className="at-btn primary block" style={{marginTop:6}}><I.plus size={12}/> Add class</button>
              </div>
            </div>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div className="at-card-h">6 active classes</div>
                <div style={{display:'flex', gap:2}}><button className="at-btn ghost sm"><I.grid size={11}/></button><button className="at-btn ghost sm" style={{borderColor:'var(--ink)', color:'var(--ink)'}}><I.list size={11}/></button></div>
              </div>
              {[['CS201 · Data Structures','04','20 Jun 2026','Yes'],['CS201 · Data Structures','07','20 Jun 2026','No'],['CS301 · Algorithms','04','15 Jul 2026','Yes'],['CS401 · Compilers','02','10 Aug 2026','No']].map((r,i)=>(
                <div key={i} className="at-card" style={{padding:'12px 16px', marginBottom:8, display:'flex', alignItems:'center', gap:14}}>
                  <div style={{width:36, height:36, borderRadius:8, background:'var(--indigo-50)', color:'var(--indigo-700)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ff-display)', fontSize:16}}>{r[0].split(' · ')[1][0]}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:500}}>{r[0]}</div>
                    <div style={{fontSize:11.5, color:'var(--ink-3)'}}>Group {r[1]} · ends {r[2]} · mentor: {r[3]}</div>
                  </div>
                  {r[3]==='Yes' && <span className="at-pill">Mentor</span>}
                  <button className="at-btn ghost sm"><I.edit size={11}/></button>
                  <button className="at-btn ghost sm" style={{color:'var(--err)', borderColor:'#FCA5A5'}}><I.trash size={11}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentList = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="studentlist"/>
      <div className="at-main">
        <Header crumb="Faculty" title="Student list" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div className="at-card" style={{padding:14, marginBottom:14}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr auto auto', gap:10, alignItems:'end'}}>
              <Field label="Group" required><select className="at-select"><option>Group 04</option></select></Field>
              <div style={{width:1, height:32, background:'var(--line)', alignSelf:'center'}}/>
              <Field label="Export format" required>
                <div style={{display:'flex', gap:8}}>
                  <label className="at-checkbox" style={{border:'1px solid var(--ink)', padding:'6px 12px', borderRadius:6}}><input type="radio" checked readOnly/> Excel</label>
                  <label className="at-checkbox" style={{border:'1px solid var(--line-2)', padding:'6px 12px', borderRadius:6, opacity:0.6}}><input type="radio"/> PDF <span style={{fontSize:10, color:'var(--ink-4)'}}>soon</span></label>
                </div>
              </Field>
              <button className="at-btn">Fetch</button>
              <button className="at-btn primary"><I.download size={12}/> Download</button>
            </div>
          </div>
          <div className="at-card" style={{padding:0}}>
            <div style={{padding:'12px 18px', borderBottom:'1px solid var(--line)', display:'flex', gap:12, alignItems:'center'}}>
              <div className="at-input-wrap" style={{flex:1, maxWidth:280}}>
                <I.search size={13} style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--ink-4)'}}/>
                <input className="at-input" placeholder="Search by name or roll…" style={{paddingLeft:32}}/>
              </div>
              <span style={{fontSize:12, color:'var(--ink-3)'}}>32 students · Group 04</span>
            </div>
            <table className="at-table">
              <thead><tr><th>Roll</th><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
              <tbody>
                {[['21CSE047','Priya Sharma','priya.sharma@college.edu','+91 98 7654 3210'],['21CSE048','Arjun Mehta','arjun.mehta@college.edu','+91 98 7654 3311'],['21CSE049','Kavya Rao','kavya.rao@college.edu','+91 98 7654 3412'],['21CSE050','Rohan Das','rohan.das@college.edu','+91 98 7654 3513'],['21CSE051','Nisha Patel','nisha.patel@college.edu','+91 98 7654 3614'],['21CSE052','Vikram Shah','vikram.shah@college.edu','+91 98 7654 3715'],['21CSE053','Anaya Kapoor','anaya.kapoor@college.edu','+91 98 7654 3816']].map((r,i)=>(
                  <tr key={i}>
                    <td className="at-mono">{r[0]}</td><td style={{fontWeight:500}}>{r[1]}</td><td className="at-mono" style={{fontSize:11.5}}>{r[2]}</td><td className="at-mono" style={{fontSize:11.5}}>{r[3]}</td>
                    <td><I.right size={13} style={{color:'var(--ink-4)'}}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MedicalReport = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="medicalreport"/>
      <div className="at-main">
        <Header crumb="Faculty · Mentor" title="Medical leave" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div className="at-tabs" style={{marginBottom:16}}>
            <div className="at-tab active">Pending <span className="count">4</span></div>
            <div className="at-tab">Approved <span className="count">22</span></div>
            <div className="at-tab">Rejected <span className="count">3</span></div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12}}>
            {[['Priya Sharma','21CSE047','18–20 Apr','Viral fever','pending'],['Arjun Mehta','21CSE048','19–21 Apr','Family emergency','pending'],['Nisha Patel','21CSE051','20 Apr','Dental procedure','pending'],['Rohan Das','21CSE050','22–23 Apr','Flu symptoms','pending']].map((r,i)=>(
              <div key={i} className="at-card">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
                  <div style={{display:'flex', gap:10, alignItems:'center'}}>
                    <div style={{width:34, height:34, borderRadius:'50%', background:'var(--indigo-50)', color:'var(--indigo-700)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:500}}>{r[0].split(' ').map(x=>x[0]).join('')}</div>
                    <div>
                      <div style={{fontSize:13, fontWeight:500}}>{r[0]}</div>
                      <div style={{fontSize:11, color:'var(--ink-3)'}}>Roll {r[1]} · Group 04</div>
                    </div>
                  </div>
                  <span className={`at-badge ${r[4]}`}>{r[4]}</span>
                </div>
                <div style={{fontSize:12.5, color:'var(--ink-2)', padding:'10px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
                  <div style={{display:'flex', gap:16, marginBottom:6}}><span style={{color:'var(--ink-3)', width:60}}>Dates</span><span>{r[2]} · 3 days</span></div>
                  <div style={{display:'flex', gap:16, marginBottom:6}}><span style={{color:'var(--ink-3)', width:60}}>Reason</span><span>{r[3]}</span></div>
                  <div style={{display:'flex', gap:16}}><span style={{color:'var(--ink-3)', width:60}}>Proof</span><a style={{color:'var(--indigo-700)', display:'inline-flex', alignItems:'center', gap:4}}><I.file size={11}/> proof_{r[1].toLowerCase()}.pdf</a></div>
                </div>
                <div style={{display:'flex', gap:8, marginTop:10}}>
                  <button className="at-btn danger sm block"><I.x size={11}/> Reject</button>
                  <button className="at-btn success sm block" style={{background:'var(--ok)', borderColor:'var(--ok)'}}><I.check size={11}/> Approve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherTimetable = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="timetable"/>
      <div className="at-main">
        <Header crumb="Faculty" title="Timetable management" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div className="at-card" style={{marginBottom:14}}>
            <div style={{display:'grid', gridTemplateColumns:'220px 1fr auto', gap:14, alignItems:'end'}}>
              <Field label="Group" required><select className="at-select"><option>Group 04</option></select></Field>
              <Field label="Upload document" required>
                <div className="at-drop" style={{padding:18, flexDirection:'row', justifyContent:'flex-start', gap:14}}>
                  <div className="icon"><I.upload size={16}/></div>
                  <div style={{textAlign:'left', flex:1}}>
                    <div style={{fontSize:12.5, color:'var(--ink)'}}>Drop .xlsx · .pdf · .png</div>
                    <div style={{fontSize:11, color:'var(--ink-4)'}}>or click to browse · multiple allowed</div>
                  </div>
                </div>
              </Field>
              <button className="at-btn primary">Add timetable</button>
            </div>
          </div>
          <div className="at-card-title" style={{marginBottom:10}}>Saved timetables</div>
          {[['Group 04','timetable_g04_w14.pdf','updated 2 days ago','current'],['Group 07','timetable_g07_w14.xlsx','updated 5 days ago',''],['Group 12','timetable_g12_w13.pdf','updated 2 weeks ago','']].map((r,i)=>(
            <div key={i} className="at-card" style={{padding:'12px 16px', marginBottom:8, display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:36, height:44, borderRadius:4, background:'var(--paper-2)', border:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--ink-3)'}}><I.file size={15}/></div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:500}}>{r[0]} <span style={{fontFamily:'var(--ff-mono)', fontWeight:400, fontSize:11.5, color:'var(--ink-3)'}}>· {r[1]}</span></div>
                <div style={{fontSize:11.5, color:'var(--ink-3)'}}>{r[2]}</div>
              </div>
              {r[3] && <span className="at-pill">Current</span>}
              <button className="at-btn ghost sm">Preview</button>
              <button className="at-btn ghost sm"><I.edit size={11}/></button>
              <button className="at-btn ghost sm" style={{color:'var(--err)', borderColor:'#FCA5A5'}}><I.trash size={11}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TeacherProfile = () => (
  <div className="at-root">
    <div className="at-app">
      <Sidebar role="teacher" active="profile"/>
      <div className="at-main">
        <Header crumb="Faculty" title="Profile" name="Dr. Meera Iyer" initials="MI"/>
        <div className="at-body">
          <div className="at-banner" style={{background:'linear-gradient(100deg,#0E3A3A 0%, #0EA5A4 60%, #5EEAD4 100%)', marginBottom:20, paddingBottom:56}}>
            <h2>Dr. Meera Iyer</h2>
            <p>Associate Professor · Computer Science · Mentor to Group 04</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24, marginTop:-70}}>
            <div>
              <div className="at-ph" style={{width:132, height:132, borderRadius:'50%', border:'4px solid var(--paper)', position:'relative'}}><span style={{position:'absolute'}}>MEERA</span></div>
              <div style={{fontSize:11, color:'var(--ink-3)', marginTop:10, textAlign:'center'}}>Profile image set by IT</div>
            </div>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, marginTop:70}}>
                <div className="at-card-h">Faculty details</div>
                <div style={{display:'flex', gap:8}}>
                  <button className="at-btn ghost sm">Cancel</button>
                  <button className="at-btn primary sm"><I.check size={12}/> Save</button>
                </div>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {[['Name','Meera Iyer',true],['Email · read only','m.iyer@college.edu',false],['Phone','+91 99 2345 7788',true],['Groups (comma-separated)','04, 07, 12',true]].map(([l,v,e],i)=>(
                  <div key={i} className="at-card" style={{padding:'12px 14px'}}>
                    <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4}}>{l}</div>
                    {e? <input className="at-input" defaultValue={v} style={{padding:'5px 8px', fontSize:13}}/> : <div style={{fontSize:13.5, fontWeight:500}}>{v}</div>}
                  </div>
                ))}
                <div className="at-card" style={{padding:'12px 14px', gridColumn:'span 2'}}>
                  <div style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6}}>Subjects taught</div>
                  <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                    {['Data Structures','Algorithms','Compilers','Theory of Computation'].map((s,i)=><span key={i} className="at-badge neutral" style={{padding:'4px 10px', fontSize:11.5}}>{s} <I.x size={10}/></span>)}
                    <span className="at-badge neutral" style={{padding:'4px 10px', fontSize:11.5, borderStyle:'dashed'}}>+ Add</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherForgot = () => (
  <div className="at-root" style={{height:'100%'}}>
    <div className="at-auth">
      <div className="at-auth-left teacher">
        <div className="at-auth-brand"><div className="at-logo" style={{background:'#fff', color:'#0E3A3A'}}>A</div> Attentify</div>
        <div className="at-auth-quote">First-time login? Let's set up a strong <em>password</em> first.</div>
        <div style={{fontSize:11, opacity:0.55}}>Faculty portal</div>
      </div>
      <div className="at-auth-right">
        <div className="at-auth-card">
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'3px 9px', border:'1px solid var(--line)', borderRadius:999, fontSize:11, color:'var(--ink-3)', marginBottom:12}}><I.shield size={11}/> Faculty</div>
          <div className="at-auth-title">Reset password.</div>
          <div className="at-auth-sub">Your institution requires a password change on first login.</div>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:20}}>
            <Field label="Current password" required><input className="at-input" type="password" defaultValue="••••••••"/></Field>
            <Field label="New password" required hint="Minimum 8 characters, include a number"><input className="at-input" type="password" defaultValue="••••••••••"/></Field>
            <Field label="Confirm new password" required><input className="at-input" type="password" defaultValue="••••••••••"/></Field>
          </div>
          <button className="at-btn lg block" style={{background:'#0E3A3A', borderColor:'#0E3A3A', marginTop:16}}>Set new password</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { TeacherLogin, TeacherDashboard, TakeAttendance, EditAttendance, GenerateSheet, TeacherClasses, StudentList, MedicalReport, TeacherTimetable, TeacherProfile, TeacherForgot });
