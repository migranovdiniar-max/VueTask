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

function sortBadge(key: "year" | "price") {
  if (store.sortKey !== key) return ""
  return store.sortDir === "asc" ? "↑" : "↓"
}
</script>

<template>
  <div class="wrap">
    <div class="top">
      <div>
        <h3 class="h">Список авто</h3>
        <p class="p">name, model, year, price • редактирование name/price • удаление</p>
      </div>

      <div class="sort">
        <button
          class="chip"
          :class="{ active: store.sortKey === 'year' }"
          @click="store.setSort('year')"
        >
          Year {{ sortBadge("year") }}
        </button>
        <button
          class="chip"
          :class="{ active: store.sortKey === 'price' }"
          @click="store.setSort('price')"
        >
          Price {{ sortBadge("price") }}
        </button>
      </div>
    </div>

    <div class="tableWrap">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th style="width: 240px;">Actions</th>
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

            <td class="muted">{{ v.model }}</td>
            <td class="muted">{{ v.year }}</td>

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
                <button class="btn primary" @click="saveEdit(v.id)">Сохранить</button>
                <button class="btn" @click="cancelEdit">Отмена</button>
              </template>
              <template v-else>
                <button class="btn" @click="startEdit(v)">Редактировать</button>
                <button class="btn danger" @click="store.remove(v.id)">Удалить</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.wrap{padding:16px}
.top{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:12px;
  margin-bottom:12px;
}
.h{margin:0;font-size:18px}
.p{margin:6px 0 0;color:#6b7280;font-size:13px}
.muted{color:#6b7280}

.sort{display:flex;gap:8px;flex-wrap:wrap}
.chip{
  padding:9px 12px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#fff;
  cursor:pointer;
  transition: background .15s, border-color .15s, box-shadow .15s, transform .05s;
}
.chip:hover{border-color:#f59e0b; box-shadow:0 10px 18px rgba(17,24,39,.08)}
.chip:active{transform: translateY(1px); box-shadow:none}
.chip.active{
  background:#fff7ed;
  border-color:#fdba74;
  box-shadow: inset 0 0 0 1px rgba(253,186,116,.6);
}

.tableWrap{
  border:1px solid #e5e7eb;
  border-radius:16px;
  overflow:auto;
}
.table{width:100%;border-collapse:collapse;min-width:760px}
th,td{padding:12px 12px;text-align:left}
thead th{
  position:sticky; top:0;
  background:#fff7ed;
  border-bottom:1px solid #fde68a;
  color:#7c2d12;
  font-size:13px;
}
tbody tr{border-top:1px solid #f3f4f6}
tbody tr:hover{background:#fff7ed}

.input{
  width:100%;
  padding:9px 10px;
  border-radius:12px;
  border:1px solid #e5e7eb;
  outline:none;
  transition:border-color .15s, box-shadow .15s, transform .05s;
}
.input:hover{border-color:#f59e0b}
.input:focus-visible{border-color:#f59e0b; box-shadow:0 0 0 4px rgba(245,158,11,.20)}
.input:active{transform: translateY(1px)}

.actions{display:flex;gap:8px;flex-wrap:wrap}
.btn{
  padding:9px 12px;
  border-radius:12px;
  border:1px solid #e5e7eb;
  background:#fff;
  cursor:pointer;
  transition: transform .05s, box-shadow .15s, border-color .15s, background .15s;
}
.btn:hover{border-color:#f59e0b; box-shadow:0 10px 18px rgba(17,24,39,.08)}
.btn:active{transform: translateY(1px); box-shadow:none}
.btn:focus-visible{outline:none; box-shadow:0 0 0 4px rgba(245,158,11,.22)}

.btn.primary{
  background:#ff7a00;
  border-color:#ff7a00;
  color:#fff;
}
.btn.primary:hover{background:#ff8a1f;border-color:#ff8a1f}
.btn.danger{
  border-color:#fecaca;
  color:#991b1b;
  background:#fff;
}
.btn.danger:hover{
  border-color:#fb7185;
  box-shadow:0 10px 18px rgba(225,29,72,.10);
}
</style>
