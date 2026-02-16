<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import L from "leaflet"
import { useVehiclesStore } from "@/stores/vehicles"

const store = useVehiclesStore()
const vehicles = computed(() => store.items)

let map: L.Map | null = null
let layer: L.LayerGroup | null = null

function renderMarkers() {
  if (!map) return
  if (layer) layer.remove()
  layer = L.layerGroup()

  for (const v of vehicles.value) {
    if (Number.isFinite(v.latitude) && Number.isFinite(v.longitude)) {
      L.marker([v.latitude, v.longitude])
        .bindPopup(`<b>${v.name} ${v.model}</b><br/>${v.year} • $${v.price}`)
        .addTo(layer)
    }
  }

  layer.addTo(map)
}

onMounted(() => {
  map = L.map("map", { zoomControl: true }).setView([55.753332, 37.621676], 10)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map)

  renderMarkers()
})

watch(vehicles, () => renderMarkers(), { deep: true })

onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div class="card">
    <h3>Map</h3>
    <div id="map" class="map"></div>
  </div>
</template>

<style scoped>
.card{background:#111827;border:1px solid #1f2937;border-radius:14px;padding:16px}
.map{height:420px;border-radius:14px;overflow:hidden;border:1px solid #1f2937}
</style>
