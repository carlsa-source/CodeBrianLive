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
 * GET Bar Chart
 */
const express = require("express");
const BarChartHelper_1 = require("../NiftyImages/BarChartHelper");
const ChartRenderer_1 = require("../NiftyImages/ChartRenderer");
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');
router.get('/', (req, res) => {
    const freshRequire = require('fresh-require');
    var fromBody = {
        width: 500,
        height: 500,
        backgroundColor: '#fff',
        data: [500, 2500, 6100, 1000],
        labels: ['Pies', 'Cakes', 'Soda', 'Apples'],
        colors: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        transparency: 0.5,
        dataLabels: {
            color: '#666',
            display: true,
            labelType: 'number',
            precision: 0,
            placement: 'outside',
            prefix: '$'
        },
        padding: 20,
        seriesAxis: {
            display: true,
            showLines: true
        },
        valueAxis: {
            display: true,
            labelType: 'number',
            prefix: '$',
            showLines: true
        }
    };
    var config = BarChartHelper_1.NiftyBarChartHelper.getBarConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
exports.default = router;
//# sourceMappingURL=test.js.map