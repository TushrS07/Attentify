import React, { useState, useRef } from 'react';
import axios from 'axios';
import { I } from '../../components/Icons';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!/\.xlsx?$/.test(f.name)) return toast.error('Only .xlsx or .xls files allowed');
    setFile(f);
    setResult(null);
  };

  const process = async () => {
    if (!file) return toast.error('Select a file first');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await axios.post(`${API_URL}/api/admin/generatecredentials`, fd, { headers:{'Content-Type':'multipart/form-data'}, withCredentials:true });
      setResult(res.data);
      toast.success(res.data.message || 'Credentials generated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Processing failed');
    } finally { setUploading(false); }
  };

  const ds = {bg:'#131B2E', border:'#1F2A45', text:'#E6E8EE', muted:'#8B93A7', dim:'#6B738A'};

  return (
    <>
      <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:16, marginBottom:16}}>
        <div style={{border:`1px solid ${ds.border}`, borderRadius:10, padding:22, background:ds.bg}}>
          <div style={{fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'#6366F1', marginBottom:8}}>Bulk onboard</div>
          <div className="at-serif" style={{fontSize:28, letterSpacing:'-0.02em', color:'#fff'}}>Upload a roster. We'll do the rest.</div>
          <div style={{color:ds.muted, fontSize:13, marginTop:8, maxWidth:480}}>One row per person. We create accounts, email credentials, and enroll students automatically.</div>

          <div
            style={{border:`1.5px dashed ${dragOver?'#6366F1':ds.border}`, borderRadius:10, padding:36, textAlign:'center', marginTop:22, background:'#0F1628', cursor:'pointer'}}
            onClick={()=>fileRef.current?.click()}
            onDragOver={e=>{e.preventDefault();setDragOver(true)}}
            onDragLeave={()=>setDragOver(false)}
            onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0])}}
          >
            <div style={{width:42, height:42, borderRadius:'50%', background:ds.border, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center', color:'#6366F1'}}><I.upload size={18}/></div>
            <div style={{fontSize:14, color:ds.text, marginBottom:4}}>Drag & drop or <span style={{color:'#6366F1'}}>click to browse</span></div>
            <div style={{fontSize:11.5, color:ds.dim}}>.xlsx or .xls · columns: email, name, role</div>
          </div>
          <input ref={fileRef} type="file" accept=".xlsx,.xls" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>

          {file && (
            <div style={{marginTop:14, border:`1px solid ${ds.border}`, borderRadius:8, padding:'12px 14px', background:'#0F1628', display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:32, height:38, borderRadius:4, background:ds.border, display:'flex', alignItems:'center', justifyContent:'center', color:'#10B981'}}><I.file size={15}/></div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, color:ds.text}}>{file.name} <span className="at-mono" style={{color:ds.dim, fontSize:11}}>· {(file.size/1024).toFixed(0)} KB</span></div>
                <div style={{fontSize:11, color:ds.dim}}>Ready to process</div>
              </div>
              <span className="at-badge approved"><I.check size={11}/> Ready</span>
            </div>
          )}
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button className="at-btn ghost" style={{borderColor:ds.border, color:'#C5CADB', background:'transparent'}} onClick={()=>{setFile(null);setResult(null)}}>Replace</button>
            <button className="at-btn block" style={{background:'#6366F1', borderColor:'#6366F1'}} onClick={process} disabled={uploading || !file}>
              {uploading ? 'Processing...' : `Process${file?' file':''}`} {!uploading && <I.arrow size={12}/>}
            </button>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {result && (
            <div style={{border:`1px solid ${ds.border}`, borderRadius:10, padding:16, background:ds.bg}}>
              <div style={{fontSize:10.5, letterSpacing:'0.08em', textTransform:'uppercase', color:ds.dim, marginBottom:8}}>Last upload</div>
              <div style={{display:'flex', alignItems:'baseline', gap:6}}>
                <div className="at-serif" style={{fontSize:36, letterSpacing:'-0.02em', color:'#fff'}}>{result.usersCreated||0}</div>
                <div style={{color:ds.muted, fontSize:12}}>/ {result.totalRows||0} rows processed</div>
              </div>
              <div style={{height:6, background:ds.border, borderRadius:3, marginTop:10, overflow:'hidden'}}>
                <div style={{width:`${result.totalRows?((result.usersCreated/result.totalRows)*100):0}%`, height:'100%', background:'linear-gradient(90deg, #6366F1, #10B981)'}}/>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginTop:10, fontSize:11.5}}>
                <span style={{color:'#10B981'}}>✓ {result.usersCreated} created</span>
                <span style={{color:'#F59E0B'}}>⚠ {(result.warnings||[]).length} warnings</span>
              </div>
            </div>
          )}

          <div style={{border:`1px solid ${ds.border}`, borderRadius:10, padding:16, background:ds.bg, flex:1}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <div style={{fontSize:10.5, letterSpacing:'0.08em', textTransform:'uppercase', color:ds.dim}}>Response log</div>
              <span className="at-mono" style={{fontSize:10, color:ds.dim}}>—</span>
            </div>
            <div style={{fontFamily:'var(--ff-mono)', fontSize:11.5, lineHeight:1.7, color:'#C5CADB'}}>
              {result ? (
                <>
                  <div style={{color:'#10B981'}}>✓ {result.usersCreated} / {result.totalRows} rows processed</div>
                  {(result.warnings||[]).length > 0 && (
                    <>
                      <div style={{marginTop:10, color:'#F59E0B'}}>⚠ {result.warnings.length} warnings:</div>
                      <div style={{marginLeft:14, color:ds.muted, fontSize:11}}>
                        {result.warnings.slice(0,4).map((w,i) => <div key={i}>{w}</div>)}
                        {result.warnings.length > 4 && <div style={{color:ds.dim}}>+{result.warnings.length-4} more...</div>}
                      </div>
                    </>
                  )}
                  <div style={{marginTop:10, color:ds.dim}}>→ credentials emailed to {result.usersCreated} users</div>
                </>
              ) : (
                <div style={{color:ds.dim}}>No uploads yet. Process a file to see results.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:12}}>
        {[['Total students','—','','#6366F1'],['Total faculty','—','','#10B981'],['Groups active','—','','#F59E0B'],['Uploads · 30d','—','','#EC4899']].map(([l,v,s,c],i)=>(
          <div key={i} style={{border:`1px solid ${ds.border}`, borderRadius:10, padding:'14px 16px', background:ds.bg}}>
            <div style={{fontSize:10.5, letterSpacing:'0.08em', textTransform:'uppercase', color:ds.dim}}>{l}</div>
            <div className="at-serif" style={{fontSize:28, letterSpacing:'-0.02em', color:'#fff', margin:'8px 0 4px'}}>{v}</div>
            <div style={{fontSize:11, color:c}}>{s}</div>
          </div>
        ))}
      </div>

      <style>{`@media(max-width:768px){.at-body>div:first-child{grid-template-columns:1fr!important}}`}</style>
    </>
  );
};

export default AdminDashboard;
