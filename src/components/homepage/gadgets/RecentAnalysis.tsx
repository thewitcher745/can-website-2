import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { buildApiUrl } from "../../../config";

interface AnalysisPost {
  thumbnail_link: string;
  author: string;
  time: string;
  slug: string;
  title: string;
  desc: string;
}

interface ApiData {}

const RecentAnalysis = ({ className }: { className?: string }) => {
  const [higlightedAnalysis, setHighlightedAnalysis] = useState(null);
  const [recentAnalysis, setRecentAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl("/api/"));

        if (!response.ok) {
          throw new Error("Failed to fetch top analysis.");
        }

        const result: ApiData = await response.json();
        setHighlightedAnalysis(result[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-3/5 h-120 border border-red-500"></div>
      <div className="w-full lg:w-2/5 h-120 border border-yellow-500"></div>
    </div>
  );
};

export default RecentAnalysis;
