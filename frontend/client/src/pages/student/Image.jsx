import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { I } from '../../components/Icons';
import { toast } from '../../components/Toast';
import { API_URL } from '../../config/api';

const StudentFaceCapture = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } });
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setCameraActive(true);
    } catch { toast.error('Camera access denied. Please allow camera permissions.'); }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => { startCamera(); return stopCamera; }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL('image/png'));
    stopCamera();
  };

  const retake = () => { setCaptured(null); startCamera(); };

  const upload = async () => {
    if (!captured) return;
    setUploading(true);
    try {
      await axios.post(`${API_URL}/api/student/upload-image`, { image: captured }, { withCredentials: true });
      toast.success('Face uploaded successfully!');
      setTimeout(() => navigate('/student'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  return (
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
              <div className="at-camera live" style={{borderRadius:12, aspectRatio:'1'}}>
                {captured ? (
                  <img src={captured} alt="Captured" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:12}}/>
                ) : (
                  <>
                    <video ref={videoRef} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:12}} muted playsInline/>
                    {cameraActive && (
                      <>
                        <div className="at-camera-crosshair"/>
                        <div className="at-camera-scan"/>
                        <div className="at-camera-hud"><span className="pill rec">REC</span><span className="pill">1080p</span></div>
                      </>
                    )}
                  </>
                )}
                <canvas ref={canvasRef} style={{display:'none'}}/>
              </div>

              {!captured ? (
                <button className="at-btn primary block" onClick={capture} style={{marginTop:14}} disabled={!cameraActive}>
                  <I.camera size={13}/> Capture photo
                </button>
              ) : (
                <div style={{display:'flex', gap:10, marginTop:14}}>
                  <button className="at-btn ghost block" onClick={retake}><I.refresh size={13}/> Retake</button>
                  <button className="at-btn primary block" onClick={upload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Use this photo'} {!uploading && <I.check size={13}/>}
                  </button>
                </div>
              )}
            </div>

            <ul style={{listStyle:'none', padding:0, margin:'18px 0 0', fontSize:12, color:'var(--ink-3)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
              <li><I.check size={11} style={{color:'var(--ok)', verticalAlign:-2, marginRight:4}}/> Face centered</li>
              <li><I.check size={11} style={{color:'var(--ok)', verticalAlign:-2, marginRight:4}}/> Well-lit</li>
              <li><I.check size={11} style={{color:'var(--ink-4)', verticalAlign:-2, marginRight:4}}/> No glasses</li>
              <li><I.check size={11} style={{color:'var(--ink-4)', verticalAlign:-2, marginRight:4}}/> Plain background</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFaceCapture;
