
import { NiftyUtils } from "./common";
import { NiftyChartHelper } from "./charthelper";
import { ChartConfiguration } from "chart.js";
import { ChartConfigDefaults } from "./ChartConfigDefaults";
import { RequestDefaults } from "./RequestDefaults";

export namespace NiftyBarChartHelper {

    function mergeConfig(settings: NiftyChartTypes.BarChartType, config: ChartConfiguration) {

        // No legend for bar graphs
        config.options.legend.display = false;

        // -----------------------------------------------
        // X-Axis Ticks
        config.options.scales.xAxes[0] = NiftyChartHelper.configureAxis(config.options.scales.xAxes[0], settings.seriesAxis);

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
        config.options.scales.yAxes[0] = NiftyChartHelper.configureAxis(config.options.scales.yAxes[0], settings.valueAxis);

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
        if (NiftyUtils.isNumber(settings.barThickness) && settings.barThickness > 0) {
            config.data.datasets[0].barThickness = settings.barThickness;
        }

        return config;
    }

    export function getBarConfig(options?: NiftyChartTypes.BarChartType): NiftyChartTypes.NiftyChart {

        var settings = NiftyUtils.merge<NiftyChartTypes.BarChartType>(RequestDefaults.barChart, options);

        settings.legend.display = false;

        var config: Chart.ChartConfiguration = NiftyChartHelper.getDefaultConfig('bar', settings, ChartConfigDefaults.barConfig);

        config = mergeConfig(settings, config);

        return <NiftyChartTypes.NiftyChart>{
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };

    }

    export function getHorizontalBarConfig(options?: NiftyChartTypes.BarChartType): NiftyChartTypes.NiftyChart {

        var settings = NiftyUtils.merge<NiftyChartTypes.BarChartType>(RequestDefaults.horizontalBarChart, options);

        settings.legend.display = false;

        // We need to change the Axis specs because the X and Y are flipped when it's horizontal.
        var oldValueAxis = NiftyUtils.deepCopy(settings.valueAxis);

        settings.valueAxis = NiftyUtils.deepCopy(settings.seriesAxis);
        settings.seriesAxis = NiftyUtils.deepCopy(oldValueAxis);

        var config: Chart.ChartConfiguration = NiftyChartHelper.getDefaultConfig('horizontalBar', settings, ChartConfigDefaults.barConfig);

        config = mergeConfig(settings, config);

        if (settings.seriesAxis.showLines === false) {
            config.options.scales.yAxes[0].gridLines.zeroLineWidth = 0;
        }
        
        return <NiftyChartTypes.NiftyChart>{
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };

    }

}