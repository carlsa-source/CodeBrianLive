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
 * GET Doughnut Chart
 */
const express = require("express");
const RadialGaugeHelper_1 = require("../NiftyImages/RadialGaugeHelper");
const ChartRenderer_1 = require("../NiftyImages/ChartRenderer");
const router = express.Router();
router.get('/', (req, res) => {
    var fromBody = {
        width: 450,
        height: 450,
        backgroundColor: '#fff',
        value: 20,
        color: '#ec2575',
        max: 50,
        min: 0,
        cutoutPercentage: 80,
        padding: 0,
        rotation: 'bottom',
        roundedCorners: true,
        trackColor: '#f0f4f5',
        centerArea: {
            display: false,
            backgroundColor: '',
            fontColor: '#666',
            padding: 0,
            text: '',
            prefix: '',
            suffix: '',
            fontSize: null,
            labelType: 'percentage',
            precision: 0
        }
    };
    fromBody = {};
    var config = RadialGaugeHelper_1.RadialGaugeHelper.getRadialGauge(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
router.post('/', (req, res) => {
    var fromBody = req.body;
    var config = RadialGaugeHelper_1.RadialGaugeHelper.getRadialGauge(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
exports.default = router;
//# sourceMappingURL=radialGauge.js.map