

import { ChartConfigDefaults } from "./ChartConfigDefaults";

export namespace NiftyProgressChartHelper {

    const pieNiftyDefaults: NiftyChartTypes.PieChartType = {
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
        colors: ChartConfigDefaults.getDefaultColors(),
        transparency: 1
    };

}