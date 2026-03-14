  // export default Attendance;
  import React, { useEffect, useRef, useState } from 'react'
  import axios from 'axios'
  import { useNavigate } from 'react-router-dom'
  import { Component } from 'lucide-react'
  import Cookies from 'js-cookie'
  import { TEACHER_API as API } from '../../config/api';

  const Attendance = () => {
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const attendanceRef = useRef([])
    const [recognizedName, setRecognizedName] = useState(
      'Waiting for recognition...'
    )
    const [isCapturing, setIsCapturing] = useState(false)
    const [sessionData, setSessionData] = useState(null)
    const [subjectId, setSubjectId] = useState('')
    const [sectionId, setSectionId] = useState('')
    const [attendanceList, setAttendanceList] = useState([])
    const [message, setMessage] = useState('')
    const [date, setDate] = useState('');
    const [lectureSlot, setLectureSlot] = useState('');

    // Check authentication on component mount
    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/')
      }
    }, [navigate])

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error)
        setMessage('Error accessing webcam. Please check permissions.')
      }
    }

    const startAttendanceSession = async () => {
      if (!subjectId || !sectionId || !date || !lectureSlot) {
        setMessage('Please enter subject, section, date, and lecture slot details');
        return;
      }
    
      try {
        const token = Cookies.get('token');
        if (!token) {
          setMessage('You need to log in first');
          navigate('/');
          return;
        }
    
        const response = await axios.post(
          API.START_SESSION,
          { subjectId, sectionId, date, lectureSlot },
          { withCredentials: true }
        );
    
        setSessionData(response.data.sessionData);
        setMessage(
          "Attendance session started. Click 'Start Capturing' to begin face recognition."
        );
      } catch (error) {
        console.error('Error starting attendance session:', error);
        if (error.response?.status === 401) {
          setMessage('Session expired. Please login again.');
          navigate('/');
        } else {
          setMessage(
            error.response?.data?.message || 'Failed to start attendance session'
          );
        }
      }
    };  

    const toggleCapturing = () => {
      if (!sessionData) {
        setMessage('Please start an attendance session first')
        return
      }

      if (!isCapturing) {
        startVideo()
        setIsCapturing(true)
        setMessage('Capturing started. Face recognition is active.')
      } else {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks()
          tracks.forEach(track => track.stop())
        }
        setIsCapturing(false)
        setMessage('Capturing stopped.')
      }
    }

    const captureFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !isCapturing || !sessionData)
        return

      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(async blob => {
        const formData = new FormData()
        formData.append('image', blob, 'frame.jpg')

        try {
          const recognitionResponse = await axios.post(
            API.RECOGNIZE_FACE,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          )

          if (
            recognitionResponse.data.confidence >= 50 &&
            recognitionResponse.data.status === 'Face recognized' &&
            recognitionResponse.data.name !== 'UNKNOWN'
          ) {
            console.log('Recognition response:', recognitionResponse.data)
            setRecognizedName(recognitionResponse.data.name)

            const token = Cookies.get('token');
            if (!token) {
              setMessage('Authentication expired. Please login again.')
              navigate('/')
              return
            }
            console.log('Session data:', sessionData);
            const attendanceResponse = await axios.post(
              API.RECORD_ATTENDANCE,
              {
                studentName: recognitionResponse.data.name,
                sectionId: sessionData.sectionId,
                subjectId: sessionData.subjectId,
                lectureSlot: sessionData.lectureSlot
              },
              { withCredentials: true }
            )

            console.log('Attendance response:', attendanceResponse.data)

            if (
              attendanceResponse.data.message ===
              'Attendance recorded successfully'
            ) {
              const newEntry = {
                name: recognitionResponse.data.name,
                time: new Date().toLocaleTimeString(),
                confidence: recognitionResponse.data.confidence
              }

              const alreadyExists = attendanceRef.current.some(
                item => item.name === newEntry.name
              )

              if (!alreadyExists) {
                const updatedList = [...attendanceRef.current, newEntry]
                attendanceRef.current = updatedList
                setAttendanceList(updatedList)
              }
            }
          } else if (recognitionResponse.data.status === 'No face detected') {
            setRecognizedName('No face detected')
          } else {
            setRecognizedName('Unknown person')
          }
        } catch (error) {
          console.error('Error:', error)
          if (error.response?.status === 401) {
            setMessage('Session expired. Please login again.')
            localStorage.removeItem('token')
            navigate('/')
          } else {
            setRecognizedName('Recognition failed')
          }
        }
      }, 'image/jpeg')
    }

    useEffect(() => {
      let interval
      if (isCapturing) {
        interval = setInterval(captureFrame, 2000)
      }

      return () => {
        if (interval) clearInterval(interval)
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks()
          tracks.forEach(track => track.stop())
        }
      }
    }, [isCapturing, sessionData])

    const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('teacherId')
      localStorage.removeItem('teacherName')
      navigate('/')
    }

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <h1 style={{ margin: 0 }}>Facial Recognition Attendance System</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}
        >
          <h2>Start Attendance Session</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type='text'
              placeholder='Subject ID'
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
            />
            <input
              type='text'
              placeholder='Section ID'
              value={sectionId}
              onChange={e => setSectionId(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-class"
            />
            <select
              value={lectureSlot}
              onChange={(e) => setLectureSlot(e.target.value)}
              className="select-class"
            >
              <option value="">Select Lecture Slot</option>
              <option value="1-3">1-3</option>
              <option value="3-5">3-5</option>
              <option value="5-8">5-8</option>
            </select>
          </div>
          <button
            onClick={startAttendanceSession}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Start Session
          </button>
        </div>

        {message && (
          <div
            style={{
              padding: '10px',
              marginBottom: '20px',
              backgroundColor: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width='640'
            height='480'
            style={{
              border: '2px solid #007bff',
              borderRadius: '4px',
              display: isCapturing ? 'block' : 'none'
            }}
          ></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          <div style={{ marginTop: '15px' }}>
            <button
              onClick={toggleCapturing}
              style={{
                padding: '10px 15px',
                backgroundColor: isCapturing ? '#dc3545' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isCapturing ? 'Stop Capturing' : 'Start Capturing'}
            </button>
          </div>

          {isCapturing && (
            <h2 style={{ marginTop: '20px', color: '#007bff' }}>
              {recognizedName}
            </h2>
          )}
        </div>

        <div
          style={{
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            padding: '15px'
          }}
        >
          <h2>Attendance Record</h2>
          {attendanceList.length === 0 ? (
            <p>No attendance records yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}
                  >
                    Student Name
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}
                  >
                    Time
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}
                  >
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((entry, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #dee2e6'
                      }}
                    >
                      {entry.name}
                    </td>
                    <td
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #dee2e6'
                      }}
                    >
                      {entry.time}
                    </td>
                    <td
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #dee2e6'
                      }}
                    >
                      {entry.confidence.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }

  export default Attendance
