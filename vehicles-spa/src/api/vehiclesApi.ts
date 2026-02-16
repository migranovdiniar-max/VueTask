import axios from "axios"
import type { Vehicle, VehicleCreate, VehicleUpdate } from "@/types/vehicle"

const http = axios.create({
  baseURL: "https://task.tspb.su/test-task",
  timeout: 10000,
})

export async function fetchVehicles() {
  const { data } = await http.get<Vehicle[]>("/vehicles")
  return data
}

export async function createVehicle(payload: VehicleCreate) {
  const { data } = await http.post<Vehicle>("/vehicles", payload)
  return data
}

export async function updateVehicle(id: number, patch: VehicleUpdate) {
  const { data } = await http.patch<Vehicle>(`/vehicles/${id}`, patch)
  return data
}

export async function deleteVehicle(id: number) {
  await http.delete(`/vehicles/${id}`)
}
