"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = require('chartjs-color');
const common_1 = require("./common");
const ChartConfigDefaults_1 = require("./ChartConfigDefaults");
const RequestDefaults_1 = require("./RequestDefaults");
var NiftyChartHelper;
(function (NiftyChartHelper) {
    function getDefaultConfig(chartType, options, defaultConfigToUse) {
        if (!defaultConfigToUse) {
            defaultConfigToUse = ChartConfigDefaults_1.ChartConfigDefaults.genericConfig;
        }
        var config = common_1.NiftyUtils.deepCopy(defaultConfigToUse);
        var settings = common_1.NiftyUtils.merge(RequestDefaults_1.RequestDefaults.genericChart, options);
        config.type = chartType;
        config.options.plugins.backgroundColor = settings.backgroundColor;
        // Image Padding
        if (common_1.NiftyUtils.isNumber(settings.padding)) {
            config.options.layout.padding = settings.padding;
        }
        // Data Values
        if (settings.data) {
            config.data.datasets[0].data = settings.data;
        }
        // Colors
        if (settings.colors) {
            config.data.datasets[0].backgroundColor = settings.colors;
        }
        // Transparency for Bars/Slices
        if (settings.colors && common_1.NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1) {
            var backgroundColors = [];
            for (var i = 0; i < settings.colors.length; i++) {
                var c = common_1.NiftyUtils.getColor(settings.colors[i], settings.colors[i]);
                var clr = Color(c);
                if (clr.isValid()) {
                    backgroundColors.push(clr.alpha(settings.transparency).rgbString());
                }
                else {
                    backgroundColors.push(c);
                }
            }
            config.data.datasets[0].borderColor = settings.colors;
            config.data.datasets[0].backgroundColor = backgroundColors;
        }
        // Labels
        if (settings.labels) {
            config.data.labels = settings.labels;
        }
        // Legend
        if (settings.legend) {
            if (settings.legend.display === true) {
                config.options.legend.display = true;
                config.options.legend.align = settings.legend.align;
                config.options.legend.labels.fontColor = common_1.NiftyUtils.getColor(settings.legend.fontColor, config.options.legend.labels.fontColor + '');
                config.options.legend.labels.fontSize = settings.legend.fontSize;
                if (!common_1.NiftyUtils.isBlank(settings.legend.fontFamily)) {
                    config.options.legend.labels.fontFamily = settings.legend.fontFamily;
                }
            }
            else {
                config.options.legend.display = false;
            }
        }
        // Data Labels and Annotations
        if (settings.dataLabels) {
            if (settings.dataLabels.display === true) {
                config.options.plugins.datalabels.display = true;
                config.options.plugins.datalabels.color = common_1.NiftyUtils.getColor(settings.dataLabels.color, config.options.plugins.datalabels.color);
                if (!common_1.NiftyUtils.isBlank(settings.dataLabels.fontFamily)) {
                    config.options.plugins.datalabels.font.family = settings.dataLabels.fontFamily;
                }
                if (common_1.NiftyUtils.isNumber(settings.dataLabels.fontSize)) {
                    config.options.plugins.datalabels.font.size = settings.dataLabels.fontSize;
                }
                if (settings.dataLabels.placement === 'middle') {
                    config.options.plugins.datalabels.anchor = 'center';
                    config.options.plugins.datalabels.align = 'center';
                }
                else if (settings.dataLabels.placement === 'top') {
                    config.options.plugins.datalabels.anchor = 'end';
                    config.options.plugins.datalabels.align = 'start';
                }
                else if (settings.dataLabels.placement === 'bottom' && config.type !== 'pie') {
                    config.options.plugins.datalabels.anchor = 'start';
                    config.options.plugins.datalabels.align = 'end';
                }
                else if (settings.dataLabels.placement === 'outside') {
                    config.options.plugins.datalabels.anchor = 'end';
                    config.options.plugins.datalabels.align = 'end';
                }
                settings.dataLabels.prefix = settings.dataLabels.prefix || '';
                settings.dataLabels.suffix = settings.dataLabels.suffix || '';
                settings.dataLabels.precision = settings.dataLabels.precision || 0;
                if (settings.dataLabels.labelType === 'value') {
                    config.options.plugins.datalabels.formatter = (value) => {
                        return settings.dataLabels.prefix + value + settings.dataLabels.suffix;
                    };
                }
                else if (settings.dataLabels.labelType === 'percentage') {
                    config.options.plugins.datalabels.formatter = (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(settings.dataLabels.precision) + "%";
                        return percentage;
                    };
                }
                else if (settings.dataLabels.labelType === 'number') {
                    config.options.plugins.datalabels.formatter = (value) => {
                        var formatter = new Intl.NumberFormat(settings.dataLabels.locale);
                        return settings.dataLabels.prefix + formatter.format(value) + settings.dataLabels.suffix;
                    };
                }
                else if (settings.dataLabels.labelType === 'category') {
                    config.options.plugins.datalabels.formatter = (value, ctx) => {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    };
                }
            }
            else {
                config.options.plugins.datalabels.display = false;
            }
        }
        else {
            config.options.plugins.datalabels.display = false;
        }
        return config;
    }
    NiftyChartHelper.getDefaultConfig = getDefaultConfig;
    function configureAxis(axis, config) {
        if (!config || config.display === false) {
            axis.display = false;
            axis.gridLines.lineWidth = 0;
            return axis;
        }
        axis.display = true;
        axis.ticks.display = true;
        axis.ticks.fontSize = config.fontSize || 12;
        axis.gridLines.zeroLineColor = '#e6e6e6';
        axis.gridLines.zeroLineWidth = 1;
        if (common_1.NiftyUtils.isNumber(config.maxTicksLimit)) {
            axis.ticks.maxTicksLimit = config.maxTicksLimit;
        }
        if (!common_1.NiftyUtils.isBlank(config.fontFamily)) {
            axis.ticks.fontFamily = config.fontFamily;
        }
        if (common_1.NiftyUtils.isColor(config.fontColor)) {
            axis.ticks.fontColor = common_1.NiftyUtils.getColor(config.fontColor);
        }
        if (config.showLines !== true) {
            axis.gridLines.lineWidth = 0;
            axis.gridLines.zeroLineWidth = 1;
        }
        if (config.hideAxisLine === true) {
            axis.gridLines.zeroLineColor = 'transparent';
            axis.gridLines.zeroLineWidth = 0;
        }
        var thisConfig = config;
        thisConfig.prefix = thisConfig.prefix || '';
        thisConfig.suffix = thisConfig.suffix || '';
        if (thisConfig.labelType === 'number') {
            axis.ticks.callback = (value, index, values) => {
                var formatter = new Intl.NumberFormat(config.locale);
                return thisConfig.prefix + formatter.format(value) + thisConfig.suffix;
            };
        }
        else if (thisConfig.labelType === 'value') {
            axis.ticks.callback = (value, index, values) => {
                return thisConfig.prefix + value + thisConfig.suffix;
            };
        }
        return axis;
    }
    NiftyChartHelper.configureAxis = configureAxis;
})(NiftyChartHelper = exports.NiftyChartHelper || (exports.NiftyChartHelper = {}));
//# sourceMappingURL=charthelper.js.map