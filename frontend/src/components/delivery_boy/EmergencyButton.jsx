import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

const EmergencyButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-red-600 hover:bg-red-700
        shadow-lg shadow-red-500/30
      "
    >
      <AlertTriangle className="w-6 h-6 text-white" />
    </Button>
  );
};

export default EmergencyButton;
