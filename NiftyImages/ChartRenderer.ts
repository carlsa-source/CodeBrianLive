import express = require('express');
import { NiftyUtils } from "./common";

const freshRequire = require('fresh-require');
const { CanvasRenderService } = require('chartjs-node-canvas');

const plugin = {
    beforeDraw: function (chartInstance) {

        const backgroundColor = chartInstance.chart.options.plugins.backgroundColor;

        if (backgroundColor) {
            const ctx = chartInstance.chart.ctx
            const canvas = chartInstance.chart.canvas

            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
    }
}

interface IHash {
    [details: string]: any;
}

let serviceCash: IHash = {};

function getRenderService(width: number, height: number): any {

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


export class ChartRenderer {

    // private canvasRenderService: any | null = null;
    private config: NiftyChartTypes.NiftyChart | null = null;
    private renderService: any | null = null;

    constructor(chartConfig: NiftyChartTypes.NiftyChart) {

        this.config = chartConfig;
        this.renderService = getRenderService(chartConfig.width, chartConfig.height);

        this.registerAllFonts();
    }

    private registerAllFonts() {
        if (!this.renderService) { return; }
        this.renderService.registerFont('./fonts/Helvetica 400.ttf', { family: 'Helvetica' });
        this.renderService.registerFont('./fonts/HelveticaNeue Medium.ttf', { family: 'HelveticaNeue' });
        this.renderService.registerFont('./fonts/OE.ttf', { family: 'OE' });
    }

    private chartJsFactory() {
        const chartJS = require('chart.js');
        require('chartjs-plugin-datalabels');
        delete require.cache[require.resolve('chart.js')];
        delete require.cache[require.resolve('chartjs-plugin-datalabels')];

        return chartJS;
    };

    private callback(ChartJS: any) {

        ChartJS.defaults.global.defaultFontFamily = 'Helvetica';
        ChartJS.plugins.register(freshRequire('chartjs-plugin-annotation', require));

        if (this.config && NiftyUtils.isColor(this.config.backgroundColor)) {

            ChartJS.plugins.register({
                beforeDraw: (chart, options) => {
                    const ctx = chart.ctx;
                    ctx.fillStyle = NiftyUtils.getColor(this.config.backgroundColor);
                    ctx.fillRect(0, 0, this.config.width, this.config.height);
                }
            });

        }

    }

    private async renderToBuffer(): Promise<Buffer> {

        return await this.renderService.renderToBuffer(this.config.config);
    }

    public async renderImage(req: express.Request, res: express.Response, fromBodyConfig: any) {

        if (req.query['debug'] === 'true') {

            res.contentType('text');

            var result: Array<string> = [
                '\r\nFROM BODY: \r\n-----------------------------------------\r\n',
                JSON.stringify(fromBodyConfig, null, ' '),
                '\r\n\r\nMERGED: \r\n-----------------------------------------\r\n',
                JSON.stringify(this.config.config, null, ' ')
            ];

            res.send(result.join(''));

            return;
        }

        const image = await this.renderToBuffer();

        res.contentType('image/png');
        res.send(image);

    }

}

