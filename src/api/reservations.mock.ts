import type { Reservation, ReservationPayload } from "../types/reservations"



let reservations: Reservation[] = [
  {
    id: 1,
    roomId: 1,
    guestName: 'Carlos López',
    startDate: '2025-02-01',
    endDate: '2025-02-05'
  }
]

export function getReservations(): Promise<Reservation[]> {
  return Promise.resolve([...reservations])
}

export function createReservation(data: ReservationPayload): Promise<Reservation> {
  const newReservation: Reservation = { id: Date.now(), ...data }
  reservations.push(newReservation)
  return Promise.resolve(newReservation)
}
