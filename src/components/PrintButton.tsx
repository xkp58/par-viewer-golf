
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PrintButton: React.FC = () => {
  const { toast } = useToast();
  
  const handlePrint = () => {
    toast({
      title: "Preparing scorecard for printing",
      description: "Your print dialog will open shortly.",
      duration: 2000,
    });
    
    // Small delay to allow the toast to show
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  return (
    <div className="flex justify-center my-8 no-print">
      <Button 
        className="bg-green-600 hover:bg-green-700 text-white font-medium gap-2 px-6 py-5 h-auto transition-all shadow-sm hover:shadow"
        onClick={handlePrint}
      >
        <Printer className="h-5 w-5" />
        <span>Print Scorecard</span>
      </Button>
    </div>
  );
};

export default PrintButton;
