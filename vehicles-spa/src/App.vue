<script setup lang="ts">
import { onMounted } from "vue"
import { useVehiclesStore } from "@/stores/vehicles"
import VehicleForm from "@/components/VehicleForm.vue"
import VehicleTable from "@/components/VehicleTable.vue"
import VehicleMap from "@/components/VehicleMap.vue"

const store = useVehiclesStore()
onMounted(() => store.load())
</script>

<template>
  <div class="app">
    <header class="header">
      <div>
        <h1 class="title">Vehicles</h1>
        <p class="subtitle">Vue 3 + TypeScript • CRUD • сортировка • Yandex Map</p>
      </div>
      <div class="headerActions">
        <span v-if="store.loading" class="pill">Загрузка…</span>
      </div>
    </header>

    <div v-if="store.error" class="alert">{{ store.error }}</div>

    <main class="grid">
      <section class="panel">
        <VehicleForm />
      </section>

      <section class="panel">
        <VehicleMap />
      </section>

      <section class="panel full">
        <VehicleTable />
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Yandex-like: white + orange + soft gray */
.app{
  min-height:100vh;
  background: linear-gradient(180deg, #fff7ed 0%, #ffffff 35%, #ffffff 100%);
  color:#111827;
  padding:20px;
  max-width:1200px;
  margin:0 auto;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:16px;
  padding:18px 18px 12px;
  border-radius:18px;
  background: rgba(255,255,255,.9);
  border:1px solid #fde68a;
  box-shadow: 0 10px 30px rgba(17,24,39,.06);
  margin-bottom:16px;
}

.title{margin:0;font-size:28px;letter-spacing:-0.02em}
.subtitle{margin:6px 0 0;color:#6b7280}

.headerActions{display:flex;align-items:center;gap:10px}

.pill{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 12px;
  border-radius:999px;
  background:#fff;
  border:1px solid #e5e7eb;
  color:#374151;
  font-size:13px;
}
.pill.ok{border-color:#fdba74;background:#fff7ed;color:#9a3412}

.alert{
  margin:12px 0;
  padding:12px 14px;
  border-radius:14px;
  background:#fff1f2;
  border:1px solid #fecdd3;
  color:#9f1239;
}

.grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:16px;
}
.panel{
  border-radius:18px;
  background:#ffffff;
  border:1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(17,24,39,.06);
  overflow:hidden;
}
.full{grid-column:1 / -1}

@media (max-width: 980px){
  .grid{grid-template-columns:1fr}
}
</style>
