"use client";

import { useEffect, useState } from "react";
import { fetchApiData, getImageUrl } from "@/lib/utils";

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
    const fetchQuickLinks = async () => {
      try {
        const settingsData = await fetchApiData('site-setting');
        const links = settingsData?.quick_links || [];
        const activeLinks = links
          .filter((link: QuickLink) => link.is_active)
          .sort((a: QuickLink, b: QuickLink) => a.order - b.order);
        setQuickLinks(activeLinks);
      } catch (error) {
        console.error("Failed to fetch quick links:", error);
        setQuickLinks(getDefaultQuickLinks());
      } finally {
        setLoading(false);
      }
    };

    fetchQuickLinks();
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
          
          {/* Left side - Title */}
          <div className="flex-1">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 block">
              Quick Access:
            </span>
            <h2 className="text-2xl font-[800] text-[#191F1C] mt-4 uppercase tracking-tighter">
              Essential Services
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Access frequently used portals and services
            </p>
          </div>

          {/* Right side - SharePoint-style Quick Links */}
          <div className="w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Header */}
              <div className="bg-[#454ae6] text-white px-6 py-4">
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
                    <div className="w-8 h-8 bg-[#454ae6]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#454ae6]/20 transition-colors">
                      {link.icon ? (
                        <img
                          src={getImageUrl(link.icon) || "/default-icon.png"}
                          alt=""
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <svg className="w-4 h-4 text-[#454ae6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      )}
                    </div>

                    {/* Link Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#454ae6] transition-colors truncate">
                        {link.title}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-[#454ae6] transition-colors">
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