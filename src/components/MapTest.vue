<template>
    <div>
        <div class="main-map" ref="map"></div>
        <div id="info"></div>
        <form style="position: absolute; top: 80px" action="">
            <label style="display: block" v-for="(obj, i) in Object.keys(wmsOptions)" :key="i">
                <input :value="obj" type="checkbox" checked />
                {{ obj }}
            </label>
        </form>
        <div id="map-popup"></div>
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
import { Vector as VectorSource } from 'ol/source';
import { GeoJSON, WFS } from 'ol/format';
import { Vector as VectorLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import { mapGetters } from 'vuex';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { Overlay } from 'ol';
import { Select, defaults as interactionDefalut } from 'ol/interaction';
import { click, pointerMove } from 'ol/events/condition';

// const wmsSource = new ImageWMS({
//     url: 'https://ahocevar.com/geoserver/wms',
//     params: { LAYERS: 'ne:ne' },
//     serverType: 'geoserver',
//     crossOrigin: 'anonymous',
// });
// const view = new View({
//     center: [0, 0],
//     zoom: 1,
// });
const baseMap = new TileLayer({
    source: new OSM(),
});

const getWMS = (option) => {
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
// export function urlBuilder(host, query) {
//     const param = Object.entries(query)
//         .map(([key, value]) => (value ? `${key}=${encodeURIComponent(value)}` : ''))
//         .join('&');
//     return `${host}?${param}`;
// }

const featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureNS: 'http://www.opengis.net/wfs',
    featurePrefix: 'feature',
    featureTypes: ['PGMS_PARK_PO'],
    outputFormat: 'application/json',
    gmlOptions: { multiSurface: !0 },
});
const vectorSource = new VectorSource();
const vector = new VectorLayer({
    source: vectorSource,
    style: new Style({
        stroke: new Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2,
        }),
    }),
});
fetch(`${process.env.VUE_APP_URL}/mapstudio/wfs?KEY=5B1AC435-395B-E831-19E6-A7CE51787C45`, {
    method: 'POST',
    body: new XMLSerializer().serializeToString(featureRequest),
})
    .then((res) => res.json())
    .then((json) => {
        const features = new GeoJSON().readFeatures(json);
        vectorSource.addFeatures(features);
    });

const hoverSelect = new Select({
    condition: pointerMove,
    style: (featutre) => {},
});
const clickSelect = new Select({
    condition: click,
    style: (feature) => {},
});
const popup = document.getElementById('map-popup');

const overlay = new Overlay({
    id: 'popup',
    element: popup || undefined,
    positioning: 'center-center',
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});

const wmsOptions = {
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
const wfsOptions = {
    mapA: {
        KEY: '5B1AC435-395B-E831-19E6-A7CE51787C45',
    },
};
export default {
    name: 'MapTest',
    data() {
        return {
            Map: undefined,
            wmsOptions: wmsOptions,
            wfsOptions: wfsOptions,
            tiles: [],
        };
    },
    beforeMount() {
        Object.keys(this.wmsOptions).forEach((item) => {
            this.tiles.push(
                getWMS({ KEY: this.wmsOptions[item].KEY, LAYERS: this.wmsOptions[item].LAYERS })
            );
        });
    },
    mounted() {
        this.Map = new Map({
            target: this.$refs.map,
            controls: defaults({
                attribution: false,
                zoom: false,
                rotate: false,
            }),
            layers: [baseMap, ...this.tiles, vector],
            view: new View({
                projection: 'EPSG:3857',
                center: fromLonLat([126.6388684, 37.6449168]),
                zoom: 13,
                maxZoom: 19,
            }),
            interactions: interactionDefalut().extend([clickSelect, hoverSelect]),
            overlays: [overlay],
            // view: new View({
            //     projection: 'EPSG:3857',
            //     center: proj4('EPSG:4326', 'EPSG:3857', [127.28923267492068, 36.48024986578043]),
            //     zoom: 17,
            // }),
        });
        this.Map.on('singleclick', (e) => {
            if (this.Map.hasFeatureAtPixel(e.pixel)) {
                this.Map.forEachFeatureAtPixel(e.pixel, (feature) => {
                    if (feature.getId()) {
                        const geom = feature.getGeometry();

                        if (geom) {
                            const [minX, minY, maxX, maxY] = geom.getExtent();
                            console.log(feature);
                            document.getElementById(
                                'map-popup'
                            ).innerHTML = `<ul style="background-color:white">
                                    <li>${feature.getId() || ''}</li>
                                    <li>${feature.get('FROM_FG') || <span>이름 없음</span>}</li>
                                    <li>${feature.get('PARK_ID')}</li>
                                </ul>`;
                            console.log(fromLonLat([126.6388684, 37.6449168]));
                            overlay.setPosition([(maxX + minX) / 2, (maxY + minY) / 2]);
                            //overlay.setPosition(fromLonLat([126.6388684, 37.6449168]));
                        }
                    }
                });
            }
        });
        // this.Map.on(
        //     'pointermove',
        //     (e) =>
        //         (this.Map.getViewport().style.cursor = this.Map.hasFeatureAtPixel(e.pixel)
        //             ? 'pointer'
        //             : '')
        // );

        // this.Map.on('singleclick', function (evt) {
        //     document.getElementById('info').innerHTML = '';
        //     const viewResolution = /** @type {number} */ (view.getResolution());
        //     const url = wmsSource.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
        //         INFO_FORMAT: 'text/html',
        //     });
        //     if (url) {
        //         fetch(url)
        //             .then((response) => response.text())
        //             .then((html) => {
        //                 document.getElementById('info').innerHTML = html;
        //             });
        //     }
        // });
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
