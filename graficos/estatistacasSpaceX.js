import { getCSS, tickConfig } from "./common.js";

const launchesUrl = 'https://api.spacexdata.com/v4/launches';
const rocketsUrl = 'https://api.spacexdata.com/v4/rockets';

async function pegarNomeFoguetes() {
    const res = await fetch(rocketsUrl);
    const dados = await res.json();
    
    const foguetes = {};
    dados.forEach(foguete => {
        foguetes[foguete.id] = foguete.name;
    });
    
    return foguetes;
}

async function estatisticasSpaceX() {
    const res = await fetch(launchesUrl);
    const dados = await res.json();

    const foguetesNomes = await pegarNomeFoguetes();

    const foguetesContagem = {};
    dados.forEach(launch => {
        const foguete = foguetesNomes[launch.rocket]; 
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
