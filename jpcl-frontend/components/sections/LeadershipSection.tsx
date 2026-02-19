"use client";

import { useEffect, useState } from "react";
import { fetchApiData, getImageUrl } from "@/lib/utils";

// Strapi v5 format - no attributes wrapper
interface LeadershipMember {
  id: number;
  documentId: string;
  Name: string;
  Title: string;
  Message: any; // Rich text format
  photo: any;
  Order: number | null;
}

// Helper to extract text from Strapi rich text
function extractTextFromRichText(content: any): string {
  if (typeof content === 'string') return content;
  if (!content || !Array.isArray(content)) return '';
  
  return content
    .map((block: any) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.map((child: any) => child.text || '').join('');
      }
      return '';
    })
    .join(' ')
    .slice(0, 200) + '...';
}

export default function LeadershipSection() {
  const [leaders, setLeaders] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const data = await fetchApiData('leaderships');
        // Sort by order
        const activeLeaders = data
          .sort((a: LeadershipMember, b: LeadershipMember) => 
            (a.Order || 0) - (b.Order || 0));
        setLeaders(activeLeaders);
      } catch (error) {
        console.error("Failed to fetch leadership:", error);
        // Fallback to hardcoded data if API fails
        setLeaders(getDefaultLeaders());
      } finally {
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  const getDefaultLeaders = (): LeadershipMember[] => [
    {
      id: 1,
      documentId: "default-1",
      Name: "Mr. Muhammad Abdul Vakil",
      Title: "Message From CEO",
      Message: "Our commitment to providing reliable and sustainable energy remains our top priority.",
      photo: null,
      Order: 1
    },
    {
      id: 2,
      documentId: "default-2",
      Name: "Mr. Shahid Raza",
      Title: "Board's Vision", 
      Message: "The Board is dedicated to transparent governance and strategic growth.",
      photo: null,
      Order: 2
    },
    {
      id: 3,
      documentId: "default-3",
      Name: "Sardar Awais Ahmad Khan Leghari",
      Title: "Federal Minister's Message",
      Message: "Pakistan's energy future depends on strategic investments in sustainable power generation.",
      photo: null,
      Order: 3
    }
  ];

  if (loading) {
    return (
      <section className="py-32 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 animate-pulse">
                <div className="flex items-center gap-8 mb-10">
                  <div className="w-24 h-24 bg-gray-200 rounded-3xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-gray-100 flex-shrink-0 shadow-md">
                  <img 
                    src={getImageUrl(leader.photo) || getDefaultImage(leader.id)} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    alt={leader.Name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getDefaultImage(leader.id);
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-[700] text-[#444444] uppercase tracking-tight leading-none">
                    {leader.Title}
                  </h4>
                  <p className="text-[#23285D] text-[10px] font-black uppercase tracking-widest mt-2 bg-[#23285D]/5 inline-block px-3 py-1 rounded-md">
                    {leader.Name}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed font-bold italic text-sm mb-10 border-l-4 border-[#23285D] pl-6">
                "{extractTextFromRichText(leader.Message)}"
              </p>
              <button className="text-[#454ae6] font-black text-[11px] uppercase tracking-[0.2em] hover:text-black transition-all">
                Read Full Statement →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default images based on leader ID
function getDefaultImage(id: number) {
  const defaultImages: { [key: number]: string } = {
    1: "/Abdul.jpeg",
    2: "/Raza.jpeg", 
    3: "/Minister.jpeg" // Add this image to public folder
  };
  return defaultImages[id] || "/placeholder-leader.jpg";
}