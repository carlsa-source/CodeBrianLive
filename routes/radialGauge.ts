/*
 * GET Doughnut Chart
 */
import express = require('express');
import { RadialGaugeHelper } from '../NiftyImages/RadialGaugeHelper';
import { ChartRenderer } from '../NiftyImages/ChartRenderer';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {

    var fromBody: NiftyChartTypes.RoundProgressChartType = {
        width: 450,
        height: 450,
        backgroundColor: '#fff',
        value: 20,
        color: '#ec2575',
        max: 50,
        min: 0,
        cutoutPercentage: 80,
        padding: 0,
        rotation: 'bottom',
        roundedCorners: true,
        trackColor: '#f0f4f5',
        centerArea: {
            display: false,
            backgroundColor: '',
            fontColor: '#666',
            padding: 0,
            text: '',
            prefix: '',
            suffix: '',
            fontSize: null,
            labelType: 'percentage',
            precision: 0
        }
    };

    fromBody = {};

    var config = RadialGaugeHelper.getRadialGauge(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

router.post('/', (req: express.Request, res: express.Response) => {

    var fromBody = req.body;

    var config = RadialGaugeHelper.getRadialGauge(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

export default router;