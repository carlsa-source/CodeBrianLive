import { NiftyUtils } from "./common";
import { NiftyChartHelper } from "./charthelper";
import { ChartConfigDefaults } from "./ChartConfigDefaults";
import { RequestDefaults } from "./RequestDefaults";

export namespace NiftyPieChartHelper {

    export function getPieConfig(options?: NiftyChartTypes.PieChartType): NiftyChartTypes.NiftyChart {

        var settings = NiftyUtils.merge<NiftyChartTypes.PieChartType>(RequestDefaults.pieNiftyDefaults, options);
        var config: Chart.ChartConfiguration = NiftyChartHelper.getDefaultConfig('pie', settings);

        // If there is transparency, we don't set the borderColor
        if (NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1) {

            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;

        } else if (NiftyUtils.isColor(settings.sliceColor)) {
            config.data.datasets[0].borderColor = NiftyUtils.getColor(settings.sliceColor);
            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;
        }

        return <NiftyChartTypes.NiftyChart>{
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };

    }

    export function getDoughnutConfig(options?: NiftyChartTypes.DoughnutChartType): NiftyChartTypes.NiftyChart {

        var settings = NiftyUtils.merge<NiftyChartTypes.PieChartType>(RequestDefaults.pieNiftyDefaults, options);
        var config: Chart.ChartConfiguration = NiftyChartHelper.getDefaultConfig('doughnut', settings);
        config.type = 'doughnut';

        // If there is transparency, we don't set the borderColor
        if (NiftyUtils.isNumber(settings.transparency) && settings.transparency > 0 && settings.transparency < 1) {

            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;

        } else if (NiftyUtils.isColor(settings.sliceColor)) {
            config.data.datasets[0].borderColor = NiftyUtils.getColor(settings.sliceColor);
            config.data.datasets[0].borderWidth = settings.sliceWidth || 0;
        }

        if (NiftyUtils.isNumber(options.cutoutPercentage)) {
            config.options.cutoutPercentage = Math.min(options.cutoutPercentage, 90);
        } else {
            config.options.cutoutPercentage = 50;
        }

        return <NiftyChartTypes.NiftyChart>{
            width: settings.width,
            height: settings.height,
            backgroundColor: settings.backgroundColor,
            config: config
        };

    }

}