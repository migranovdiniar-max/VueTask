export type Vehicle = {
  id: number
  name: string
  model: string
  year: number
  color: string
  price: number
  latitude: number
  longitude: number
}

export type VehicleCreate = Omit<Vehicle, "id">
export type VehicleUpdate = Partial<Pick<Vehicle, "name" | "price">>
