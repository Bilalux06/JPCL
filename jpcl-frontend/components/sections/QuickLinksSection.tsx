"use client";

import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/utils";

interface QuickLink {
  id: number;
  title: string;
  url: string;
  icon: any;
  order: number;
  is_external: boolean;
  is_active: boolean;
}

export default function QuickLinksSection() {
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using default quick links (no API endpoint for this yet)
    setQuickLinks(getDefaultQuickLinks());
    setLoading(false);
  }, []);

  const getDefaultQuickLinks = () => [
    { id: 1, title: "Vendor Portal", url: "#", icon: null, order: 1, is_external: false, is_active: true },
    { id: 2, title: "Employee Self Service", url: "#", icon: null, order: 2, is_external: false, is_active: true },
    { id: 3, title: "Seniority Lists", url: "#", icon: null, order: 3, is_external: false, is_active: true },
    { id: 4, title: "Downloads", url: "#", icon: null, order: 4, is_external: false, is_active: true },
    { id: 5, title: "Careers", url: "#", icon: null, order: 5, is_external: false, is_active: true }
  ];

  if (loading || quickLinks.length === 0) {
    return (
      <section className="bg-[#f8f9fa] py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-8">
                Quick Access:
              </span>
            </div>
            <div className="w-80 animate-pulse">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8f9fa] py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-start gap-12">
          
          {/* Left side - Press & Release */}
          <div className="flex-1">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 block">
              Latest Updates:
            </span>
            <h2 className="text-2xl font-[700] text-[#444444] mt-4 uppercase tracking-tight">
              Press & Release
            </h2>
            <p className="text-gray-600 mt-2 text-sm mb-6">
              Stay updated with our latest announcements
            </p>
            
            {/* Press Releases List */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "JPCL Achieves Record Power Generation in Q4 2025",
                  date: "Feb 15, 2026",
                  category: "Announcement"
                },
                {
                  id: 2,
                  title: "Environmental Compliance Report Released",
                  date: "Feb 10, 2026",
                  category: "Report"
                },
                {
                  id: 3,
                  title: "New Coal Supply Agreement Signed",
                  date: "Feb 05, 2026",
                  category: "News"
                }
              ].map((release) => (
                <a
                  key={release.id}
                  href="#"
                  className="block bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-[#23285D]/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#23285D]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#23285D] transition-colors">
                      <svg className="w-5 h-5 text-[#23285D] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#23285D] uppercase tracking-wider bg-[#23285D]/10 px-2 py-1 rounded">
                        {release.category}
                      </span>
                      <h4 className="text-sm font-bold text-gray-800 mt-2 group-hover:text-[#23285D] transition-colors line-clamp-2">
                        {release.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{release.date}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <button className="mt-6 text-[#23285D] font-black text-[11px] uppercase tracking-[0.2em] hover:text-[#444444] transition-all flex items-center gap-2">
              View All Press Releases
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Right side - SharePoint-style Quick Links */}
          <div className="w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Header */}
              <div className="bg-[#23285D] text-white px-6 py-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">Quick Links</h3>
              </div>

              {/* Links List */}
              <div className="p-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.is_external ? "_blank" : "_self"}
                    rel={link.is_external ? "noopener noreferrer" : ""}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group border-b border-gray-50 last:border-b-0"
                  >
                    
                    {/* Icon */}
                    <div className="w-8 h-8 bg-[#23285D]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#23285D]/20 transition-colors">
                      {link.icon ? (
                        <img
                          src={getImageUrl(link.icon) || "/default-icon.png"}
                          alt=""
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <svg className="w-4 h-4 text-[#23285D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      )}
                    </div>

                    {/* Link Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#23285D] transition-colors truncate">
                        {link.title}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-[#23285D] transition-colors">
                      {link.is_external ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center uppercase tracking-widest">
                  More services available in portal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}