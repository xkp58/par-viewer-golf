
import React, { useEffect, useState } from 'react';
import { GolfGameResult } from '../data/golfData';

interface GolfHeaderProps {
  data: GolfGameResult;
}

const GolfHeader: React.FC<GolfHeaderProps> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = data.clubImage;
    img.onload = () => setImageLoaded(true);
  }, [data.clubImage]);

  return (
    <div className="relative w-full h-[40vh] min-h-[300px] overflow-hidden rounded-xl">
      {/* Background image with blur-up loading effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${data.clubImage})` }}
      />
      
      {/* Loading placeholder */}
      <div 
        className={`absolute inset-0 bg-green-50 transition-opacity duration-500 ease-out ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 w-full p-8 text-white">
        <div className="animate-fade-up">
          <h1 className="font-display text-4xl font-semibold tracking-tight mb-1">
            {data.clubName}
          </h1>
          <p className="text-lg text-white/80 font-light">{data.courseName}</p>
          <p className="text-sm text-white/70 mt-2">{data.date}</p>
        </div>
      </div>
    </div>
  );
};

export default GolfHeader;
