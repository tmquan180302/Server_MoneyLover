var monthLineChart = document.currentScript.getAttribute('monthLineChart');
monthLineChart = JSON.parse(monthLineChart)
var userLineChart = document.currentScript.getAttribute('userLineChart');
userLineChart = JSON.parse(userLineChart)

var options = {
    series: [{
        name: 'Người đăng ký',
        data: userLineChart,
    }],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: true,
            type: 'x'
        },
    },
    dataLabels: {
        enabled: true,
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Bảng thống kê tài khoản đã đăng ký',
        align: 'center',
        style: {
            fontSize: '15px',
            fontWeight: 'bold',
            fontFamily: 'Arial, Helvetica, sans-serif',
            color: '#263238'
        },
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: monthLineChart,

    },

};

var chart = new ApexCharts(document.querySelector("#lineChart"), options);
chart.render();
