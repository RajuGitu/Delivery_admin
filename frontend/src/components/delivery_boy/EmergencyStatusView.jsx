import { AlertTriangle, Clock, Package, LogOut } from "lucide-react";
import { Button } from "../ui/Button";

const EmergencyStatusView = ({
  reason,
  timeReported,
  affectedOrdersCount,
  onEndShift,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-md w-full text-center">
        {/* Alert Icon */}
        <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-5 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Emergency Reported
        </h2>
        <p className="text-gray-500 mb-6">Your shift is paused</p>

        {/* Status Info */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-3 mb-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Reason</span>
            <span className="text-sm font-medium text-gray-900">
              {reason}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Time Reported
            </span>
            <span className="text-sm font-medium text-gray-900">
              {timeReported}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Package className="w-4 h-4" />
              Affected Orders
            </span>
            <span className="text-sm font-medium text-gray-900">
              {affectedOrdersCount}
            </span>
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-gray-800">
            Admin is handling reassignment. You may end your shift.
          </p>
        </div>

        {/* End Shift Button */}
        <Button
          onClick={onEndShift}
          variant="outline"
          className="h-12 w-full rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4 mr-2" />
          End Shift
        </Button>
      </div>
    </div>
  );
};

export default EmergencyStatusView;
