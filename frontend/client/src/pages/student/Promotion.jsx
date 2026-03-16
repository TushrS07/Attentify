import { useState, useEffect } from "react";
import { UserIcon, ClockIcon, ShieldCheckIcon, ChartBarIcon, ArrowRightIcon } from "lucide-react";

const Promotion = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white border-b border-slate-200">

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Content */}
        <div
          className="relative z-10 px-6 mt-20 md:mt-0 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{
            transform: `translateY(${-scrollY * 0.05}px)`,
            opacity: 1 - scrollY * 0.001
          }}
        >
          <div className="text-slate-900">
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-sm font-semibold tracking-wider">
              <ClockIcon size={16} className="mr-2" />
              ENTERPRISE ATTENDANCE INTELLIGENCE
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight font-serif text-slate-900">
              <span className="block mb-2 text-slate-800">Streamline</span>
              <span className="text-blue-800">
                Academic Operations
              </span>
            </h1>
            <p className="text-lg lg:text-xl mb-10 text-slate-600 max-w-xl leading-relaxed">
              Modernize your institution's attendance tracking with our highly secure, comprehensive, and data-driven platform designed for professional environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/student/register"
                className="group px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-md shadow-md transition-all duration-300 flex items-center"
              >
                Access Portal
                <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative w-full h-full min-h-[500px]">
              {/* Professional Dashboard visualization */}
              <div className="absolute top-10 right-0 w-full h-[420px] bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-200 overflow-hidden"
                   style={{ transform: `translateX(${scrollY * 0.02}px)` }}>
                {/* Dashboard Header mock */}
                <div className="h-14 bg-slate-50 border-b border-slate-200 flex items-center px-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  </div>
                  <div className="ml-6 h-4 w-48 bg-slate-200 rounded-sm"></div>
                </div>
                {/* Dashboard Content mock */}
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <div>
                      <div className="h-6 w-40 bg-slate-800 rounded-sm mb-2"></div>
                      <div className="h-4 w-60 bg-slate-200 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-24 bg-white border border-slate-200 shadow-sm rounded-lg p-4">
                        <div className="h-3 w-16 bg-slate-300 rounded mb-4"></div>
                        <div className="h-8 w-24 bg-blue-800 rounded mb-2"></div>
                    </div>
                    <div className="h-24 bg-white border border-slate-200 shadow-sm rounded-lg p-4">
                        <div className="h-3 w-20 bg-slate-300 rounded mb-4"></div>
                        <div className="h-8 w-16 bg-blue-800 rounded mb-2"></div>
                    </div>
                    <div className="h-24 bg-white border border-slate-200 shadow-sm rounded-lg p-4">
                        <div className="h-3 w-16 bg-slate-300 rounded mb-4"></div>
                        <div className="h-8 w-12 bg-blue-800 rounded mb-2"></div>
                    </div>
                  </div>
                  <div className="h-32 bg-slate-50 border border-slate-200 rounded-lg flex items-end p-4 space-x-4">
                    {[40, 70, 45, 90, 65, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating element 1 */}
              <div className="absolute top-0 -left-6 w-32 h-32 bg-white border border-slate-100 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-blue-800"
                   style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
                  <UserIcon size={40} />
              </div>

              {/* Floating element 2 */}
              <div className="absolute bottom-10 -left-10 w-40 h-24 bg-blue-800 rounded-xl shadow-[0_10px_30px_rgba(30,58,138,0.2)] flex items-center justify-center text-white"
                   style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
                  <div className="flex items-center">
                    <ChartBarIcon size={24} className="mr-3" />
                    <span className="font-semibold text-lg">99.9% Sync</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
            {[
              { value: "99.2%", label: "System Accuracy" },
              { value: "5.4M", label: "Records Managed" },
              { value: "37%", label: "Administrative Time Saved" },
              { value: "SLA", label: "Enterprise Reliability" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 font-serif">Comprehensive Academic Infrastructure</h2>
            <p className="text-lg text-slate-600">
              Our platform unifies data management, secure tracking, and high-level analytics in an intuitive, enterprise-grade environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UserIcon size={24} />}
              title="Identity Verification"
              desc="Reliable and robust identity checks ensuring the integrity of academic records."
              num="01"
            />
            <FeatureCard
              icon={<ClockIcon size={24} />}
              title="Automated Timesheets"
              desc="Precise logging of attendance and schedules, eliminating manual entry errors."
              num="02"
            />
            <FeatureCard
              icon={<ShieldCheckIcon size={24} />}
              title="Data Security"
              desc="Enterprise-grade encryption protecting sensitive institutional and student information."
              num="03"
            />
            <FeatureCard
              icon={<ChartBarIcon size={24} />}
              title="Insightful Reporting"
              desc="Generate detailed performance and attendance reports tailored for accreditation audits."
              num="04"
            />
            <FeatureCard
              icon={<ClockIcon size={24} />}
              title="Roster Management"
              desc="Effortlessly handle complex class schedules, faculty assignments, and room allocations."
              num="05"
            />
            <FeatureCard
              icon={<ShieldCheckIcon size={24} />}
              title="Compliance Ready"
              desc="Built to support institutional compliance with regional educational standards."
              num="06"
            />
          </div>
        </div>
      </section>

      {/* Analytics Showcase Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 font-serif">Transform Data Into Strategic Decisions</h2>
              <p className="text-lg text-slate-600 mb-10">
                Our intuitive platform provides complete visibility into your institution's operational patterns with actionable, structured intelligence.
              </p>

              <div className="space-y-8">
                {[
                  {
                    title: "Identify Trends Early",
                    desc: "Uncover hidden patterns in attendance to proactively support student success."
                  },
                  {
                    title: "Resource Allocation",
                    desc: "Optimize staffing and facility usage based on concrete historical data."
                  },
                  {
                    title: "Automated Workflows",
                    desc: "Trigger notifications and administrative procedures based on specific attendance criteria."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="mr-5 mt-1 flex-shrink-0 w-10 h-10 rounded shadow-sm border border-blue-200 bg-blue-50 flex items-center justify-center text-blue-800 font-bold border-t-2 border-t-blue-600">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Light themed analytics graphic */}
              <div className="relative bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <div className="mb-6 flex space-x-8 border-b border-slate-100 pb-4">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-4 w-24 bg-slate-100 rounded"></div>
                  <div className="h-4 w-24 bg-slate-100 rounded"></div>
                </div>

                <div className="flex space-x-6 mb-8">
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-slate-400 rounded mb-2"></div>
                    <div className="h-8 w-16 bg-slate-800 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-slate-400 rounded mb-2"></div>
                    <div className="h-8 w-20 bg-blue-800 rounded"></div>
                  </div>
                </div>

                <div className="h-48 border-l border-b border-slate-200 relative flex items-end justify-between px-4 pb-0 pt-8">
                   {/* Grid lines */}
                   <div className="absolute top-1/4 w-full border-t border-slate-100 left-0"></div>
                   <div className="absolute top-2/4 w-full border-t border-slate-100 left-0"></div>
                   <div className="absolute top-3/4 w-full border-t border-slate-100 left-0"></div>

                   {/* Bars */}
                   {[60, 80, 45, 90, 75, 50, 85].map((h, i) => (
                      <div key={i} className="w-8 flex flex-col justify-end space-y-1 relative z-10" style={{ height: '100%' }}>
                         <div className="w-full bg-blue-800 rounded-t" style={{ height: `${h}%` }}></div>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 font-serif">Trusted by Institutions</h2>
            <p className="text-lg text-slate-600">
              See how modern organizations are leveraging Attentify.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Administrative overhead was reduced by 40% in the first semester of deployment.",
                author: "Dr. A. Gupta",
                role: "University Dean"
              },
              {
                quote: "The integrity and reliability of our attendance records have completely transformed.",
                author: "M. Torres",
                role: "Head of Operations"
              },
              {
                quote: "A remarkably clean interface that our faculty adopted with minimal training.",
                author: "S. Reynolds",
                role: "IT Director"
              }
            ].map((testimonial, i) => (
              <div key={i}
                className="bg-slate-50 rounded-lg p-8 border border-slate-200">
                <p className="text-slate-700 mb-8 leading-relaxed font-medium">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-800 font-bold border border-blue-200`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-slate-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-slate-900 text-center">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white font-serif">Ready for Professional Implementation?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Upgrade your organizational infrastructure with our secure, enterprise-ready platform.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                  href="/student/register"
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md shadow-md transition-colors flex items-center justify-center"
              >
                  Contact Sales for Demo
              </a>
              <a
                  href="/student/login"
                  className="px-8 py-3.5 bg-transparent border border-slate-600 hover:bg-slate-800 text-white font-semibold rounded-md transition-colors flex items-center justify-center"
              >
                  Sign In
              </a>
              </div>
          </div>
      </section>

    </div>
  );
};

// Clean Professional Feature Card Component
const FeatureCard = ({ icon, title, desc, num }) => {
    return (
      <div className="p-8 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-md bg-white border border-slate-200 text-blue-800 shadow-sm">
              {icon}
            </div>
            <div className="text-2xl font-bold text-slate-200 select-none font-serif">
                {num}
            </div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    );
  };

export default Promotion;
