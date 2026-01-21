import { useState } from "react";
import {
  AlertTriangle,
  Car,
  Stethoscope,
  Smartphone,
  CloudLightning,
  MessageSquare,
} from "lucide-react";
import { EMERGENCY_LABELS } from "../../data/deliveryBoyNewData";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/Alert_Dialog";
import { cn } from "../../lib/utils";

const emergencyIcons = {
  vehicle_breakdown: <Car className="w-5 h-5" />,
  medical_emergency: <Stethoscope className="w-5 h-5" />,
  accident: <AlertTriangle className="w-5 h-5" />,
  phone_lost: <Smartphone className="w-5 h-5" />,
  unsafe_weather: <CloudLightning className="w-5 h-5" />,
  other: <MessageSquare className="w-5 h-5" />,
};

const EmergencyPopup = ({ open, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherNote, setOtherNote] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (!selectedReason) return;
    onSubmit(
      selectedReason,
      selectedReason === "other" ? otherNote : undefined
    );
    setShowConfirmation(false);
    handleClose();
  };

  const handleClose = () => {
    setSelectedReason(null);
    setOtherNote("");
    setShowConfirmation(false);
    onClose();
  };

  const reasons = Object.entries(EMERGENCY_LABELS);

  return (
    <>
      {/* Main Emergency Dialog */}
      <Dialog
        open={open && !showConfirmation}
        onOpenChange={(isOpen) => !isOpen && handleClose()}
      >
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Report Emergency
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  This will pause your shift
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Warning Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
            <p className="text-sm text-gray-800">
              Use this only if you cannot continue deliveries today.
            </p>
          </div>

          {/* Reasons */}
          <div className="space-y-3 py-4">
            <p className="text-sm font-medium text-gray-900">
              Select emergency reason:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {reasons.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedReason(key)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    "hover:border-red-400",
                    selectedReason === key
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-white"
                  )}
                >
                  <div className="text-gray-500 mb-2">
                    {emergencyIcons[key]}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {label}
                  </p>
                </button>
              ))}
            </div>

            {/* Other reason note */}
            {selectedReason === "other" && (
              <Textarea
                placeholder="Describe the emergency..."
                value={otherNote}
                onChange={(e) => setOtherNote(e.target.value)}
                className="min-h-[100px] rounded-xl border-gray-300"
              />
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleClose}
              className="h-12 rounded-xl border-gray-300 text-gray-700"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={
                !selectedReason ||
                (selectedReason === "other" && !otherNote.trim())
              }
              className="h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
            >
              Submit Emergency
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-gray-900">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Confirm Emergency
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              All remaining deliveries will be paused. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmergencyPopup;
