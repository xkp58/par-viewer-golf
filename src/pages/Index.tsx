
import React, { useEffect } from 'react';
import { golfGameResult } from '../data/golfData';
import GolfHeader from '@/components/GolfHeader';
import CourseInfo from '@/components/CourseInfo';
import Scorecard from '@/components/Scorecard';
import ResultSummary from '@/components/ResultSummary';
import PrintButton from '@/components/PrintButton';

const Index: React.FC = () => {
  // Add some minimal animation staggering
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header with golf club image */}
        <div className="pt-8">
          <GolfHeader data={golfGameResult} />
        </div>
        
        {/* Course information */}
        <div className="mt-8">
          <CourseInfo data={golfGameResult} />
        </div>
        
        {/* Scorecard */}
        <Scorecard data={golfGameResult} />
        
        {/* Result summary */}
        <ResultSummary data={golfGameResult} />
        
        {/* Print button */}
        <PrintButton />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-100 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {golfGameResult.clubName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
