import { useState } from 'react';
import { toast } from 'sonner';
import { 
  EMERGENCY_LABELS
} from '../data/deliveryBoyNewData';
import Header from '../components/delivery_boy/Header';
import ProfileCard from '../components/delivery_boy/ProfileCard';
import StatusLegend from '../components/delivery_boy/StatusLegend';
import SlotCard from '../components/delivery_boy/SlotCard';
import EmergencyButton from '../components/delivery_boy/EmergencyButton';
import OrderPopup from '../components/delivery_boy/OrderPopup';
import OtpPopup from '../components/delivery_boy/OtpPopup';
import OrderIssuePopup from '../components/delivery_boy/OrderIssuePopup';
import SlotIssuePopup from '../components/delivery_boy/SlotIssuePopup';
import EmergencyPopup from '../components/delivery_boy/EmergencyPopup';
import EmergencyStatusView from '../components/delivery_boy/EmergencyStatusView';

// Mock data
const mockDeliveryBoy = {
  id: 'DB001',
  name: 'Rajesh Kumar',
  shiftStart: '8:00 AM',
  shiftEnd: '6:00 PM',
  isOnDuty: true,
};

const initialSlots = [
  {
    id: 'slot1',
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    hasSlotIssue: false,
    orders: [
      {
        id: 'ord1',
        orderNumber: 'ORD-234',
        recipientName: 'Rahul Sharma',
        address: '42 MG Road, Sector 15, Bangalore 560001',
        phone: '+91 98765 43210',
        productDetails: '1x iPhone 15 Pro (256GB) - Space Black',
        deliveryInstructions: 'Ring doorbell twice. Do not leave at door.',
        eta: 'Est. 10:30 AM',
        status: 'delivered',
      },
      {
        id: 'ord2',
        orderNumber: 'ORD-235',
        recipientName: 'Priya Menon',
        address: '78 Brigade Road, Ashok Nagar, Bangalore 560025',
        phone: '+91 87654 32109',
        productDetails: '2x Samsung Galaxy Buds Pro',
        eta: 'Est. 10:45 AM',
        status: 'inprogress',
      },
      {
        id: 'ord3',
        orderNumber: 'ORD-236',
        recipientName: 'Vikram Singh',
        address: '15 Residency Road, Richmond Town, Bangalore 560025',
        phone: '+91 76543 21098',
        productDetails: '1x MacBook Air M3 (8GB/256GB)',
        deliveryInstructions: 'Call before arriving',
        eta: 'Est. 11:00 AM',
        status: 'pending',
      },
    ],
  },
  {
    id: 'slot2',
    startTime: '11:00 AM',
    endTime: '1:00 PM',
    hasSlotIssue: false,
    orders: [
      {
        id: 'ord4',
        orderNumber: 'ORD-237',
        recipientName: 'Anita Desai',
        address: '23 Indiranagar, 100 Feet Road, Bangalore 560038',
        phone: '+91 65432 10987',
        productDetails: '3x Kindle Paperwhite',
        eta: 'Est. 11:30 AM',
        status: 'pending',
      },
      {
        id: 'ord5',
        orderNumber: 'ORD-238',
        recipientName: 'Suresh Patel',
        address: '56 Koramangala 4th Block, Bangalore 560034',
        phone: '+91 54321 09876',
        productDetails: '1x Sony WH-1000XM5 Headphones',
        eta: 'Est. 12:15 PM',
        status: 'pending',
      },
    ],
  },
  {
    id: 'slot3',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    hasSlotIssue: false,
    orders: [
      {
        id: 'ord6',
        orderNumber: 'ORD-239',
        recipientName: 'Deepa Krishnan',
        address: '89 Jayanagar 4th Block, Bangalore 560041',
        phone: '+91 43210 98765',
        productDetails: '2x Apple Watch Ultra',
        deliveryInstructions: 'Security gate - mention flat A-402',
        eta: 'Est. 2:30 PM',
        status: 'pending',
      },
      {
        id: 'ord7',
        orderNumber: 'ORD-240',
        recipientName: 'Arjun Reddy',
        address: '12 HSR Layout Sector 2, Bangalore 560102',
        phone: '+91 32109 87654',
        productDetails: '1x iPad Pro 12.9"',
        eta: 'Est. 3:15 PM',
        status: 'pending',
      },
      {
        id: 'ord8',
        orderNumber: 'ORD-241',
        recipientName: 'Meera Joshi',
        address: '45 Electronic City Phase 1, Bangalore 560100',
        phone: '+91 21098 76543',
        productDetails: '1x DJI Mini 3 Pro Drone',
        eta: 'Est. 3:45 PM',
        status: 'pending',
      },
    ],
  },
  {
    id: 'slot4',
    startTime: '4:00 PM',
    endTime: '6:00 PM',
    hasSlotIssue: false,
    orders: [
      {
        id: 'ord9',
        orderNumber: 'ORD-242',
        recipientName: 'Karan Malhotra',
        address: '67 Whitefield Main Road, Bangalore 560066',
        phone: '+91 10987 65432',
        productDetails: '1x PlayStation 5 Console',
        eta: 'Est. 4:30 PM',
        status: 'pending',
      },
    ],
  },
];

const Index = () => {
  const [slots, setSlots] = useState(initialSlots);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Popup states
  const [orderPopupOpen, setOrderPopupOpen] = useState(false);
  const [otpPopupOpen, setOtpPopupOpen] = useState(false);
  const [orderIssuePopupOpen, setOrderIssuePopupOpen] = useState(false);
  const [slotIssuePopupOpen, setSlotIssuePopupOpen] = useState(false);
  const [emergencyPopupOpen, setEmergencyPopupOpen] = useState(false);
  
  // Emergency state
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);

  // Calculate stats
  const allOrders = slots.flatMap(slot => slot.orders);
  const totalOrders = allOrders.length;
  const deliveredCount = allOrders.filter(o => o.status === 'delivered').length;
  const issuesCount = allOrders.filter(o => o.status === 'issue').length;

  // Handlers
  const handleOrderClick = (order) => {
    if (order.status === 'delivered' || order.status === 'issue') {
      toast.info(`Order ${order.orderNumber} is already ${order.status}`);
      return;
    }
    setSelectedOrder(order);
    setOrderPopupOpen(true);
  };

  const handleDeliveredClick = () => {
    setOrderPopupOpen(false);
    setOtpPopupOpen(true);
  };

  const handleOtpConfirm = async (order, otp) => {
    // Simulate OTP validation (accept 123456 as valid)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '123456') {
      // Update order status
      setSlots(prev => prev.map(slot => ({
        ...slot,
        orders: slot.orders.map(o => 
          o.id === order.id ? { ...o, status: 'delivered' } : o
        ),
      })));
      
      setOtpPopupOpen(false);
      setSelectedOrder(null);
      toast.success(`Order ${order.orderNumber} delivered successfully!`);
      return true;
    }
    
    return false;
  };

  const handleRaiseIssue = () => {
    setOrderPopupOpen(false);
    setOrderIssuePopupOpen(true);
  };

  const handleOrderIssueSubmit = (order) => {
    setSlots(prev => prev.map(slot => ({
      ...slot,
      orders: slot.orders.map(o => 
        o.id === order.id ? { ...o, status: 'issue' } : o
      ),
    })));
    
    setOrderIssuePopupOpen(false);
    setSelectedOrder(null);
    toast.warning(`Issue raised for order ${order.orderNumber}. Admin notified.`);
  };

  const handleSlotIssueClick = (slot) => {
    setSelectedSlot(slot);
    setSlotIssuePopupOpen(true);
  };

  const handleSlotIssueSubmit = (slot) => {
    setSlots(prev => prev.map(s => 
      s.id === slot.id 
        ? {
            ...s,
            hasSlotIssue: true,
            orders: s.orders.map(o => ({ ...o, status: 'slotIssue' })),
          }
        : s
    ));
    
    setSlotIssuePopupOpen(false);
    setSelectedSlot(null);
    toast.warning(`Slot issue reported for ${slot.startTime} - ${slot.endTime}. All orders affected.`);
  };

  const handleEmergencySubmit = (reason) => {
    const remainingOrders = allOrders.filter(o => 
      o.status === 'pending' || o.status === 'inprogress'
    ).length;
    
    setEmergencyData({
      reason: EMERGENCY_LABELS[reason],
      timeReported: new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      affectedOrdersCount: remainingOrders,
    });
    
    setEmergencyActive(true);
    toast.error('Emergency reported. Your shift has been paused.');
  };

  const handleEndShift = () => {
    toast.success('Shift ended. Take care!');
    setEmergencyActive(false);
    setEmergencyData(null);
  };

  // Emergency view
  if (emergencyActive && emergencyData) {
    return (
      <EmergencyStatusView
        reason={emergencyData.reason}
        timeReported={emergencyData.timeReported}
        affectedOrdersCount={emergencyData.affectedOrdersCount}
        onEndShift={handleEndShift}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        <ProfileCard
          deliveryBoy={mockDeliveryBoy}
          totalOrders={totalOrders}
          deliveredCount={deliveredCount}
          issuesCount={issuesCount}
        />
        
        <StatusLegend />
        
        <div className="space-y-4">
          {slots.map(slot => (
            <SlotCard
              key={slot.id}
              slot={slot}
              onOrderClick={handleOrderClick}
              onSlotIssue={handleSlotIssueClick}
            />
          ))}
        </div>
      </main>

      {/* Floating Emergency Button */}
      <EmergencyButton onClick={() => setEmergencyPopupOpen(true)} />

      {/* Popups */}
      <OrderPopup
        order={selectedOrder}
        open={orderPopupOpen}
        onClose={() => {
          setOrderPopupOpen(false);
          setSelectedOrder(null);
        }}
        onDelivered={handleDeliveredClick}
        onRaiseIssue={handleRaiseIssue}
      />

      <OtpPopup
        order={selectedOrder}
        open={otpPopupOpen}
        onClose={() => {
          setOtpPopupOpen(false);
          setSelectedOrder(null);
        }}
        onConfirm={handleOtpConfirm}
      />

      <OrderIssuePopup
        order={selectedOrder}
        open={orderIssuePopupOpen}
        onClose={() => {
          setOrderIssuePopupOpen(false);
          setSelectedOrder(null);
        }}
        onSubmit={handleOrderIssueSubmit}
      />

      <SlotIssuePopup
        slot={selectedSlot}
        open={slotIssuePopupOpen}
        onClose={() => {
          setSlotIssuePopupOpen(false);
          setSelectedSlot(null);
        }}
        onSubmit={handleSlotIssueSubmit}
      />

      <EmergencyPopup
        open={emergencyPopupOpen}
        onClose={() => setEmergencyPopupOpen(false)}
        onSubmit={handleEmergencySubmit}
      />
    </div>
  );
};

export default Index;
