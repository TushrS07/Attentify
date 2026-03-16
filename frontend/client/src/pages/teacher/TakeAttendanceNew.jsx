import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { TEACHER_API as API } from '../../config/api'
import { Sidebar } from '../../components/SidebarTeacher'
import TeacherName from '../../components/ProfileNameTeacher'

const Attendance = () => {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const attendanceRef = useRef([])
  const [recognizedName, setRecognizedName] = useState('Waiting for recognition...')
  const [isCapturing, setIsCapturing] = useState(false)
  const [sessionData, setSessionData] = useState(null)
  const [subjectId, setSubjectId] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [attendanceList, setAttendanceList] = useState([])
  const [message, setMessage] = useState('')
  const [date, setDate] = useState('')
  const [lectureSlot, setLectureSlot] = useState('')

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
      setMessage('Please enter subject, section, date, and lecture slot details')
      return
    }

    try {
      const response = await axios.post(
        API.START_SESSION,
        { subjectId, sectionId, date, lectureSlot },
        { withCredentials: true }
      )

      setSessionData(response.data.sessionData)
      setMessage("Attendance session started. Click 'Start Capturing' to begin face recognition.")
    } catch (error) {
      console.error('Error starting attendance session:', error)
      if (error.response?.status === 401) {
        setMessage('Session expired. Please login again.')
        navigate('/teacher/login')
      } else {
        setMessage(error.response?.data?.message || 'Failed to start attendance session')
      }
    }
  }

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
    if (!videoRef.current || !canvasRef.current || !isCapturing || !sessionData) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(async blob => {
      const formData = new FormData()
      formData.append('image', blob, 'frame.jpg')

      try {
        const recognitionResponse = await axios.post(API.RECOGNIZE_FACE, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        if (
          recognitionResponse.data.confidence >= 50 &&
          recognitionResponse.data.status === 'Face recognized' &&
          recognitionResponse.data.name !== 'UNKNOWN'
        ) {
          setRecognizedName(recognitionResponse.data.name)

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

          if (attendanceResponse.data.message === 'Attendance recorded successfully') {
            const newEntry = {
              name: recognitionResponse.data.name,
              time: new Date().toLocaleTimeString(),
              confidence: recognitionResponse.data.confidence
            }

            const alreadyExists = attendanceRef.current.some(item => item.name === newEntry.name)
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
          navigate('/teacher/login')
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5 ml-0 custom:ml-64">
        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-6 md:px-16 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome back, <TeacherName />!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Facial Recognition Attendance System
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Session Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Start Attendance Session</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject ID</label>
                <input
                  type="text"
                  placeholder="e.g. BT101"
                  value={subjectId}
                  onChange={e => setSubjectId(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Section ID</label>
                <input
                  type="text"
                  placeholder="e.g. 29"
                  value={sectionId}
                  onChange={e => setSectionId(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lecture Slot</label>
                <select
                  value={lectureSlot}
                  onChange={e => setLectureSlot(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Slot</option>
                  <option value="1-3">1-3</option>
                  <option value="3-5">3-5</option>
                  <option value="5-8">5-8</option>
                </select>
              </div>
            </div>
            <button
              onClick={startAttendanceSession}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md shadow transition-colors"
            >
              Start Session
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 text-sm text-gray-700">
              {message}
            </div>
          )}

          {/* Camera Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Face Recognition</h2>
            <div className="flex flex-col items-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                width="640"
                height="480"
                className={`border-2 border-indigo-400 rounded-lg ${isCapturing ? 'block' : 'hidden'}`}
              />
              <canvas ref={canvasRef} className="hidden" />

              <button
                onClick={toggleCapturing}
                className={`mt-4 py-2 px-6 rounded-md shadow text-white transition-colors ${
                  isCapturing
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isCapturing ? 'Stop Capturing' : 'Start Capturing'}
              </button>

              {isCapturing && (
                <p className="mt-4 text-lg font-semibold text-indigo-600">
                  {recognizedName}
                </p>
              )}
            </div>
          </div>

          {/* Attendance Record */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
            <h2 className="text-lg font-semibold mb-4">Attendance Record</h2>
            {attendanceList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No attendance records yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceList.map((entry, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {entry.confidence.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
