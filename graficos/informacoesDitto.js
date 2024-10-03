const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

async function vizualizarInformacoesDitto() {
    const res = await fetch(url);
    const dados = await res.json();

    const nome = dados.name.charAt(0).toUpperCase() + dados.name.slice(1);
    const altura = dados.height / 10; // altura em metros
    const peso = dados.weight / 10; // peso em kg
    const tipos = dados.types.map(typeInfo => typeInfo.type.name).join(', ');

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `O Pokémon <span>${nome}</span> tem uma altura de <span>${altura} m</span>, um peso de <span>${peso} kg</span>, e seus tipos são <span>${tipos}</span>.`;

    const container = document.getElementById('graficos-container');
    container.appendChild(paragrafo);
}

vizualizarInformacoesDitto();