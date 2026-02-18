"use client";

import { useEffect, useState } from "react";
import { fetchApiData, getImageUrl } from "@/lib/utils";

interface LeadershipMember {
  id: number;
  attributes: {
    name: string;
    title: string;
    designation: string;
    message: string;
    photo: any;
    order: number;
    is_active: boolean;
  };
}

export default function LeadershipSection() {
  const [leaders, setLeaders] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const data = await fetchApiData('leaderships');
        // Sort by order and filter active ones
        const activeLeaders = data
          .filter((leader: LeadershipMember) => leader.attributes.is_active)
          .sort((a: LeadershipMember, b: LeadershipMember) => 
            a.attributes.order - b.attributes.order);
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

  const getDefaultLeaders = () => [
    {
      id: 1,
      attributes: {
        name: "Mr. Muhammad Abdul Vakil",
        title: "Message From CEO",
        designation: "Chief Executive Officer",
        message: "Our commitment to providing reliable and sustainable energy remains our top priority.",
        photo: null,
        order: 1,
        is_active: true
      }
    },
    {
      id: 2,
      attributes: {
        name: "Mr. Shahid Raza",
        title: "Board's Vision", 
        designation: "Chairman / Director",
        message: "The Board is dedicated to transparent governance and strategic growth.",
        photo: null,
        order: 2,
        is_active: true
      }
    },
    {
      id: 3,
      attributes: {
        name: "Sardar Awais Ahmad Khan Leghari",
        title: "Federal Minister's Message",
        designation: "Federal Minister for Energy (Power Division)",
        message: "Pakistan's energy future depends on strategic investments in sustainable power generation.",
        photo: null,
        order: 3,
        is_active: true
      }
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
                    src={getImageUrl(leader.attributes.photo) || getDefaultImage(leader.id)} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    alt={leader.attributes.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getDefaultImage(leader.id);
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-[800] text-[#191F1C] uppercase tracking-tighter leading-none">
                    {leader.attributes.title}
                  </h4>
                  <p className="text-[#454ae6] text-[10px] font-black uppercase tracking-widest mt-2 bg-[#454ae6]/5 inline-block px-3 py-1 rounded-md">
                    {leader.attributes.name}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed font-bold italic text-sm mb-10 border-l-4 border-[#454ae6] pl-6">
                "{leader.attributes.message}"
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