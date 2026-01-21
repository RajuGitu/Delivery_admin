import { MapPin, Phone, Navigation, Clock } from "lucide-react";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";

const OrderPopup = ({ order, open, onClose, onDelivered, onRaiseIssue }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Header */}
        <DialogHeader>
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Order #{order.orderNumber.split("-")[1]}
            </DialogTitle>

            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {order.eta || "ETA pending"}
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-3">
          {/* Recipient */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Recipient</h4>
            <p className="text-lg font-medium text-gray-900">
              {order.recipientName}
            </p>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-500 mt-1" />
            <div className="flex-1">
              <p className="text-gray-800">{order.address}</p>
              <Button
                variant="link"
                className="p-0 h-auto text-orange-600"
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(
                      order.address
                    )}`,
                    "_blank"
                  )
                }
              >
                <Navigation className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-orange-500 mt-1" />
            <div className="flex-1">
              <p className="text-gray-800">{order.phone}</p>
              <Button
                variant="link"
                className="p-0 h-auto text-orange-600"
                onClick={() => window.open(`tel:${order.phone}`)}
              >
                Call Customer
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-gray-100 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-1">
              Product Details
            </h4>
            <p className="text-sm text-gray-600">
              {order.productDetails}
            </p>
          </div>

          {/* Delivery Instructions */}
          {order.deliveryInstructions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-1">
                Delivery Instructions
              </h4>
              <p className="text-sm text-gray-700">
                {order.deliveryInstructions}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={() => onDelivered(order)}
            className="h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white"
          >
            Delivered
          </Button>

          <Button
            onClick={() => onRaiseIssue(order)}
            className="h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            Raise Order Issue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderPopup;
