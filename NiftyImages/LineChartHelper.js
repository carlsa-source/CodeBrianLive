"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = require('chartjs-color');
const common_1 = require("./common");
const charthelper_1 = require("./charthelper");
const ChartConfigDefaults_1 = require("./ChartConfigDefaults");
const RequestDefaults_1 = require("./RequestDefaults");
var LineChartHelper;
(function (LineChartHelper) {
    function mergeConfig(settings, config) {
        // No legend for bar graphs
        config.options.legend.display = false;
        // -----------------------------------------------
        // X-Axis Ticks
        if (settings.seriesAxis) {
            config.options.scales.xAxes[0].gridLines.display = settings.seriesAxis.showLines === true;
            if (settings.seriesAxis.display === true) {
                config.options.scales.xAxes[0].display = true;
                config.options.scales.xAxes[0].ticks.display = true;
                config.options.scales.xAxes[0].ticks.fontSize = settings.seriesAxis.fontSize || 12;
                if (common_1.NiftyUtils.isNumber(settings.seriesAxis.maxTicksLimit)) {
                    config.options.scales.xAxes[0].ticks.maxTicksLimit = settings.seriesAxis.maxTicksLimit;
                }
                if (!common_1.NiftyUtils.isBlank(settings.seriesAxis.fontFamily)) {
                    config.options.scales.xAxes[0].ticks.fontFamily = settings.seriesAxis.fontFamily;
                }
                if (common_1.NiftyUtils.isColor(settings.seriesAxis.fontColor)) {
                    config.options.scales.xAxes[0].ticks.fontColor = common_1.NiftyUtils.getColor(settings.seriesAxis.fontColor);
                }
                if (settings.seriesAxis.labelType === 'number') {
                    settings.seriesAxis.prefix = settings.seriesAxis.prefix || '';
                    settings.seriesAxis.suffix = settings.seriesAxis.suffix || '';
                    config.options.scales.xAxes[0].ticks.callback = (value, index, values) => {
                        var formatter = new Intl.NumberFormat(settings.dataLabels.locale);
                        var res = formatter.format(value);
                        return settings.seriesAxis.prefix + res + settings.seriesAxis.suffix;
                    };
                }
            }
            else {
                config.options.scales.xAxes[0].display = false;
            }
        }
        // -----------------------------------------------
        // Y-Axis Ticks
        if (settings.valueAxis) {
            // Grid Lines
            config.options.scales.yAxes[0].gridLines.display = settings.valueAxis.showLines === true;
            if (settings.valueAxis.display === true) {
                config.options.scales.yAxes[0].display = true;
                config.options.scales.yAxes[0].ticks.display = true;
                config.options.scales.yAxes[0].ticks.fontSize = settings.valueAxis.fontSize || 12;
                if (common_1.NiftyUtils.isNumber(settings.valueAxis.maxTicksLimit)) {
                    config.options.scales.yAxes[0].ticks.maxTicksLimit = settings.valueAxis.maxTicksLimit;
                }
                if (!common_1.NiftyUtils.isBlank(settings.valueAxis.fontFamily)) {
                    config.options.scales.yAxes[0].ticks.fontFamily = settings.valueAxis.fontFamily;
                }
                if (common_1.NiftyUtils.isColor(settings.valueAxis.fontColor)) {
                    config.options.scales.yAxes[0].ticks.fontColor = common_1.NiftyUtils.getColor(settings.valueAxis.fontColor);
                }
                if (settings.valueAxis.labelType === 'number') {
                    settings.valueAxis.prefix = settings.valueAxis.prefix || '';
                    settings.valueAxis.suffix = settings.valueAxis.suffix || '';
                    config.options.scales.yAxes[0].ticks.callback = (value, index, values) => {
                        var formatter = new Intl.NumberFormat(settings.dataLabels.locale);
                        var res = formatter.format(value);
                        return settings.valueAxis.prefix + res + settings.valueAxis.suffix;
                    };
                }
            }
            else {
                config.options.scales.yAxes[0].display = false;
            }
        }
        return config;
    }
    function getLineConfig(options) {
        var settings = common_1.NiftyUtils.merge(RequestDefaults_1.RequestDefaults.lineChart, options);
        var config = ChartConfigDefaults_1.ChartConfigDefaults.lineConfig;
        config.options.plugins.backgroundColor = settings.backgroundColor;
        // Image Padding
        if (common_1.NiftyUtils.isNumber(settings.padding)) {
            config.options.layout.padding = settings.padding;
        }
        config.data.datasets = [];
        // -------------------------------------------------------
        // Labels
        if (settings.labels)
            config.data.labels = settings.labels;
        // -------------------------------------------------------
        // Lines
        if (settings.line)
            config.data.datasets.push(getDataSet(settings.line, settings));
        if (settings.line2)
            config.data.datasets.push(getDataSet(settings.line2, settings));
        if (settings.line3)
            config.data.datasets.push(getDataSet(settings.line3, settings));
        // -------------------------------------------------------
        // Legend
        if (!settings.legend || settings.legend.display !== true)
            config.options.legend.display = false;
        else {
            config.options.legend.display = true;
            config.options.legend.position = settings.legend.position || 'bottom';
            config.options.legend.labels = {
                fontColor: common_1.NiftyUtils.getColor(settings.legend.fontColor, '#666'),
                fontSize: settings.legend.fontSize
            };
            if (!common_1.NiftyUtils.isBlank(settings.legend.fontFamily)) {
                config.options.legend.labels.fontFamily = settings.legend.fontFamily;
            }
        }
        // -----------------------------------------------
        // X-Axis Ticks
        if (settings.seriesAxis)
            settings.seriesAxis.labelType = 'value';
        config.options.scales.xAxes[0] = charthelper_1.NiftyChartHelper.configureAxis(config.options.scales.xAxes[0], settings.seriesAxis);
        // -----------------------------------------------
        // Y-Axis Ticks
        config.options.scales.yAxes[0] = charthelper_1.NiftyChartHelper.configureAxis(config.options.scales.yAxes[0], settings.valueAxis);
        if (settings.beginAtZero === false) {
            config.options.scales.yAxes[0].ticks.beginAtZero = false;
        }
        // -----------------------------------------------
        // Data Labels
        config.options.plugins.datalabels.display = true;
        config.options.plugins.datalabels.color = '#000';
        config.options.plugins.datalabels.display = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            return (lbl && lbl.display === true);
        };
        // Align
        config.options.plugins.datalabels.align = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl) {
                if (lbl.placement === 'top')
                    return 'end';
                if (lbl.placement === 'bottom')
                    return 'start';
                return 'center';
            }
        };
        // Anchor
        config.options.plugins.datalabels.anchor = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl) {
                if (lbl.placement === 'top')
                    return 'end';
                if (lbl.placement === 'bottom')
                    return 'start';
                return 'center';
            }
        };
        // Color
        config.options.plugins.datalabels.color = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl && common_1.NiftyUtils.isColor(lbl.color))
                return lbl.color;
            return '#333';
        };
        // Background Color
        config.options.plugins.datalabels.backgroundColor = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl && common_1.NiftyUtils.isColor(lbl.backgroundColor))
                return lbl.backgroundColor;
        };
        // Border Radius
        config.options.plugins.datalabels.borderRadius = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl && common_1.NiftyUtils.isNumber(lbl.borderRadius))
                return lbl.borderRadius;
            return 4;
        };
        // Padding
        config.options.plugins.datalabels.padding = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl && common_1.NiftyUtils.isNumber(lbl.padding))
                return lbl.padding;
            return null;
        };
        // Border Color
        config.options.plugins.datalabels.borderColor = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl && common_1.NiftyUtils.isColor(lbl.borderColor))
                return lbl.borderColor;
        };
        // Border Width
        config.options.plugins.datalabels.borderWidth = (ctx) => {
            var lbl = getLineLabel(ctx, settings);
            if (lbl && common_1.NiftyUtils.isNumber(lbl.borderWidth))
                return lbl.borderWidth;
            return null;
        };
        return {
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };
    }
    LineChartHelper.getLineConfig = getLineConfig;
    function getLineLabel(ctx, settings) {
        var lbl = null;
        if (ctx.datasetIndex === 0)
            lbl = settings.line.dataLabel;
        else if (ctx.datasetIndex === 1)
            lbl = settings.line2.dataLabel;
        else if (ctx.datasetIndex === 2)
            lbl = settings.line3.dataLabel;
        if (lbl == undefined || lbl === null)
            return null;
        return lbl;
    }
    function getDataSet(line, settings) {
        var ds = {
            label: line.label,
            data: line.data,
            borderColor: line.color,
            borderWidth: 1,
            fill: false,
            backgroundColor: line.color,
            pointRadius: 3,
            pointBorderColor: line.color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1
        };
        if (!common_1.NiftyUtils.isColor(line.color))
            line.color = '#999';
        if (common_1.NiftyUtils.isNumber(line.width)) {
            ds.borderWidth = line.width;
            ds.pointBorderWidth = line.width;
        }
        if (line.straight === true)
            ds.lineTension = 0;
        if (line.fill === true) {
            ds.fill = true;
            // Use the line color if there is no fillColor
            if (!common_1.NiftyUtils.isColor(line.fillColor))
                line.fillColor = line.color;
            if (common_1.NiftyUtils.isColor(line.fillColor)) {
                ds.backgroundColor = line.fillColor;
                if (common_1.NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1)
                    ds.backgroundColor = Color(line.fillColor).alpha(settings.transparency).rgbString();
            }
        }
        if (line.point && line.point.display === true) {
            var point = line.point;
            if (common_1.NiftyUtils.isNumber(point.radius))
                ds.pointRadius = point.radius;
            if (common_1.NiftyUtils.isColor(point.borderColor))
                ds.pointBorderColor = point.borderColor;
            if (common_1.NiftyUtils.isColor(point.backgroundColor))
                ds.pointBackgroundColor = point.backgroundColor;
            if (common_1.NiftyUtils.isNumber(point.borderWidth))
                ds.pointBorderWidth = point.borderWidth;
        }
        else {
            ds.pointRadius = 0;
        }
        return ds;
    }
})(LineChartHelper = exports.LineChartHelper || (exports.LineChartHelper = {}));
//# sourceMappingURL=LineChartHelper.js.map