
/*
 * https://www.npmjs.com/package/chartjs-node-canvas
 * 
 * https://github.com/SeanSobey/ChartjsNodeCanvas
 * 
 */
import express = require('express');
const router = express.Router();

const { CanvasRenderService } = require('chartjs-node-canvas');


var configuration: Chart.ChartConfiguration = {
    type: 'doughnut',
    data: {
        //labels: ["January", "February", "March", "April", "May"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: ['rgb(0, 99, 132, 0.2)', 'green', 'red', 'yellow', 'orange'],
            borderColor: '#fff',
            borderWidth: 1,
            data: [75, 25]
        }]
    },
    options: {
        title: {
            display: false
        },
        circumference: 1 * Math.PI,
        rotation: 1 * Math.PI,
        cutoutPercentage: 50
    }
};

function randomIntInc(low, high): number {
    return Math.floor(Math.random() * (high - low + 1) + low)
}

router.get('/', (req: express.Request, res: express.Response) => {

    const width = 400; //px
    const height = 200; //px
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => {

        // https://github.com/SeanSobey/ChartjsNodeCanvas/issues/7

        ChartJS.plugins.register({
            beforeDraw: (chart, options) => {
                const ctx = chart.ctx;
                ctx.fillStyle = '#cccccc';
                ctx.fillRect(0, 0, width, height);
            }
        });

    });

    (async () => {
        
        const image = await canvasRenderService.renderToBuffer(configuration);
        // const dataUrl = await canvasRenderService.renderToDataURL(configuration);
        // const stream = canvasRenderService.renderToStream(configuration);

        res.contentType('image/png');
        res.send(image);
        

    })();

    

});

export default router;
