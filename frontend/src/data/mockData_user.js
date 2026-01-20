import { addDays, format } from "date-fns";

const today = new Date();

export const mockTimeSlots = [
    // AI Recommended slots
    {
        id: "slot-1",
        date: format(addDays(today, 1), "yyyy-MM-dd"),
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        isAiRecommended: true,
        tag: "Best Match",
        successRate: 96,
        isAvailable: true,
    },
    {
        id: "slot-2",
        date: format(addDays(today, 1), "yyyy-MM-dd"),
        startTime: "2:00 PM",
        endTime: "4:00 PM",
        isAiRecommended: true,
        tag: "High Success Rate",
        successRate: 94,
        isAvailable: true,
    },
    {
        id: "slot-3",
        date: format(addDays(today, 2), "yyyy-MM-dd"),
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        isAiRecommended: true,
        tag: "Low Traffic",
        successRate: 91,
        isAvailable: true,
    },

    // Other available slots
    {
        id: "slot-4",
        date: format(addDays(today, 2), "yyyy-MM-dd"),
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        isAiRecommended: false,
        isAvailable: true,
    },
    {
        id: "slot-5",
        date: format(addDays(today, 3), "yyyy-MM-dd"),
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        isAiRecommended: false,
        isAvailable: true,
    },
    {
        id: "slot-6",
        date: format(addDays(today, 3), "yyyy-MM-dd"),
        startTime: "4:00 PM",
        endTime: "6:00 PM",
        isAiRecommended: false,
        isAvailable: true,
    },
    {
        id: "slot-7",
        date: format(addDays(today, 4), "yyyy-MM-dd"),
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        isAiRecommended: false,
        isAvailable: true,
    },
    {
        id: "slot-8",
        date: format(addDays(today, 4), "yyyy-MM-dd"),
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        isAiRecommended: false,
        isAvailable: false, // Unavailable slot
    },
    {
        id: "slot-9",
        date: format(addDays(today, 5), "yyyy-MM-dd"),
        startTime: "11:00 AM",
        endTime: "1:00 PM",
        isAiRecommended: false,
        isAvailable: true,
    },
    {
        id: "slot-10",
        date: format(addDays(today, 6), "yyyy-MM-dd"),
        startTime: "2:00 PM",
        endTime: "4:00 PM",
        isAiRecommended: false,
        isAvailable: true,
    },
];

export const mockParcel = {
    parcelId: "#DLV-458921",
    itemCategory: "Electronics - Laptop",
    senderName: "Amazon India Pvt. Ltd.",
    deliveryAddress: "42, Sector 5, Koramangala, Bangalore - 560095",
    status: "pending",
    agentMessage:
        "Heavy traffic on Ring Road due to road construction. Expected 45-minute delay.",
};
