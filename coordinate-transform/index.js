const name_map = {
    "EPSG:3857": "EPSG:3857",
    "EPSG:4326": "EPSG:4326",
    "BAIDU:3857": "BAIDU:3857",
    "BAIDU:4326": "BAIDU:4326",
    "GAODE": "GCJ02:3857",
    "GAODE:3857": "GCJ02:3857",
    "GOOGLE": "GCJ02:3857",
    "GOOGLE:3857": "GCJ02:3857",
    "TENCENT": "GCJ02:3857",
    "TENCENT:3857": "GCJ02:3857",
    "ARCGIS": "GCJ02:3857",
    "ARCGIS:3857": "GCJ02:3857",
    "BING": "GCJ02:3857",
    "BING:3857": "GCJ02:3857",
    "PGIS": "EPSG:4326",
    "PGIS:4326": "EPSG:4326",
    "WGS:84": "EPSG:4326",
    "TIANDITU": "EPSG:4326",
    "TIANDITU:4326": "EPSG:4326",
    "OSM": "EPSG:3857",
    "OSM:3857": "EPSG:3857"
}

new Vue({
    el: '#app',
    data: {
        loading: false,
        loadingText: '',
        // 坐标系选择
        coordinates: [
            'EPSG:4326',
            'EPSG:3857',
            'BAIDU:4326',
            'BAIDU:3857',
            'GAODE:3857',
            'GOOGLE:3857',
            'TENCENT:3857',
            'ARCGIS:3857',
            'BING:3857',
            'PGIS:4326',
            'WGS:84',
            'TIANDITU:4326',
            'OSM:3857',
        ],
        // 源坐标系和目标坐标系
        config: {
            source: '',
            target: '',
        },
        dialogVisible: false,
        dialogTitle: [
            '选择要转换的Sheet',
            '选择经纬度对应的字段'
        ],
        fileList: [],
        /*** 处理后的数据 ***/
        filename: '',   // 已上传文件的文件名
        suffix: '',     // 已上传文件的后缀名
        workbook: null, // 读取完成后的数据
        sheetNames: [],  // 备选 sheet
        sheetHeaders: [],   // 备选表头
        step: 0,    // 当前步骤
        options: { // 选中要处理的数据
            sheetName: '',
            lngKey: '',
            latLabel: '',
            lngLabel: '',
            latLabel: '',
        },
        /*** 处理后的数据 ***/
    },
    methods: {
        // 文件个数超出
        handleFileExceed() {
            this.$message({
                message: '文件个数超出限制',
                type: 'warning'
            });
        },
        // 文件发生变动
        handleFileChange(file, files) {
            this.fileList = files;
            if (files.length) {
                let file = files[0];
                let splitedFilename = file.name.split('.');
                this.suffix = splitedFilename.pop();
                this.filename = splitedFilename.join('.');
                this.loading = true;
                this.loadingText = '正在解析文件';
                this.readFile(file.raw).then((buffer) => {
                    setTimeout(() => {
                        try {
                            let workbook = XLSX.read(buffer, { type: 'buffer' });
                            this.workbook = workbook;
                            // 恢复默认值
                            this.options = {
                                sheetName: '',
                                lngKey: '',
                                latLabel: '',
                                lngLabel: '',
                                latLabel: '',
                            };
                            this.showDialog();
                        } catch (error) {
                            console.log(error);
                            this.$alert('文件解析失败', '提示');
                        } finally {
                            this.loading = false;
                        }
                    }, 500)
                }).catch((error) => {
                    console.log(error)
                    this.loading = false;
                    this.$alert('文件读取失败', '提示');
                })
            } else {
                // 恢复默认值
                this.filename = '',   // 已上传文件的文件名
                    this.suffix = '',     // 已上传文件的后缀名
                    this.workbook = null, // 读取完成后的数据
                    this.sheetNames = [],  // 备选 sheet
                    this.sheetHeaders = [],   // 备选表头
                    this.step = 0,    // 当前步骤
                    this.options = {
                        sheetName: '',
                        lngKey: '',
                        latLabel: '',
                        lngLabel: '',
                        latLabel: '',
                    };
            }
        },
        handleFileRemove(file, files) {
            this.fileList = files;
            if (!files.length) {
                // 恢复默认值
                this.filename = '',   // 已上传文件的文件名
                    this.suffix = '',     // 已上传文件的后缀名
                    this.workbook = null, // 读取完成后的数据
                    this.sheetNames = [],  // 备选 sheet
                    this.sheetHeaders = [],   // 备选表头
                    this.step = 0,    // 当前步骤
                    this.options = {
                        sheetName: '',
                        lngKey: '',
                        latLabel: '',
                        lngLabel: '',
                        latLabel: '',
                    };
            }
        },
        // 读取文件内容
        readFile(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = function () {
                    resolve(this.result)
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.readAsArrayBuffer(file);
            })
        },
        // 显示弹窗，选择需要转换的数据
        showDialog() {
            if (!this.workbook) {
                this.$message({
                    message: '请先上传文件',
                    type: 'warning'
                });
            } else {
                this.sheetNames = this.workbook.SheetNames;
                this.dialogVisible = true;
                this.step = 0;
            }
        },
        // 弹窗中的下一步
        next(step) {
            this.step += 1;
            // 获取已选sheet的header
            if (step == 0) {
                let selectedSheet = this.workbook.Sheets[this.options.sheetName];
                this.sheetHeaders = Object.keys(selectedSheet).filter(key => {
                    if (key.charAt(0) === '!') {
                        return false;
                    } else if (key.replace(/[A-Z]/g, '') !== '1') {
                        return false;
                    } else {
                        return true;
                    }
                }).map(key => ({
                    key,
                    value: selectedSheet[key].w
                }))
            }
        },
        // 弹窗中的上一步
        prev(step) {
            this.step -= 1;
            // 重置已选
            if (step == 1) {
            }
        },
        // 完成配置
        finish() {
            let selectedSheet = this.workbook.Sheets[this.options.sheetName];
            this.options.lngLabel = selectedSheet[this.options.lngKey].w;
            this.options.latLabel = selectedSheet[this.options.latKey].w;
            this.dialogVisible = false;
        },
        // sheet 改变时重置经纬度字段
        sheetNameChange() {
            this.options = Object.assign({}, this.options, {
                lngKey: '',
                latLabel: '',
                lngLabel: '',
                latLabel: '',
            })
        },
        // 导出
        exportFile() {
            if (!this.fileList.length) {
                this.$message({
                    message: '请先上传文件',
                    type: 'warning'
                });
                return;
            }
            if (!this.config.source) {
                this.$message({
                    message: '请选择源坐标系',
                    type: 'warning'
                });
                return;
            }
            if (!this.config.target) {
                this.$message({
                    message: '请选择目标坐标系',
                    type: 'warning'
                });
                return;
            }
            if (this.config.source === this.config.target) {
                this.$message({
                    message: '源坐标系和目标坐标系不能相同',
                    type: 'warning'
                });
                return;
            }
            if (!this.options.sheetName) {
                this.$message({
                    message: '请选择需要转换的Sheet',
                    type: 'warning'
                });
                return;
            }
            if (!this.options.lngKey) {
                this.$message({
                    message: '请选择经度对应的字段',
                    type: 'warning'
                });
                return;
            }
            if (!this.options.latKey) {
                this.$message({
                    message: '请选择纬度对应的字段',
                    type: 'warning'
                });
                return;
            }
            this.loading = true;
            this.loadingText = '正在进行转换';
            this.startTransform().then(() => {
                XLSX.writeFile(this.workbook, this.filename + '.' + this.config.source + '-' + this.config.target + '.' + this.suffix);
                this.loading = false;
            }).catch((error) => {
                console.log(error);
                this.loading = false;
                this.$alert('导出文件失败', '提示');
            });
        },
        // 开始转换
        startTransform() {
            return new Promise((resolve, reject) => {
                if (name_map[this.config.source] == name_map[this.config.target]) {
                    resolve();
                } else {
                    let selectedSheet = this.workbook.Sheets[this.options.sheetName];
                    // 获取要转换的列
                    let options = this.options;
                    let lngCol = options.lngKey.replace(/[0-9]/g, '');  // 只取字母
                    let latCol = options.latKey.replace(/[0-9]/g, '');  // 只取字母
                    // 获取要抓换的行
                    let ref = selectedSheet['!ref'];
                    let endRow = parseInt(ref.split(':')[1].replace(/[A-Z]/g, ''));
                    let rows = [];
                    for (let i = 2; i <= endRow; i++) {
                        rows.push(i);
                    }
                    rows.forEach((row) => {
                        let lngKey = lngCol + row, latKey = latCol + row;
                        if (selectedSheet[lngKey] || selectedSheet[latKey]) {
                            let lng = parseFloat(selectedSheet[lngKey].v), lat = parseFloat(selectedSheet[latKey].v);
                            if (isNaN(lng) || isNaN(lat)) {
                                selectedSheet[lngKey].v = selectedSheet[lngKey].w = null;
                                selectedSheet[latKey].v = selectedSheet[latKey].w = null;
                            } else {
                                let convertedLngLat = fc.proj.transform([lng, lat], this.config.source, this.config.target);
                                selectedSheet[lngKey].v = convertedLngLat[0].toFixed(6);
                                selectedSheet[latKey].v = convertedLngLat[1].toFixed(6);
                            }
                        }
                    })
                    resolve();
                }
            })
        }
    }
})
