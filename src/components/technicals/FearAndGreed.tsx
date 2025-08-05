import React from "react";
import Image from "next/image";


const FearAndGreed: React.FC = () => {
  return (
    <section id="results" className="py-8 bg-background">
      <div className="flex justify-center">
      <div className="bg-surface p-8 w-100 rounded radius-6">
      <Image alt="Latest Crypto Fear & Greed Index" 
             src="https://alternative.me/crypto/fear-and-greed-index.png"
             width={400}
             height={400} />
      </div>
      </div>
      
    </section>
    
  );
};

export default FearAndGreed;
