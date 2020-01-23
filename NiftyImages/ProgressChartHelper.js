"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartConfigDefaults_1 = require("./ChartConfigDefaults");
var NiftyProgressChartHelper;
(function (NiftyProgressChartHelper) {
    const pieNiftyDefaults = {
        height: 400,
        width: 400,
        backgroundColor: '#fff',
        data: [100, 55, 40, 30],
        labels: ['Slice 1', 'Slice 2', 'Slice 3', 'Slice 4'],
        legend: { display: false },
        padding: 20,
        dataLabels: {
            display: false,
            precision: 0,
            prefix: '',
            suffix: '',
            color: '#fff'
        },
        sliceColor: '#fff',
        sliceWidth: 0,
        colors: ChartConfigDefaults_1.ChartConfigDefaults.getDefaultColors(),
        transparency: 1
    };
})(NiftyProgressChartHelper = exports.NiftyProgressChartHelper || (exports.NiftyProgressChartHelper = {}));
//# sourceMappingURL=ProgressChartHelper.js.map