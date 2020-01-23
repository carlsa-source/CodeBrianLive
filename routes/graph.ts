
/*
 * https://www.npmjs.com/package/chartjs-node-canvas
 */
import express = require('express');
const router = express.Router();

const { CanvasRenderService } = require('chartjs-node-canvas');


var configuration: Chart.ChartConfiguration = {
    type: 'line',
    data: {
        labels: ['Kev', 'Brian', 'Eric', 'Dave', 'Yes', 'No'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 55, 22],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: (value) => '$' + value
                }
            }]
        }
    }
};

function randomIntInc(low, high): number {
    return Math.floor(Math.random() * (high - low + 1) + low)
}

router.get('/', (req: express.Request, res: express.Response) => {

    const width = 400; //px
    const height = 400; //px
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });

    configuration.data.datasets[0].data[0] = randomIntInc(22, 88);
    configuration.data.datasets[0].data[1] = randomIntInc(5, 200);
    configuration.data.datasets[0].data[2] = randomIntInc(22, 200);

    (async () => {
        
        const image = await canvasRenderService.renderToBuffer(configuration);
        // const dataUrl = await canvasRenderService.renderToDataURL(configuration);
        // const stream = canvasRenderService.renderToStream(configuration);

        res.contentType('image/png');
        res.send(image);
        

    })();

    

});

export default router;