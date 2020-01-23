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
const ProgressBarHelper_1 = require("../NiftyImages/ProgressBarHelper");
const router = express.Router();
router.get('/', (req, res) => {
    var fromBody = {
        width: 800,
        height: 200,
        backgroundColor: '#fff',
        value: 3500,
        // color: '#ec2575',
        color: '#ec2575',
        trackColor: '#666',
        transparency: .7,
        max: 5000,
        min: 0,
        padding: 20,
        valueLabel: {
            fontSize: 22,
            labelType: 'number',
            color: '#fff',
            display: true,
            prefix: '$'
        },
        toGoLabel: {
            display: true,
            color: '#fff',
            labelType: 'number'
        },
        valueAxies: {
            display: true,
            maxTicksLimit: 2,
            labelType: 'percentage'
        }
    };
    fromBody = {};
    var config = ProgressBarHelper_1.NiftyProgressBarHelper.getProgressBarConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
router.post('/', (req, res) => {
    var fromBody = req.body;
    var config = ProgressBarHelper_1.NiftyProgressBarHelper.getProgressBarConfig(fromBody);
    var renderer = new ChartRenderer_1.ChartRenderer(config);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield renderer.renderImage(req, res, fromBody);
    }))();
});
exports.default = router;
//# sourceMappingURL=progressBar.js.map