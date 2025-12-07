import type { Room } from '../types/room'

const rooms: Room[] = [
  { id: 1, number: '101', type: 'Standard', price: 80 },
  { id: 2, number: '102', type: 'Deluxe', price: 120 }
]

export function getRooms(): Promise<Room[]> {
  return Promise.resolve([...rooms])
}

export function createRoom(data: Omit<Room, 'id'>): Promise<Room> {
  const newRoom: Room = { id: Date.now(), ...data }
  rooms.push(newRoom)
  return Promise.resolve(newRoom)
}
