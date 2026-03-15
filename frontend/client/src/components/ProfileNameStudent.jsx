// components/TeacherName.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

const StudentName = () => {
  const [studentName, setStudentName] = useState(null); // Set initial value to null
  const [loading, setLoading] = useState(true); // Set loading state

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/student/details`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setStudentName(response.data.student.name); // Set teacher name
        } else {
          setStudentName("Student"); // Fallback if no name is provided
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setStudentName("Student"); // Fallback in case of error
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchStudentName();
  }, []);

  if (loading) {
    return <span>Loading...</span>; // Show a loading state until the data is fetched
  }

  return <>{studentName}</>; // Return the teacher's name once it's fetched
};

export default StudentName;
