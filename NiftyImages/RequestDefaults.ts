import { ChartConfigDefaults } from "./ChartConfigDefaults";

export namespace RequestDefaults {

    export const defaultFont: NiftyChartTypes.fontOptions = 'Helvetica';

    /** Line Chart Defaults */
    export const lineChart: NiftyChartTypes.LineChartType = {
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
            fontFamily: defaultFont,
            fontSize: 12,
            showLines: true
        },
        valueAxis: {
            display: true,
            fontFamily: defaultFont,
            fontSize: 12,
            showLines: true,
            maxTicksLimit: 4,
            labelType: 'value'
        }
        
    };

    /** Bar Chart Defaults */
    export const barChart: NiftyChartTypes.BarChartType = {
        width: 400,
        height: 400,
        backgroundColor: '#fff',
        transparency: 0.5,
        dataLabels: {
            display: false,
            placement: 'middle',
            color: '#333',
            labelType: 'value',
            fontFamily: defaultFont
        },
        legend: {
            display: false
        },
        seriesAxis: {
            display: true,
            fontFamily: defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true
        },
        valueAxis: {
            display: true,
            fontFamily: defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true,
            maxTicksLimit: 8
        }
    };

    /** Horizontal Bar Chart Defaults */
    export const horizontalBarChart: NiftyChartTypes.BarChartType = {
        width: 400,
        height: 400,
        backgroundColor: '#fff',
        transparency: 0.5,
        dataLabels: {
            display: false,
            placement: 'middle',
            color: '#333',
            labelType: 'value',
            fontFamily: defaultFont
        },
        legend: {
            display: false
        },
        seriesAxis: {
            display: true,
            fontFamily: defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true
        },
        valueAxis: {
            display: true,
            fontFamily: defaultFont,
            fontColor: '#333',
            fontSize: 12,
            showLines: true,
            maxTicksLimit: 5
        }
    };

    /** Pie and Dohnut Defaults */
    export const pieNiftyDefaults: NiftyChartTypes.PieChartType = {
        height: 400,
        width: 400,
        backgroundColor: '#fff',
        data: [100, 55, 40, 30],
        labels: ['Slice 1', 'Slice 2', 'Slice 3', 'Slice 4'],
        legend: {
            display: false,
            fontFamily: defaultFont
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
        colors: ChartConfigDefaults.getDefaultColors(),
        transparency: 1
    };

    /** Radial Gauage Defaults */
    export const radialNiftyDefaults: NiftyChartTypes.RoundProgressChartType = {
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
            fontFamily: defaultFont,
            fontSize: undefined
        }
    };

    /** Radial Gauage Defaults */
    export const progressBarNiftyDefaults: NiftyChartTypes.LinearProgressChartType = {
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
            fontFamily: defaultFont,
            fontSize: 22,
            padding: 10,
            position: 'top',
            text: 'Progress Title'
        },
        valueLabel: {
            display: true,
            color: '#fff',
            fontFamily: defaultFont,
            labelType: 'percentage',
            fontSize: 24
        },
        toGoLabel: {
            display: false,
            color: '#fff',
            fontFamily: defaultFont,
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
    export const genericChart: NiftyChartTypes.PieChartType = {
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
            fontFamily: defaultFont
        },
        colors: ChartConfigDefaults.getDefaultColors(),
        transparency: 1
    };

}