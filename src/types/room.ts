export interface Room {
  id: number
  number: string
  type: string
  price: number
}
export type RoomPayload = Omit<Room, 'id'>
export interface RoomFormProps {
  initialData?: RoomPayload
}