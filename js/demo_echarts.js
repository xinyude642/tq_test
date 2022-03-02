window.addEventListener('load', function() {
    var CurveChart = echarts.init(document.querySelector(".Curve_display"));
    var CakeshapeChart = echarts.init(document.querySelector(".Cakeshape_display"));
    var ColumnChart = echarts.init(document.querySelector(".Column_display"));

    /*曲线图*/
    CurveChart.setOption({
        title: {
            text: '曲线图数据显示',
            left: 'center',
            top: '10px'

        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        grid: {
            bottom: '30px'
        },
        series: [{
            data: [],
            type: 'line',
            smooth: true
        }]
    });
    /*柱状图 */
    ColumnChart.setOption({
        title: {
            text: '柱状图数据显示',
            left: 'center',
            top: '10px'

        },
        tooltip: {},
        grid: {
            bottom: '50px'
        },
        xAxis: {
            data: []
        },
        yAxis: {
            name: '商品数'
        },
        series: [{
            type: 'bar',
            data: []
        }]
    });
    /*饼状图 */
    CakeshapeChart.setOption({
        title: {
            text: '饼状图数据显示',
            left: 'center',
            top: '10px'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
    //获取周数据
    $.ajax({
            type: 'get',
            url: 'https://edu.telking.com/api/?type=week',
            async: true,
            success: function(datas) {
                var res = [];
                var res_xAxis = datas.data.xAxis;
                var res_series = datas.data.series;
                ColumnChart.setOption({ xAxis: [{ data: datas.data.xAxis }] });
                ColumnChart.setOption({ series: [{ data: datas.data.series }] });
                CakeshapeChart.setOption({
                    series: [{
                        data: function() {
                            for (var i = 0; i < res_xAxis.length; i++) {
                                res.push({
                                    value: res_series[i],
                                    name: res_xAxis[i]
                                });
                            }
                            return res;
                        }()
                    }]
                });
            }
        })
        //获取月数据
    $.ajax({
        type: 'get',
        url: 'https://edu.telking.com/api/?type=month',
        async: true,
        success: function(datas) {
            CurveChart.setOption({ xAxis: [{ data: datas.data.xAxis }] });
            CurveChart.setOption({ series: [{ data: datas.data.series }] });
        }
    })

})