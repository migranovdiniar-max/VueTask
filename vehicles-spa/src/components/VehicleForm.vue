<script setup lang="ts">
import { reactive } from "vue"
import { useVehiclesStore } from "@/stores/vehicles"
import type { VehicleCreate } from "@/types/vehicle"

const store = useVehiclesStore()

const form = reactive<VehicleCreate>({
  name: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
  price: 0,
  latitude: 55.753332,
  longitude: 37.621676,
})

async function submit() {
  if (!form.name.trim() || !form.model.trim()) return
  await store.add({ ...form })
  form.name = ""
  form.model = ""
  form.color = ""
  form.price = 0
}
</script>

<template>
  <div class="card">
    <h3>Create vehicle</h3>

    <div class="grid">
      <label>
        Name
        <input v-model="form.name" class="input" />
      </label>

      <label>
        Model
        <input v-model="form.model" class="input" />
      </label>

      <label>
        Year
        <input v-model.number="form.year" type="number" class="input" />
      </label>

      <label>
        Color
        <input v-model="form.color" class="input" />
      </label>

      <label>
        Price
        <input v-model.number="form.price" type="number" class="input" />
      </label>

      <label>
        Latitude
        <input v-model.number="form.latitude" type="number" step="0.000001" class="input" />
      </label>

      <label>
        Longitude
        <input v-model.number="form.longitude" type="number" step="0.000001" class="input" />
      </label>
    </div>

    <button class="btn primary" @click="submit">Add</button>
  </div>
</template>

<style scoped>
.card{background:#111827;border:1px solid #1f2937;border-radius:14px;padding:16px}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:12px 0}
label{display:flex;flex-direction:column;gap:6px;color:#cbd5e1;font-size:14px}
.input{padding:8px;border-radius:10px;border:1px solid #374151;background:#0b1220;color:#e5e7eb}
.btn{padding:10px 12px;border-radius:10px;border:1px solid #374151;background:#0b1220;color:#e5e7eb;cursor:pointer}
.btn.primary{border-color:#2563eb}
@media (max-width: 860px){ .grid{grid-template-columns:1fr} }
</style>
