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
const common_1 = require("./common");
const freshRequire = require('fresh-require');
const { CanvasRenderService } = require('chartjs-node-canvas');
const plugin = {
    beforeDraw: function (chartInstance) {
        const backgroundColor = chartInstance.chart.options.plugins.backgroundColor;
        if (backgroundColor) {
            const ctx = chartInstance.chart.ctx;
            const canvas = chartInstance.chart.canvas;
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
};
let serviceCash = {};
function getRenderService(width, height) {
    var key = width + '' + height;
    var serv = serviceCash[key];
    if (serv) {
        return serv;
    }
    var serv = new CanvasRenderService(width, height, (ChartJS) => {
        //https://github.com/pandameister/chartjs-chart-radial-gauge#readme
        ChartJS.plugins.register(freshRequire('chartjs-chart-radial-gauge', require));
        ChartJS.defaults.global.defaultFontFamily = 'Helvetica';
        ChartJS.plugins.register(freshRequire('chartjs-plugin-annotation', require));
        ChartJS.plugins.register(plugin);
    }, 'png', () => {
        const chartJS = require('chart.js');
        require('chartjs-plugin-datalabels');
        require('chartjs-chart-radial-gauge');
        delete require.cache[require.resolve('chart.js')];
        delete require.cache[require.resolve('chartjs-plugin-datalabels')];
        return chartJS;
    });
    serviceCash[key] = serv;
    return serv;
}
class ChartRenderer {
    constructor(chartConfig) {
        // private canvasRenderService: any | null = null;
        this.config = null;
        this.renderService = null;
        this.config = chartConfig;
        this.renderService = getRenderService(chartConfig.width, chartConfig.height);
        this.registerAllFonts();
    }
    registerAllFonts() {
        if (!this.renderService) {
            return;
        }
        this.renderService.registerFont('./fonts/Helvetica 400.ttf', { family: 'Helvetica' });
        this.renderService.registerFont('./fonts/HelveticaNeue Medium.ttf', { family: 'HelveticaNeue' });
        this.renderService.registerFont('./fonts/OE.ttf', { family: 'OE' });
    }
    chartJsFactory() {
        const chartJS = require('chart.js');
        require('chartjs-plugin-datalabels');
        delete require.cache[require.resolve('chart.js')];
        delete require.cache[require.resolve('chartjs-plugin-datalabels')];
        return chartJS;
    }
    ;
    callback(ChartJS) {
        ChartJS.defaults.global.defaultFontFamily = 'Helvetica';
        ChartJS.plugins.register(freshRequire('chartjs-plugin-annotation', require));
        if (this.config && common_1.NiftyUtils.isColor(this.config.backgroundColor)) {
            ChartJS.plugins.register({
                beforeDraw: (chart, options) => {
                    const ctx = chart.ctx;
                    ctx.fillStyle = common_1.NiftyUtils.getColor(this.config.backgroundColor);
                    ctx.fillRect(0, 0, this.config.width, this.config.height);
                }
            });
        }
    }
    renderToBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.renderService.renderToBuffer(this.config.config);
        });
    }
    renderImage(req, res, fromBodyConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query['debug'] === 'true') {
                res.contentType('text');
                var result = [
                    '\r\nFROM BODY: \r\n-----------------------------------------\r\n',
                    JSON.stringify(fromBodyConfig, null, ' '),
                    '\r\n\r\nMERGED: \r\n-----------------------------------------\r\n',
                    JSON.stringify(this.config.config, null, ' ')
                ];
                res.send(result.join(''));
                return;
            }
            const image = yield this.renderToBuffer();
            res.contentType('image/png');
            res.send(image);
        });
    }
}
exports.ChartRenderer = ChartRenderer;
//# sourceMappingURL=ChartRenderer.js.map