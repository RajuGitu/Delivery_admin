import { useState } from 'react';
import {
  AlertTriangle,
  User,
  MapPin,
  Lock,
  Clock,
  Shield,
  MessageSquare,
} from 'lucide-react';
import { ORDER_ISSUE_LABELS } from '../../data/deliveryBoyNewData';
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
  customer_not_available: <User className="w-5 h-5" />,
  wrong_address: <MapPin className="w-5 h-5" />,
  address_locked: <Lock className="w-5 h-5" />,
  later_delivery: <Clock className="w-5 h-5" />,
  safety_concern: <Shield className="w-5 h-5" />,
  other: <MessageSquare className="w-5 h-5" />,
};

const OrderIssuePopup = ({ order, open, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherNote, setOtherNote] = useState('');

  const handleSubmit = () => {
    if (!selectedReason || !order) return;
    onSubmit(order, selectedReason, selectedReason === 'other' ? otherNote : undefined);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason(null);
    setOtherNote('');
    onClose();
  };

  if (!order) return null;

  const reasons = Object.entries(ORDER_ISSUE_LABELS);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle>Raise Order Issue</DialogTitle>
              <DialogDescription>
                Order #{order.orderNumber.split('-')[1]}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p className="text-sm font-medium text-gray-900">
            Select issue reason:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {reasons.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedReason(key)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  'bg-white border-gray-200 hover:border-orange-400',
                  selectedReason === key &&
                    'border-orange-500 bg-orange-50'
                )}
              >
                <div className="mb-2 text-gray-500">
                  {issueIcons[key]}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {label}
                </p>
              </button>
            ))}
          </div>

          {selectedReason === 'other' && (
            <Textarea
              placeholder="Describe the issue..."
              value={otherNote}
              onChange={(e) => setOtherNote(e.target.value)}
              className="min-h-[100px] rounded-xl border-gray-200"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-12 rounded-xl"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === 'other' && !otherNote.trim())}
            className="h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            Submit Issue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderIssuePopup;
