import { NiftyChartHelper } from "./charthelper";

export namespace ChartConfigDefaults {

    /** Default  Generic Chart Config */
    export const genericConfig: Chart.ChartConfiguration = {
        type: '',
        data: {
            labels: ['Slice 1', 'Slice 2', 'Slice 3', 'Slice 4'],
            datasets: [{
                data: [100, 55, 40, 30],
                backgroundColor: getDefaultColors(),
                borderWidth: 0,
                borderColor: '#fff',
                borderAlign: 'inner'
            }]
        },
        options: {
            layout: {
                padding: 10
            },
            legend: {
                display: false,
                position: 'bottom',
                align: 'center',
                labels: {
                    padding: 20,
                    fontSize: 14,
                    fontColor: '#000',
                    boxWidth: 20,
                    fontFamily: 'HelveticaNeue'
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(0) + "%";
                        return percentage;
                    },
                    color: '#fff',
                    font: {
                        size: 12,
                        family: 'Helvetica'
                    }
                }
            }
        }
    };

    /** Default ChartConfiguration for Bar Charts */
    export const lineConfig: Chart.ChartConfiguration = {
        type: 'line',
        data: {
            labels: ['Slice 1 ', 'Slice 2', 'Slice 3', 'Slice 4', 'Slice 5'],
            datasets: [{
                label: 'Opens',
                data: [100, 55, 88, 30, 22, 1],
                borderWidth: 1,
                borderColor: '#ec2575',
                fill: true,
                backgroundColor: 'rgba(238, 238, 238, 0.5)',
                pointRadius: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#00f',
                pointBorderWidth: 1,
                // steppedLine: 'after'
                // lineTension: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        display: true,  // Labels
                        padding: 10  // Padding between the labels and the y-axis
                    },
                    gridLines: {
                        display: true,
                        drawTicks: false,
                        lineWidth: 1,
                        color: '#e6e6e6'
                    }
                }],
                xAxes: [{
                    display: true,
                    ticks: {
                        display: true, // Series Names
                        padding: 10  // Padding between series names and x-axis
                    },
                    gridLines: {
                        display: true, // Verticle Lines
                        drawTicks: false,
                        color: '#e6e6e6',
                        lineWidth: 1
                    }
                }]
            },
            layout: {
                padding: 30
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            plugins: {
                datalabels: {
                    display: false,
                    borderRadius: 4
                }
            }
        }
    };

    /** Default ChartConfiguration for Bar Charts */
    export const barConfig: Chart.ChartConfiguration = {
        type: 'bar',
        data: {
            labels: ['Slice 1 ', 'Slice 2', 'Slice 3', 'Slice 4'],
            datasets: [{
                data: [100, 55, 40, 30],
                backgroundColor: getDefaultColors(),
                borderWidth: 1,
                borderColor: '#fff',
                borderAlign: 'center'
            }]
        },
        options: {
            scales: {
                gridLines: {
                    display: true
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display: true,  // Labels
                        padding: 10  // Padding between the labels and the y-axis
                    },
                    gridLines: {
                        display: true, // Horizonal Lines
                        drawTicks: false, // Small horizontal line next to label past y-axis
                        lineWidth: 1,
                        color: '#e6e6e6'
                    }
                }],
                xAxes: [{
                    display: true,
                    ticks: {
                        display: true, // Series Names
                        padding: 10  // Padding between series names and x-axis
                    },
                    gridLines: {
                        display: true, // Verticle Lines
                        drawTicks: false,
                        color: '#e6e6e6',
                        lineWidth: 1,
                        drawBorder: false
                    }
                }]
            },
            layout: {
                padding: 30
            },
            legend: {
                display: false
            },
            plugins: {
                datalabels: {
                    display: true,
                    backgroundColor: function (context) {
                        return context.dataset.backgroundColor;
                    },
                    borderRadius: 4,
                    color: 'white',
                    formatter: Math.round,
                    anchor: 'end',
                    align: 'end',
                    offset: 0,
                    font: {
                        size: 12,
                        family: 'Helvetica'
                    }
                }
            }
        }
    };

    /** Default Radial Config */
    export const radialConfig = {
        type: 'radialGauge',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        data: {
            datasets: [
                {
                    data: [40],
                    backgroundColor: '#5c6cec',
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            legend: {},
            centerPercentage: 80,
            layout: {
                padding: 5
            },
            // the domain for the data, default is [0, 100]
            domain: [0, 100],
            trackColor: '#eee',
            // 1 * (-0.5 * Math.PI): Top
            // 2 * (-0.5 * Math.PI): Left
            // 3 * (-0.5 * Math.PI): Bottom
            // 4 * (-0.5 * Math.PI): Right
            rotation: 1 * (-0.5 * Math.PI),
            roundedCorners: true,
            centerArea: {
                displayText: true,
                backgroundColor: null,
                text: null,
                padding: 0,
                fontFamily: null,
                fontColor: null,
                fontSize: null,
            }
        }
    };

    export const progressBarConfig = {
        type: 'horizontalBar',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        data: {
            labels: ['Progress Legend'],
            datasets: [
                {
                    label: 'Value',
                    data: [8000],
                    backgroundColor: '#ec2575',
                    barPercentage: 1,
                    categoryPercentage: 1,
                    borderSkipped: 'chartArea',
                    borderWidth: 1
                },
                {
                    label: 'Max',
                    data: [2000],
                    backgroundColor: '#eee',
                    barPercentage: 1,
                    categoryPercentage: 1,
                    borderSkipped: 'chartArea',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                gridLines: {
                    display: false
                },
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        display: false,  // Labels
                        padding: 10  // Padding between the labels and the y-axis
                    },
                    gridLines: {
                        display: true,
                        drawTicks: false,
                        lineWidth: 1,
                        color: '#e6e6e6'
                    }
                }],
                xAxes: [{
                    stacked: true,
                    display: true,
                    ticks: {
                        display: true, // Series Names
                        padding: 10,  // Padding between series names and x-axis
                        max: 60,
                        min: 10,
                        beginAtZero: false
                    },
                    gridLines: {
                        display: true, // Verticle Lines
                        drawTicks: false,
                        color: '#e6e6e6',
                        lineWidth: 1,
                        drawBorder: false
                    }
                }]
            },
            layout: {
                padding: 30
            },
            legend: {
                display: false
            },
            plugins: {
                datalabels: {
                    display: false,
                    clamp: true,
                    backgroundColor: function (context) {
                        return context.dataset.backgroundColor;
                    },
                    borderRadius: 4,
                    color: '#000',
                    anchor: 'center',
                    align: 'center',
                    offset: 0,
                    text: 'asdf',
                    font: {
                        size: 12,
                        family: 'Helvetica'
                    }
                }
            }
        }
    };

    export function getDefaultColors(): string[] {

        return [
            '#003f5c',
            '#7a5195',
            '#ef5675',
            '#ffa600',
            '#ffa600'
        ];

    }

}