import { Clock, MoreVertical } from "lucide-react";
import OrderCircle from "./OrderCircle";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropDownMenu";

const SlotCard = ({ slot, onOrderClick, onSlotIssue }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Clock Icon */}
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {slot.startTime} - {slot.endTime}
            </h3>
            <p className="text-sm text-gray-500">
              {slot.orders.length}{" "}
              {slot.orders.length === 1 ? "delivery" : "deliveries"}
            </p>
          </div>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onSlotIssue(slot)}
              className="text-yellow-600"
            >
              Report Slot Issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Order Circles */}
      <div className="flex items-center flex-wrap gap-y-3 mb-4">
        {slot.orders.map((order, idx) => (
          <OrderCircle
            key={order.id}
            order={order}
            index={idx}
            onClick={onOrderClick}
            isLast={idx === slot.orders.length - 1}
          />
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-2 pt-3 border-t border-gray-200">
        {slot.orders.map((order, idx) => (
          <div key={order.id} className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-900">
              {idx + 1}
            </span>
            <span className="text-gray-500">
              {order.orderNumber}
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-900">
              {order.recipientName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotCard;
