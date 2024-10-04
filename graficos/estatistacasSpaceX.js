import { getCSS, tickConfig } from "./common.js";

const url = 'https://api.spacexdata.com/v4/launches';

async function estatisticasSpaceX() {
    const res = await fetch(url);
    const dados = await res.json();

    // Vamos contar quantos lançamentos cada foguete teve
    const foguetesContagem = {};
    dados.forEach(launch => {
        const foguete = launch.rocket;
        foguetesContagem[foguete] = (foguetesContagem[foguete] || 0) + 1;
    });

    const nomeFoguetes = Object.keys(foguetesContagem);
    const quantidadeLançamentos = Object.values(foguetesContagem);

    const data = [
        {
            x: nomeFoguetes, 
            y: quantidadeLançamentos, 
            type: 'bar',
            marker: {
                color: getCSS('--primary-color')
            }
        }
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Lançamentos por Tipo de Foguete',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font')
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Foguetes',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Número de Lançamentos',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        }
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico'; 
    document.getElementById('graficos-container').appendChild(grafico); 
    Plotly.newPlot(grafico, data, layout); 
}

estatisticasSpaceX();
