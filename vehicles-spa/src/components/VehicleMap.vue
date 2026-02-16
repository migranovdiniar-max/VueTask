<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from "vue"
import { useVehiclesStore } from "@/stores/vehicles"

declare global {
  interface Window {
    ymaps: any
  }
}

const store = useVehiclesStore()
const vehicles = computed(() => store.items)

let map: any = null
let placemarks: any[] = []

function clearPlacemarks() {
  if (!map) return
  for (const pm of placemarks) map.geoObjects.remove(pm)
  placemarks = []
}

function renderPlacemarks() {
  if (!map || !window.ymaps) return
  clearPlacemarks()

  for (const v of vehicles.value) {
    if (!Number.isFinite(v.latitude) || !Number.isFinite(v.longitude)) continue

    const pm = new window.ymaps.Placemark(
      [v.latitude, v.longitude],
      {
        balloonContentHeader: `<b>${v.name} ${v.model}</b>`,
        balloonContentBody: `Год: ${v.year}<br/>Цена: ${v.price}`,
        hintContent: `${v.name} ${v.model}`,
      },
      { preset: "islands#orangeDotIcon" }
    )

    map.geoObjects.add(pm)
    placemarks.push(pm)
  }
}

onMounted(() => {
  if (!window.ymaps) {
    console.error("ymaps не найден. Проверь подключение 2.1 в index.html")
    return
  }

  window.ymaps.ready(() => {
    map = new window.ymaps.Map("yandex-map", {
      center: [55.753332, 37.621676],
      zoom: 10,
      controls: ["zoomControl", "geolocationControl"],
    })

    renderPlacemarks()
  })
})

watch(vehicles, () => {
  if (map) renderPlacemarks()
}, { deep: true })

onBeforeUnmount(() => {
  clearPlacemarks()
  if (map) {
    map.destroy()
    map = null
  }
})
</script>

<template>
  <div class="wrap">
    <div class="head">
      <div>
        <h3 class="h">Карта</h3>
        <p class="p">Точки авто по координатам (широта/долгота)</p>
      </div>

      <div class="badge">
        <span class="dot"></span>
        <span>{{ vehicles.length }} авто</span>
      </div>
    </div>

    <div class="mapFrame">
      <div id="yandex-map" class="map"></div>
    </div>

    <div class="hint">
      Подсказка: наведи на точку — увидишь модель, кликни — откроется карточка.
    </div>
  </div>
</template>

<style scoped>
.wrap{padding:16px}
.head{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:12px;
  margin-bottom:12px;
}
.h{margin:0;font-size:18px;color:#111827}
.p{margin:6px 0 0;color:#6b7280;font-size:13px}

.badge{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 12px;
  border-radius:999px;
  background:#fff7ed;
  border:1px solid #fdba74;
  color:#9a3412;
  font-size:13px;
}
.dot{
  width:10px;height:10px;border-radius:50%;
  background:#ff7a00;
  box-shadow:0 0 0 3px rgba(255,122,0,.18);
}

.mapFrame{
  border-radius:16px;
  overflow:hidden;
  border:1px solid #fde68a;
  box-shadow: 0 12px 26px rgba(17,24,39,.08);
  background:#fff;
}
.map{height:420px}

.hint{
  margin-top:10px;
  font-size:12px;
  color:#6b7280;
}
</style>
