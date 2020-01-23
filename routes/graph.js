"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * https://www.npmjs.com/package/chartjs-node-canvas
 */
const express = require("express");
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');
var configuration = {
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
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
router.get('/', (req, res) => {
    const width = 400; //px
    const height = 400; //px
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });
    configuration.data.datasets[0].data[0] = randomIntInc(22, 88);
    configuration.data.datasets[0].data[1] = randomIntInc(5, 200);
    configuration.data.datasets[0].data[2] = randomIntInc(22, 200);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield canvasRenderService.renderToBuffer(configuration);
        // const dataUrl = await canvasRenderService.renderToDataURL(configuration);
        // const stream = canvasRenderService.renderToStream(configuration);
        res.contentType('image/png');
        res.send(image);
    }))();
});
exports.default = router;
//# sourceMappingURL=graph.js.map