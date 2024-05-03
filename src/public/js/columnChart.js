var months = document.currentScript.getAttribute('months');
months = JSON.parse(months)
var totalBills = document.currentScript.getAttribute('totalBills');
totalBills = JSON.parse(totalBills)


var options = {
    title: {
        text: 'Bảng thống kê doanh thu',
        align: 'center',
        style: {
            fontSize: '23px',
            fontWeight: 'bold',
            fontFamily: 'Arial, Helvetica, sans-serif',
            color: '#263238'
        },
    },
    series: [
        {
            name: 'Doanh thu',
            data: totalBills
        },
      
    ],
    colors: [
        'rgb(0, 143, 251)',
    ],
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            distributed: false,
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: months,
    },
    yaxis: {
        title: {
            text: 'vnd (dong)'
        },
        labels: {
            formatter: function (val) {
                return Number(val).toLocaleString()
            }
        },
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return Number(val).toLocaleString() + " dong"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chartColumn"), options);
chart.render();