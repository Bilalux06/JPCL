"use client";

import { useEffect, useState } from "react";
import { fetchApiData, getImageUrl } from "@/lib/utils";

interface Stakeholder {
  id: number;
  attributes: {
    name: string;
    description: string;
    logo: any;
    link: string;
    category: string;
    order: number;
    is_active: boolean;
  };
}

export default function StakeholdersSection() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const data = await fetchApiData('stakeholders');
        const activeStakeholders = data
          .filter((stakeholder: Stakeholder) => stakeholder.attributes.is_active)
          .sort((a: Stakeholder, b: Stakeholder) => 
            a.attributes.order - b.attributes.order);
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

  const getDefaultStakeholders = () => [
    {
      id: 1,
      attributes: {
        name: "Asian Development Bank",
        description: "Funding Partner",
        logo: null,
        link: "https://www.adb.org",
        category: "partner",
        order: 1,
        is_active: true
      }
    },
    {
      id: 2, 
      attributes: {
        name: "Siemens",
        description: "Technology Partner",
        logo: null,
        link: "https://www.siemens.com",
        category: "partner",
        order: 2,
        is_active: true
      }
    },
    {
      id: 3,
      attributes: {
        name: "Ministry of Energy",
        description: "Government Entity",
        logo: null,
        link: "#",
        category: "government",
        order: 3,
        is_active: true
      }
    }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-[900] text-[#191F1C] uppercase tracking-tighter mb-12 text-center">
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
        <h2 className="text-3xl font-[900] text-[#191F1C] uppercase tracking-tighter mb-12 text-center">
          Key Sector Stakeholders
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {stakeholders.map((stakeholder) => (
            <a
              key={stakeholder.id}
              href={stakeholder.attributes.link || "#"}
              target={stakeholder.attributes.link?.startsWith('http') ? "_blank" : "_self"}
              rel={stakeholder.attributes.link?.startsWith('http') ? "noopener noreferrer" : ""}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="aspect-square flex items-center justify-center mb-4">
                <img
                  src={getImageUrl(stakeholder.attributes.logo) || "/placeholder-logo.png"}
                  alt={stakeholder.attributes.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-logo.png";
                  }}
                />
              </div>
              <h3 className="text-[10px] font-black uppercase text-center text-gray-600 tracking-wider">
                {stakeholder.attributes.name}
              </h3>
              {stakeholder.attributes.description && (
                <p className="text-[8px] text-gray-400 text-center mt-1 uppercase tracking-widest">
                  {stakeholder.attributes.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}