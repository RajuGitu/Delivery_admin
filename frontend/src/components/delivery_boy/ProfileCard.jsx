import { Clock, Phone, MapPin, Bike } from "lucide-react";
import { Button } from "../ui/Button";

const ProfileCard = ({ deliveryBoy, totalOrders, deliveredCount, issuesCount }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
      {/* Profile Row */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
            {deliveryBoy.avatarUrl ? (
              <img
                src={deliveryBoy.avatarUrl}
                alt={deliveryBoy.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-700">
                {deliveryBoy.name.charAt(0)}
              </span>
            )}
          </div>

          {deliveryBoy.isOnDuty && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <Bike className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{deliveryBoy.name}</h2>
          <p className="text-sm text-gray-500">{formattedDate}</p>

          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {deliveryBoy.shiftStart} - {deliveryBoy.shiftEnd}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{totalOrders}</div>
          <div className="text-xs text-orange-400">Total</div>
        </div>

        <div className="bg-green-50 rounded-xl p-3 text-center border border-green-200">
          <div className="text-2xl font-bold text-green-600">{deliveredCount}</div>
          <div className="text-xs text-green-400">Delivered</div>
        </div>

        <div className="bg-red-50 rounded-xl p-3 text-center border border-red-200">
          <div className="text-2xl font-bold text-red-600">{issuesCount}</div>
          <div className="text-xs text-red-400">Issues</div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12 rounded-xl">
          <Phone className="w-4 h-4 mr-2" />
          Helpline
        </Button>

        <Button variant="outline" className="h-12 rounded-xl">
          <MapPin className="w-4 h-4 mr-2" />
          View Route
        </Button>
      </div> */}
    </div>
  );
};

export default ProfileCard;
