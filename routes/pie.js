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
 * GET Pie Chart
 */
const express = require("express");
const PieChartHelper_1 = require("../NiftyImages/PieChartHelper");
const ChartRenderer_1 = require("../NiftyImages/ChartRenderer");
const router = express.Router();
router.get('/', (req, res) => {
    const freshRequire = require('fresh-require');
    var fromBody = {
        width: 500,
        height: 500,
        backgroundColor: '#fff',
        data: [500, 2500, 6001, 1000],
        labels: ['Pies', 'Cakes', 'Soda', 'Apples'],
        colors: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        transparency: 0.8,
        legend: {
            display: true,
            fontColor: '#000',
            align: 'center',
            fontSize: 14
        },
        dataLabels: {
            color: '#000',
            display: true,
            labelType: 'percentage',
            precision: 0,
            placement: 'middle'
        },
        padding: 20,
        sliceColor: '#fff',
        sliceWidth: 2
    };
    fromBody = {};
    var config = PieChartHelper_1.NiftyPieChartHelper.getPieConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
router.post('/', (req, res) => {
    var fromBody = req.body;
    var config = PieChartHelper_1.NiftyPieChartHelper.getPieConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
exports.default = router;
//# sourceMappingURL=pie.js.map