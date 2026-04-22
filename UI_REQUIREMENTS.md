# Attentify — UI Design Requirements

**Purpose:** Complete page-by-page specification for the UI designer. Every page in the app, its purpose, every field (with mandatory/optional), every button, every redirection, and the data it displays.

---

## 1. Product Overview

Attentify is a classroom attendance & management platform using **face recognition** for attendance marking.

**Three user roles:**
- **Student** — registers, verifies identity, views attendance, applies for medical leave, sees timetable
- **Teacher** — takes attendance via webcam face recognition, manages classes, approves leaves, generates reports
- **Admin** — bulk-creates student/teacher accounts by uploading Excel

**Stack (for the designer's reference only, not a design constraint):** React + Vite, Tailwind CSS, Recharts, Lucide icons.

**Existing color palette (may be kept or redesigned):**
- Primary purple `#3b1e8a`, Secondary purple `#6d4ed7`
- Light purple backgrounds `#f3f0ff`, `#d5cbfe`
- Text `#1a1535` (dark), `#4a4560` (medium), `#9b93be` (muted)
- Page background `#f7f8fc`

---

## 2. Global UI Elements (apply to all pages)

### 2.1 Authenticated Sidebar (Student / Teacher / Admin)
Each role has its own sidebar with role-specific links. Sidebar should:
- Show Attentify logo/brand at the top
- Highlight the active page
- Be collapsible on mobile
- Include a "Logout" action at the bottom

### 2.2 Authenticated Header
- User name + profile image (clickable → goes to the profile page)
- Optional notification bell

### 2.3 Toast notifications
- Used for every success/error (login, save, upload, approval, etc.)
- Position: top-right

### 2.4 Protected routes
- Unauthenticated users hitting a protected route → redirect to their role's login page.

### 2.5 404 / Error pages
- **404 Not Found** — friendly message + "Back to Home" button → `/`
- **Error boundary** — "Something went wrong" + "Reload" button

---

## 3. Public / Pre-login Pages

### 3.1 Landing Page (Home)
**Route:** `/`
**Purpose:** Marketing page introducing Attentify.

**Sections:**
- Sticky top navbar: logo + links (Sign In, Get Started)
- Hero: tagline, short description, primary CTA
- Features grid: face recognition, attendance automation, reports, medical leave, timetable
- Footer

**Buttons / Links:**
| Button | Redirects to |
|---|---|
| Sign In (student) | `/student/login` |
| Get Started | `/student/register` |
| Teacher Login (if shown) | `/teacher/login` |
| Admin Login (if shown) | `/admin/login` |

No form fields on this page.

---

## 4. Student Flow

### 4.1 Student Login
**Route:** `/student/login`

| Field | Type | Mandatory |
|---|---|---|
| Email | email | Yes |
| Password | password (with show/hide toggle) | Yes |
| Remember Me | checkbox | No |

**Buttons / Links:**
| Element | Action / Redirect |
|---|---|
| Sign in | Auth API call → on success redirect to `/student` (dashboard) |
| Forgot password? | `/student/forgotpassword` |
| Register here | `/student/register` |

**UI notes:** Split-screen layout — left: purple gradient with branding/value prop, right: white form card.

---

### 4.2 Student Register — Step 1 (Credentials)
**Route:** `/student/register`

| Field | Type | Mandatory | Rule |
|---|---|---|---|
| Full Name | text | Yes | |
| Phone Number | tel | Yes | Must be positive number |
| Email | email | Yes | Valid email format |
| Password | password | Yes | Min 8 chars |
| Confirm Password | password | Yes | Must match password |

**Buttons:**
| Element | Action / Redirect |
|---|---|
| Register | Validate → API → redirect to `/student/verificationpage` |
| Sign in (link) | `/student/login` |

---

### 4.3 OTP Verification
**Route:** `/student/verificationpage`
**Purpose:** Verify both email and phone OTPs (two 6-digit codes).

| Element | Details | Mandatory |
|---|---|---|
| Email OTP | 6 individual digit boxes, auto-advance + backspace support | Yes |
| Phone / SMS OTP | 6 individual digit boxes, auto-advance + backspace support | Yes |

**Buttons:**
| Element | Behavior |
|---|---|
| Resend Email OTP | Disabled during countdown (e.g. 60s), shows "Resend in Xs" |
| Verify Email Code | Validates email OTP; shows "Verified" badge on success |
| Resend SMS OTP | Same countdown behavior |
| Verify SMS Code | Validates SMS OTP; shows "Verified" badge on success |

**Redirect:** Once **both** codes are verified → auto-redirect to `/student/register2`.

---

### 4.4 Student Register — Step 2 (Academic & Guardian Details)
**Route:** `/student/register2`

| Field | Type | Mandatory | Rule |
|---|---|---|---|
| Roll Number | number | Yes | Non-negative |
| Group Number | number | Yes | Non-negative |
| Date of Birth | date | Yes | |
| Guardian Name | text | Yes | |
| Guardian Phone Number | number | Yes | Non-negative |

**Buttons:**
| Element | Action / Redirect |
|---|---|
| Next | Validate → API → redirect to `/student/register2/image` |
| Sign in (link) | `/student/login` |

---

### 4.5 Student Register — Step 3 (Face Capture)
**Route:** `/student/register2/image`
**Purpose:** Capture face photo for face-recognition based attendance.

**UI:**
- Square live camera preview (rounded corners)
- State text: "Camera is Off" when inactive, live feed when active
- Captured image preview after capture
- Instructions: "Make sure the image is clear, well-lit, and without obstructions."

**Buttons (state-dependent, only one set visible at a time):**
| State | Buttons |
|---|---|
| Initial | **Start Camera** → activate webcam |
| Camera live | **Capture** → freeze frame |
| After capture | **Retake** (re-open camera) + **Next** (upload and redirect) |

**Redirect on success:** `/student` (Student Dashboard).

**Mandatory:** Must capture an image before "Next" is enabled.

---

### 4.6 Student Dashboard
**Route:** `/student` (protected)

**Sections:**
- Welcome greeting with student name
- **Three stat cards:**
  1. Overall Score (e.g. "A+") with trend indicator
  2. Attendance Rate (e.g. "91.3%") with sub-label
  3. Assignments count with sub-label
- **Chart 1:** Subject Performance — bar chart, scores per subject
- **Chart 2:** Weekly Attendance — line chart, days of week

**No form fields. No primary buttons** (navigation via sidebar).

---

### 4.7 Student Attendance
**Route:** `/student/attendance` (protected)
**Purpose:** Subject-wise attendance view.

**UI:**
- Gradient header banner
- Subject carousel: **Previous** button, current subject name, **Next** button
- **Chart 1:** Bar chart — total classes vs attended classes
- **Chart 2:** Donut chart — Present % vs Absent %
- Displayed numbers: total classes, classes attended, attendance percentage

**Subjects** (cycle through): Math, Science, English, History, Computer, Physics, Chemistry, Biology.

---

### 4.8 Student Profile
**Route:** `/student/profile` (protected)

**View mode displays:** profile image, name, email, phone, roll number, group, department, guardian name, guardian number.

**Edit mode fields:**
| Field | Type | Mandatory | Editable |
|---|---|---|---|
| Name | text | Yes | Yes |
| Email | email | Yes | **No (read-only)** |
| Phone | tel | Yes | Yes |
| Roll Number | text | Yes | Yes |
| Group Number | text | Yes | Yes |
| Department | dropdown (default "CSE") | Yes | Yes |
| Guardian Name | text | Yes | Yes |
| Guardian Number | tel | Yes | Yes |

**Buttons:**
| Element | Action / Redirect |
|---|---|
| Edit | Toggles edit mode (label becomes "Save") |
| Save | Persists changes via API |
| Change Image | `/student/register2/image` |

**UI:** Circular 132×132 profile image, gradient header banner, grouped info cards.

---

### 4.9 Student Medical Leave
**Route:** `/student/medical` (protected)

**Tabs:** Apply | Applied | Pending | Approved | Rejected.

**Apply tab form:**
| Field | Type | Mandatory | Rule |
|---|---|---|---|
| From Date | date | Yes | |
| To Date | date | Yes | ≥ From Date |
| Mentor Name | text | Yes | |
| Medical Proof | file upload | Yes | |

**Buttons:** Submit → creates a request with status "pending".

**List tabs (Applied / Pending / Approved / Rejected) — card layout per request:**
- Student name, Group, Date range, Mentor, Proof file link, Status badge.
- **Status colors:** Pending = blue, Approved = green, Rejected = red.

---

### 4.10 Student Timetable
**Route:** `/student/timetable` (protected)

**UI:** Gradient header banner + full-width timetable image.
**Empty state:** "If the timetable doesn't appear, it might not have been uploaded yet."

No form fields, no actions.

---

### 4.11 Student Forgot Password
**Route:** `/student/forgotpassword`

| Field | Type | Mandatory | Rule |
|---|---|---|---|
| New Password | password (with show/hide) | Yes | Min 8 chars |
| Confirm New Password | password (with show/hide) | Yes | Must match |

**Buttons:**
| Element | Action / Redirect |
|---|---|
| Set New Password | API → `/student/login` |
| ← Back to Login | `/student/login` |

### 4.12 Student Reset Password
**Route:** `/student/resetpassword` — same layout as Forgot Password.

---

## 5. Teacher Flow

### 5.1 Teacher Login
**Route:** `/teacher/login`

Same fields as Student Login (Email, Password, Remember Me).

**Buttons:**
| Element | Action / Redirect |
|---|---|
| Sign in | API → if `firstTimeLogin: true` redirect to `/teacher/resetpassword`, else `/teacher` |
| Forgot password? | `/teacher/forgotpassword` |

**UI note:** Include a "Faculty" badge to distinguish from student login.

---

### 5.2 Teacher Dashboard
**Route:** `/teacher` (protected)

**Sections:**
- Welcome message with teacher name
- **Three stat cards:**
  1. Total Students (with delta)
  2. Average Attendance (with delta)
  3. Active Classes (with status line)
- **Chart 1:** Attendance Distribution — pie chart (Present / Absent / Leave)
- **Chart 2:** Class Performance Overview — bar chart of 4 classes with performance + attendance

---

### 5.3 Take Attendance (Face Recognition)
**Route:** `/teacher/newattendance` (protected)
**Purpose:** The signature feature — live webcam face-recognition attendance.

**Session setup form (mandatory before capturing):**
| Field | Type | Mandatory |
|---|---|---|
| Subject | dropdown | Yes |
| Section / Group | dropdown | Yes |
| Date | date | Yes |
| Lecture Slot | dropdown: `1-3`, `3-5`, `5-8` | Yes |

**Buttons:**
| Element | Behavior |
|---|---|
| Start Attendance Session | Validates + starts session (API) |
| Start Capturing | Activates webcam (only after session started) |
| Stop Capturing | Stops webcam |

**Live view:**
- Webcam feed (large, central)
- Recognition label: student name + confidence %
- Auto-records attendance when: confidence ≥ 50%, status = "Face recognized", name ≠ "UNKNOWN"
- Status messages: "Capturing started", "No face detected", "Unknown person", etc.

**Live attendance table (updates in real time):**
| Column | Content |
|---|---|
| Student Name | recognized |
| Time Marked | timestamp |
| Confidence % | |

---

### 5.4 Edit Attendance
**Route:** `/teacher/editattendance` (protected)
**Purpose:** Manually correct attendance.

**Section A — Mark Everyone:**
| Field | Type | Mandatory |
|---|---|---|
| Group | dropdown | Yes |
| Subject | dropdown | Yes |
| Status | dropdown: Present / Absent / Late | Yes |

Button: **Mark Attendance**

**Section B — Show Individual Student:**
| Field | Type | Mandatory |
|---|---|---|
| Roll Number | text | Yes |
| Subject | dropdown | Yes |

Button: **Show Student** — reveals that student's record so teacher can edit.

---

### 5.5 Generate Attendance Sheet
**Route:** `/teacher/generatesheet` (protected)

| Field | Type | Mandatory |
|---|---|---|
| Subject | dropdown | Yes |
| Group | dropdown | Yes |
| Date | date | Yes |
| Lecture Slot | dropdown: `1-3`, `3-5`, `5-8` | Yes |

**Buttons:**
| Element | Action |
|---|---|
| Generate | Fetches records and displays in table |
| Download | Exports to Excel |

**Table columns:** Student ID, Roll Number, Attendance Status, Lecture Slot, Section ID, Subject ID, Teacher ID, Date.

---

### 5.6 Teacher Classes
**Route:** `/teacher/classes` (protected)
**Purpose:** Add / edit / delete classes, and set mentor status.

**Form fields:**
| Field | Type | Mandatory |
|---|---|---|
| Subject | dropdown | Yes |
| Course End Date | date | Yes |
| Group | dropdown (1–32) | Yes |
| Is Mentor | toggle / radio (Yes/No) | Yes |

**Buttons:**
| Element | Action |
|---|---|
| Add Class | Creates new class entry |
| Update Class | (when editing) saves changes |
| Edit (per row) | Loads that class into form |
| Delete (per row) | Removes class |

**List below form:** class cards / table showing Subject, End date, Group, Mentor status.

---

### 5.7 Student List
**Route:** `/teacher/studentlist` (protected)

| Field | Type | Mandatory |
|---|---|---|
| Group | dropdown (1–32) | Yes |
| File Type | radio: Excel / PDF | Yes |

**Buttons:**
| Element | Action |
|---|---|
| Generate / Fetch | Loads students for that group |
| Download | Exports (Excel now; PDF "coming soon") |

**Table columns:** Roll No, Name, Email, Phone. Should be searchable/filterable.

---

### 5.8 Medical Leave Report
**Route:** `/teacher/medicalreport` (protected)

**Tabs:** Pending | Approved | Rejected.

**Card per request:** Student Name, Group, Date Range, Mentor Name, Proof File (downloadable), Status badge.

**Buttons (Pending tab only):**
| Element | Action |
|---|---|
| Approve | Sets status = approved |
| Reject | Sets status = rejected |

---

### 5.9 Timetable Management
**Route:** `/teacher/timetable` (protected)

| Field | Type | Mandatory |
|---|---|---|
| Group | dropdown (1–32) | Yes |
| Upload Document | file input (multiple) | Yes |

**Buttons:**
| Element | Action |
|---|---|
| Add Time Table | Saves timetable for selected group |
| Preview (per file) | Shows preview |
| Edit (per saved timetable) | Allows re-upload |
| Delete (per saved timetable) | Removes it |

**List:** saved timetables grouped by group number, filename visible.

---

### 5.10 Teacher Profile
**Route:** `/teacher/profile` (protected)

| Field | Type | Mandatory | Editable |
|---|---|---|---|
| Name | text | Yes | Yes |
| Email | email | Yes | **No** |
| Phone | tel | Yes | Yes |
| Groups | text (comma-separated) | No | Yes |
| Teaches Subjects | text (comma-separated) | No | Yes |
| Profile Image | display only | — | No |

**Buttons:**
| Element | Action |
|---|---|
| Edit | Enters edit mode (label becomes "Save") |
| Save | Persists changes |
| Cancel | Exits edit mode, discards changes |

---

### 5.11 Teacher Forgot / Reset Password
**Routes:** `/teacher/forgotpassword`, `/teacher/resetpassword` — same layout as student equivalents, redirecting to `/teacher/login` after success.

---

## 6. Admin Flow

### 6.1 Admin Login
**Route:** `/admin/login`

| Field | Type | Mandatory |
|---|---|---|
| Email | email, placeholder `admin@institution.edu` | Yes |
| Password | password | Yes |
| Remember Me | checkbox | No |

**Buttons:**
| Element | Action / Redirect |
|---|---|
| Admin Sign In | API → `/admin` on success |
| Forgot Password | `/admin/forgotpassword` |

**UI note:** Dark / slate background to visually distinguish from student/teacher logins. Include a "Restricted Access" line.

---

### 6.2 Admin Verification Page
**Route:** `/admin/verificationpage` — same OTP flow as 4.3.

---

### 6.3 Admin Dashboard — Credential Generator
**Route:** `/admin` (protected)
**Purpose:** Bulk-create student & teacher accounts from Excel.

**Layout:**
- Admin sidebar (links: "Credential Generator" (active), "Logout")
- Main content: drag-and-drop uploader

**Form field:**
| Field | Type | Mandatory | Details |
|---|---|---|---|
| Excel File | file upload (`.xlsx`, `.xls`) | Yes | Expected columns: `email`, `name`, `role` (student / teacher) |

**Uploader states:**
- **Empty:** "Drag & drop or click to browse"
- **File selected:** filename + file size + green checkmark
- **Uploading:** progress indicator

**Response area:**
- Success: `✓ [message] ([n]/[total] rows processed successfully)`
- Warning: `⚠ Issues found:` followed by a list
- Error: `❌ [error message]`

---

### 6.4 Admin Forgot / Reset Password
**Routes:** `/admin/forgotpassword`, `/admin/resetpassword` — same pattern, redirecting to `/admin/login`.

---

## 7. Redirection Map (summary)

```
/  (Landing)
├─ /student/login ──► /student  (dashboard)
│     ├─ /student/register ──► /student/verificationpage ──► /student/register2 ──► /student/register2/image ──► /student
│     ├─ /student/forgotpassword ──► /student/login
│     └─ /student/resetpassword ──► /student/login
│
│  (after login, sidebar links:)
│     /student
│     /student/profile   (Change Image ──► /student/register2/image)
│     /student/attendance
│     /student/medical
│     /student/timetable
│
├─ /teacher/login ──► /teacher  (or /teacher/resetpassword if first-time)
│     ├─ /teacher/forgotpassword ──► /teacher/login
│     └─ /teacher/resetpassword ──► /teacher/login
│
│  (sidebar links:)
│     /teacher
│     /teacher/profile
│     /teacher/newattendance
│     /teacher/editattendance
│     /teacher/generatesheet
│     /teacher/classes
│     /teacher/studentlist
│     /teacher/medicalreport
│     /teacher/timetable
│
└─ /admin/login ──► /admin/verificationpage ──► /admin
      ├─ /admin/forgotpassword ──► /admin/login
      └─ /admin/resetpassword ──► /admin/login

*  ──► 404 Not Found (back to /)
```

---

## 8. Page-Count Summary (for design estimation)

| Role | Page count |
|---|---|
| Public | 1 (Landing) |
| Student | 12 (Login, Register 1/2/3 + OTP + Image, Dashboard, Profile, Attendance, Medical, Timetable, Forgot, Reset) |
| Teacher | 11 (Login, Dashboard, Take Attendance, Edit Attendance, Generate Sheet, Classes, Student List, Medical Report, Timetable, Profile, Forgot/Reset) |
| Admin | 5 (Login, OTP, Dashboard, Forgot, Reset) |
| Shared | 2 (404, Error) |
| **Total** | **~31 screens** |

---

## 9. Things the designer must deliver (checklist)

For each screen listed above, the designer should deliver:
1. **Desktop layout** (≥1280px)
2. **Tablet layout** (768–1023px)
3. **Mobile layout** (<768px)
4. **Empty state** (where applicable — e.g. no attendance, no leaves, no timetable)
5. **Loading state** (spinners, skeletons)
6. **Error state** (validation errors, API errors via toast + inline)
7. **Success state** (toast messages, filled-in data)
8. **Hover / focus states** for all interactive elements
9. **Icon set** (consistent library, e.g. Lucide)
10. **Component library:** buttons, inputs, dropdowns, date pickers, OTP boxes, cards, tables, tabs, modals, toasts, stat cards, chart wrappers, sidebar, header, file-upload drop zone, camera preview.

---

## 10. Feature-specific design callouts

- **OTP boxes** — 6 discrete input boxes per code, auto-advance, backspace support, countdown for resend.
- **Camera / face-capture** — prominent webcam preview, clear state (off / live / captured), retake flow. Reused on both student registration and teacher "Take Attendance".
- **Live attendance feed** — needs a side-by-side layout of webcam + live-updating attendance table, with clear confidence score and "recognizing…" feedback.
- **Excel upload (admin)** — drag-and-drop zone with clear states (empty / selected / uploading / done); success summary showing how many rows succeeded vs warnings.
- **Charts** — bar, line, pie/donut. Keep legends, tooltips, colors consistent with palette.
- **Status badges** — Pending (blue), Approved (green), Rejected (red), Present/Absent/Late variants for attendance.
- **Tabs** — used on Medical Leave (student & teacher) pages.
- **Role visual differentiation** — Admin uses a darker theme / "Restricted Access" cue; Teacher uses a "Faculty" badge; Student is the default purple.
