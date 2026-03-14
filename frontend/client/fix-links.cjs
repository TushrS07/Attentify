// Scrape script to fix links
const fs = require('fs');
const path = require('path');

const walk = dir => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Student replacements
  content = content.replace(/["']\/studentlogin["']/g, '"/student/login"');
  content = content.replace(/["']\/studentregister["']/g, '"/student/register"');
  content = content.replace(/["']\/studentregister2["']/g, '"/student/register2"');
  content = content.replace(/["']\/studentregister2\/image["']/g, '"/student/register2/image"');
  
  // Need to be careful about /forgotpassword and /resetpassword and /login because they are raw.
  // We can prefix based on the folder.
  if (file.includes('/teacher/')) {
    content = content.replace(/["']\/login["']/g, '"/teacher/login"');
    content = content.replace(/["']\/teacherlogin["']/g, '"/teacher/login"');
    content = content.replace(/["']\/forgot[-]?password["']/g, '"/teacher/forgotpassword"');
    content = content.replace(/["']\/resetpassword["']/g, '"/teacher/resetpassword"');
    content = content.replace(/["']\/teacherprofile["']/g, '"/teacher/profile"');
    content = content.replace(/["']\/profile["']/g, '"/teacher/profile"');
    content = content.replace(/["']\/timetable["']/g, '"/teacher/timetable"');
    content = content.replace(/["']\/takeattendance["']/g, '"/teacher/takeattendance"');
    content = content.replace(/["']\/newattendance["']/g, '"/teacher/newattendance"');
    content = content.replace(/["']\/editattendance["']/g, '"/teacher/editattendance"');
    content = content.replace(/["']\/generatesheet["']/g, '"/teacher/generatesheet"');
    content = content.replace(/["']\/studentlist["']/g, '"/teacher/studentlist"');
    content = content.replace(/["']\/medicalreport["']/g, '"/teacher/medicalreport"');
    content = content.replace(/["']\/classes["']/g, '"/teacher/classes"');
  }

  if (file.includes('/admin/')) {
    content = content.replace(/["']\/login["']/g, '"/admin/login"');
    content = content.replace(/["']\/adminlogin["']/g, '"/admin/login"');
    content = content.replace(/["']\/forgot[-]?password["']/g, '"/admin/forgotpassword"');
    content = content.replace(/["']\/resetpassword["']/g, '"/admin/resetpassword"');
    content = content.replace(/["']\/verificationpage["']/g, '"/admin/verificationpage"');
  }

  if (file.includes('/student/')) {
    content = content.replace(/["']\/login["']/g, '"/student/login"');
    content = content.replace(/["']\/forgot[-]?password["']/g, '"/student/forgotpassword"');
    content = content.replace(/["']\/resetpassword["']/g, '"/student/resetpassword"');
    content = content.replace(/["']\/verificationpage["']/g, '"/student/verificationpage"');
    content = content.replace(/["']\/studentprofile["']/g, '"/student/profile"');
    content = content.replace(/["']\/studenttimetable["']/g, '"/student/timetable"');
    content = content.replace(/["']\/studentattendance["']/g, '"/student/attendance"');
    content = content.replace(/["']\/studentmedical["']/g, '"/student/medical"');
  }

  // Components Header and Sidebar
  if (file.includes('HeaderTeacher.jsx') || file.includes('SidebarTeacher.jsx')) {
    content = content.replace(/["']\/login["']/g, '"/teacher/login"');
    content = content.replace(/["']\/profile["']/g, '"/teacher/profile"');
    content = content.replace(/["']\/timetable["']/g, '"/teacher/timetable"');
    content = content.replace(/["']\/takeattendance["']/g, '"/teacher/takeattendance"');
    content = content.replace(/["']\/editattendance["']/g, '"/teacher/editattendance"');
    content = content.replace(/["']\/generatesheet["']/g, '"/teacher/generatesheet"');
    content = content.replace(/["']\/studentlist["']/g, '"/teacher/studentlist"');
    content = content.replace(/["']\/medicalreport["']/g, '"/teacher/medicalreport"');
    content = content.replace(/["']\/classes["']/g, '"/teacher/classes"');
  }
  
  if (file.includes('HeaderAdmin.jsx')) {
    content = content.replace(/["']\/login["']/g, '"/admin/login"');
    // Admin header was linking to teacher paths originally, we can leave or change
  }

  if (file.includes('HeaderStudent.jsx') || file.includes('SidebarStudent.jsx')) {
      content = content.replace(/["']\/studenttimetable["']/g, '"/student/timetable"');
      content = content.replace(/["']\/studentattendance["']/g, '"/student/attendance"');
      content = content.replace(/["']\/studentmedical["']/g, '"/student/medical"');
      content = content.replace(/["']\/studentprofile["']/g, '"/student/profile"');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
