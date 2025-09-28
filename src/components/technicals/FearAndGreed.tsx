import { useEffect, useState, useRef } from "react";

import { buildApiUrl } from "../../config";

interface FngData {
  value: number;
  value_classification: string;
}

const MIN_ANGLE = -175;
const MAX_ANGLE = -5;
const SLOPE = (MAX_ANGLE - MIN_ANGLE) / 100;

const FearAndGreed = ({ className }: { className?: string }) => {
  const [fngData, setFngData] = useState<FngData | null>(null);
  const [needleAngle, setNeedleAngle] = useState<string>("-170deg");
  const [needleWidth, setNeedleWidth] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(buildApiUrl(`/api/fng`));
        const data = await response.json();
        setFngData(data);
        setNeedleAngle(`${MIN_ANGLE + data.value * SLOPE}deg`);
        if (svgRef.current) {
          setNeedleWidth(svgRef.current.getBoundingClientRect().width);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load fear and greed data."
        );
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, []);

  // A resize listener that updates the needle angle
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        setNeedleWidth(svgRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [svgRef]);

  return (
    <div
      className={`py-1 rounded-t-md w-full h-full flex flex-col justify-between items-center ${className}`}
    >
      <div className="w-4/5 p-4 h-full flex justify-center items-center">
        <div id="fng-container" className="w-full relative flex justify-center">
          <svg
            ref={svgRef}
            width="80%"
            height="80%"
            viewBox="0 0 233 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.13339 116C2.93013 116 0.318258 113.401 0.478332 110.202C1.44339 90.9144 7.2099 72.17 17.253 55.6752C18.9188 52.9391 22.5398 52.2579 25.1891 54.0584V54.0584C27.8385 55.8589 28.5115 59.4585 26.8609 62.2037C18.1069 76.7627 13.0376 93.2409 12.0944 110.203C11.9166 113.401 9.33664 116 6.13339 116V116Z"
              fill="#EF4444"
            ></path>
            <path
              d="M27.7659 50.4264C25.1914 48.5203 24.6386 44.8776 26.6709 42.4016C38.9234 27.4744 54.7115 15.8409 72.5982 8.55995C75.565 7.35227 78.8805 8.95933 79.9385 11.9828V11.9828C80.9964 15.0064 79.3954 18.2998 76.4353 19.524C60.7366 26.0161 46.8573 36.2431 36.0063 49.3142C33.9602 51.7789 30.3403 52.3324 27.7659 50.4264V50.4264Z"
              fill="#F97316"
            ></path>
            <path
              d="M84.3902 10.5313C83.4617 7.46552 85.1917 4.21251 88.3 3.43836C107.039 -1.22885 126.65 -1.14324 145.348 3.68737C148.45 4.48863 150.151 7.75663 149.196 10.8141V10.8141C148.241 13.8716 144.991 15.5592 141.885 14.7752C125.414 10.6172 108.173 10.542 91.6663 14.556C88.5538 15.3129 85.3187 13.597 84.3902 10.5313V10.5313Z"
              fill="#EAB308"
            ></path>
            <path
              d="M153.294 12.1831C154.368 9.1654 157.693 7.57641 160.653 8.80023C178.5 16.1784 194.224 27.8977 206.395 42.8914C208.414 45.3784 207.841 49.0181 205.256 50.9101V50.9101C202.672 52.8021 199.055 52.2289 197.022 49.7531C186.243 36.6232 172.419 26.3207 156.756 19.7432C153.803 18.503 152.22 15.2008 153.294 12.1831V12.1831Z"
              fill="#22C55E"
            ></path>
            <path
              d="M207.336 53.8503C209.981 52.0438 213.604 52.7167 215.276 55.4489C225.356 71.9208 231.166 90.6519 232.175 109.937C232.342 113.136 229.736 115.741 226.533 115.748V115.748C223.33 115.756 220.744 113.163 220.559 109.965C219.577 93.0049 214.47 76.5384 205.683 61.9994C204.026 59.258 204.691 55.6569 207.336 53.8503V53.8503Z"
              fill="#1AA089"
            ></path>
          </svg>
          <div
            id="pointer-container"
            className="w-0 h-0 absolute left-1/2 bottom-0"
            style={{
              transform: `rotate(${needleAngle})`,
            }}
          >
            <div
              id="needle"
              className={`relative`}
              style={{
                width: `${0.47 * needleWidth}px`,
              }}
            >
              <div
                id="needle-pointer"
                className="bg-white border-gray-950 rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
                style={{
                  width: `${0.1 * needleWidth}px`,
                  height: `${0.1 * needleWidth}px`,
                  border: `${0.01 * needleWidth}px solid black`,
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 flex flex-col items-center -translate-x-1/2">
            <span
              className="text-text-main font-bold"
              style={{
                fontSize: `${0.1 * needleWidth}px`,
              }}
            >
              {fngData?.value}
            </span>
            <span
              className="text-text-main text-sm"
              style={{
                fontSize: `${Math.min(0.08 * needleWidth, 20)}px`,
              }}
            >
              {fngData?.value_classification}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FearAndGreed;
