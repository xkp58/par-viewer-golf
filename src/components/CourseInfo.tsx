
import React from 'react';
import { GolfGameResult } from '../data/golfData';
import { Clock, Calendar, Flag } from 'lucide-react';
import { calculateParStatus } from '../data/golfData';

interface CourseInfoProps {
  data: GolfGameResult;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ data }) => {
  const totalPar = data.par.reduce((sum, value) => sum + value, 0);
  
  return (
    <div className="animate-fade-up animation-delay-100 glass rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Course Details</h3>
          <div className="flex items-center mb-2">
            <Flag className="w-4 h-4 mr-2 text-green-600" />
            <span className="text-base">{data.courseName}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-green-600" />
            <span className="text-base">{data.date}</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Time Information</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Tee Time</p>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-600" />
                <span>{data.teeTime}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Start</p>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-600" />
                <span>{data.startTime}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Finish</p>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-600" />
                <span>{data.finishTime}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-green-600" />
                <span>4h 10m</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Course Statistics</h3>
          <div>
            <p className="text-xs text-muted-foreground">Total Par</p>
            <p className="text-xl font-medium">{totalPar}</p>
          </div>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Winner Score</p>
            <div className="flex items-center">
              <p className="text-xl font-medium">{data.players[0].totalScore}</p>
              <span className={`ml-2 text-sm font-medium px-2 py-0.5 rounded ${
                data.players[0].totalScore < totalPar 
                  ? 'bg-green-100 text-green-800' 
                  : data.players[0].totalScore === totalPar 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {calculateParStatus(data.players[0].totalScore, totalPar)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
