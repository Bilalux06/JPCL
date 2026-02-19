"use client";

import { useState, useEffect } from "react";
import { fetchApiData, getTenderStatus, formatDate, API_URL } from "@/lib/utils";
import LeadershipSection from "@/components/sections/LeadershipSection";
import StakeholdersSection from "@/components/sections/StakeholdersSection";
import QuickLinksSection from "@/components/sections/QuickLinksSection";

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tenders, setTenders] = useState([]);

  const slides = ["/slide1.png", "/slide2.png", "/slide3.png", "/slide4.png"];

  useEffect(() => {
    const fetchTenders = async () => {
      const data = await fetchApiData('tenders');
      setTenders(data);
    };
    fetchTenders();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo(0, 0);
  };

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans text-[#111111] antialiased">
      
      {/* --- TOP BAR --- */}
      <div className="bg-[#f3f3f3] text-[#555555] text-[10px] py-2 px-6 tracking-tight font-bold border-b border-gray-100 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4"><span>Govt. of Pakistan Entity</span><span className="opacity-20">|</span><span>ISO Certified</span></div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#23285D] transition">Staff Webmail</a>
            <button className="flex items-center gap-1 hover:text-[#23285D] transition">Secure Login</button>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => nav('home')}>
            <img src="/Jpcl_logo.png" alt="JPCL" className="h-14 w-auto" />
            <div className="text-left">
              <h1 className="text-[#23285D] text-xl font-[700] leading-none tracking-tight uppercase">Jamshoro Power</h1>
              <p className="text-[#595959] text-[10px] font-[600] uppercase tracking-[0.25em] mt-0.5">Company Ltd(Genco-1)</p>
            </div>
          </div>
          <nav className="hidden lg:flex gap-10 text-[14px] font-[600] text-[#444444] uppercase tracking-tight">
            {['Home', 'Plant Info', 'Organization', 'Tenders', 'Media', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => nav(item.toLowerCase().replace(' ', '-'))} 
                className={`transition-all duration-300 ${activePage === item.toLowerCase().replace(' ', '-') ? 'text-[#23285D] font-[700]' : 'hover:text-[#23285D]'}`}
              >
                {item}
              </button>
            ))}
          </nav>
          <a href="http://localhost:1337/admin" target="_blank" rel="noopener noreferrer" className="bg-[#23285D] text-white px-10 py-3 rounded-full text-[13px] font-[700] uppercase tracking-widest hover:bg-[#444444] transition-all shadow-xl shadow-[#23285D]/20">Sign In</a>
        </div>
      </header>

      <div className="flex-grow">
        {activePage === "home" && (
          <div className="animate-fadeIn">
            <section className="relative h-[650px] flex items-center bg-black overflow-hidden">
              {slides.map((img, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={img} className="w-full h-full object-cover scale-105" alt="Plant" />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white text-left">
                  <span className="text-[#23285D] bg-white px-4 py-2 font-[700] text-sm uppercase tracking-[0.5em] mb-4 inline-block rounded">⚡ Energy for Nation</span>
                  <h2 className="text-[80px] font-[700] leading-[0.85] mb-12 tracking-tight shadow-2xl">Reliable.<br /><span className="text-[#23285D] bg-white px-4 rounded">Sustainable.</span></h2>
                  <button onClick={() => nav('tenders')} className="bg-[#23285D] text-white px-16 py-6 rounded-full text-sm font-[700] hover:scale-105 hover:bg-[#444444] transition-all uppercase tracking-widest">Explore Tenders</button>
              </div>
            </section>

            {/* STAKEHOLDERS SECTION */}
            <StakeholdersSection />

            {/* QUICK LINKS */}
            <QuickLinksSection />

            {/* LEADERSHIP MESSAGES */}
            <LeadershipSection />
          </div>
        )}

        {/* ORGANIZATION PAGE */}
        {activePage === "organization" && (
          <section className="py-24 bg-[#fcfcfc] min-h-screen animate-fadeIn text-center">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-sm font-black text-[#23285D] uppercase tracking-[0.5em] mb-4">Governance</h2>
              <h3 className="text-5xl font-[700] text-[#444444] uppercase tracking-tight mb-16">Board Of Directors</h3>
              <div className="flex justify-center mb-20">
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-2xl flex flex-col items-center w-[320px] group transition-all duration-500">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#23285D] shadow-lg">
                    <img src="/Raza.jpeg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Chairman" />
                  </div>
                  <h4 className="text-xl font-black text-[#444444] uppercase tracking-tight">Mr. Shahid Raza</h4>
                  <p className="text-[#23285D] text-[10px] font-black uppercase tracking-widest mt-2 bg-[#23285D]/10 px-4 py-1 rounded-full">Chairman / Director</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-100 pt-10">
                {[
                  { n: "Mr. Sajjad Ahmed", i: "/Sajjad.jpeg" },
                  { n: "Mr. Abdul Vicki", i: "/abdul.jpeg" },
                  { n: "Mr. Javed Iqbal", i: "/Javed.jpeg" },
                  { n: "Mr. Habib Ullah", i: "/Habibullah.jpeg" },
                ].map((d, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                    <img src={d.i} className="w-24 h-24 rounded-3xl mb-6 mx-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={d.n} />
                    <h4 className="text-lg font-bold text-[#444444] uppercase tracking-tight leading-tight mb-2">{d.n}</h4>
                    <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Director</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PLANT INFO PAGE */}
        {activePage === "plant-info" && (
          <section className="py-24 max-w-7xl mx-auto px-6 animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-[700] text-[#444444] uppercase tracking-tight mb-4">Plant Information</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Detailed information about our power generation facilities and technical specifications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-xl">
                <h3 className="text-3xl font-bold text-[#444444] uppercase tracking-tight mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Total Capacity:</span>
                    <span className="text-[#23285D] font-black">3,600 MW</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Units:</span>
                    <span className="text-[#23285D] font-black">6 x 600 MW</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Technology:</span>
                    <span className="text-[#23285D] font-black">Combined Cycle</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Fuel Type:</span>
                    <span className="text-[#23285D] font-black">Natural Gas</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-xl">
                <h3 className="text-3xl font-bold text-[#444444] uppercase tracking-tight mb-6">Location & Access</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Location:</span>
                    <span className="text-[#23285D] font-black">Jamshoro, Sindh</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Grid Connection:</span>
                    <span className="text-[#23285D] font-black">NTDC Network</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Commissioned:</span>
                    <span className="text-[#23285D] font-black">2018-2020</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="font-bold text-gray-700">Status:</span>
                    <span className="text-green-600 font-black">Operational</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-gradient-to-br from-[#23285D] to-[#444444] p-10 rounded-[40px] text-white">
                <div className="text-5xl font-[900] mb-4">99.8%</div>
                <div className="text-sm font-black uppercase tracking-widest opacity-80">Availability</div>
              </div>
              <div className="text-center bg-gradient-to-br from-green-500 to-green-600 p-10 rounded-[40px] text-white">
                <div className="text-5xl font-[900] mb-4">24/7</div>
                <div className="text-sm font-black uppercase tracking-widest opacity-80">Operation</div>
              </div>
              <div className="text-center bg-gradient-to-br from-orange-500 to-red-500 p-10 rounded-[40px] text-white">
                <div className="text-5xl font-[900] mb-4">ISO</div>
                <div className="text-sm font-black uppercase tracking-widest opacity-80">Certified</div>
              </div>
            </div>
          </section>
        )}

        {/* TENDERS PAGE */}
        {activePage === "tenders" && (
          <section className="py-24 max-w-7xl mx-auto px-6 animate-fadeIn">
            <h2 className="text-4xl font-[700] text-[#444444] uppercase tracking-tight mb-10 border-b-4 border-[#23285D] inline-block">Active Tenders</h2>
            <div className="overflow-hidden rounded-[32px] border border-gray-100 shadow-2xl bg-white">
                <table className="w-full text-left">
                  <thead className="bg-[#111111] text-white text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-6">Ref ID</th>
                      <th className="px-10 py-6">Description</th>
                      <th className="px-10 py-6">Deadline</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {tenders.map((t: any) => {
                      const fUrl = t.Attachment?.url ? `${API_URL}${t.Attachment.url}` : null;
                      const tenderStatus = getTenderStatus(t.Closing_Date, t.Tender_Status);
                      const isExpired = tenderStatus === 'expired';
                      const descText = Array.isArray(t.Description) 
                        ? t.Description.map((b: any) => b.children?.map((c: any) => c.text).join('')).join(' ') 
                        : (t.Description || '');
                      
                      return (
                        <tr key={t.id} className={`hover:bg-gray-50 transition group ${isExpired ? 'bg-red-50' : ''}`}>
                          <td className="px-10 py-8 font-black text-blue-600 uppercase tracking-tighter">
                            {t.Reference_ID}
                          </td>
                          <td className="px-10 py-8 font-bold text-gray-700 uppercase">
                            {t.Title}
                            {descText && (
                              <div className="text-xs text-gray-500 mt-1 normal-case">
                                {descText.length > 100 ? `${descText.substring(0, 100)}...` : descText}
                              </div>
                            )}
                          </td>
                          <td className="px-10 py-8 text-red-600 font-black italic">
                            {formatDate(t.Closing_Date)}
                          </td>
                          <td className="px-10 py-8">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              isExpired 
                                ? 'bg-red-100 text-red-800' 
                                : tenderStatus === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {isExpired && (
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              )}
                              {tenderStatus}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right">
                            {fUrl && !isExpired ? (
                              <a 
                                href={fUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-[#23285D] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase hover:bg-[#444444] transition-all shadow-lg"
                              >
                                Download PDF
                              </a>
                            ) : isExpired ? (
                              <span className="bg-gray-300 text-gray-600 px-6 py-3 rounded-full text-[10px] font-black uppercase cursor-not-allowed">
                                EXPIRED
                              </span>
                            ) : (
                              <span className="text-gray-300 font-black uppercase text-[10px]">No File</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {tenders.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-10 py-16 text-center">
                          <div className="text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-lg font-bold uppercase tracking-wider">No Tenders Available</p>
                            <p className="text-sm mt-2">Please check back later for new opportunities</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
            </div>
          </section>
        )}

        {/* MEDIA PAGE */}
        {activePage === "media" && (
          <section className="py-24 max-w-7xl mx-auto px-6 animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-[700] text-[#444444] uppercase tracking-tight mb-4">Media Center</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Stay updated with our latest news, press releases, and company announcements.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "JPCL Achieves Record Generation",
                  date: "March 15, 2024",
                  image: "/slide1.png",
                  description: "Our facility reaches new milestones in power generation efficiency."
                },
                {
                  title: "Sustainability Initiative Launch",
                  date: "March 10, 2024", 
                  image: "/slide2.png",
                  description: "New environmental programs to reduce carbon footprint."
                },
                {
                  title: "Technology Upgrade Complete",
                  date: "March 5, 2024",
                  image: "/slide3.png",
                  description: "Latest turbine technology installed for improved efficiency."
                }
              ].map((news, i) => (
                <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-gray-50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <img src={news.image} className="w-full h-48 object-cover" alt={news.title} />
                  <div className="p-8">
                    <div className="text-[#23285D] text-xs font-black uppercase tracking-widest mb-3">{news.date}</div>
                    <h3 className="text-xl font-bold text-[#444444] uppercase tracking-tight mb-4 leading-tight">{news.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{news.description}</p>
                    <button className="bg-[#23285D] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#444444] transition-all">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-xl">
                <h3 className="text-3xl font-bold text-[#444444] uppercase tracking-tight mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {["/slide1.png", "/slide2.png", "/slide3.png", "/slide4.png"].map((img, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                      <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`Gallery ${i + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="w-full bg-[#23285D] text-white py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#444444] transition-all">
                  View All Photos
                </button>
              </div>
              
              <div className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-xl">
                <h3 className="text-3xl font-bold text-[#444444] uppercase tracking-tight mb-6">Press Releases</h3>
                <div className="space-y-6">
                  {[
                    { title: "Q1 2024 Financial Results Released", date: "March 20, 2024" },
                    { title: "New Board Member Appointment", date: "March 18, 2024" },
                    { title: "Environmental Impact Report Published", date: "March 12, 2024" },
                    { title: "Annual General Meeting Notice", date: "March 8, 2024" }
                  ].map((press, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-gray-800 mb-2">{press.title}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#23285D] font-black uppercase tracking-widest">{press.date}</span>
                        <button className="text-sm text-[#23285D] font-bold hover:underline">Download PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT PAGE */}
        {activePage === "contact" && (
          <section className="py-24 max-w-7xl mx-auto px-6 animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-[700] text-[#444444] uppercase tracking-tight mb-4">Contact Us</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Get in touch with our team for inquiries, partnerships, and business opportunities.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-3xl font-bold text-[#444444] uppercase tracking-tight mb-8">Get In Touch</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-[#23285D] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Office Address</h4>
                      <p className="text-gray-600">Jamshoro Power Company Limited<br />Industrial Area, Jamshoro<br />Sindh, Pakistan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-[#23285D] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Phone Numbers</h4>
                      <p className="text-gray-600">Main Office: +92-22-2771234<br />Fax: +92-22-2771235</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-[#23285D] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Email Addresses</h4>
                      <p className="text-gray-600">General: info@jpcl.com.pk<br />Tenders: tenders@jpcl.com.pk<br />Media: media@jpcl.com.pk</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-xl font-bold text-[#444444] uppercase tracking-tight mb-4">Business Hours</h4>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-700">Monday - Friday</span>
                      <span className="text-[#23285D] font-black">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-700">Saturday</span>
                      <span className="text-gray-600">8:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-xl">
                <h3 className="text-3xl font-bold text-[#444444] uppercase tracking-tight mb-8">Send Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#454ae6] transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#454ae6] transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#454ae6] transition-colors"
                      placeholder="Enter subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#454ae6] transition-colors resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#23285D] text-white py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#444444] transition-all shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#111111] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/Jpcl_logo.png" alt="JPCL" className="h-12 w-auto brightness-0 invert" />
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-tight">Jamshoro Power</h4>
                  <p className="text-[#23285D] text-xs font-bold uppercase tracking-widest">Company Ltd</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Leading power generation company committed to providing reliable, efficient, 
                and sustainable energy solutions for Pakistan's growing needs.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#23285D] rounded-full flex items-center justify-center hover:bg-[#444444] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-[#23285D] rounded-full flex items-center justify-center hover:bg-[#444444] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-[#23285D] rounded-full flex items-center justify-center hover:bg-[#444444] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold uppercase tracking-tighter mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => nav('home')} className="text-gray-400 hover:text-white transition-colors text-sm">Home</button></li>
                <li><button onClick={() => nav('plant-info')} className="text-gray-400 hover:text-white transition-colors text-sm">Plant Info</button></li>
                <li><button onClick={() => nav('organization')} className="text-gray-400 hover:text-white transition-colors text-sm">Organization</button></li>
                <li><button onClick={() => nav('tenders')} className="text-gray-400 hover:text-white transition-colors text-sm">Tenders</button></li>
                <li><button onClick={() => nav('media')} className="text-gray-400 hover:text-white transition-colors text-sm">Media</button></li>
                <li><button onClick={() => nav('contact')} className="text-gray-400 hover:text-white transition-colors text-sm">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold uppercase tracking-tighter mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-[#23285D] mt-0.5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Industrial Area, Jamshoro</p>
                    <p className="text-gray-400 text-sm">Sindh, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#454ae6] flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">+92-22-2771234</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#454ae6] flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">info@jpcl.com.pk</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold uppercase tracking-tighter mb-6">Business Hours</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Monday - Friday</span>
                  <span className="text-white text-sm font-bold">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Saturday</span>
                  <span className="text-white text-sm font-bold">8:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Sunday</span>
                  <span className="text-red-400 text-sm font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Jamshoro Power Company Limited. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}