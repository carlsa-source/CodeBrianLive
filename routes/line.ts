/*
 * GET Bar Chart
 */
import express = require('express');
import { NiftyBarChartHelper } from '../NiftyImages/BarChartHelper';
import { NiftyUtils } from '../NiftyImages/common';
import { ChartRenderer } from '../NiftyImages/ChartRenderer';
import { LineChartHelper } from '../NiftyImages/LineChartHelper';
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');

router.get('/', (req: express.Request, res: express.Response) => {

    var fromBody: NiftyChartTypes.LineChartType = {
        width: 800,
        height: 500,
        backgroundColor: '#fff',
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
        transparency: 0.3,
        line: {
            data: [5000, 10000, 2500, 7500, 6000],
            label: 'Series One',
            color: '#f60',
            dataLabel: {
                display: false
            },
            fill: true
        },
        seriesAxis: {
            display: true,
            showLines: true,
            hideAxisLine: false
        },
        valueAxis: {
            display: true,
            showLines: true,
            hideAxisLine: false
        }
    };


    var config = LineChartHelper.getLineConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

router.post('/', (req: express.Request, res: express.Response) => {

    var fromBody = req.body;

    var config = LineChartHelper.getLineConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

export default router;