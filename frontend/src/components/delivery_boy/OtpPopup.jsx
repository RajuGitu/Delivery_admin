import { useState } from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";

const OtpPopup = ({ order, open, onClose, onConfirm }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    const isValid = await onConfirm(order, otp);

    if (!isValid) {
      setError("Invalid OTP. Please re-check.");
      setLoading(false);
    } else {
      setOtp("");
      setError("");
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOtp("");
    setError("");
    onClose();
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-sm rounded-2xl">
        {/* Header */}
        <DialogHeader className="text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <ShieldCheck className="w-7 h-7 text-green-600" />
          </div>

          <DialogTitle className="text-xl font-semibold text-gray-900">
            Verify Delivery OTP
          </DialogTitle>

          <DialogDescription className="text-gray-500">
            Ask customer for the OTP to confirm delivery
          </DialogDescription>
        </DialogHeader>

        {/* OTP Input */}
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
                setError("");
              }}
              maxLength={6}
              className="text-center text-xl tracking-widest h-14 rounded-xl"
            />

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-12 rounded-xl border-gray-300 text-gray-700"
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={loading || otp.length !== 6}
            className="h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Confirm Delivery"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpPopup;
