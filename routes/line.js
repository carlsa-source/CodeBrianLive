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
const ChartRenderer_1 = require("../NiftyImages/ChartRenderer");
const LineChartHelper_1 = require("../NiftyImages/LineChartHelper");
const router = express.Router();
const { CanvasRenderService } = require('chartjs-node-canvas');
router.get('/', (req, res) => {
    var fromBody = {
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
    var config = LineChartHelper_1.LineChartHelper.getLineConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
router.post('/', (req, res) => {
    var fromBody = req.body;
    var config = LineChartHelper_1.LineChartHelper.getLineConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
exports.default = router;
//# sourceMappingURL=line.js.map