export function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    const midRatio = (startRatio + endRatio) / 2;
    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }
    k = typeof k !== 'undefined' ? k : 1 / 3;
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    const hoverRate = isHovered ? 1.05 : 1;
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },

        x(u, v) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y(u, v) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z(u, v) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * 0.1;
            }
            // 当前图形的高度是Z根据h（每个value的值决定的）
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
    };
}

export function getPie3D(pieData, internalDiameterRatio) {
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
        typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;
    for (let i = 0; i < pieData.length; i += 1) {
        sumValue += pieData[i].value;
        const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k,
            },
        };
        if (typeof pieData[i].itemStyle !== 'undefined') {
            const {itemStyle} = pieData[i];
            typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            typeof pieData[i].itemStyle.opacity !== 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null;

            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }
    for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            10
        );
        startValue = endValue;
        legendData.push(series[i].name);
    }
    return {
        legend: {
            left: "center",
            bottom: "0",
            formatter: (name) => {
                if (pieData.length) {
                    const item = pieData.filter((item) => item.name === name)[0];
                    return `  ${name}：` + `${item.value}` + "个,占比：" + `${item.proportion}` + "%"
                }
            },
        },
        tooltip: {
            formatter: (params) => {
                return `${params.marker}${params.seriesName}：${pieData[params.seriesIndex].value}` + '个，占比：' + `${pieData[params.seriesIndex].proportion}` + '%';
            },
        },
        labelLine: {
            show: true,
            normal: {
                show: true,
                length: 10,
                length2: 30,
            },
        },
        label: {
            show: true,
            position: "outside",
            formatter: "{b} \n{d}%",
            textStyle: {
                fontSize: "14px",
            },
        },
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: 10,//修改立体饼图的高度
            top: '-10%',
            left: '-10%',
            viewControl: {
                alpha: 45,
                beta: 30,
                rotateSensitivity: 1,
                zoomSensitivity: 0,
                panSensitivity: 0,
                distance: 285,
            },
        },
        color: ['#FF4B01', '#FF7B00', '#FFE823', '#2379FF', '#7B48DD', '#FC7A24', '#FFC000', '#FFEA97', '#49B1FF', '#6974E7'],
        series,
    };
}