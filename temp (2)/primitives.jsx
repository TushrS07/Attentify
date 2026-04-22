/* global React, I */
// Attentify shared UI primitives

const Sidebar = ({ role = 'student', active }) => {
  const menus = {
    student: [
      { label: 'Main', items: [
        ['dashboard', 'Dashboard', I.home],
        ['attendance', 'Attendance', I.chart],
        ['medical', 'Medical Leave', I.heart],
        ['timetable', 'Timetable', I.calendar],
      ]},
      { label: 'Account', items: [
        ['profile', 'Profile', I.user],
      ]},
    ],
    teacher: [
      { label: 'Main', items: [
        ['dashboard', 'Dashboard', I.home],
        ['newattendance', 'Take Attendance', I.camera],
        ['editattendance', 'Edit Attendance', I.edit],
        ['generatesheet', 'Generate Sheet', I.file],
      ]},
      { label: 'Manage', items: [
        ['classes', 'Classes', I.grid],
        ['studentlist', 'Students', I.users],
        ['medicalreport', 'Medical Leave', I.heart],
        ['timetable', 'Timetable', I.calendar],
      ]},
      { label: 'Account', items: [
        ['profile', 'Profile', I.user],
      ]},
    ],
    admin: [
      { label: 'Admin', items: [
        ['dashboard', 'Credential Generator', I.upload],
      ]},
    ],
  };
  const roleLabel = { student:'Student', teacher:'Faculty', admin:'Admin' }[role];
  return (
    <aside className={`at-sidebar ${role}`}>
      <div className="at-brand">
        <div className="at-logo">A</div>
        <span className="at-brand-name">Attentify</span>
        <span className="at-brand-role">{roleLabel}</span>
      </div>
      {menus[role].map((g, i) => (
        <React.Fragment key={i}>
          <div className="at-nav-label">{g.label}</div>
          <nav className="at-nav">
            {g.items.map(([k, label, IconC]) => (
              <a key={k} className={`at-nav-item ${active === k ? 'active':''}`}><IconC size={15}/>{label}</a>
            ))}
          </nav>
        </React.Fragment>
      ))}
      <div className="at-sidebar-foot">
        <a className="at-nav-item"><I.logout size={15}/>Log out</a>
      </div>
    </aside>
  );
};

const Header = ({ crumb, title, name = 'Priya Sharma', initials = 'PS' }) => (
  <div className="at-header">
    <div>
      <div className="at-header-crumb">{crumb}</div>
      <div className="at-header-title">{title}</div>
    </div>
    <div className="at-header-spacer"/>
    <div className="at-header-bell"><I.bell size={17}/><span className="dot"/></div>
    <div style={{display:'flex', alignItems:'center', gap:9}}>
      <div style={{textAlign:'right', lineHeight:1.2}}>
        <div style={{fontSize:12, fontWeight:500}}>{name}</div>
        <div style={{fontSize:10.5, color:'var(--ink-3)'}}>Roll 21CSE047 · Group 04</div>
      </div>
      <div className="at-avatar">{initials}</div>
    </div>
  </div>
);

// Bar chart
const BarChart = ({ data, width = 520, height = 180, color = 'var(--indigo-700)', color2, max }) => {
  const pad = { l: 30, r: 10, t: 10, b: 24 };
  const W = width - pad.l - pad.r, H = height - pad.t - pad.b;
  const m = max || Math.max(...data.flatMap(d => [d.value, d.value2 || 0]));
  const bw = W / data.length;
  const paired = color2 !== undefined;
  const innerBw = paired ? (bw * 0.7) / 2 : bw * 0.55;
  const ticks = [0, m/2, m];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <g className="at-grid">
        {ticks.map((t, i) => <line key={i} x1={pad.l} x2={pad.l+W} y1={pad.t + H - (t/m)*H} y2={pad.t + H - (t/m)*H}/>)}
      </g>
      {ticks.map((t,i)=> <text key={i} className="at-axis" x={pad.l-6} y={pad.t + H - (t/m)*H + 3} textAnchor="end">{Math.round(t)}</text>)}
      {data.map((d, i) => {
        const cx = pad.l + bw * i + bw/2;
        const h = (d.value/m) * H;
        if (paired) {
          const h2 = (d.value2/m) * H;
          return <g key={i}>
            <rect x={cx - innerBw - 2} y={pad.t + H - h} width={innerBw} height={h} rx={2} fill={color}/>
            <rect x={cx + 2} y={pad.t + H - h2} width={innerBw} height={h2} rx={2} fill={color2}/>
            <text className="at-axis" x={cx} y={height - 6} textAnchor="middle">{d.label}</text>
          </g>;
        }
        return <g key={i}>
          <rect x={cx - innerBw/2} y={pad.t + H - h} width={innerBw} height={h} rx={2} fill={color}/>
          <text className="at-axis" x={cx} y={height - 6} textAnchor="middle">{d.label}</text>
        </g>;
      })}
    </svg>
  );
};

// Line chart
const LineChart = ({ data, width = 520, height = 180, color = 'var(--indigo-600)' }) => {
  const pad = { l: 30, r: 12, t: 14, b: 24 };
  const W = width - pad.l - pad.r, H = height - pad.t - pad.b;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value)) * 0.9;
  const sx = (i) => pad.l + (W/(data.length-1))*i;
  const sy = (v) => pad.t + H - ((v-min)/(max-min))*H;
  const d = data.map((p,i)=> (i===0?'M':'L')+sx(i)+','+sy(p.value)).join(' ');
  const area = d + ` L${sx(data.length-1)},${pad.t+H} L${sx(0)},${pad.t+H}Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g className="at-grid">
        {[0,0.5,1].map((t,i) => <line key={i} x1={pad.l} x2={pad.l+W} y1={pad.t + H*(1-t)} y2={pad.t + H*(1-t)}/>)}
      </g>
      <path d={area} fill="url(#lineGrad)"/>
      <path d={d} stroke={color} strokeWidth="2" fill="none"/>
      {data.map((p,i) => <g key={i}>
        <circle cx={sx(i)} cy={sy(p.value)} r={3} fill="white" stroke={color} strokeWidth="2"/>
        <text className="at-axis" x={sx(i)} y={height-6} textAnchor="middle">{p.label}</text>
      </g>)}
    </svg>
  );
};

// Donut
const Donut = ({ slices, size = 160, thickness = 22, center }) => {
  const r = size/2 - 2;
  const ir = r - thickness;
  const total = slices.reduce((s,x) => s + x.value, 0);
  let acc = 0;
  const arcs = slices.map((s,i) => {
    const a0 = (acc/total) * Math.PI*2 - Math.PI/2;
    acc += s.value;
    const a1 = (acc/total) * Math.PI*2 - Math.PI/2;
    const large = a1-a0 > Math.PI ? 1 : 0;
    const cx = size/2, cy = size/2;
    const p = (a,rad) => [cx + Math.cos(a)*rad, cy + Math.sin(a)*rad];
    const [x0,y0] = p(a0, r);
    const [x1,y1] = p(a1, r);
    const [x2,y2] = p(a1, ir);
    const [x3,y3] = p(a0, ir);
    return <path key={i} d={`M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${ir},${ir} 0 ${large} 0 ${x3},${y3} Z`} fill={s.color}/>;
  });
  return (
    <div style={{position:'relative', width:size, height:size}}>
      <svg width={size} height={size}>{arcs}</svg>
      {center && <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>{center}</div>}
    </div>
  );
};

// Pie
const Pie = ({ slices, size = 140 }) => {
  const r = size/2 - 2; const cx = size/2, cy = size/2;
  const total = slices.reduce((s,x) => s + x.value, 0);
  let acc = 0;
  return (
    <svg width={size} height={size}>
      {slices.map((s,i) => {
        const a0 = (acc/total) * Math.PI*2 - Math.PI/2;
        acc += s.value;
        const a1 = (acc/total) * Math.PI*2 - Math.PI/2;
        const large = a1-a0 > Math.PI ? 1 : 0;
        const [x0,y0] = [cx + Math.cos(a0)*r, cy + Math.sin(a0)*r];
        const [x1,y1] = [cx + Math.cos(a1)*r, cy + Math.sin(a1)*r];
        return <path key={i} d={`M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z`} fill={s.color}/>;
      })}
    </svg>
  );
};

const Toast = ({ kind = 'ok', children }) => <div className={`at-toast ${kind}`}>{children}</div>;

const Field = ({ label, required, hint, children }) => (
  <label className="at-field">
    <span className="at-label">{label}{required && <span className="req"> *</span>}</span>
    {children}
    {hint && <span style={{fontSize:11, color:'var(--ink-3)'}}>{hint}</span>}
  </label>
);

Object.assign(window, { Sidebar, Header, BarChart, LineChart, Donut, Pie, Toast, Field });
