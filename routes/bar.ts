/*
 * GET Bar Chart
 */
import express = require('express');
import { NiftyBarChartHelper } from '../NiftyImages/BarChartHelper';
import { NiftyUtils } from '../NiftyImages/common';
import { ChartRenderer } from '../NiftyImages/ChartRenderer';
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');

router.get('/', (req: express.Request, res: express.Response) => {
    
    const freshRequire = require('fresh-require');
    
    var fromBody: NiftyChartTypes.BarChartType = {
        width: 600,
        height: 600,
        backgroundColor: '#fff',
        data: [531, 2500, 6100, 1000],
        labels: ['Pies', 'Cakes', 'Soda', 'Apples'],
        colors: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        transparency: 0.5,
        dataLabels: {
            color: '#666',
            display: true,
            labelType: 'value',
            precision: 0,
            placement: 'outside',
            prefix: '$',
            fontFamily: 'Helvetica'
        },
        padding: 20,
        seriesAxis: {
            display: true,
            showLines: false
        },
        valueAxis: {
            display: true,
            labelType: 'number',
            prefix: '$',
            showLines: false
        }
    };

    var config = NiftyBarChartHelper.getBarConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

router.post('/', (req: express.Request, res: express.Response) => {

    var fromBody = req.body;

    var config = NiftyBarChartHelper.getBarConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

export default router;