engineGraphs = function(graph, resource, title, categories, xAxisText, yAxisText, sufix) {
    if (graph.length) {
        data = [];
        sufix = sufix || ' aluno(s)';
        xAxisText = xAxisText || 'Porcentagens de Acertos';
        yAxisText = yAxisText || 'Quantidade de Alunos';
        categories = categories || ["0-10%","11-20%","21-30%","31-40%","41-50%","51-60%","61-70%","71-80%","81-90%","91-100%",];

        for (i = 0; i < resource.length; ++i) {
            data[i] = {};
            data[i]["name"] = resource[i][0];
            data[i]["color"] = resource[i][1];
            data[i]["data"] = [];
            for (j = 2; j < resource[i].length; ++j) {
                data[i]["data"].push(parseFloat(resource[i][j]));
            }
        }

        graph.highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: title
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false,
                    shadow: false,
                    animation: false,
                }
            },
            xAxis: {
                title: {
                    text: xAxisText
                },
                categories: categories,
                offset: 20,
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisText
                },
                tickInterval: 10,
            },
            tooltip: {
                shared: true,
                valueSuffix: sufix,
                crosshairs: true,
            shared: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5,
                    dataLabels: {
                        enabled: true,
                        format: "{y}%",
                        color: '#777'
                    },
                }
            },
            series: data
        });
    }
}
