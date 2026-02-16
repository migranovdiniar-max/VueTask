<script setup lang="ts">
import { computed, ref } from "vue"
import type { Vehicle } from "@/types/vehicle"
import { useVehiclesStore } from "@/stores/vehicles"

const store = useVehiclesStore()
const vehicles = computed(() => store.sortedItems)

const editingId = ref<number | null>(null)
const editName = ref("")
const editPrice = ref<number>(0)

function startEdit(v: Vehicle) {
  editingId.value = v.id
  editName.value = v.name
  editPrice.value = v.price
}

async function saveEdit(id: number) {
  await store.edit(id, { name: editName.value, price: editPrice.value })
  editingId.value = null
}

function cancelEdit() {
  editingId.value = null
}
</script>

<template>
  <div class="card">
    <div class="toolbar">
      <button class="btn" @click="store.setSort('year')">
        Sort year ({{ store.sortKey === "year" ? store.sortDir : "-" }})
      </button>
      <button class="btn" @click="store.setSort('price')">
        Sort price ({{ store.sortKey === "price" ? store.sortDir : "-" }})
      </button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Model</th>
          <th>Year</th>
          <th>Price</th>
          <th style="width: 220px;">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="v in vehicles" :key="v.id">
          <td>
            <template v-if="editingId === v.id">
              <input v-model="editName" class="input" />
            </template>
            <template v-else>
              {{ v.name }}
            </template>
          </td>

          <td>{{ v.model }}</td>
          <td>{{ v.year }}</td>

          <td>
            <template v-if="editingId === v.id">
              <input v-model.number="editPrice" type="number" class="input" />
            </template>
            <template v-else>
              {{ v.price }}
            </template>
          </td>

          <td class="actions">
            <template v-if="editingId === v.id">
              <button class="btn primary" @click="saveEdit(v.id)">Save</button>
              <button class="btn" @click="cancelEdit">Cancel</button>
            </template>
            <template v-else>
              <button class="btn" @click="startEdit(v)">Edit</button>
              <button class="btn danger" @click="store.remove(v.id)">Delete</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.card{background:#111827;border:1px solid #1f2937;border-radius:14px;padding:16px}
.toolbar{display:flex;gap:10px;margin-bottom:12px}
.table{width:100%;border-collapse:collapse}
th,td{padding:10px;border-top:1px solid #1f2937;text-align:left}
.actions{display:flex;gap:8px}
.input{width:100%;padding:8px;border-radius:10px;border:1px solid #374151;background:#0b1220;color:#e5e7eb}
.btn{padding:8px 10px;border-radius:10px;border:1px solid #374151;background:#0b1220;color:#e5e7eb;cursor:pointer}
.btn.primary{border-color:#2563eb}
.btn.danger{border-color:#ef4444}
</style>
