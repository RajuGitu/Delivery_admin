import { useState } from 'react';
import { AlertTriangle, CloudRain, Construction, Car, Sparkles, Timer, Cloud, MessageSquare } from 'lucide-react';
import { SLOT_ISSUE_LABELS } from '../../data/deliveryBoyNewData';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/Dialog';
import { cn } from '../../lib/utils';

const issueIcons = {
  heavy_rain: <CloudRain className="w-5 h-5" />,
  road_closed: <Construction className="w-5 h-5" />,
  accident: <Car className="w-5 h-5" />,
  festival: <Sparkles className="w-5 h-5" />,
  traffic_jam: <Timer className="w-5 h-5" />,
  weather_hazard: <Cloud className="w-5 h-5" />,
  other: <MessageSquare className="w-5 h-5" />,
};

const SlotIssuePopup = ({ slot, open, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherNote, setOtherNote] = useState('');

  const handleSubmit = () => {
    if (!selectedReason || !slot) return;
    onSubmit(slot, selectedReason, selectedReason === 'other' ? otherNote : undefined);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason(null);
    setOtherNote('');
    onClose();
  };

  if (!slot) return null;

  const reasons = Object.entries(SLOT_ISSUE_LABELS);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-status-slotIssue" />
            </div>
            <div>
              <DialogTitle>Slot Issue – {slot.startTime} - {slot.endTime}</DialogTitle>
              <DialogDescription>
                This issue will affect all orders in this slot
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p className="text-sm font-medium text-foreground">Select issue reason:</p>
          <div className="grid grid-cols-2 gap-3">
            {reasons.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedReason(key)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  'hover:border-warning/50',
                  selectedReason === key
                    ? 'border-warning bg-warning-light'
                    : 'border-border bg-card'
                )}
              >
                <div className="text-muted-foreground mb-2">{issueIcons[key]}</div>
                <p className="text-sm font-medium text-foreground">{label}</p>
              </button>
            ))}
          </div>

          {selectedReason === 'other' && (
            <Textarea
              placeholder="Describe the issue..."
              value={otherNote}
              onChange={(e) => setOtherNote(e.target.value)}
              className="min-h-[100px] rounded-xl"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClose} className="h-12 rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === 'other' && !otherNote.trim())}
            className="h-12 bg-warning hover:bg-warning/90 text-warning-foreground rounded-xl"
          >
            Submit Slot Issue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotIssuePopup;
