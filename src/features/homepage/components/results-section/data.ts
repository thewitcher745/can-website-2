import { MonthResult } from "@src/types";

export const months: MonthResult[] = [
  {
    label: "April 2025",
    img: "/images/results/full-reports/apr-2025/4.svg",
    winrate: 75,
    grossProfit: 505.88,
  },
  {
    label: "March 2025",
    img: "/images/results/full-reports/mar-2025/4.svg",
    winrate: 72,
    grossProfit: 474.81,
  },
  {
    label: "February 2025",
    img: "/images/results/full-reports/feb-2025/4.svg",
    winrate: 63,
    grossProfit: 302.6,
  },
  {
    label: "January 2025",
    img: "/images/results/full-reports/jan-2025/4.svg",
    winrate: 80,
    grossProfit: 631.41,
  },
  {
    label: "December 2024",
    img: "/images/results/full-reports/dec-2024/4.svg",
    winrate: 68,
    grossProfit: 364.01,
  },
  {
    label: "November 2024",
    img: "/images/results/full-reports/nov-2024/4.svg",
    winrate: 89,
    grossProfit: 759.06,
  },
  {
    label: "October 2024",
    img: "/images/results/full-reports/oct-2024/4.svg",
    winrate: 78,
    grossProfit: 303.49,
  },
  {
    label: "September 2024",
    img: "/images/results/full-reports/sep-2024/4.svg",
    winrate: 81,
    grossProfit: 609.79,
  },
  {
    label: "August 2024",
    img: "/images/results/full-reports/aug-2024/4.svg",
    winrate: 65,
    grossProfit: 331.98,
  },
  {
    label: "July 2024",
    img: "/images/results/full-reports/jul-2024/4.svg",
    winrate: 64,
    grossProfit: 625.54,
  },
  {
    label: "June 2024",
    img: "/images/results/full-reports/jun-2024/4.svg",
    winrate: 72,
    grossProfit: 283.5,
  },
  {
    label: "May 2024",
    img: "/images/results/full-reports/may-2024/4.svg",
    winrate: 83,
    grossProfit: 546.95,
  },
  {
    label: "April 2024",
    img: "/images/results/full-reports/apr-2024/4.svg",
    winrate: 65,
    grossProfit: 483.86,
  },
  {
    label: "March 2024",
    img: "/images/results/full-reports/mar-2024/4.svg",
    winrate: 67,
    grossProfit: 487.2,
  },
  {
    label: "February 2024",
    img: "/images/results/full-reports/feb-2024/4.svg",
    winrate: 80,
    grossProfit: 751.89,
  },
  {
    label: "January 2024",
    img: "/images/results/full-reports/jan-2024/4.svg",
    winrate: 76,
    grossProfit: 396.76,
  },
  {
    label: "December 2023",
    img: "/images/results/full-reports/dec-2023/4.svg",
    winrate: 90,
    grossProfit: 391.24,
  },
  {
    label: "November 2023",
    img: "/images/results/full-reports/nov-2023/4.svg",
    winrate: 63,
    grossProfit: 317.58,
  },
  {
    label: "October 2023",
    img: "/images/results/full-reports/oct-2023/4.svg",
    winrate: 67,
    grossProfit: 323.12,
  },
  {
    label: "September 2023",
    img: "/images/results/full-reports/sep-2023/4.svg",
    winrate: 71,
    grossProfit: 163.46,
  },
  {
    label: "August 2023",
    img: "/images/results/full-reports/aug-2023/4.svg",
    winrate: 70,
    grossProfit: 220.63,
  },
  {
    label: "July 2023",
    img: "/images/results/full-reports/jul-2023/4.svg",
    winrate: 77,
    grossProfit: 556,
  },
];

export const parseLabel = (label: string): { monthName: string; year: string } => {
  const parts = label.split(" ");
  return { monthName: parts[0], year: parts[1] };
};
