new Vue({
    el: '#app',
    data: {
        map: null,

    },
    methods: {
        init() {
            this.initMap()
        },
        initMap() {
            // BMap使用的坐标系
            let crs = new L.Proj.CRS('EPSG:3857', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
                resolutions: function () {
                    var level = 19;
                    var res = [];
                    res[0] = Math.pow(2, 18);
                    for (var i = 1; i < level; i++) {
                        res[i] = Math.pow(2, (18 - i))
                    }
                    return res;
                }(),
                origin: [0, 0],
                // origin: [-33554432, 33554432.000000097],
                bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
                // bounds: L.bounds([8110761.58761047, -3813.018093789], [16253706.1966067, 7262587.0545919]),
            });
            let map = L.map('map',{
                attributionControl: false,
                center: [22.8, 113.5],
                crs: crs,
                // crs: L.CRS.EPSG3857,
                zoom: 12,
                minZoom: 0,
                maxZoom: 20,
            })
            this.map = map;
            this.addBmap();
            this.addMarker();
        },
        addAmap() {
            let map = this.map;
            let baseLayers = {
                "高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
                    subdomains: "1234"
                }).addTo(map),
                "卫星地图": L.layerGroup([
                    L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
                        subdomains: "1234"
                    }),
                    L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8', {
                        subdomains: "1234"
                    })
                ])
            };
            map.layerCtrl = L.control.layers(baseLayers, {}, {position: 'topleft'}).addTo(map);
        },
        addBmap() {
            let map = this.map;
            let baseLayers = {
                "百度地图": L.tileLayer('http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1', {
                    name: "", subdomains: '0123456789', tms: true
                }).addTo(map),
                "卫星地图": L.layerGroup([
                    L.tileLayer('http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46', {
                        name: "底图", subdomains: '0123456789', tms: true
                    }),
                    L.tileLayer('http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020', {
                        name: "注记", subdomains: '0123456789', tms: true
                    })
                ])
            };
            map.layerCtrl = L.control.layers(baseLayers, {}, {position: 'topleft'}).addTo(map);
        },
        addMarker() {
            let map = this.map;
            L.marker([22.512225, 113.529752]).addTo(map);   // before
            L.marker([22.515507, 113.54136]).addTo(map);   // after
        }
    },
    mounted() {
        this.init();
    }
})
