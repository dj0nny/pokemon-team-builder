// eliminare team e pokemon dai team
// gestione user friendly degli errori

const newTeamModal = document.getElementById('newTeamModal');
const addPokemonModal = document.getElementById('addPokemon');

const newTeamModalOpenBtn = document.getElementById('new-team');
const addPokemonOpenBtn = document.getElementById('add-pokemon');

const closeSpan = document.getElementsByClassName('close')[0];
const closeSpan2 = document.getElementsByClassName('close-2')[0];


newTeamModalOpenBtn.onclick = () => {
  newTeamModal.style.display = 'block';
}

addPokemonOpenBtn.onclick = () => {
  addPokemonModal.style.display = 'block';
}

closeSpan.onclick = () => {
  newTeamModal.style.display = 'none';
}

closeSpan2.onclick = () => {
  addPokemonModal.style.display = 'none';
}

const initializeTeams = () => {
  const select = document.getElementById('team-list');
  for (let i = 0; i < localStorage.length; i++) {
    const option = document.createElement('option');
    option.text = localStorage.key(i);
    option.value = i;
    select.appendChild(option);
  }
}

const initializePokemon = (index, team) => {
  if (team.length != 0) {
    team.forEach((element) => {
      document.getElementById(`team-${index}`).insertAdjacentHTML('beforeend',
        `
        <div class="grid-x">
          <img src="${element.sprites.front_default}"  class="sprite" />
          <div class="cell medium-12">
            <div class="grid-container">
              <div class="grid-x grid-margin-x">
                <div class="cell medium-6">
                  <h3>General Info</h3>
                  <div class="info-list">
                    <span class="info"><strong>Name: </strong>${element.name}</span>
                    <span class="info"><strong>Pokèdex ID: </strong>${element.id}</span>
                    <span class="info"><strong>Type: </strong>${element.types[0].type.name}  ${element.types[1] != undefined ? '/ ' + element.types[1].type.name : ''}</span>
                    <span class="info"><strong>Ability 1: </strong>${element.abilities[0].is_hidden != true ? element.abilities[0].ability.name : element.abilities[1].ability.name}</span>
                    <span class="info"><strong>Ability 2: </strong>${element.abilities.length === 3 ? element.abilities[2].ability.name : '-'}</span>
                    <span class="info"><strong>Hidden Ability: </strong>${element.abilities[0].is_hidden === true ? element.abilities[0].ability.name : '-'}</span>
                  </div>
                </div>
                <div class="cell medium-6">
                  <h3>Base stats</h3>
                  <div class="stats-list">
                    <span class="info"><strong>HP: </strong>${element.stats[5].base_stat}</span>
                    <span class="info"><strong>Attack: </strong>${element.stats[4].base_stat}</span>
                    <span class="info"><strong>Defense: </strong>${element.stats[3].base_stat}</span>
                    <span class="info"><strong>Special Attack: </strong>${element.stats[2].base_stat}</span>
                    <span class="info"><strong>Special Defense: </strong>${element.stats[1].base_stat}</span>
                    <span class="info"><strong>Speed: </strong>${element.stats[0].base_stat}</span>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      )
    });
    console.log(team);
  }
}

const initializeTeamList = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i);
    const currentTeam = JSON.parse(localStorage.getItem(element));
    document.getElementById('team-container').insertAdjacentHTML('beforeend',
      `
        <div class="grid-container" id="team-${i}">
          <div class="grid-x">
            <div class="cell medium-12">
              <h2>${element}</h2>
            </div>
          </div>
        </div>
      `
    );
    initializePokemon(i, currentTeam);
  }
}

const addTeam = (teamName) => {
  const select = document.getElementById('team-list');
  const option = document.createElement('option');
  option.text = teamName;
  option.value = localStorage.length;
  select.appendChild(option);
}

const updateTeamList = (teamName) => {
  document.getElementById('team-container').insertAdjacentHTML('beforeend',
    `
    <div class="grid-container" id="team-${localStorage.length}">
      <div class="grid-x">
        <div class="cell medium-12">
          <h2>${teamName}</h2>
        </div>
      </div>
    </div>
  `
  );
}

window.addEventListener('load', () => {
  const pkmnLocalStorage = localStorage.getItem('pokemonTeam');
  console.log(localStorage.length);
  if (localStorage.length === 0) {
    document.getElementById('team-container').insertAdjacentHTML('beforeend', 
      `<span class="empty">No teams added yet</span>`
    );
  } else {
    initializeTeams();
    initializeTeamList();
  }
});

document.getElementById('add-team').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('team-name').value;
  if (name === '' ) {
    alert('name cannot be empty');
  } else {
    localStorage.setItem(name, JSON.stringify([]));
    newTeamModal.style.display = 'none';
    addTeam(name);
    updateTeamList(name);
  }
});

document.getElementById('add-new-pokemon').addEventListener('submit', async (event) => {
  event.preventDefault();
  const pkmn = document.getElementById('pkmn-name').value;
  const teamIndex = document.getElementById('team-list').value;
  if (pkmn === '') {
    alert('name cannot be empty');
  } else {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
    const json = await response.json();
    const selectedTeam = JSON.parse(localStorage.getItem(localStorage.key(teamIndex)));
    selectedTeam.push(json);
    localStorage.setItem(localStorage.key(teamIndex), JSON.stringify(selectedTeam));
    addPokemonModal.style.display = 'none';
    // check che ci siano meno di 6 membri per team 
    // funzione che aggiunge un nuovo blocco al momento del submit (passando pokemon e id del team)
  }
});