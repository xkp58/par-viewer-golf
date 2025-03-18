
import React from 'react';
import { GolfGameResult, calculatePositions, calculateParStatus } from '../data/golfData';
import { Medal, Trophy } from 'lucide-react';

interface ResultSummaryProps {
  data: GolfGameResult;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ data }) => {
  const positions = calculatePositions(data.players);
  const totalPar = data.par.reduce((sum, value) => sum + value, 0);
  
  // Sort players by position
  const sortedPlayers = [...data.players].sort((a, b) => positions[a.id] - positions[b.id]);
  
  // Function to get position indicator
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-amber-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">{position}</span>;
    }
  };
  
  // Generate random but deterministic congratulatory message
  const getCongratMessage = () => {
    const messages = [
      "Congratulations on completing your round!",
      "Well played! We hope to see you on the course again soon.",
      "Thank you for playing with us today!",
      "Great game! Your scorecard has been saved to your profile.",
      "Outstanding performance on the course today!"
    ];
    
    // Use the date as a seed for deterministic selection
    const dateValue = new Date(data.date).getDate();
    return messages[dateValue % messages.length];
  };

  return (
    <div className="animate-fade-up animation-delay-300 glass rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Final Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {sortedPlayers.map((player) => {
            const position = positions[player.id];
            const parStatus = calculateParStatus(player.totalScore, totalPar);
            
            return (
              <div 
                key={player.id}
                className={`flex items-center p-4 rounded-lg transition-all ${
                  position === 1 
                    ? 'bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200'
                    : 'bg-white border border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {getPositionIcon(position)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{player.name}</h3>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">{player.totalScore}</span>
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                      player.totalScore < totalPar 
                        ? 'bg-green-100 text-green-800' 
                        : player.totalScore === totalPar 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {parStatus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-col justify-between">
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-green-800 font-medium mb-2">Course Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-700">Average Score</p>
                <p className="text-2xl font-semibold">
                  {Math.round(data.players.reduce((sum, p) => sum + p.totalScore, 0) / data.players.length)}
                </p>
              </div>
              <div>
                <p className="text-sm text-green-700">Best Hole</p>
                <p className="text-2xl font-semibold">
                  #{data.players[0].scores.findIndex(s => s === Math.min(...data.players[0].scores)) + 1}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-6 rounded-lg bg-gray-50 border border-gray-100">
            <p className="text-lg font-light text-balance">{getCongratMessage()}</p>
            <p className="mt-4 text-sm text-gray-500">Book your next tee time online or call us at (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
