export interface Reservation {
  id: number
  roomId: number
  roomName: string
  guestName: string
  startDate: string   // ISO format: "2025-01-15"
  endDate: string     // ISO format
}

export type ReservationPayload = Omit<Reservation, 'id'>
