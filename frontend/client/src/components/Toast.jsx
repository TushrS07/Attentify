import React, { useState, useEffect, useCallback } from 'react';

let toastId = 0;
let addToastFn = null;

export const toast = {
  success: (msg) => addToastFn?.({ id: ++toastId, kind: 'ok', message: msg }),
  error: (msg) => addToastFn?.({ id: ++toastId, kind: 'err', message: msg }),
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => {
    setToasts(prev => [...prev, t]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== t.id));
    }, 3500);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  return (
    <div style={{position:'fixed', top:16, right:18, zIndex:9999, display:'flex', flexDirection:'column', gap:8}}>
      {toasts.map(t => (
        <div key={t.id} className={`at-toast ${t.kind}`}>{t.message}</div>
      ))}
    </div>
  );
};

export default ToastContainer;
