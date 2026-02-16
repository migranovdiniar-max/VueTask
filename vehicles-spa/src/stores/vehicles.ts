import { defineStore } from "pinia"
import type { Vehicle, VehicleCreate, VehicleUpdate } from "@/types/vehicle"
import * as api from "@/api/vehiclesApi"

type SortKey = "year" | "price"
type SortDir = "asc" | "desc"

export const useVehiclesStore = defineStore("vehicles", {
  state: () => ({
    items: [] as Vehicle[],
    loading: false,
    error: "" as string | null,
    sortKey: "year" as SortKey,
    sortDir: "asc" as SortDir,
  }),

  getters: {
    sortedItems(state): Vehicle[] {
      const dir = state.sortDir === "asc" ? 1 : -1
      return [...state.items].sort((a, b) => (a[state.sortKey] - b[state.sortKey]) * dir)
    },
  },

  actions: {
    setSort(key: SortKey) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === "asc" ? "desc" : "asc"
      } else {
        this.sortKey = key
        this.sortDir = "asc"
      }
    },

    async load() {
      this.loading = true
      this.error = null
      try {
        this.items = await api.fetchVehicles()
      } catch (e) {
        this.error = "Не удалось загрузить список машин"
      } finally {
        this.loading = false
      }
    },

    async add(payload: VehicleCreate) {
      const localId = Math.max(0, ...this.items.map(v => v.id)) + 1
      const local: Vehicle = { id: localId, ...payload }

      try {
        const created = await api.createVehicle(payload)
        this.items.push(created)
      } catch {
        this.items.push(local)
      }
    },

    async edit(id: number, patch: VehicleUpdate) {
      const idx = this.items.findIndex(v => v.id === id)
      if (idx === -1) return

      const prev = { ...this.items[idx] }
      this.items[idx] = { ...this.items[idx], ...patch }

      try {
        const updated = await api.updateVehicle(id, patch)
        this.items[idx] = updated
      } catch {
        void prev
      }
    },

    async remove(id: number) {
      const prev = [...this.items]
      this.items = this.items.filter(v => v.id !== id)

      try {
        await api.deleteVehicle(id)
      } catch {
        void prev
      }
    },
  },
})
