<template>
    <div>
        <div class="main-map" ref="map"></div>
        <div id="info"></div>
        <form style="position: absolute; top: 80px" action="">
            <label style="display: block" v-for="(obj, i) in Object.keys(mapArr)" :key="i">
                <input :value="obj" type="checkbox" checked />
                {{ obj }}
            </label>
        </form>
    </div>
</template>

<script>
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { defaults } from 'ol/control.js';
import { fromLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS.js';
import ImageWMS from 'ol/source/ImageWMS';
import { mapGetters } from 'vuex';
const wmsSource = new ImageWMS({
    url: 'https://ahocevar.com/geoserver/wms',
    params: { LAYERS: 'ne:ne' },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
});
const view = new View({
    center: [0, 0],
    zoom: 1,
});
const baseMap = new TileLayer({
    source: new OSM(),
});

const getTile = (option) => {
    return new TileLayer({
        source: new TileWMS({
            url: `${process.env.VUE_APP_URL}/mapstudio/wms`,
            params: {
                CRS: 'EPSG:3857',
                ...option,
            },
            serverType: 'geoserver',
            transition: 0,
        }),
    });
};
const mapArr = {
    mapA: {
        KEY: 'D4A8C9B0-E42E-555B-F06F-840E6D558B8D',
        LAYERS: ['TEST_DEVELOP_AREA'],
    },
    mapB: {
        KEY: '5B1AC435-395B-E831-19E6-A7CE51787C45',
        LAYERS: ['TEST_SCCO_EMD', 'PGMS_PARK_PO'],
    },
    mapC: {
        KEY: 'D96BA1C4-390D-BBA6-668C-9E1B52C4CEDB',
        LAYERS: ['LP_PA_CBND'],
    },
};
export default {
    name: 'MapTest',
    data() {
        return {
            Map: undefined,
            mapArr: mapArr,
            tiles: [],
        };
    },
    beforeMount() {
        Object.keys(this.mapArr).forEach((item) => {
            this.tiles.push(
                getTile({ KEY: this.mapArr[item].KEY, LAYERS: this.mapArr[item].LAYERS })
            );
        });
        console.log(this.tiles);
    },
    mounted() {
        this.Map = new Map({
            target: this.$refs.map,
            controls: defaults({
                attribution: false,
                zoom: false,
                rotate: false,
            }),
            layers: [baseMap, ...this.tiles],
            view: new View({
                center: fromLonLat([126.6388684, 37.6449168]),
                zoom: 13,
            }),
        });
        this.Map.on('singleclick', function (evt) {
            document.getElementById('info').innerHTML = '';
            const viewResolution = /** @type {number} */ (view.getResolution());
            const url = wmsSource.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
                INFO_FORMAT: 'text/html',
            });
            if (url) {
                fetch(url)
                    .then((response) => response.text())
                    .then((html) => {
                        document.getElementById('info').innerHTML = html;
                    });
            }
        });
    },
    computed: {
        ...mapGetters('colorPickerModule', ['themeColor', 'textColor']),
    },
};
</script>

<style>
.main-map {
    width: 100%;
    height: 800px;
}
form {
    background-color: v-bind('themeColor');
    padding: 10px 5px;
    border-radius: 10px;
}
</style>
