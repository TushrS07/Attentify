/* global React */
// Attentify icons — minimal Lucide-style strokes

const Icon = ({ d, size = 16, stroke = 1.75, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...p}>{d}</svg>
);

const I = {
  home: (p) => <Icon {...p} d={<><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></>}/>,
  user: (p) => <Icon {...p} d={<><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></>}/>,
  users: (p) => <Icon {...p} d={<><circle cx="9" cy="8" r="3.5"/><path d="M2 20c1-3 3.5-4.5 7-4.5s6 1.5 7 4.5"/><circle cx="17" cy="7" r="2.5"/><path d="M16 13c3 .2 5 1.8 6 4"/></>}/>,
  calendar: (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>}/>,
  chart: (p) => <Icon {...p} d={<><path d="M3 20h18"/><path d="M6 16V9M11 16V5M16 16v-5M21 16v-3"/></>}/>,
  clock: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}/>,
  camera: (p) => <Icon {...p} d={<><path d="M3 7h4l2-2h6l2 2h4v12H3z"/><circle cx="12" cy="13" r="3.5"/></>}/>,
  edit: (p) => <Icon {...p} d={<><path d="M4 20h4L20 8l-4-4L4 16z"/><path d="M14 6l4 4"/></>}/>,
  file: (p) => <Icon {...p} d={<><path d="M6 2h8l6 6v14H6z"/><path d="M14 2v6h6"/></>}/>,
  upload: (p) => <Icon {...p} d={<><path d="M12 4v12M6 10l6-6 6 6M4 20h16"/></>}/>,
  download: (p) => <Icon {...p} d={<><path d="M12 4v12M6 12l6 6 6-6M4 20h16"/></>}/>,
  logout: (p) => <Icon {...p} d={<><path d="M9 20H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4M16 16l4-4-4-4M8 12h12"/></>}/>,
  bell: (p) => <Icon {...p} d={<><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></>}/>,
  check: (p) => <Icon {...p} d={<><path d="M4 12l5 5L20 6"/></>}/>,
  x: (p) => <Icon {...p} d={<><path d="M5 5l14 14M19 5L5 19"/></>}/>,
  eye: (p) => <Icon {...p} d={<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>}/>,
  arrow: (p) => <Icon {...p} d={<><path d="M5 12h14M13 6l6 6-6 6"/></>}/>,
  left: (p) => <Icon {...p} d={<><path d="M15 18l-6-6 6-6"/></>}/>,
  right: (p) => <Icon {...p} d={<><path d="M9 6l6 6-6 6"/></>}/>,
  search: (p) => <Icon {...p} d={<><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>}/>,
  plus: (p) => <Icon {...p} d={<><path d="M12 5v14M5 12h14"/></>}/>,
  trash: (p) => <Icon {...p} d={<><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></>}/>,
  settings: (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.15-1.4l2-1.5-2-3.5-2.3 1a7 7 0 0 0-2.4-1.4L13.8 3h-3.6l-.35 2.2a7 7 0 0 0-2.4 1.4l-2.3-1-2 3.5 2 1.5A7 7 0 0 0 5 12q0 .7.15 1.4l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 2.4 1.4L10.2 21h3.6l.35-2.2a7 7 0 0 0 2.4-1.4l2.3 1 2-3.5-2-1.5Q19 12.7 19 12z"/></>}/>,
  shield: (p) => <Icon {...p} d={<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></>}/>,
  heart: (p) => <Icon {...p} d={<><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></>}/>,
  lock: (p) => <Icon {...p} d={<><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>}/>,
  mail: (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>}/>,
  phone: (p) => <Icon {...p} d={<><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-1z"/></>}/>,
  sparkle: (p) => <Icon {...p} d={<><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></>}/>,
  grid: (p) => <Icon {...p} d={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>}/>,
  list: (p) => <Icon {...p} d={<><path d="M4 6h16M4 12h16M4 18h16"/></>}/>,
  play: (p) => <Icon {...p} d={<><path d="M6 4l14 8-14 8z"/></>}/>,
  stop: (p) => <Icon {...p} d={<><rect x="6" y="6" width="12" height="12"/></>}/>,
  refresh: (p) => <Icon {...p} d={<><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/></>}/>,
  alert: (p) => <Icon {...p} d={<><path d="M12 3L2 21h20z"/><path d="M12 10v5M12 18v.5"/></>}/>,
};

window.I = I;
