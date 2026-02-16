// components/TeacherName.js
import { useEffect, useState } from "react";
import axios from "axios";

const TeacherName = () => {
  const [teacherName, setTeacherName] = useState(null); // Set initial value to null
  const [loading, setLoading] = useState(true); // Set loading state

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teacher/profile", {
          withCredentials: true,
        });
        if (response.data.success) {
          setTeacherName(response.data.profile.name); // Set teacher name
        } else {
          setTeacherName("Teacher"); // Fallback if no name is provided
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setTeacherName("Teacher"); // Fallback in case of error
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTeacherName();
  }, []);

  if (loading) {
    return <span>Loading...</span>; // Show a loading state until the data is fetched
  }

  return <>{teacherName}</>; // Return the teacher's name once it's fetched
};

export default TeacherName;
