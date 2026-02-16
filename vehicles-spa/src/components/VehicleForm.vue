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
  <div class="wrap">
    <div class="head">
      <h3 class="h">Добавить авто</h3>
      <p class="p">Создание машины (name, model, year, color, price)</p>
    </div>

    <div class="grid">
      <label class="field">
        <span class="label">Name</span>
        <input v-model="form.name" class="input" placeholder="Toyota" />
      </label>

      <label class="field">
        <span class="label">Model</span>
        <input v-model="form.model" class="input" placeholder="Camry" />
      </label>

      <label class="field">
        <span class="label">Year</span>
        <input v-model.number="form.year" type="number" class="input" />
      </label>

      <label class="field">
        <span class="label">Color</span>
        <input v-model="form.color" class="input" placeholder="red" />
      </label>

      <label class="field">
        <span class="label">Price</span>
        <input v-model.number="form.price" type="number" class="input" />
      </label>

      <label class="field">
        <span class="label">Latitude</span>
        <input v-model.number="form.latitude" type="number" step="0.000001" class="input" />
      </label>

      <label class="field">
        <span class="label">Longitude</span>
        <input v-model.number="form.longitude" type="number" step="0.000001" class="input" />
      </label>
    </div>

    <div class="actions">
      <button class="btn primary" @click="submit">Добавить</button>
    </div>
  </div>
</template>

<style scoped>
.wrap{padding:16px}
.head{margin-bottom:12px}
.h{margin:0;font-size:18px}
.p{margin:6px 0 0;color:#6b7280;font-size:13px}

.grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
}

.field{display:flex;flex-direction:column;gap:6px}
.label{font-size:12px;color:#6b7280}

.input{
  padding:10px 12px;
  border-radius:12px;
  border:1px solid #e5e7eb;
  background:#fff;
  color:#111827;
  outline:none;
  transition: border-color .15s, box-shadow .15s, transform .05s;
}
.input:hover{border-color:#f59e0b}
.input:focus-visible{
  border-color:#f59e0b;
  box-shadow: 0 0 0 4px rgba(245,158,11,.20);
}
.input:active{transform: translateY(1px)}

.actions{margin-top:14px;display:flex;justify-content:flex-end}

.btn{
  padding:10px 14px;
  border-radius:12px;
  border:1px solid #e5e7eb;
  background:#fff;
  color:#111827;
  cursor:pointer;
  transition: transform .05s, box-shadow .15s, background .15s, border-color .15s;
  user-select:none;
}
.btn:hover{
  border-color:#f59e0b;
  box-shadow: 0 10px 18px rgba(17,24,39,.08);
}
.btn:active{transform: translateY(1px); box-shadow:none}
.btn:focus-visible{outline:none; box-shadow:0 0 0 4px rgba(245,158,11,.22)}

.btn.primary{
  background:#ff7a00;
  border-color:#ff7a00;
  color:#fff;
}
.btn.primary:hover{background:#ff8a1f;border-color:#ff8a1f}
.btn.primary:active{background:#f97316;border-color:#f97316}
</style>
