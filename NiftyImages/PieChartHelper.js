"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const charthelper_1 = require("./charthelper");
const RequestDefaults_1 = require("./RequestDefaults");
var NiftyPieChartHelper;
(function (NiftyPieChartHelper) {
    function getPieConfig(options) {
        var settings = common_1.NiftyUtils.merge(RequestDefaults_1.RequestDefaults.pieNiftyDefaults, options);
        var config = charthelper_1.NiftyChartHelper.getDefaultConfig('pie', settings);
        // If there is transparency, we don't set the borderColor
        if (common_1.NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1) {
            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;
        }
        else if (common_1.NiftyUtils.isColor(settings.sliceColor)) {
            config.data.datasets[0].borderColor = common_1.NiftyUtils.getColor(settings.sliceColor);
            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;
        }
        return {
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };
    }
    NiftyPieChartHelper.getPieConfig = getPieConfig;
    function getDoughnutConfig(options) {
        var settings = common_1.NiftyUtils.merge(RequestDefaults_1.RequestDefaults.pieNiftyDefaults, options);
        var config = charthelper_1.NiftyChartHelper.getDefaultConfig('doughnut', settings);
        config.type = 'doughnut';
        // If there is transparency, we don't set the borderColor
        if (common_1.NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1) {
            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;
        }
        else if (common_1.NiftyUtils.isColor(settings.sliceColor)) {
            config.data.datasets[0].borderColor = common_1.NiftyUtils.getColor(settings.sliceColor);
            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;
        }
        if (common_1.NiftyUtils.isNumber(options.cutoutPercentage)) {
            config.options.cutoutPercentage = Math.min(options.cutoutPercentage, 90);
        }
        else {
            config.options.cutoutPercentage = 50;
        }
        return {
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };
    }
    NiftyPieChartHelper.getDoughnutConfig = getDoughnutConfig;
})(NiftyPieChartHelper = exports.NiftyPieChartHelper || (exports.NiftyPieChartHelper = {}));
//# sourceMappingURL=PieChartHelper.js.map