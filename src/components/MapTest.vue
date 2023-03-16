<template>
    <div
        class="main-map"
        ref="map"
    ></div>
</template>

<script>
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { defaults } from 'ol/control.js';
import { fromLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS.js';
export default {
    name: 'MapTest',
    data() {
        return {
            Map: undefined,
        };
    },
    mounted() {
        this.Map = new Map({
            target: this.$refs.map,
            controls: defaults({
                attribution: false,
                zoom: false,
                rotate: false,
            }),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new TileLayer({
                    source: new TileWMS({
                        url: 'http://211.171.200.55/spatial/proxy/wms',
                        params: { LAYERS: '', TILED: true },
                        serverType: 'geoserver',
                        // Countries have transparency, so do not fade tiles:
                        transition: 0,
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat([127.0388684, 37.5449168]),
                zoom: 10,
            }),
        });
    },
};
</script>

<style>
.main-map {
    width: 100%;
    height: 1000px;
}
</style>
