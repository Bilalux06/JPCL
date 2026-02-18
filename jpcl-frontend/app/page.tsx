"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tenders, setTenders] = useState([]);

  const slides = ["/slide1.png", "/slide2.png", "/slide3.png", "/slide4.png"];

  // API URL updated to your live Render backend
  const API_URL = "https://jpcl.onrender.com";

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        // Updated localhost to live Render link
        const response = await fetch(`${API_URL}/api/tenders?populate=*`);
        const json = await response.json();
        setTenders(json.data || []);
      } catch (error) {
        console.error("Strapi connection failed:", error);
      }
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
            <a href="#" className="hover:text-[#454ae6] transition">Staff Webmail</a>
            <button className="flex items-center gap-1 hover:text-[#454ae6] transition">Secure Login</button>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => nav('home')}>
            <img src="/Jpcl_logo.png" alt="JPCL" className="h-14 w-auto" />
            <div className="text-left">
              <h1 className="text-[#191F1C] text-xl font-[800] leading-none tracking-tighter uppercase">Jamshoro Power</h1>
              <p className="text-[#454ae6] text-[10px] font-[900] uppercase tracking-[0.25em] mt-0.5">Company Ltd(Genco-1)</p>
            </div>
          </div>
          <nav className="hidden lg:flex gap-10 text-[14px] font-[750] text-[#191F1C] uppercase tracking-tight">
            {['Home', 'Plant Info', 'Organization', 'Tenders', 'Media', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => nav(item.toLowerCase().replace(' ', '-'))} 
                className={`transition-all duration-300 ${activePage === item.toLowerCase().replace(' ', '-') ? 'text-[#454ae6]' : 'hover:text-[#454ae6]'}`}
              >
                {item}
              </button>
            ))}
          </nav>
          <button className="bg-[#454ae6] text-white px-10 py-3 rounded-full text-[13px] font-[900] uppercase tracking-widest hover:bg-[#3b41d9] transition-all shadow-xl shadow-[#454ae6]/20">Sign In</button>
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
                  <span className="text-[#454ae6] font-[900] text-sm uppercase tracking-[0.5em] mb-4 block">⚡ Energy for Nation</span>
                  <h2 className="text-[80px] font-[800] leading-[0.85] mb-12 tracking-tighter shadow-2xl">Reliable.<br /><span className="text-[#454ae6]">Sustainable.</span></h2>
                  <button onClick={() => nav('tenders')} className="bg-[#454ae6] text-white px-16 py-6 rounded-full text-sm font-[900] hover:scale-105 transition-all uppercase tracking-widest">Explore Tenders</button>
              </div>
            </section>

            {/* QUICK LINKS */}
            <section className="bg-white py-10 border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">Quick Access:</span>
                {['Vendor Portal', 'Employee Self Service', 'Seniority Lists', 'Downloads', 'Careers'].map((link) => (
                  <button key={link} className="px-6 py-2 bg-[#f9f9f9] rounded-full text-[11px] font-extrabold uppercase tracking-tighter text-[#111111] hover:bg-[#454ae6] hover:text-white transition-all duration-300">
                    {link}
                  </button>
                ))}
              </div>
            </section>

            {/* LEADERSHIP MESSAGES */}
            <section className="py-32 bg-[#fcfcfc]">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex items-center gap-8 mb-10">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-gray-100 flex-shrink-0 shadow-md">
                      <img src="/Abdul.jpeg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="CEO" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-[800] text-[#191F1C] uppercase tracking-tighter leading-none">Message From CEO</h4>
                      <p className="text-[#454ae6] text-[10px] font-black uppercase tracking-widest mt-2 bg-[#454ae6]/5 inline-block px-3 py-1 rounded-md">Mr. Muhammad Abdul Vakil</p>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed font-bold italic text-sm mb-10 border-l-4 border-[#454ae6] pl-6">"Our commitment to providing reliable and sustainable energy remains our top priority."</p>
                  <button className="text-[#454ae6] font-black text-[11px] uppercase tracking-[0.2em] hover:text-black transition-all">Read Full Statement →</button>
                </div>

                <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex items-center gap-8 mb-10">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-gray-100 flex-shrink-0 shadow-md">
                        <img src="/Raza.jpeg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Chairman" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-[800] text-[#191F1C] uppercase tracking-tighter leading-none">Board's Vision</h4>
                      <p className="text-[#454ae6] text-[10px] font-black uppercase tracking-widest mt-2 bg-[#454ae6]/5 inline-block px-3 py-1 rounded-md">Mr. Shahid Raza (Chairman)</p>
                    </div>
                  </div>
                  <p className="text-gray-500 leading-relaxed font-bold italic text-sm mb-10 border-l-4 border-[#454ae6] pl-6">"The Board is dedicated to transparent governance and strategic growth."</p>
                  <button onClick={() => nav('organization')} className="text-[#454ae6] font-black text-[11px] uppercase tracking-[0.2em] hover:text-black transition-all">View Board Members →</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ORGANIZATION PAGE */}
        {activePage === "organization" && (
          <section className="py-24 bg-[#fcfcfc] min-h-screen animate-fadeIn text-center">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-sm font-black text-[#454ae6] uppercase tracking-[0.5em] mb-4">Governance</h2>
              <h3 className="text-5xl font-[800] text-[#191F1C] uppercase tracking-tighter mb-16">Board Of Directors</h3>
              <div className="flex justify-center mb-20">
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-2xl flex flex-col items-center w-[320px] group transition-all duration-500">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#454ae6] shadow-lg">
                    <img src="/Raza.jpeg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Chairman" />
                  </div>
                  <h4 className="text-xl font-black text-[#111111] uppercase tracking-tighter">Mr. Shahid Raza</h4>
                  <p className="text-[#454ae6] text-[10px] font-black uppercase tracking-widest mt-2 bg-[#454ae6]/10 px-4 py-1 rounded-full">Chairman / Director</p>
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
                    <h4 className="text-lg font-bold text-[#111111] uppercase tracking-tighter leading-tight mb-2">{d.n}</h4>
                    <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Director</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TENDERS PAGE */}
        {activePage === "tenders" && (
          <section className="py-24 max-w-7xl mx-auto px-6 animate-fadeIn">
            <h2 className="text-4xl font-[900] text-[#111111] uppercase tracking-tighter mb-10 border-b-4 border-[#454ae6] inline-block">Active Tenders</h2>
            <div className="overflow-hidden rounded-[32px] border border-gray-100 shadow-2xl bg-white">
                <table className="w-full text-left">
                  <thead className="bg-[#111111] text-white text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr><th className="px-10 py-6">Ref ID</th><th className="px-10 py-6">Description</th><th className="px-10 py-6">Deadline</th><th className="px-10 py-6 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {tenders.map((t: any) => {
                      // Updated localhost to live Render link for files
                      const fUrl = t.Attachment?.[0]?.url ? `${API_URL}${t.Attachment[0].url}` : null;
                      return (
                        <tr key={t.id} className="hover:bg-gray-50 transition group">
                          <td className="px-10 py-8 font-black text-blue-600 uppercase tracking-tighter">{t.Reference_ID}</td>
                          <td className="px-10 py-8 font-bold text-gray-700 uppercase">{t.Title}</td>
                          <td className="px-10 py-8 text-red-600 font-black italic">{t.Closing_Date}</td>
                          <td className="px-10 py-8 text-right">
                            {fUrl ? <a href={fUrl} target="_blank" className="bg-[#454ae6] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase hover:bg-[#3b41d9] transition-all shadow-lg">Download PDF</a> : <span className="text-gray-300 font-black uppercase text-[10px]">No File</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
          </section>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0c0c0c] text-white pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-20 border-b border-white/5 pb-24 text-[13px]">
            <div className="col-span-2">
                <img src="/Jpcl_logo.png" className="h-10 brightness-200 grayscale mb-8 opacity-30" />
                <p className="text-gray-600 font-bold uppercase tracking-tight opacity-80 leading-relaxed uppercase">Jamshoro Power Company Limited (Genco-I)</p>
            </div>
            <div>
                <h5 className="font-black text-[11px] mb-8 text-[#454ae6] uppercase tracking-[0.3em]">Corporate</h5>
                <ul className="text-gray-500 space-y-4 font-bold uppercase tracking-tighter uppercase">
                    <li className="hover:text-white cursor-pointer" onClick={() => nav('organization')}>Board Of Directors</li>
                    <li className="hover:text-white cursor-pointer">Plant Profile</li>
                </ul>
            </div>
            <div>
                <h5 className="font-black text-[11px] mb-8 text-[#454ae6] uppercase tracking-[0.3em]">Contact</h5>
                <p className="text-gray-600 font-bold uppercase tracking-tighter leading-loose uppercase">Mohra Jabal, Dadu Road, Jamshoro</p>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 text-[9px] text-gray-800 font-black uppercase tracking-[0.5em] flex justify-between">
            <p>© 2026 Jamshoro Power Co.</p>
            <div className="flex gap-10"><span>Privacy Policy</span><span>Terms & Conditions</span></div>
        </div>
      </footer>
    </main>
  );
}