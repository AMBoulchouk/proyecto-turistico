import type { Reservation, ReservationPayload } from "../types/reservations"
import { getRooms } from "./rooms.mock"



let reservations: Reservation[] = [
  {
    id: 1,
    roomId: 1,
    roomName: '101',
    guestName: 'Carlos López',
    startDate: '2025-02-01',
    endDate: '2025-02-05'
  }
]

export function getReservations(): Promise<Reservation[]> {
  return Promise.resolve([...reservations])
}

export async function createReservation(data: ReservationPayload): Promise<Reservation> {
  const rooms = await getRooms()
  const roomName = rooms.find(r => r.id === data.roomId)?.number || ""

  const newReservation: Reservation = {
    id: Date.now(),
    roomId: data.roomId,
    roomName: roomName,
    guestName: data.guestName,
    startDate: data.startDate,
    endDate: data.endDate
  }

  reservations.push(newReservation)
  return Promise.resolve(newReservation)
}
