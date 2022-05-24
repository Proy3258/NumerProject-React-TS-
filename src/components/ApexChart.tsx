import { FC } from 'react';
import { ApexChartProps } from '../interfaces/service';
import Chart from 'react-apexcharts';

export const ApexChart:FC<ApexChartProps> = (props) => {
    const series:any = props.Series
    const options:object = {
        chart: {
            height: 800,
            type: 'line',
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true,
                zoomedArea: {
                    fill: {
                        color: '#90CAF9',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                        opacity: 0.4,
                        width: 1
                    }
                }
            }

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ApexChart',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories:  props.Categories,
        },
        yaxis: {
            min:0
        },
        markers: {
            size: 5,
            colors: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: undefined,
                sizeOffset: 3
            }
        }
    };
    
    return(
        <div>
            <Chart options={options} series={series} type="line" height={350}></Chart>
        </div>
    );
}