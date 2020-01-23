
declare namespace NiftyChartTypes {

    type fontOptions = 'Helvetica' | 'HelveticaNeue' | 'OE';

    interface NiftyChart {
        width: number;
        height: number;
        backgroundColor?: string;
        config: Chart.ChartConfiguration
    }

    interface Legend {
        align?: 'center' | 'end' | 'start';
        position?: 'left' | 'right' | 'top' | 'bottom' | 'chartArea';
        display?: boolean;
        fontFamily?: fontOptions;
        fontColor?: string;
        fontSize?: number;
        boxWidth?: number;
    }

    interface ChartDataLabels {
        display?: boolean;
        color?: string;
        labelType?: 'percentage' | 'value' | 'number' | 'category',
        locale?: string;
        prefix?: string;
        suffix?: string;
        /** Precision to apply to the percentage */
        precision?: number;
        placement?: 'bottom' | 'middle' | 'top' | 'outside';
        fontSize?: number;
        fontFamily?: fontOptions;
    }

    interface DefaultChartType {

        width?: number;
        height?: number;
        backgroundColor?: string;
        padding?: number;

        /** Label for each slice */
        labels?: Array<string | string[]>;
        /** Numbers for each slice */
        data?: number[];
        /** Colors for each slice */
        colors?: string | string[];
        /** Transparency value to add to the Slice/Bar colors */
        transparency?: number;

        legend?: Legend;

        /** True to show the pie values */
        dataLabels?: ChartDataLabels;

    }

    interface PieChartType extends DefaultChartType {

        /** Color of the lines between slices and border */
        sliceColor?: string;
        /** Width of the lines between slices */
        sliceWidth?: number;

    }

    interface DoughnutChartType extends PieChartType {
        cutoutPercentage?: number;
    }

    interface TickConfig {
        display?: boolean;
        fontColor?: string;
        fontSize?: number;
        fontFamily?: fontOptions;
        labelType?: 'percentage' | 'value' | 'number';
        locale?: string;
        prefix?: string;
        suffix?: string;
        showLines?: boolean;
        maxTicksLimit?: number;
        hideAxisLine?: boolean;
    }

    interface BarChartType extends DefaultChartType {
        barThickness?: number;
        seriesAxis?: TickConfig;
        valueAxis?: TickConfig;
    }

    interface HorizontalBarChartType extends BarChartType {

    }

    interface LineLabel {
        display?: boolean;
        color?: string;
        placement?: 'bottom' | 'middle' | 'top';
        borderRadius?: number;
        borderColor?: string;
        borderWidth?: number;
        backgroundColor?: string;
        padding?: number;
    }

    interface LinePoint {
        display?: boolean;
        radius?: number;
        backgroundColor?: string;
        borderColor?: string;
        borderWidth?: number;
    }

    interface Line {
        data: number[];
        label: string;
        color: string;
        width?: number;
        fill?: boolean;
        fillColor?: string;
        point?: LinePoint;
        straight?: boolean;
        dataLabel?: LineLabel;
    }

    interface LineChartType {

        width?: number;
        height?: number;
        backgroundColor?: string;
        padding?: number;

        /** Label for each slice */
        labels?: Array<string | string[]>;

        /** Transparency value to add to the fill color */
        transparency?: number;

        /** True to show the pie values */
        dataLabels?: ChartDataLabels;

        line?: Line;
        line2?: Line;
        line3?: Line;

        legend?: Legend;
        seriesAxis?: TickConfig;
        valueAxis?: TickConfig;

        beginAtZero?: boolean;
    }

    interface Title {
        display?: boolean;
        text?: string;
        fontFamily?: fontOptions;
        fontSize?: number;
        position?: 'top' | 'left' | 'bottom' | 'right';
        padding?: number;
    }

    interface ProgressChartType {
        width?: number;
        height?: number;
        backgroundColor?: string;
        padding?: number;

        trackColor?: string;
        color?: string;
        transparency?: number;

        max?: number;
        min?: number;
        value?: number;

        title?: Title;

        valueLabel?: ChartDataLabels;
        toGoLabel?: ChartDataLabels;

        valueAxies?: TickConfig;

    }

    interface LinearProgressChartType extends ProgressChartType {

    }

    interface CenterAreaOptions {
        display?: boolean;
        backgroundColor?: string;
        text?: string;
        padding?: number;
        fontFamily?: fontOptions;
        fontColor?: string;
        fontSize?: number | string;
        labelType?: 'percentage' | 'value';
        precision?: number;
        prefix?: string;
        suffix?: string;
    }

    interface RoundProgressChartType extends ProgressChartType {

        cutoutPercentage?: number;
        rotation?: 'top' | 'left' | 'bottom' | 'right';
        roundedCorners?: boolean;

        centerArea?: CenterAreaOptions;

    }

}