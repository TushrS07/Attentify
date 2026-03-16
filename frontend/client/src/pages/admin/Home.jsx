import { useState, useEffect } from "react";
import { UserIcon, ClockIcon, ShieldCheckIcon, ChartBarIcon, ArrowRightIcon } from "lucide-react";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="bg-slate-50 font-sans">
      {/* Hero Section with Dynamic 3D Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with depth layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        
        {/* Geometric shapes for modern aesthetic */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-400 blur-3xl"
               style={{ transform: `translateY(${scrollY * 0.15}px)` }}></div>
          <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-indigo-500 blur-3xl"
               style={{ transform: `translateY(${-scrollY * 0.2}px)` }}></div>
          <div className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full bg-violet-400 blur-3xl"
               style={{ transform: `translateY(${-scrollY * 0.25}px)` }}></div>
        </div>
        
        {/* Content */}
        <div 
          className="relative z-10 px-6 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ 
            transform: `translateY(${-scrollY * 0.05}px)`,
            opacity: 1 - scrollY * 0.001
          }}
        >
          <div className="text-white">
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium tracking-wider">
              <ClockIcon size={16} className="mr-2" />
              NEXT-GEN ATTENDANCE SYSTEM
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8">
              <span className="text-slate-50 block mb-2">Smart</span>
              <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                Attendance Intelligence
              </span>
            </h1>
            <p className="text-lg lg:text-xl mb-10 text-slate-300 max-w-xl leading-relaxed">
              Revolutionize your attendance tracking with AI-powered facial recognition, biometric verification, and predictive analytics for modern organizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/student/register" 
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center"
              >
                Start Free Trial
                <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative w-full h-full min-h-[400px]">
              {/* 3D-like dashboard visualization */}
              <div className="absolute top-0 right-0 w-full h-full bg-slate-900/90 rounded-3xl shadow-2xl overflow-hidden border border-slate-800"
                   style={{ transform: `perspective(1000px) rotateY(-15deg) rotateX(5deg) translateZ(0)` }}>
                <div className="p-4">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 h-6 w-40 bg-slate-800 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-24 bg-slate-800/80 rounded-lg p-4 flex flex-col justify-between">
                      <div className="text-xs text-slate-400">Present Today</div>
                      <div className="text-2xl text-blue-400 font-bold">87%</div>
                      <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-24 bg-slate-800/80 rounded-lg p-4 flex flex-col justify-between">
                      <div className="text-xs text-slate-400">On-Time Arrival</div>
                      <div className="text-2xl text-indigo-400 font-bold">94.2%</div>
                      <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-11/12 bg-indigo-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-48 bg-slate-800/80 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-2">Weekly Attendance Trends</div>
                    <div className="h-32 flex items-end space-x-2">
                      {[85, 92, 88, 95, 90, 78, 83].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                          <div className="text-xs text-slate-500 mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-20 bg-slate-800/80 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating elements for depth */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg"
                   style={{ transform: `perspective(1000px) rotateY(-5deg) rotateX(10deg) translateZ(20px)` }}>
                <div className="w-full h-full flex items-center justify-center text-white">
                  <UserIcon size={36} />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl shadow-lg"
                   style={{ transform: `perspective(1000px) rotateY(10deg) rotateX(-5deg) translateZ(40px)` }}>
                <div className="w-full h-full flex items-center justify-center text-white">
                  <ChartBarIcon size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
            {[
              { value: "99.2%", label: "Recognition Accuracy" },
              { value: "5.4M", label: "Attendances Tracked" },
              { value: "37%", label: "Time Savings" },
              { value: "2.5s", label: "Average Recognition Time" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-all">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Grid Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              KEY CAPABILITIES
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900">Redefine Your Attendance System</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our intelligent platform unifies facial recognition, biometrics, and analytics in a seamless attendance experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<UserIcon size={28} />}
              title="Facial Recognition" 
              desc="Industry-leading facial recognition with 99.2% accuracy that works even with masks and varying lighting." 
              color="blue"
              num="01"
            />
            <FeatureCard 
              icon={<ClockIcon size={28} />}
              title="Intelligent Time Tracking" 
              desc="Automatic time stamping with AI-powered anomaly detection and schedule optimization." 
              color="blue"
              num="02"
            />
            <FeatureCard 
              icon={<ShieldCheckIcon size={28} />}
              title="Secure Biometrics" 
              desc="Multi-factor authentication with fingerprint, voice, and facial pattern verification." 
              color="blue"
              num="03"
            />
            <FeatureCard 
              icon={<ChartBarIcon size={28} />}
              title="Advanced Analytics" 
              desc="Interactive dashboards with predictive insights, attendance patterns, and custom reporting." 
              color="blue"
              num="04"
            />
            <FeatureCard 
              icon={<ClockIcon size={28} />}
              title="Smart Scheduling" 
              desc="AI-powered scheduling to optimize staffing based on historical attendance patterns." 
              color="blue"
              num="05"
            />
            <FeatureCard 
              icon={<ShieldCheckIcon size={28} />}
              title="Privacy Protection" 
              desc="Enterprise-grade security with encrypted biometric data and compliance with privacy regulations." 
              color="blue"
              num="06"
            />
          </div>
        </div>
      </section>

      {/* Analytics Showcase Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
                DATA-DRIVEN INSIGHTS
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900">Transform Attendance Data Into Strategic Decisions</h2>
              <p className="text-lg text-slate-600 mb-8">
                Our intuitive analytics platform provides complete visibility into your organization's attendance patterns with actionable intelligence.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Identify Attendance Patterns",
                    desc: "Uncover hidden trends and optimize staffing with machine learning algorithms"
                  },
                  {
                    title: "Predict Future Absences",
                    desc: "Forecasting models that adapt to seasonal patterns and special events"
                  },
                  {
                    title: "Productivity Optimization",
                    desc: "Automatically identify opportunities to improve punctuality and attendance rates"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="mr-4 mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <a 
                  href="/analytics" 
                  className="group inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Explore Analytics Platform
                  <ArrowRightIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform -rotate-2"></div>
              <div className="relative bg-white p-4 rounded-3xl shadow-xl transform rotate-1 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
                  <rect width="800" height="500" fill="#1e293b" rx="12" ry="12"/>
                  
                  <rect x="20" y="20" width="760" height="60" fill="#1e2736" rx="8" ry="8"/>
                  <circle cx="50" cy="50" r="10" fill="#ef4444"/>
                  <circle cx="80" cy="50" r="10" fill="#f59e0b"/>
                  <circle cx="110" cy="50" r="10" fill="#10b981"/>
                  <rect x="140" y="40" width="200" height="20" fill="#334155" rx="4" ry="4"/>
                  <rect x="600" y="40" width="160" height="20" fill="#334155" rx="10" ry="10"/>
                  
                  <rect x="20" y="100" width="180" height="380" fill="#1e2736" rx="8" ry="8"/>
                  
                  <rect x="40" y="130" width="140" height="40" fill="#3b82f6" rx="6" ry="6"/>
                  <rect x="50" y="145" width="20" height="10" fill="#fff"/>
                  <rect x="80" y="145" width="80" height="10" fill="#fff"/>
                  
                  <rect x="40" y="190" width="140" height="40" fill="#334155" rx="6" ry="6"/>
                  <rect x="50" y="205" width="20" height="10" fill="#64748b"/>
                  <rect x="80" y="205" width="80" height="10" fill="#64748b"/>
                  
                  <rect x="40" y="250" width="140" height="40" fill="#334155" rx="6" ry="6"/>
                  <rect x="50" y="265" width="20" height="10" fill="#64748b"/>
                  <rect x="80" y="265" width="80" height="10" fill="#64748b"/>
                  
                  <rect x="40" y="310" width="140" height="40" fill="#334155" rx="6" ry="6"/>
                  <rect x="50" y="325" width="20" height="10" fill="#64748b"/>
                  <rect x="80" y="325" width="80" height="10" fill="#64748b"/>
                  
                  <rect x="220" y="100" width="560" height="380" fill="#1e2736" rx="8" ry="8"/>
                  
                  <rect x="240" y="120" width="200" height="24" fill="#2d3748" rx="4" ry="4"/>
                  <rect x="240" y="154" width="120" height="16" fill="#475569" rx="3" ry="3"/>
                  
                  <rect x="240" y="190" width="160" height="100" fill="#1f2937" rx="8" ry="8"/>
                  <rect x="255" y="205" width="130" height="15" fill="#334155" rx="2" ry="2"/>
                  <rect x="255" y="230" width="80" height="20" fill="#3b82f6" rx="2" ry="2"/>
                  <rect x="255" y="260" width="130" height="8" fill="#475569" rx="4" ry="4"/>
                  <rect x="255" y="272" width="90" height="8" fill="#3b82f6" rx="4" ry="4" opacity="0.7"/>
                  
                  <rect x="420" y="190" width="160" height="100" fill="#1f2937" rx="8" ry="8"/>
                  <rect x="435" y="205" width="130" height="15" fill="#334155" rx="2" ry="2"/>
                  <rect x="435" y="230" width="80" height="20" fill="#4f46e5" rx="2" ry="2"/>
                  <rect x="435" y="260" width="130" height="8" fill="#475569" rx="4" ry="4"/>
                  <rect x="435" y="272" width="100" height="8" fill="#4f46e5" rx="4" ry="4" opacity="0.7"/>
                  
                  <rect x="600" y="190" width="160" height="100" fill="#1f2937" rx="8" ry="8"/>
                  <rect x="615" y="205" width="130" height="15" fill="#334155" rx="2" ry="2"/>
                  <rect x="615" y="230" width="80" height="20" fill="#8b5cf6" rx="2" ry="2"/>
                  <rect x="615" y="260" width="130" height="8" fill="#475569" rx="4" ry="4"/>
                  <rect x="615" y="272" width="70" height="8" fill="#8b5cf6" rx="4" ry="4" opacity="0.7"/>
                  
                  <rect x="240" y="310" width="320" height="150" fill="#1f2937" rx="8" ry="8"/>
                  <rect x="255" y="325" width="130" height="15" fill="#334155" rx="2" ry="2"/>
                  
                  <polyline points="260,400 290,390 320,395 350,370 380,380 410,350 440,360 470,330 500,345 530,320" 
                          fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          
                  <polyline points="260,420 290,430 320,415 350,425 380,405 410,415 440,395 470,405 500,385 530,380" 
                          fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          
                  <line x1="260" y1="430" x2="530" y2="430" stroke="#64748b" strokeWidth="1"/>
                  <line x1="260" y1="430" x2="260" y2="330" stroke="#64748b" strokeWidth="1"/>

                  <rect x="270" y="440" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  <rect x="330" y="440" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  <rect x="390" y="440" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  <rect x="450" y="440" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  <rect x="510" y="440" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  
                  <rect x="245" y="370" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  <rect x="245" y="400" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  <rect x="245" y="340" width="10" height="5" fill="#64748b" rx="1" ry="1"/>
                  
                  <rect x="580" y="310" width="180" height="150" fill="#1f2937" rx="8" ry="8"/>
                  <rect x="595" y="325" width="100" height="15" fill="#334155" rx="2" ry="2"/>
                  
                  <circle cx="670" cy="385" r="50" fill="none" stroke="#475569" strokeWidth="1"/>
                  
                  <path d="M670,385 L670,335 A50,50 0 0,1 713,407 z" fill="#3b82f6"/>
                  <path d="M670,385 L713,407 A50,50 0 0,1 627,407 z" fill="#4f46e5"/>
                  <path d="M670,385 L627,407 A50,50 0 0,1 670,335 z" fill="#8b5cf6"/>
                  
                  <rect x="595" y="435" width="10" height="10" fill="#3b82f6" rx="2" ry="2"/>
                  <rect x="610" y="435" width="40" height="5" fill="#64748b" rx="1" ry="1"/>
                  
                  <rect x="665" y="435" width="10" height="10" fill="#4f46e5" rx="2" ry="2"/>
                  <rect x="680" y="435" width="40" height="5" fill="#64748b" rx="1" ry="1"/>
                  
                  <rect x="595" y="450" width="10" height="10" fill="#8b5cf6" rx="2" ry="2"/>
                  <rect x="610" y="450" width="40" height="5" fill="#64748b" rx="1" ry="1"/>
                </svg> 
                <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg flex items-center text-white">
                  <ChartBarIcon size={24} className="mr-2" />
                  <span className="font-medium">Live Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-500 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 text-blue-400 text-sm font-medium mb-4">
              CUSTOMER STORIES
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">What Organizations Say</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Join thousands of organizations revolutionizing their attendance tracking.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Employee time tracking is 43% more efficient and payroll accuracy has improved by 28% since implementation.",
                author: "Yash Goyal",
                role: "HR Director, TechNova",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                quote: "The facial recognition system has eliminated buddy punching and improved accountability throughout our organization.",
                author: "Tushar Singla",
                role: "Operations Manager, Global Institute",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                quote: "The analytics helped us identify attendance patterns and optimize our staffing schedules, saving thousands in overtime costs.",
                author: "Yash Sharma",
                role: "VP of Human Resources, EduTech",
                gradient: "from-blue-500 to-indigo-600"
              }
            ].map((testimonial, i) => (
              <div key={i} 
                className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-8 border border-slate-700 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1">
                <div className={`h-1 w-12 bg-gradient-to-r ${testimonial.gradient} rounded-full mb-6`}></div>
                <p className="text-slate-300 mb-8 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Logos */}
          <div className="mt-20">
            <div className="text-center text-slate-500 mb-8 text-sm font-medium tracking-wider">TRUSTED BY LEADING ORGANIZATIONS</div>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-8 w-32 bg-slate-700 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
        <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 relative overflow-hidden">
        {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-500/20 blur-2xl"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="w-full h-full flex items-center justify-center opacity-5">
                    <div className="w-96 h-96 border-2 border-blue-500 rounded-full"></div>
                    <div className="absolute w-80 h-80 border-2 border-indigo-500 rounded-full"></div>
                    <div className="absolute w-64 h-64 border-2 border-blue-600 rounded-full"></div>
                </div>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
                AUTOMATE ATTENDANCE TODAY
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Ready to Transform Your Attendance System?</h2>
                <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                Join thousands of organizations that trust our AI-powered platform for accurate, contactless attendance tracking.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                    href="/student/register" 
                    className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center"
                >
                    Start 14-Day Free Trial
                    <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                </div>
                
                <div className="mt-10 text-zinc-400 text-sm">
                No credit card required. Full-featured 14-day trial.
                </div>
            </div>
        </section>
      
    </div>
  );
};

// Enhanced Modern Feature Card Component
const FeatureCard = ({ icon, title, desc, color, num }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const getGradient = () => {
      switch(color) {
        case 'blue': return 'from-blue-500 to-blue-600';
        case 'indigo': return 'from-indigo-500 to-indigo-600';
        case 'sky': return 'from-sky-500 to-sky-600';
        default: return 'from-blue-500 to-blue-600';
      }
    };
    
    return (
      <div 
        className={`p-8 rounded-2xl transition-all duration-500 transform ${
          isHovered ? 'shadow-xl -translate-y-1' : 'shadow-md'
        } bg-white border border-zinc-100 relative overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Feature number - subtle background element */}
        <div className="absolute -top-4 -right-4 text-8xl font-bold text-zinc-100 z-0 select-none">
          {num}
        </div>
        
        <div className="relative z-10">
          <div className={`mb-6 p-3 rounded-lg inline-block bg-gradient-to-r ${getGradient()} text-white transform transition-all duration-500 ${
            isHovered ? 'rotate-6 scale-110' : ''
          }`}>
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-zinc-900">{title}</h3>
          <p className="text-zinc-600 leading-relaxed">{desc}</p>
          
          <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${getGradient()} rounded-full transition-all duration-500 ${
            isHovered ? 'w-3/4' : ''
          }`}></div>
        </div>
      </div>
    );
  };

export default Home;