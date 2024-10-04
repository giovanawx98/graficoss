const url = 'https://dog.ceo/api/breeds/list/all';

async function vizualizarInformacoesGlobais() {
    const res = await fetch(url);
    const dados = await res.json();
    const racas = Object.keys(dados.message);
    const totalRacas = racas.length;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `Existem atualmente <span>${totalRacas}</span> raças de cães listadas na API.`;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);
}

vizualizarInformacoesGlobais();
