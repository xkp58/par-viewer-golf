
import React, { useRef, useEffect } from 'react';
import { GolfGameResult, calculateParStatus, calculatePositions } from '../data/golfData';

interface ScorecardProps {
  data: GolfGameResult;
}

const Scorecard: React.FC<ScorecardProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const positions = calculatePositions(data.players);
  const totalPar = data.par.reduce((sum, value) => sum + value, 0);
  
  // Calculate front nine and back nine for par
  const frontNinePar = data.par.slice(0, 9).reduce((sum, value) => sum + value, 0);
  const backNinePar = data.par.slice(9, 18).reduce((sum, value) => sum + value, 0);

  // Scroll horizontally with mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current && e.deltaY !== 0) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const currentRef = scrollRef.current;
    
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Function to determine score cell background
  const getScoreBackground = (score: number, par: number) => {
    if (score < par - 1) return "bg-red-50 text-red-800"; // Eagle or better
    if (score === par - 1) return "bg-green-50 text-green-800"; // Birdie
    if (score === par) return ""; // Par
    if (score === par + 1) return "bg-amber-50 text-amber-800"; // Bogey
    return "bg-orange-50 text-orange-800"; // Double bogey or worse
  };
  
  return (
    <div className="animate-fade-up animation-delay-200 mb-8">
      <h2 className="text-xl font-semibold mb-4">Scorecard</h2>
      
      <div className="glass rounded-xl overflow-hidden">
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-green-200 scrollbar-track-transparent"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-green-50/50">
                <th className="sticky left-0 bg-green-50/50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap z-10">
                  Player
                </th>
                {/* Holes */}
                {data.par.map((_, index) => (
                  <th key={`hole-${index + 1}`} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    {index + 1}
                  </th>
                ))}
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50 w-16">
                  OUT
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50 w-16">
                  IN
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-green-100/60 w-16">
                  TOTAL
                </th>
              </tr>
              
              {/* Par row */}
              <tr className="bg-white">
                <td className="sticky left-0 bg-white px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200 z-10">
                  Par
                </td>
                {data.par.map((par, index) => (
                  <td key={`par-${index}`} className="px-3 py-2 text-center text-sm text-gray-500 border-b border-gray-200">
                    {par}
                  </td>
                ))}
                <td className="px-3 py-2 text-center text-sm font-medium text-gray-900 border-b border-gray-200 bg-gray-50/50">
                  {frontNinePar}
                </td>
                <td className="px-3 py-2 text-center text-sm font-medium text-gray-900 border-b border-gray-200 bg-gray-50/50">
                  {backNinePar}
                </td>
                <td className="px-3 py-2 text-center text-sm font-medium text-gray-900 border-b border-gray-200 bg-green-100/60">
                  {totalPar}
                </td>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {data.players.map((player) => {
                const frontNine = player.scores.slice(0, 9).reduce((sum, score) => sum + score, 0);
                const backNine = player.scores.slice(9, 18).reduce((sum, score) => sum + score, 0);
                
                return (
                  <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                    <td className="sticky left-0 bg-white hover:bg-gray-50 px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 z-10 transition-colors">
                      <div className="flex items-center">
                        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center mr-3 text-sm font-semibold text-green-800">
                          {positions[player.id]}
                        </div>
                        {player.name}
                      </div>
                    </td>
                    
                    {player.scores.map((score, index) => (
                      <td 
                        key={`score-${player.id}-${index}`} 
                        className={`px-3 py-3 text-center text-sm transition-colors ${getScoreBackground(score, data.par[index])}`}
                      >
                        {score}
                      </td>
                    ))}
                    
                    <td className="px-3 py-3 text-center text-sm font-medium text-gray-900 bg-gray-50/50">
                      {frontNine}
                    </td>
                    <td className="px-3 py-3 text-center text-sm font-medium text-gray-900 bg-gray-50/50">
                      {backNine}
                    </td>
                    <td className="px-3 py-3 text-center text-sm font-medium bg-green-100/60">
                      <div className="flex items-center justify-center">
                        <span>{player.totalScore}</span>
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                          player.totalScore < totalPar 
                            ? 'bg-green-200 text-green-800' 
                            : player.totalScore === totalPar 
                            ? 'bg-blue-200 text-blue-800' 
                            : 'bg-amber-200 text-amber-800'
                        }`}>
                          {calculateParStatus(player.totalScore, totalPar)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-end mt-3">
        <div className="text-xs text-muted-foreground italic">
          <span>Scroll horizontally to view all holes</span>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
