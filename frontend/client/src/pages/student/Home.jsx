import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ClipboardListIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ScanFaceIcon,
  BellIcon,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
function Navbar({ scrolled }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[#e8e6f0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow"
            style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
          >
            A
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? "text-[#1a1535]" : "text-white"}`}>
            Attentify
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider hidden sm:inline border transition-colors ${
            scrolled
              ? "bg-[#f3f0ff] text-[#3b1e8a] border-[#d5cbfe]"
              : "bg-white/10 text-white/80 border-white/20"
          }`}>
            Student
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/student/login"
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
              scrolled
                ? "text-[#3b1e8a] hover:bg-[#f3f0ff]"
                : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/student/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white shadow transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolled = scrollY > 20;

  return (
    <div className="bg-[#f7f8fc] font-sans text-[#1a1535] overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      {/* ── Hero ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1535 0%, #3b1e8a 55%, #6d4ed7 100%)" }}
      >
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        {/* glow blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6d4ed7]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3b1e8a]/40 rounded-full blur-[100px] pointer-events-none" />

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.0012) }}
        >
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-7">
              <ShieldCheckIcon size={13} />
              Secure Academic Portal
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-7 font-serif">
              Your attendance,{" "}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(90deg, #a78bfa, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                effortless.
              </span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed max-w-lg mb-10">
              Attentify lets you track your attendance, view your timetable, and manage medical leaves — all from one clean dashboard built for students.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/student/register"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-[#1a1535] bg-white hover:bg-[#f3f0ff] shadow-lg transition-all"
              >
                Create Account
                <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/student/login"
                className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white border border-white/25 hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              {[
                { val: "99.2%", lbl: "Accuracy" },
                { val: "5.4M+", lbl: "Records" },
                { val: "37%", lbl: "Time Saved" },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="text-center">
                  <div className="text-2xl font-bold text-white">{val}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mock dashboard card */}
          <div className="hidden lg:block">
            <div
              className="relative ml-auto w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              {/* card header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-xs">A</div>
                  <span className="text-white font-semibold text-sm">Student Dashboard</span>
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Live</span>
              </div>

              <div className="p-5 space-y-4">
                {/* stat row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Attendance", value: "91.3%", color: "text-[#a78bfa]" },
                    { label: "Classes", value: "24", color: "text-emerald-400" },
                    { label: "Streak", value: "12d", color: "text-white" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="rounded-xl p-3 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="text-white/50 text-[10px] uppercase tracking-wider mb-1">{label}</div>
                      <div className={`text-xl font-bold ${color}`}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* mini bar chart */}
                <div className="rounded-xl p-4 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="text-white/50 text-xs mb-3 uppercase tracking-wider">Weekly Attendance</div>
                  <div className="flex items-end gap-2 h-16">
                    {[80, 100, 60, 100, 80, 100, 40].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{
                        height: `${h}%`,
                        background: h === 100 ? "linear-gradient(to top, #6d4ed7, #a78bfa)" : "rgba(167,139,250,0.25)"
                      }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["M","T","W","T","F","S","S"].map((d, i) => (
                      <div key={i} className="flex-1 text-center text-[9px] text-white/30">{d}</div>
                    ))}
                  </div>
                </div>

                {/* recent activity */}
                <div className="space-y-2">
                  {[
                    { label: "Mathematics", status: "Present", dot: "bg-emerald-400" },
                    { label: "Physics Lab", status: "Present", dot: "bg-emerald-400" },
                    { label: "English", status: "Absent", dot: "bg-red-400" },
                  ].map(({ label, status, dot }) => (
                    <div key={label} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                        <span className="text-white/80 text-sm">{label}</span>
                      </div>
                      <span className={`text-xs font-medium ${status === "Present" ? "text-emerald-400" : "text-red-400"}`}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="#f7f8fc" />
          </svg>
        </div>
      </section>

      {/* ── Features ─────────────────────────── */}
      <section className="py-24 bg-[#f7f8fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3f0ff] border border-[#d5cbfe] text-[#3b1e8a] text-xs font-semibold uppercase tracking-widest mb-5">
              Everything you need
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1535] font-serif mb-5">
              Built for student life
            </h2>
            <p className="text-[#9b93be] text-lg">
              One platform to manage attendance, leaves, timetables, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ScanFaceIcon size={22} />,
                title: "Face Recognition Check-In",
                desc: "Mark attendance instantly with AI-powered facial recognition — no cards, no queues.",
                num: "01",
              },
              {
                icon: <ClipboardListIcon size={22} />,
                title: "Attendance Records",
                desc: "View your subject-wise attendance percentage at a glance and stay ahead of shortfalls.",
                num: "02",
              },
              {
                icon: <CalendarDaysIcon size={22} />,
                title: "Timetable at a Glance",
                desc: "Access your weekly class schedule, updated in real-time by your institution.",
                num: "03",
              },
              {
                icon: <ShieldCheckIcon size={22} />,
                title: "Medical Leave Requests",
                desc: "Upload proof and apply for medical leave directly — no paperwork, no hassle.",
                num: "04",
              },
              {
                icon: <BellIcon size={22} />,
                title: "Smart Notifications",
                desc: "Get alerted when your attendance dips below threshold so you can act early.",
                num: "05",
              },
              {
                icon: <UserCircleIcon size={22} />,
                title: "Student Profile",
                desc: "Manage your academic profile, contact details, and linked institution data.",
                num: "06",
              },
            ].map(({ icon, title, desc, num }) => (
              <div
                key={num}
                className="group bg-white border border-[#e8e6f0] rounded-2xl p-7 hover:border-[#6d4ed7]/40 hover:shadow-[0_8px_30px_rgba(109,78,215,0.08)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[#3b1e8a] bg-[#f3f0ff] border border-[#d5cbfe] group-hover:bg-[#3b1e8a] group-hover:text-white transition-all">
                    {icon}
                  </div>
                  <span className="text-2xl font-bold text-[#e8e6f0] font-serif select-none">{num}</span>
                </div>
                <h3 className="text-[#1a1535] font-bold text-lg mb-2">{title}</h3>
                <p className="text-[#9b93be] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────── */}
      <section className="py-24 bg-white border-y border-[#e8e6f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3f0ff] border border-[#d5cbfe] text-[#3b1e8a] text-xs font-semibold uppercase tracking-widest mb-6">
                How it works
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1535] font-serif mb-5">
                From registration to your first check-in in minutes
              </h2>
              <p className="text-[#9b93be] text-lg mb-10">
                Getting started is simple. Your institution handles the setup — you just log in and go.
              </p>

              <div className="space-y-7">
                {[
                  {
                    step: "01",
                    title: "Register your account",
                    desc: "Sign up with your institutional email and complete your profile in under two minutes.",
                  },
                  {
                    step: "02",
                    title: "Enrol your face",
                    desc: "Upload a clear photo once. Our AI model will recognise you automatically at every session.",
                  },
                  {
                    step: "03",
                    title: "Check in, track everything",
                    desc: "Walk into class, get marked present, and watch your dashboard update instantly.",
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-md"
                      style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
                    >
                      {step}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1535] mb-1">{title}</h3>
                      <p className="text-[#9b93be] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right side — checklist card */}
            <div className="bg-[#f7f8fc] rounded-2xl border border-[#e8e6f0] p-8">
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
                >A</div>
                <div>
                  <div className="font-bold text-[#1a1535] text-sm">Attentify Student</div>
                  <div className="text-[#9b93be] text-xs">Everything included, free to use</div>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "View real-time attendance percentage",
                  "Apply for medical leave with proof upload",
                  "Access your weekly timetable",
                  "Get notified on attendance shortfall",
                  "Manage and update your student profile",
                  "Secure login with session management",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#4a4560]">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f3f0ff] border border-[#d5cbfe] flex items-center justify-center">
                      <CheckIcon size={11} className="text-[#3b1e8a]" strokeWidth={2.5} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/student/register"
                className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm shadow transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
              >
                Get started for free <ChevronRightIcon size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section className="py-24 bg-[#f7f8fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1535] font-serif mb-4">
              Loved by students
            </h2>
            <p className="text-[#9b93be] text-lg">
              Real feedback from the people who use Attentify every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I used to panic checking if I'd miss the 75% mark. Now I see it instantly and plan accordingly.",
                name: "Priya S.",
                role: "B.Tech, 3rd Year",
                initial: "P",
              },
              {
                quote: "The medical leave upload is so smooth. No more running to admin with physical documents.",
                name: "Arjun M.",
                role: "MBA, 1st Year",
                initial: "A",
              },
              {
                quote: "Having the timetable and attendance in one place saves me so much time every single day.",
                name: "Shreya K.",
                role: "BCA, 2nd Year",
                initial: "S",
              },
            ].map(({ quote, name, role, initial }) => (
              <div
                key={name}
                className="bg-white border border-[#e8e6f0] rounded-2xl p-7 hover:shadow-[0_8px_30px_rgba(59,30,138,0.06)] transition-all"
              >
                {/* stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3.5 h-3.5 rounded-sm" style={{ background: "linear-gradient(135deg, #3b1e8a, #6d4ed7)" }} />
                  ))}
                </div>
                <p className="text-[#4a4560] text-sm leading-relaxed mb-7">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
                  >
                    {initial}
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1535] text-sm">{name}</div>
                    <div className="text-[#9b93be] text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1535 0%, #3b1e8a 60%, #6d4ed7 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6d4ed7]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif mb-5">
            Ready to take control of your attendance?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Join thousands of students who manage their academic records effortlessly with Attentify.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/student/register"
              className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#1a1535] bg-white hover:bg-[#f3f0ff] shadow-lg transition-all"
            >
              Create Free Account
              <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/student/login"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white border border-white/25 hover:bg-white/10 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="bg-[#0e0b22] text-slate-400 px-6 py-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #3b1e8a 0%, #6d4ed7 100%)" }}
              >A</div>
              <span className="text-white font-bold text-lg tracking-tight font-serif">Attentify</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI-powered facial recognition attendance, built for modern academic institutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 text-sm">
            <div>
              <div className="text-slate-300 font-semibold mb-3 uppercase text-xs tracking-widest">Students</div>
              <ul className="space-y-2">
                <li><Link to="/student/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/student/register" className="hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-slate-300 font-semibold mb-3 uppercase text-xs tracking-widest">Staff</div>
              <ul className="space-y-2">
                <li><Link to="/teacher/login" className="hover:text-white transition-colors">Teacher Login</Link></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600">
          © {new Date().getFullYear()} Attentify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
