import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { I } from './Icons';
import axios from 'axios';
import { API_URL } from '../config/api';

const Sidebar = ({ role = 'student', onClose, sidebarOpen }) => {
  const navigate = useNavigate();

  const menus = {
    student: [
      { label: 'Main', items: [
        { key: 'dashboard', path: '/student', label: 'Dashboard', icon: I.home },
        { key: 'attendance', path: '/student/attendance', label: 'Attendance', icon: I.chart },
        { key: 'medical', path: '/student/medical', label: 'Medical Leave', icon: I.heart },
        { key: 'timetable', path: '/student/timetable', label: 'Timetable', icon: I.calendar },
      ]},
      { label: 'Account', items: [
        { key: 'profile', path: '/student/profile', label: 'Profile', icon: I.user },
      ]},
    ],
    teacher: [
      { label: 'Main', items: [
        { key: 'dashboard', path: '/teacher', label: 'Dashboard', icon: I.home },
        { key: 'newattendance', path: '/teacher/newattendance', label: 'Take Attendance', icon: I.camera },
        { key: 'editattendance', path: '/teacher/editattendance', label: 'Edit Attendance', icon: I.edit },
        { key: 'generatesheet', path: '/teacher/generatesheet', label: 'Generate Sheet', icon: I.file },
      ]},
      { label: 'Manage', items: [
        { key: 'classes', path: '/teacher/classes', label: 'Classes', icon: I.grid },
        { key: 'studentlist', path: '/teacher/studentlist', label: 'Students', icon: I.users },
        { key: 'medicalreport', path: '/teacher/medicalreport', label: 'Medical Leave', icon: I.heart },
        { key: 'timetable', path: '/teacher/timetable', label: 'Timetable', icon: I.calendar },
      ]},
      { label: 'Account', items: [
        { key: 'profile', path: '/teacher/profile', label: 'Profile', icon: I.user },
      ]},
    ],
    admin: [
      { label: 'Admin', items: [
        { key: 'dashboard', path: '/admin', label: 'Credential Generator', icon: I.upload },
      ]},
    ],
  };

  const roleLabel = { student: 'Student', teacher: 'Faculty', admin: 'Admin' }[role];

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/${role}/logout`, {}, { withCredentials: true });
    } catch (e) { /* ignore */ }
    navigate(`/${role}/login`);
  };

  return (
    <aside className={`at-sidebar ${role} ${sidebarOpen ? 'open' : ''}`}>
      <div className="at-brand">
        <div className="at-logo">A</div>
        <span className="at-brand-name">Attentify</span>
        <span className="at-brand-role">{roleLabel}</span>
      </div>
      {menus[role].map((g, i) => (
        <React.Fragment key={i}>
          <div className="at-nav-label">{g.label}</div>
          <nav className="at-nav">
            {g.items.map(({ key, path, label, icon: IconC }) => (
              <NavLink
                key={key}
                to={path}
                end={path === `/${role}`}
                className={({ isActive }) => `at-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <IconC size={15}/>{label}
              </NavLink>
            ))}
          </nav>
        </React.Fragment>
      ))}
      <div className="at-sidebar-foot">
        <a className="at-nav-item" onClick={handleLogout}><I.logout size={15}/>Log out</a>
      </div>
    </aside>
  );
};

export default Sidebar;
