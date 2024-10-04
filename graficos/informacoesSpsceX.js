const url = 'https://api.spacexdata.com/v4/launches/latest';

async function vizualizarInformacoesSpaceX() {
    const res = await fetch(url);
    const dados = await res.json();
    
    const nomeMissao = dados.name;
    const dataLancamento = new Date(dados.date_utc).toLocaleDateString();
    const foguete = dados.rocket;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `O lançamento mais recente da SpaceX foi a missão <span>${nomeMissao}</span> com o foguete <span>${foguete}</span>, que ocorreu em <span>${dataLancamento}</span>.`;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);
}

vizualizarInformacoesSpaceX();
