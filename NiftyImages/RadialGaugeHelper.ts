
import { NiftyUtils } from "./common";
import { ChartConfigDefaults } from "./ChartConfigDefaults";
import { RequestDefaults } from "./RequestDefaults";

export namespace RadialGaugeHelper {

    export function getRadialGauge(options?: NiftyChartTypes.RoundProgressChartType): NiftyChartTypes.NiftyChart {

        var settings = NiftyUtils.merge<NiftyChartTypes.RoundProgressChartType>(RequestDefaults.radialNiftyDefaults, options);
        var config = NiftyUtils.deepCopy<any>(ChartConfigDefaults.radialConfig);

        config.options.plugins = config.options.plugins || {};

        config.options.plugins.backgroundColor = settings.backgroundColor;

        // Domain/Range of possbile Values
        let min = settings.min || 0,
            max = settings.max || 100;

        config.options.domain = [min, max];

        settings.value = settings.value || min;

        if (settings.value <= min)
            settings.value = min;

        // Image Padding
        if (NiftyUtils.isNumber(settings.padding)) {
            config.options.layout.padding = settings.padding;
        }

        if (NiftyUtils.isNumber(settings.value)) {
            config.data.datasets[0].data = [settings.value];
        }

        // Color
        if (NiftyUtils.isColor(settings.color)) {
            config.data.datasets[0].backgroundColor = NiftyUtils.getColor(settings.color);
        }

        // Cutout
        if (NiftyUtils.isNumber(settings.cutoutPercentage)) {
            config.options.centerPercentage = settings.cutoutPercentage;
        }

        if (settings.rotation == 'top') {
            config.options.rotation = 1 * (-0.5 * Math.PI);
        } else if (settings.rotation == 'left') {
            config.options.rotation = 2 * (-0.5 * Math.PI);
        } else if (settings.rotation == 'bottom') {
            config.options.rotation = 3 * (-0.5 * Math.PI);
        } else if (settings.rotation == 'right') {
            config.options.rotation = 4 * (-0.5 * Math.PI);
        }

        if (settings.roundedCorners === false) {
            config.options.roundedCorners = false;
        }

        if (NiftyUtils.isColor(settings.trackColor)) {
            config.options.trackColor = NiftyUtils.getColor(settings.trackColor);
        }

        if (settings.centerArea) {

            if (NiftyUtils.isColor(settings.centerArea.backgroundColor)) {
                config.options.centerArea.backgroundColor = NiftyUtils.getColor(settings.centerArea.backgroundColor);
            }

            if (settings.centerArea.display !== false) {

                config.options.centerArea.padding = settings.centerArea.padding || 0;
                config.options.centerArea.fontFamily = settings.centerArea.fontFamily;
                config.options.centerArea.fontSize = settings.centerArea.fontSize;

                if (NiftyUtils.isColor(settings.centerArea.fontColor)) {
                    config.options.centerArea.fontColor = NiftyUtils.getColor(settings.centerArea.fontColor);
                }

                if (!NiftyUtils.isBlank(settings.centerArea.text)) {

                    let txt = (settings.centerArea.prefix || '') + settings.centerArea.text + (settings.centerArea.suffix || '');
                    config.options.centerArea.text = txt;
                } else {

                    var val = settings.value + '';

                    if (settings.centerArea.labelType == 'percentage') {

                        var diff = settings.value;

                        if (settings.value >= min)
                            diff = settings.value - min;


                        if (diff === 0) {
                            val = '0%';
                        } else {

                            if (max > min) {
                                let sum = max - min;
                                let pre = settings.centerArea.precision || 0;
                                val = (diff * 100 / sum).toFixed(pre) + "%";
                            } else {
                                val = '100%';
                            }

                        }
                    }

                    config.options.centerArea.text = (settings.centerArea.prefix || '') + val + (settings.centerArea.suffix || '');

                }

            } else
                config.options.centerArea.displayText = false;
        }

        // We don't show labels on radial gauage
        config.options.plugins.datalabels = config.options.plugins.datalabels || {};
        config.options.plugins.datalabels.display = false;

        config.options.circumference = 1 * Math.PI;

        return <NiftyChartTypes.NiftyChart>{
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };

    }

}