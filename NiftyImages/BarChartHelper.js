"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const charthelper_1 = require("./charthelper");
const ChartConfigDefaults_1 = require("./ChartConfigDefaults");
const RequestDefaults_1 = require("./RequestDefaults");
var NiftyBarChartHelper;
(function (NiftyBarChartHelper) {
    function mergeConfig(settings, config) {
        // No legend for bar graphs
        config.options.legend.display = false;
        // -----------------------------------------------
        // X-Axis Ticks
        config.options.scales.xAxes[0] = charthelper_1.NiftyChartHelper.configureAxis(config.options.scales.xAxes[0], settings.seriesAxis);
        //if (settings.seriesAxis) {
        //    config.options.scales.xAxes[0].gridLines.display = settings.seriesAxis.showLines === true;
        //    if (settings.seriesAxis.display === true) {
        //        config.options.scales.xAxes[0].display = true;
        //        config.options.scales.xAxes[0].ticks.display = true;
        //        config.options.scales.xAxes[0].ticks.fontSize = settings.seriesAxis.fontSize || 12;
        //        if (NiftyUtils.isNumber(settings.seriesAxis.maxTicksLimit)) {
        //            config.options.scales.xAxes[0].ticks.maxTicksLimit = settings.seriesAxis.maxTicksLimit;
        //        }
        //        if (!NiftyUtils.isBlank(settings.seriesAxis.fontFamily)) {
        //            config.options.scales.xAxes[0].ticks.fontFamily = settings.seriesAxis.fontFamily;
        //        }
        //        if (NiftyUtils.isColor(settings.seriesAxis.fontColor)) {
        //            config.options.scales.xAxes[0].ticks.fontColor = NiftyUtils.getColor(settings.seriesAxis.fontColor);
        //        }
        //        if (settings.seriesAxis.labelType === 'number') {
        //            settings.seriesAxis.prefix = settings.seriesAxis.prefix || '';
        //            settings.seriesAxis.suffix = settings.seriesAxis.suffix || '';
        //            config.options.scales.xAxes[0].ticks.callback = (value, index, values): string => {
        //                var formatter = new Intl.NumberFormat(settings.dataLabels.locale);
        //                var res = formatter.format(value);
        //                return settings.seriesAxis.prefix + res + settings.seriesAxis.suffix;
        //            }
        //        }
        //    } else {
        //        config.options.scales.xAxes[0].display = false;
        //    }
        //}
        // -----------------------------------------------
        // Y-Axis Ticks
        // config.options.scales.yAxes[0].gridLines.display = settings.valueAxis.showLines === true;
        config.options.scales.yAxes[0] = charthelper_1.NiftyChartHelper.configureAxis(config.options.scales.yAxes[0], settings.valueAxis);
        //if (settings.valueAxis) {
        //    // Grid Lines
        //    config.options.scales.yAxes[0].gridLines.display = settings.valueAxis.showLines === true;
        //    if (settings.valueAxis.display === true) {
        //        config.options.scales.yAxes[0].display = true;
        //        config.options.scales.yAxes[0].ticks.display = true;
        //        config.options.scales.yAxes[0].ticks.fontSize = settings.valueAxis.fontSize || 12;
        //        if (NiftyUtils.isNumber(settings.valueAxis.maxTicksLimit)) {
        //            config.options.scales.yAxes[0].ticks.maxTicksLimit = settings.valueAxis.maxTicksLimit;
        //        }
        //        if (!NiftyUtils.isBlank(settings.valueAxis.fontFamily)) {
        //            config.options.scales.yAxes[0].ticks.fontFamily = settings.valueAxis.fontFamily;
        //        }
        //        if (NiftyUtils.isColor(settings.valueAxis.fontColor)) {
        //            config.options.scales.yAxes[0].ticks.fontColor = NiftyUtils.getColor(settings.valueAxis.fontColor);
        //        }
        //        if (settings.valueAxis.labelType === 'number') {
        //            settings.valueAxis.prefix = settings.valueAxis.prefix || '';
        //            settings.valueAxis.suffix = settings.valueAxis.suffix || '';
        //            config.options.scales.yAxes[0].ticks.callback = (value, index, values): string => {
        //                var formatter = new Intl.NumberFormat(settings.dataLabels.locale);
        //                var res = formatter.format(value);
        //                return settings.valueAxis.prefix + res + settings.valueAxis.suffix;
        //            }
        //        }
        //    } else {
        //        config.options.scales.yAxes[0].display = false;
        //    }
        //}
        // Bar thinkness
        if (common_1.NiftyUtils.isNumber(settings.barThickness) && settings.barThickness > 0) {
            config.data.datasets[0].barThickness = settings.barThickness;
        }
        return config;
    }
    function getBarConfig(options) {
        var settings = common_1.NiftyUtils.merge(RequestDefaults_1.RequestDefaults.barChart, options);
        settings.legend.display = false;
        var config = charthelper_1.NiftyChartHelper.getDefaultConfig('bar', settings, ChartConfigDefaults_1.ChartConfigDefaults.barConfig);
        config = mergeConfig(settings, config);
        return {
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };
    }
    NiftyBarChartHelper.getBarConfig = getBarConfig;
    function getHorizontalBarConfig(options) {
        var settings = common_1.NiftyUtils.merge(RequestDefaults_1.RequestDefaults.horizontalBarChart, options);
        settings.legend.display = false;
        // We need to change the Axis specs because the X and Y are flipped when it's horizontal.
        var oldValueAxis = common_1.NiftyUtils.deepCopy(settings.valueAxis);
        settings.valueAxis = common_1.NiftyUtils.deepCopy(settings.seriesAxis);
        settings.seriesAxis = common_1.NiftyUtils.deepCopy(oldValueAxis);
        var config = charthelper_1.NiftyChartHelper.getDefaultConfig('horizontalBar', settings, ChartConfigDefaults_1.ChartConfigDefaults.barConfig);
        config = mergeConfig(settings, config);
        if (settings.seriesAxis.showLines === false) {
            config.options.scales.yAxes[0].gridLines.zeroLineWidth = 0;
        }
        return {
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };
    }
    NiftyBarChartHelper.getHorizontalBarConfig = getHorizontalBarConfig;
})(NiftyBarChartHelper = exports.NiftyBarChartHelper || (exports.NiftyBarChartHelper = {}));
//# sourceMappingURL=BarChartHelper.js.map