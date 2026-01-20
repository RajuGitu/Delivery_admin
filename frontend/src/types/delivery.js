/**
 * @typedef {"pending" | "scheduled" | "out-for-delivery" | "delayed"} DeliveryStatus
 */

/**
 * @typedef {Object} TimeSlot
 * @property {string} id
 * @property {string} date
 * @property {string} startTime
 * @property {string} endTime
 * @property {boolean} isAiRecommended
 * @property {"Best Match" | "High Success Rate" | "Low Traffic"} [tag]
 * @property {number} [successRate]
 * @property {boolean} isAvailable
 */

/**
 * @typedef {Object} ParcelDetails
 * @property {string} parcelId
 * @property {string} itemCategory
 * @property {string} senderName
 * @property {string} deliveryAddress
 * @property {DeliveryStatus} status
 * @property {TimeSlot} [selectedSlot]
 * @property {string} [agentMessage]
 */

export { };
