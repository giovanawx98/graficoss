import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    const url = 'https://dog.ceo/api/breeds/list/all';
    const res = await fetch(url);
    const dados = await res.json();
    const racas = Object.keys(dados.message);
    const quantidadeRacas = racas.length;

    // Gráfico de barras das raças (dividido em segmentos para visualização)
    const data = [
        {
            x: racas.slice(0, 10), // Mostrando apenas as 10 primeiras raças
            y: Array(10).fill(1), // Apenas para ilustrar a quantidade de raças
            type: 'bar',
            marker: {
                color: getCSS('--primary-color'),
            },
        },
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'As primeiras 10 raças de cães',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font'),
            },
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Raças',
                font: {
                    color: getCSS('--secondary-color'),
                },
            },
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Quantidade',
                font: {
                    color: getCSS('--secondary-color'),
                },
            },
        },
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    document.getElementById('graficos-container').appendChild(grafico);
    Plotly.newPlot(grafico, data, layout);
}

quantidadeUsuariosPorRede();
