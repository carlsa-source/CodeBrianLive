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
 *
 * https://github.com/SeanSobey/ChartjsNodeCanvas
 *
 */
const express = require("express");
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');
var configuration = {
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
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
router.get('/', (req, res) => {
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
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield canvasRenderService.renderToBuffer(configuration);
        // const dataUrl = await canvasRenderService.renderToDataURL(configuration);
        // const stream = canvasRenderService.renderToStream(configuration);
        res.contentType('image/png');
        res.send(image);
    }))();
});
exports.default = router;
//# sourceMappingURL=gauge.js.map