/*
 * GET Pie Chart
 */
import express = require('express');
import { NiftyPieChartHelper } from '../NiftyImages/PieChartHelper';
import { ChartRenderer } from '../NiftyImages/ChartRenderer';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {

    const freshRequire = require('fresh-require');

    var fromBody: NiftyChartTypes.PieChartType = {
        width: 500,
        height: 500,
        backgroundColor: '#fff',
        data: [500, 2500, 6001, 1000],
        labels: ['Pies', 'Cakes', 'Soda', 'Apples'],
        colors: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        transparency: 0.8,
        legend: {
            display: true,
            fontColor: '#000',
            align: 'center',
            fontSize: 14
        },
        dataLabels: {
            color: '#000',
            display: true,
            labelType: 'percentage',
            precision: 0,
            placement: 'middle'
        },
        padding: 20,
        sliceColor: '#fff',
        sliceWidth: 2
    };

    fromBody = {};

    var config = NiftyPieChartHelper.getPieConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

router.post('/', (req: express.Request, res: express.Response) => {

    var fromBody = req.body;

    var config = NiftyPieChartHelper.getPieConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

export default router;