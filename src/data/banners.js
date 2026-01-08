// src/data/banners.js

const staticData = [
  {
    title: "Industrial Grade Tools",
    subtitle: "Built for professionals",
    cta: "Shop Tools",
  },
  {
    title: "Construction Essentials",
    subtitle: "Heavy duty equipment",
    cta: "View Equipment",
  },
  {
    title: "Electrical Safety",
    subtitle: "Certified equipment",
    cta: "Shop Electrical",
  },
];

export const fetchBanners = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/banner/");
    const json = await res.json();

    if (!json?.success) return [];

    const apiBanners = [
      ...(json.data?.top || []),
      ...(json.data?.mid || []),
      ...(json.data?.bottom || []),
    ];

    return staticData.map((item, index) => {
      const apiItem = apiBanners[index];
      return {
        id: apiItem?.id || index + 1,
        title: item.title,
        subtitle: item.subtitle,
        image: apiItem?.image || "",
        cta: item.cta,
      };
    });
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return [];
  }
};
