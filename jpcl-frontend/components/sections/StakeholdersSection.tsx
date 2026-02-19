"use client";

import { useEffect, useState } from "react";
import { fetchApiData, getImageUrl } from "@/lib/utils";

// Strapi v5 format - no attributes wrapper
interface Stakeholder {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  logo: any;
  Link: string;
  Order: number;
  is_active: boolean;
}

export default function StakeholdersSection() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const data = await fetchApiData('stakeholders');
        const activeStakeholders = data
          .filter((stakeholder: Stakeholder) => stakeholder.is_active !== false)
          .sort((a: Stakeholder, b: Stakeholder) => 
            (a.Order || 0) - (b.Order || 0));
        setStakeholders(activeStakeholders);
      } catch (error) {
        console.error("Failed to fetch stakeholders:", error);
        // Fallback to default stakeholders if needed
        setStakeholders(getDefaultStakeholders());
      } finally {
        setLoading(false);
      }
    };

    fetchStakeholders();
  }, []);

  const getDefaultStakeholders = (): Stakeholder[] => [
    {
      id: 1,
      documentId: "default-1",
      Name: "Asian Development Bank",
      Description: "Funding Partner",
      logo: null,
      Link: "https://www.adb.org",
      Order: 1,
      is_active: true
    },
    {
      id: 2,
      documentId: "default-2",
      Name: "Siemens",
      Description: "Technology Partner",
      logo: null,
      Link: "https://www.siemens.com",
      Order: 2,
      is_active: true
    },
    {
      id: 3,
      documentId: "default-3",
      Name: "Ministry of Energy",
      Description: "Government Entity",
      logo: null,
      Link: "#",
      Order: 3,
      is_active: true
    }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-[700] text-[#444444] uppercase tracking-tight mb-12 text-center">
            Key Sector Stakeholders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-2xl animate-pulse h-32"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-[700] text-[#444444] uppercase tracking-tight mb-12 text-center">
          Key Sector Stakeholders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {stakeholders.map((stakeholder) => (
            <a
              key={stakeholder.id}
              href={stakeholder.Link || "#"}
              target={stakeholder.Link?.startsWith('http') ? "_blank" : "_self"}
              rel={stakeholder.Link?.startsWith('http') ? "noopener noreferrer" : ""}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="aspect-square flex items-center justify-center mb-4">
                <img
                  src={getImageUrl(stakeholder.logo) || "/placeholder-logo.png"}
                  alt={stakeholder.Name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-logo.png";
                  }}
                />
              </div>
              <h3 className="text-[10px] font-black uppercase text-center text-gray-600 tracking-wider">
                {stakeholder.Name}
              </h3>
              {stakeholder.Description && (
                <p className="text-[8px] text-gray-400 text-center mt-1 uppercase tracking-widest">
                  {stakeholder.Description}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}