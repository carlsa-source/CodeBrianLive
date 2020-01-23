"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartConfigDefaults_1 = require("./ChartConfigDefaults");
var RequestDefaults;
(function (RequestDefaults) {
    RequestDefaults.defaultFont = 'Helvetica';
    /** Line Chart Defaults */
    RequestDefaults.lineChart = {
        height: 500,
        width: 800,
        padding: 20,
        backgroundColor: '#fff',
        transparency: 1,
        beginAtZero: true,
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        line: {
            data: [5000, 10000, 2500, 7500, 6000],
            label: 'Series Name',
            color: '#ec2575',
            width: 1,
            point: {
                display: true
            },
            fill: false,
            straight: false,
            dataLabel: {
                display: false,
                placement: 'middle',
                backgroundColor: '#fff',
                color: '#000',
                borderColor: '#666',
                borderWidth: 2,
                padding: 5
            }
        },
        legend: {
            display: false,
            fontColor: '#333',
            position: 'top'
        },
        seriesAxis: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontSize: 12,
            showLines: true
        },
        valueAxis: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontSize: 12,
            showLines: true,
            maxTicksLimit: 4,
            labelType: 'value'
        }
    };
    /** Bar Chart Defaults */
    RequestDefaults.barChart = {
        width: 400,
        height: 400,
        backgroundColor: '#fff',
        transparency: 0.5,
        dataLabels: {
            display: false,
            placement: 'middle',
            color: '#333',
            labelType: 'value',
            fontFamily: RequestDefaults.defaultFont
        },
        legend: {
            display: false
        },
        seriesAxis: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true
        },
        valueAxis: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true,
            maxTicksLimit: 8
        }
    };
    /** Horizontal Bar Chart Defaults */
    RequestDefaults.horizontalBarChart = {
        width: 400,
        height: 400,
        backgroundColor: '#fff',
        transparency: 0.5,
        dataLabels: {
            display: false,
            placement: 'middle',
            color: '#333',
            labelType: 'value',
            fontFamily: RequestDefaults.defaultFont
        },
        legend: {
            display: false
        },
        seriesAxis: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true
        },
        valueAxis: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true,
            maxTicksLimit: 5
        }
    };
    /** Pie and Dohnut Defaults */
    RequestDefaults.pieNiftyDefaults = {
        height: 400,
        width: 400,
        backgroundColor: '#fff',
        data: [100, 55, 40, 30],
        labels: ['Slice 1', 'Slice 2', 'Slice 3', 'Slice 4'],
        legend: {
            display: false,
            fontFamily: RequestDefaults.defaultFont
        },
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
    /** Radial Gauage Defaults */
    RequestDefaults.radialNiftyDefaults = {
        width: 400,
        height: 400,
        backgroundColor: '',
        padding: 20,
        max: 100,
        min: 0,
        color: '#5c6cec',
        rotation: 'top',
        roundedCorners: true,
        cutoutPercentage: 80,
        value: 35,
        trackColor: '#eee',
        centerArea: {
            display: true,
            fontFamily: RequestDefaults.defaultFont,
            fontSize: undefined
        }
    };
    /** Radial Gauage Defaults */
    RequestDefaults.progressBarNiftyDefaults = {
        width: 800,
        height: 200,
        backgroundColor: '#fff',
        padding: 20,
        max: 100,
        min: 0,
        value: 65,
        color: '#ec2575',
        trackColor: '#eee',
        transparency: 0,
        title: {
            display: false,
            fontFamily: RequestDefaults.defaultFont,
            fontSize: 22,
            padding: 10,
            position: 'top',
            text: 'Progress Title'
        },
        valueLabel: {
            display: true,
            color: '#fff',
            fontFamily: RequestDefaults.defaultFont,
            labelType: 'percentage',
            fontSize: 24
        },
        toGoLabel: {
            display: false,
            color: '#fff',
            fontFamily: RequestDefaults.defaultFont,
            labelType: 'value',
            fontSize: 24
        },
        valueAxies: {
            display: false,
            maxTicksLimit: 2,
            labelType: 'percentage'
        }
    };
    /** Default Generic Config */
    RequestDefaults.genericChart = {
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
            color: '#fff',
            fontFamily: RequestDefaults.defaultFont
        },
        colors: ChartConfigDefaults_1.ChartConfigDefaults.getDefaultColors(),
        transparency: 1
    };
})(RequestDefaults = exports.RequestDefaults || (exports.RequestDefaults = {}));
//# sourceMappingURL=RequestDefaults.js.map