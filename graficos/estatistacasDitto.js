import { getCSS, tickConfig } from "./common.js";

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

async function estatisticasDitto() {
    const res = await fetch(url);
    const dados = await res.json();

    const estatisticas = dados.stats.map(stat => stat.base_stat);
    const nomesEstatisticas = dados.stats.map(stat => stat.stat.name);

    const data = [
        {
            x: nomesEstatisticas,
            y: estatisticas,
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
            text: 'Estatísticas do Pokémon Ditto',
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
                text: 'Estatísticas',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Valor Base',
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

estatisticasDitto();
