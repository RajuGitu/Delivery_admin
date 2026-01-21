export const ORDER_STATUS = {
  PENDING: 'pending',
  INPROGRESS: 'inprogress',
  DELIVERED: 'delivered',
  ISSUE: 'issue',
  SLOT_ISSUE: 'slotIssue',
};

// Example Order object shape (no TS enforcement in JS)
export const sampleOrder = {
  id: '',
  orderNumber: '',
  recipientName: '',
  address: '',
  phone: '',
  productDetails: '',
  deliveryInstructions: '', // optional
  eta: '',                  // optional
  status: ORDER_STATUS.PENDING,
};

// Example TimeSlot object
export const sampleTimeSlot = {
  id: '',
  startTime: '',
  endTime: '',
  orders: [], // array of orders
  hasSlotIssue: false,
};

// Example DeliveryBoy object
export const sampleDeliveryBoy = {
  id: '',
  name: '',
  avatarUrl: '', // optional
  shiftStart: '',
  shiftEnd: '',
  isOnDuty: false,
};

// Order issue reasons
export const ORDER_ISSUE_REASONS = {
  CUSTOMER_NOT_AVAILABLE: 'customer_not_available',
  WRONG_ADDRESS: 'wrong_address',
  ADDRESS_LOCKED: 'address_locked',
  LATER_DELIVERY: 'later_delivery',
  SAFETY_CONCERN: 'safety_concern',
  OTHER: 'other',
};

// Slot issue reasons
export const SLOT_ISSUE_REASONS = {
  HEAVY_RAIN: 'heavy_rain',
  ROAD_CLOSED: 'road_closed',
  ACCIDENT: 'accident',
  FESTIVAL: 'festival',
  TRAFFIC_JAM: 'traffic_jam',
  WEATHER_HAZARD: 'weather_hazard',
  OTHER: 'other',
};

// Emergency reasons
export const EMERGENCY_REASONS = {
  VEHICLE_BREAKDOWN: 'vehicle_breakdown',
  MEDICAL_EMERGENCY: 'medical_emergency',
  ACCIDENT: 'accident',
  PHONE_LOST: 'phone_lost',
  UNSAFE_WEATHER: 'unsafe_weather',
  OTHER: 'other',
};

// Labels
export const ORDER_ISSUE_LABELS = {
  customer_not_available: 'Customer not available',
  wrong_address: 'Wrong address',
  address_locked: 'Address locked / security denied',
  later_delivery: 'Customer requested later delivery',
  safety_concern: 'Safety concern',
  other: 'Other',
};

export const SLOT_ISSUE_LABELS = {
  heavy_rain: 'Heavy rain',
  road_closed: 'Road closed / police block',
  accident: 'Accident on route',
  festival: 'Festival / procession',
  traffic_jam: 'Traffic jam',
  weather_hazard: 'Weather hazard',
  other: 'Other',
};

export const EMERGENCY_LABELS = {
  vehicle_breakdown: 'Vehicle breakdown',
  medical_emergency: 'Medical emergency',
  accident: 'Accident',
  phone_lost: 'Phone lost / dead',
  unsafe_weather: 'Unsafe weather',
  other: 'Other',
};
