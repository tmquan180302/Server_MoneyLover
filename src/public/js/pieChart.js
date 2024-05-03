var pie = document.currentScript.getAttribute('pie');
pie = JSON.parse(pie);
var userPremium = document.currentScript.getAttribute('userPremium');
userPremium = JSON.parse(userPremium);
var userNotPremium = document.currentScript.getAttribute('userNotPremium');
userNotPremium = JSON.parse(userNotPremium);

var options = {
    title: {
        text: 'Số lượng người đăng ký Premium',
        align: 'left',
        style: {
            fontSize: '15px',
            fontWeight: 'bold',
            fontFamily: 'Arial, Helvetica, sans-serif',
            color: '#263238',
        },
    },
    series: pie,
    labels: ['Đã đăng ký', 'Chưa đăng ký'],
    colors: ['#66DA26', '#FF9800'],
    chart: {
        type: 'donut',
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        label: 'Tổng số tài khoản',
                        show: true,
                        showAlways: false,
                    }
                },

            }
        }
    },

    enabled: true,
    enabledOnSeries: undefined,

    formatter: function (val, opts) {
        return val
    },
    textAnchor: 'middle',
    distributed: false,
    offsetX: 0,
    offsetY: 0,
    style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined
    },
    background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
        }
    },
    dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
    },

    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#pieChart"), options);
chart.render();