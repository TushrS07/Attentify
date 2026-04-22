import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import Field from '../../components/Field';
import { toast } from '../../components/Toast';
import { API_URL, FACE_RECOGNITION_URL } from '../../config/api';

const TakeAttendance = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const attendedRef = useRef(new Set());
  const intervalRef = useRef(null);

  const [subjectId, setSubjectId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [lectureSlot, setLectureSlot] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);

  const startSession = async () => {
    if (!subjectId || !sectionId || !lectureSlot) return toast.error('Fill all session fields');
    try {
      const res = await axios.post(`${API_URL}/api/attendance/start-session`, { subjectId, sectionId, date, lectureSlot }, { withCredentials: true });
      setSessionData(res.data);
      toast.success('Session started');
      startCapturing();
    } catch (err) {
      if (err.response?.status === 401) { toast.error('Session expired'); navigate('/teacher/login'); return; }
      toast.error(err.response?.data?.message || 'Failed to start session');
    }
  };

  const startCapturing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setIsCapturing(true);
    } catch { toast.error('Camera access denied'); }
  };

  const stopCapturing = () => {
    if (videoRef.current?.srcObject) { videoRef.current.srcObject.getTracks().forEach(t => t.stop()); }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsCapturing(false);
  };

  const captureAndRecognize = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isCapturing) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        const fd = new FormData();
        fd.append('image', blob, 'frame.jpg');
        const res = await axios.post(`${FACE_RECOGNITION_URL}/recognize`, fd, { headers: { 'Content-Type': 'multipart/form-data' }});
        if (res.data.status === 'Face recognized' && res.data.confidence >= 50 && !attendedRef.current.has(res.data.name)) {
          attendedRef.current.add(res.data.name);
          const recRes = await axios.post(`${API_URL}/api/attendance/record`, { studentName: res.data.name, sectionId, subjectId, lectureSlot }, { withCredentials: true });
          if (recRes.data.message === 'Attendance recorded successfully') {
            setAttendanceList(prev => [...prev, { name: res.data.name, confidence: res.data.confidence, time: new Date().toLocaleTimeString() }]);
          }
        }
      } catch {}
    }, 'image/jpeg');
  }, [isCapturing, sectionId, subjectId, lectureSlot]);

  useEffect(() => {
    if (isCapturing) {
      intervalRef.current = setInterval(captureAndRecognize, 2000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isCapturing, captureAndRecognize]);

  useEffect(() => { return stopCapturing; }, []);

  return (
    <>
      <div className="at-card" style={{padding:14, marginBottom:12}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr)) auto', gap:10, alignItems:'end'}}>
          <Field label="Subject" required><input className="at-input" value={subjectId} onChange={e=>setSubjectId(e.target.value)} placeholder="CS201"/></Field>
          <Field label="Group" required><input className="at-input" value={sectionId} onChange={e=>setSectionId(e.target.value)} placeholder="04"/></Field>
          <Field label="Date" required><input className="at-input" type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field>
          <Field label="Lecture slot" required>
            <select className="at-select" value={lectureSlot} onChange={e=>setLectureSlot(e.target.value)}>
              <option value="">Select</option><option value="1-3">1-3 pm</option><option value="3-5">3-5 pm</option><option value="5-8">5-8 pm</option>
            </select>
          </Field>
          {!isCapturing ? (
            <button className="at-btn success" onClick={startSession} style={{background:'#10B981', borderColor:'#10B981'}}><I.play size={11}/> Start</button>
          ) : (
            <button className="at-btn sm" onClick={stopCapturing} style={{background:'#EF4444', borderColor:'#EF4444'}}><I.stop size={10}/> Stop</button>
          )}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:16}}>
        <div style={{position:'relative', aspectRatio:'16/10', borderRadius:10, overflow:'hidden', background:'#0F0E17'}}>
          <video ref={videoRef} style={{width:'100%', height:'100%', objectFit:'cover'}} muted playsInline/>
          <canvas ref={canvasRef} style={{display:'none'}}/>
          {isCapturing && (
            <>
              <div className="at-camera-scan"/>
              <div style={{position:'absolute', top:12, left:12, right:12, display:'flex', justifyContent:'space-between', color:'white', fontFamily:'var(--ff-mono)', fontSize:10}}>
                <span style={{background:'rgba(0,0,0,0.4)', padding:'3px 7px', borderRadius:3}}>● REC</span>
                <span style={{background:'rgba(0,0,0,0.4)', padding:'3px 7px', borderRadius:3}}>{attendanceList.length} MARKED</span>
              </div>
              <div style={{position:'absolute', bottom:12, left:12, right:12, background:'rgba(15,14,23,0.75)', backdropFilter:'blur(10px)', borderRadius:8, padding:'10px 14px', color:'white', fontSize:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span><span style={{display:'inline-block', width:7, height:7, borderRadius:'50%', background:'#86EFAC', marginRight:8}}/>Recognizing — {attendanceList.length} marked</span>
              </div>
            </>
          )}
          {!isCapturing && !sessionData && (
            <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'#6B6880', fontSize:13}}>
              <div style={{textAlign:'center'}}><I.camera size={32}/><div style={{marginTop:8}}>Start a session to begin</div></div>
            </div>
          )}
        </div>

        <div className="at-card" style={{padding:0, overflow:'hidden', display:'flex', flexDirection:'column'}}>
          <div style={{padding:'14px 16px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><div className="at-card-title">Live roster</div><div className="at-card-h">{attendanceList.length} present</div></div>
            {isCapturing && <div className="at-pill">Auto-saving</div>}
          </div>
          <div style={{flex:1, overflow:'auto'}}>
            <table className="at-table">
              <thead><tr><th>Student</th><th>Time</th><th style={{textAlign:'right'}}>Conf.</th></tr></thead>
              <tbody>
                {attendanceList.map((r,i) => (
                  <tr key={i}>
                    <td style={{display:'flex', alignItems:'center', gap:8}}>
                      <span style={{width:22, height:22, borderRadius:'50%', background:'var(--indigo-100)', color:'var(--indigo-700)', fontSize:10, display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:500}}>{r.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span>
                      {r.name}
                    </td>
                    <td className="at-mono" style={{fontSize:11}}>{r.time}</td>
                    <td className="at-mono" style={{textAlign:'right', fontSize:11.5, color: r.confidence>=90?'var(--ok)':'var(--warn)'}}>{r.confidence.toFixed(1)}%</td>
                  </tr>
                ))}
                {attendanceList.length === 0 && <tr><td colSpan={3} style={{textAlign:'center', color:'var(--ink-4)', padding:20}}>No students recognized yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.at-card+div{grid-template-columns:1fr!important}}`}</style>
    </>
  );
};

export default TakeAttendance;
