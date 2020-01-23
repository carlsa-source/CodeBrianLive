var Color = require('chartjs-color');
import { NiftyUtils } from "./common";
import { ChartConfigDefaults } from "./ChartConfigDefaults";
import { RequestDefaults } from "./RequestDefaults";

export namespace NiftyProgressBarHelper {

    export function getProgressBarConfig(options?: NiftyChartTypes.LinearProgressChartType): NiftyChartTypes.NiftyChart {

        var settings = NiftyUtils.merge<NiftyChartTypes.LinearProgressChartType>(RequestDefaults.progressBarNiftyDefaults, options);
        var config = NiftyUtils.deepCopy<any>(ChartConfigDefaults.progressBarConfig);

        // Background Color
        config.options.plugins = config.options.plugins || {};
        config.options.plugins.backgroundColor = settings.backgroundColor;

        // Domain/Range of possbile Values
        let min = settings.min || 0,
            max = settings.max || 100;

        settings.value = settings.value || min;

        config.data.datasets[0].data = [settings.value]       // Highlighted Percentage
        config.data.datasets[1].data = [max - settings.value]; // 

        // Set up the axis
        config.options.scales.xAxes[0].ticks.min = min;
        config.options.scales.xAxes[0].ticks.max = max;

        // Colors
        config.data.datasets[0].backgroundColor = NiftyUtils.getColor(settings.color, '#ec2575');
        config.data.datasets[1].backgroundColor = NiftyUtils.getColor(settings.trackColor, '#eee');

        if (NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1) {

            let clr = Color(config.data.datasets[0].backgroundColor);
            config.data.datasets[0].borderColor = config.data.datasets[0].backgroundColor;
            config.data.datasets[0].backgroundColor = clr.alpha(settings.transparency).rgbString();

            clr = Color(config.data.datasets[1].backgroundColor);
            config.data.datasets[1].borderColor = config.data.datasets[1].backgroundColor;
            config.data.datasets[1].backgroundColor = clr.alpha(settings.transparency).rgbString();
            config.data.datasets[1].borderSkipped = 'left';

        }

        // Title
        config.options.title = {
            display: false
        };

        if (settings.title && settings.title.display === true) {
            config.options.title = {
                display: true,
                text: settings.title.text,
                fontFamily: settings.title.fontFamily,
                fontSize: settings.title.fontSize,
                position: settings.title.position,
                padding: settings.title.padding
            };
        }

        config.options.scales.xAxes[0].ticks.beginAtZero = true;
        // config.options.scales.xAxes[0].ticks.max = 100;
        // config.options.scales.xAxes[0].ticks.min = 0;

        // -----------------------------------------------
        // Image Padding
        if (NiftyUtils.isNumber(settings.padding)) {
            config.options.layout.padding = settings.padding;
        }

        // -----------------------------------------------
        // Data Labels

        let showLabel: boolean = (settings.valueLabel ? settings.valueLabel.display : false),
            showToGo: boolean = (settings.toGoLabel ? settings.toGoLabel.display : false);

        let sum = 0;
        config.data.datasets.map(src => {
            let d = src.data;
            d.map(data => {
                sum += data;
            });
        });

        if (showLabel || showToGo) {

            config.options.plugins.datalabels.display = function (context) {

                if (context.datasetIndex === 0)
                    return showLabel;


                if (context.datasetIndex === 1)
                    return showToGo;

                return false;

            };

            config.options.plugins.datalabels.color = function (context) {

                if (context.datasetIndex === 0 && showLabel)
                    return NiftyUtils.getColor(settings.valueLabel.color, '#000');

                if (context.datasetIndex === 1 && showToGo)
                    return NiftyUtils.getColor(settings.toGoLabel.color, '#000');

                return '#000';

            };

            if (showLabel) {

                if (!NiftyUtils.isBlank(settings.valueLabel.fontFamily))
                    config.options.plugins.datalabels.font.family = settings.valueLabel.fontFamily;

                if (NiftyUtils.isNumber(settings.valueLabel.fontSize))
                    config.options.plugins.datalabels.font.size = settings.valueLabel.fontSize;

                settings.valueLabel.prefix = settings.valueLabel.prefix || '';
                settings.valueLabel.suffix = settings.valueLabel.suffix || '';
                settings.valueLabel.precision = settings.valueLabel.precision || 0;

            }

            if (showToGo) {

                if (!NiftyUtils.isBlank(settings.toGoLabel.fontFamily))
                    config.options.plugins.datalabels.font.family = settings.toGoLabel.fontFamily;

                if (NiftyUtils.isNumber(settings.toGoLabel.fontSize))
                    config.options.plugins.datalabels.font.size = settings.toGoLabel.fontSize;

                settings.toGoLabel.prefix = settings.toGoLabel.prefix || '';
                settings.toGoLabel.suffix = settings.toGoLabel.suffix || '';
                settings.toGoLabel.precision = settings.toGoLabel.precision || 0;

            }

            // Apply formating
            config.options.plugins.datalabels.formatter = (val, context) => {

                if (context.datasetIndex === 0 && showLabel) {

                    if (settings.valueLabel.labelType === 'value')
                        return settings.valueLabel.prefix + settings.value + settings.valueLabel.suffix;
                    else if (settings.valueLabel.labelType === 'percentage') {
                        let percentage = (val * 100 / sum).toFixed(settings.valueLabel.precision) + "%";
                        return settings.valueLabel.prefix + percentage + settings.valueLabel.suffix;
                    }
                    else if (settings.valueLabel.labelType === 'number') {
                        var formatter = new Intl.NumberFormat(settings.valueLabel.locale);
                        return settings.valueLabel.prefix + formatter.format(val) + settings.valueLabel.suffix;
                    }
                }


                if (context.datasetIndex === 1 && showToGo) {

                    if (settings.toGoLabel.labelType === 'value')
                        return settings.toGoLabel.prefix + val + settings.toGoLabel.suffix;
                    else if (settings.toGoLabel.labelType === 'percentage') {
                        let percentage = (val * 100 / sum).toFixed(settings.toGoLabel.precision) + "%";
                        return settings.toGoLabel.prefix + percentage + settings.toGoLabel.suffix;
                    }
                    else if (settings.toGoLabel.labelType === 'number') {
                        var formatter = new Intl.NumberFormat(settings.toGoLabel.locale);
                        return settings.toGoLabel.prefix + formatter.format(val) + settings.toGoLabel.suffix;
                    }

                }

                return val;

            };

        }

        // -----------------------------------------------
        // X-Axis Ticks
        if (settings.valueAxies) {

            config.options.scales.xAxes[0].gridLines.display = settings.valueAxies.showLines === true;

            if (settings.valueAxies.display === true) {
                config.options.scales.xAxes[0].display = true;
                config.options.scales.xAxes[0].ticks.display = true;
                config.options.scales.xAxes[0].ticks.fontSize = settings.valueAxies.fontSize || 12;

                if (NiftyUtils.isNumber(settings.valueAxies.maxTicksLimit)) {
                    config.options.scales.xAxes[0].ticks.maxTicksLimit = settings.valueAxies.maxTicksLimit;
                }

                if (!NiftyUtils.isBlank(settings.valueAxies.fontFamily)) {
                    config.options.scales.xAxes[0].ticks.fontFamily = settings.valueAxies.fontFamily;
                }

                if (NiftyUtils.isColor(settings.valueAxies.fontColor)) {
                    config.options.scales.xAxes[0].ticks.fontColor = NiftyUtils.getColor(settings.valueAxies.fontColor);
                }

                settings.valueAxies.prefix = settings.valueAxies.prefix || '';
                settings.valueAxies.suffix = settings.valueAxies.suffix || '';

                if (settings.valueAxies.labelType === 'number') {

                    config.options.scales.xAxes[0].ticks.callback = (value, index, values): string => {

                        var formatter = new Intl.NumberFormat(settings.valueAxies.locale);
                        return settings.valueAxies.prefix + formatter.format(value) + settings.valueAxies.suffix;

                    }

                } else if (settings.valueAxies.labelType === 'value') {

                    config.options.scales.xAxes[0].ticks.callback = (value, index, values): string => {

                        return settings.valueAxies.prefix + value + settings.valueAxies.suffix;

                    }

                } else if (settings.valueAxies.labelType === 'percentage') {

                    config.options.scales.xAxes[0].ticks.callback = (value, index, values): string => {

                        var per = '0';
                        if (value > 0 && max > 0) {
                            if (value > max)
                                per = '100';
                            else
                                per = (value * 100 / max).toFixed(settings.valueLabel.precision);
                        }

                        return settings.valueAxies.prefix + per + '%' + settings.valueAxies.suffix;

                    }

                }

            } else {
                config.options.scales.xAxes[0].display = false;
            }

        }

        return <NiftyChartTypes.NiftyChart>{
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };
    }
}