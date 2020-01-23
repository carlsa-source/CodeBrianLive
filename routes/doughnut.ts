/*
 * GET Doughnut Chart
 */
import express = require('express');
import { NiftyUtils } from '../NiftyImages/common';
import { NiftyPieChartHelper } from '../NiftyImages/PieChartHelper';
import { ChartRenderer } from '../NiftyImages/ChartRenderer';
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');

router.get('/', (req: express.Request, res: express.Response) => {

    var fromBody: NiftyChartTypes.DoughnutChartType = {
        width: 500,
        height: 500,
        backgroundColor: '#fff',
        data: [5, 25, 61, 10],
        labels: ['Pies', 'Cakes', 'Soda', 'Apples'],
        colors: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        // transparency: 0.5,
        legend: {
            display: true,
            fontColor: '#000',
            align: 'center',
            fontSize: 14
        },
        dataLabels: {
            color: '#000',
            display: true,
            labelType: 'value',
            precision: 0,
            placement: 'middle'
        },
        padding: 20,
        sliceColor: '#fff',
        sliceWidth: 0,
        cutoutPercentage: 30
    };

    fromBody = {};

    var config = NiftyPieChartHelper.getDoughnutConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

router.post('/', (req: express.Request, res: express.Response) => {

    var fromBody = req.body;

    var config = NiftyPieChartHelper.getDoughnutConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

export default router;