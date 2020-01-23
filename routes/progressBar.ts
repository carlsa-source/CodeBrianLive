/*
 * GET Bar Chart
 */
import express = require('express');
import { ChartRenderer } from '../NiftyImages/ChartRenderer';
import { NiftyProgressBarHelper } from '../NiftyImages/ProgressBarHelper';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {

    var fromBody: NiftyChartTypes.ProgressChartType = {
        width: 800,
        height: 200,
        backgroundColor: '#fff',
        value: 3500,
        // color: '#ec2575',
        color: '#ec2575',
        trackColor: '#666',
        transparency: .7,
        max: 5000,
        min: 0,
        padding: 20,
        valueLabel: {
            fontSize: 22,
            labelType: 'number',
            color: '#fff',
            display: true,
            prefix: '$'
        },
        toGoLabel: {
            display: true,
            color: '#fff',
            labelType: 'number'
        },
        valueAxies: {
            display: true,
            maxTicksLimit: 2,
            labelType: 'percentage'
        }
    };


    fromBody = {};

    var config = NiftyProgressBarHelper.getProgressBarConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

router.post('/', (req: express.Request, res: express.Response) => {

    var fromBody = req.body;

    var config = NiftyProgressBarHelper.getProgressBarConfig(fromBody);

    var renderer = new ChartRenderer(config);

    (async () => {

        await renderer.renderImage(req, res, fromBody);

    })();

});

export default router;