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
    //获取数据
    function get_data(type, url, async, charts_fun) {

        var xhr = new XMLHttpRequest();
        xhr.open(type, url, async);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result_data = JSON.parse(xhr.responseText);
                if (charts_fun) {
                    charts_fun(result_data);
                }
            }
        }
    }
    //绘制曲线图
    function CurveChart_fun(result_data) {
        CurveChart.setOption({ xAxis: { data: result_data.data.xAxis } });
        CurveChart.setOption({ series: { data: result_data.data.series } });
    }
    //绘制饼状图
    function CakeshapeChart_fun(result_data) {
        var res = [];
        CakeshapeChart.setOption({
            series: [{
                data: function() {
                    for (var i = 0; i < result_data.data.xAxis.length; i++) {
                        res.push({
                            value: result_data.data.series[i],
                            name: result_data.data.xAxis[i]
                        });
                    }
                    return res;
                }()
            }]
        });

    }
    //绘制柱状图
    function ColumnChart_fun(result_data) {
        ColumnChart.setOption({ xAxis: { data: result_data.data.xAxis } });
        ColumnChart.setOption({ series: { data: result_data.data.series } });
    }
    //绘制三种图形
    get_data('get', 'https://edu.telking.com/api/?type=month', 'true', CurveChart_fun);
    get_data('get', 'https://edu.telking.com/api/?type=week', 'true', CakeshapeChart_fun);
    get_data('get', 'https://edu.telking.com/api/?type=week', 'true', ColumnChart_fun);
})