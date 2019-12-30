const newTeamModal = document.getElementById('newTeamModal');
const addPokemonModal = document.getElementById('addPokemon');

const newTeamModalOpenBtn = document.getElementById('new-team');
const addPokemonOpenBtn = document.getElementById('add-pokemon');

const closeSpan = document.querySelector('.close');
const closeSpan2 = document.querySelector('.close-2');


newTeamModalOpenBtn.addEventListener('click', () => {
  newTeamModal.style.display = 'block';
});

addPokemonOpenBtn.addEventListener('click', () => {
  addPokemonModal.style.display = 'block';
});

closeSpan.addEventListener('click', () => {
  newTeamModal.style.display = 'none';
  document.getElementById('team-name').value = '';
});

closeSpan2.addEventListener('click', () => {
  addPokemonModal.style.display = 'none';
  document.getElementById('autoComplete').value = '';
});

const sanitize = (string, char1, char2) => {
  return string.split(char1).join(char2);
}

const isDuplicate = (teamName) => {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === teamName) {
      return true;
    }
  }
  return false;
}

const initializeTeams = () => {
  const select = document.getElementById('team-list');
  for (let i = 0; i < localStorage.length; i++) {
    const option = document.createElement('option');
    option.text = sanitize(localStorage.key(i), '-', ' ');
    option.value = sanitize(localStorage.key(i), ' ', '-');
    select.appendChild(option);
  }
}

const initializePokemon = (index, team) => {
  if (team.length != 0) {
    team.forEach((element) => {
      document.getElementById(`${index}`).insertAdjacentHTML('beforeend',
        `
          <div class="grid-x pokemon-${element.name}">
            <img src="${element.sprites.front_default}"  class="sprite" />
            <span class="delete-pkmn" onclick="deletePokemon('${index}', '${element.name}')">&times;</span>
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
  }
}

const initializeTeamList = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i);
    const teamID = sanitize(element, ' ', '-');
    const currentTeam = JSON.parse(localStorage.getItem(element));
    document.getElementById('team-container').insertAdjacentHTML('beforeend',
      `
        <div class="grid-container" id="${teamID}">
          <span class="delete" onclick="deleteTeam('${teamID}')">&times;</span>
          <div class="grid-x">
            <div class="cell medium-12">
              <h2>${element}</h2>
            </div>
          </div>
        </div>
      `
    );
    initializePokemon(teamID, currentTeam);
  }
}

const addTeam = (teamName) => {
  const select = document.getElementById('team-list');
  const option = document.createElement('option');
  option.text = sanitize(teamName, '-', ' ');
  option.value = sanitize(teamName, ' ', '-');
  select.appendChild(option);
}

const updateTeamList = (teamName) => {
  document.getElementById('team-container').insertAdjacentHTML('beforeend',
    `
      <div class="grid-container" id="${sanitize(teamName, ' ', '-')}">
        <span class="delete" onclick="deleteTeam('${sanitize(teamName, ' ', '-')}')">&times;</span>
        <div class="grid-x">
          <div class="cell medium-12">
            <h2>${teamName}</h2>
          </div>
        </div>
      </div>
    `
  );
}

const appendNewPokèmon = (teamIndex, pokèmon) => {
  document.getElementById(`${teamIndex}`).insertAdjacentHTML('beforeend', 
    `
      <div class="grid-x pokemon-${pokèmon.name}">
        <img src="${pokèmon.sprites.front_default}"  class="sprite" />
        <span class="delete-pkmn" onclick="deletePokemon('${teamIndex}', '${pokèmon.name}')">&times;</span>
        <div class="cell medium-12">
          <div class="grid-container">
            <div class="grid-x grid-margin-x">
              <div class="cell medium-6">
                <h3>General Info</h3>
                <div class="info-list">
                  <span class="info"><strong>Name: </strong>${pokèmon.name}</span>
                  <span class="info"><strong>Pokèdex ID: </strong>${pokèmon.id}</span>
                  <span class="info"><strong>Type: </strong>${pokèmon.types[0].type.name} ${pokèmon.types[1] != undefined ? '/ ' + pokèmon.types[1].type.name : ''}</span>
                  <span class="info"><strong>Ability 1: </strong>${pokèmon.abilities[0].is_hidden != true ? pokèmon.abilities[0].ability.name : pokèmon.abilities[1].ability.name}</span>
                  <span class="info"><strong>Ability 2: </strong>${pokèmon.abilities.length === 3 ? pokèmon.abilities[2].ability.name : '-'}</span>
                  <span class="info"><strong>Hidden Ability: </strong>${pokèmon.abilities[0].is_hidden === true ? pokèmon.abilities[0].ability.name : '-'}</span>
                </div>
              </div>
              <div class="cell medium-6">
                <h3>Base stats</h3>
                <div class="stats-list">
                  <span class="info"><strong>HP: </strong>${pokèmon.stats[5].base_stat}</span>
                  <span class="info"><strong>Attack: </strong>${pokèmon.stats[4].base_stat}</span>
                  <span class="info"><strong>Defense: </strong>${pokèmon.stats[3].base_stat}</span>
                  <span class="info"><strong>Special Attack: </strong>${pokèmon.stats[2].base_stat}</span>
                  <span class="info"><strong>Special Defense: </strong>${pokèmon.stats[1].base_stat}</span>
                  <span class="info"><strong>Speed: </strong>${pokèmon.stats[0].base_stat}</span>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  );
}

window.addEventListener('load', () => {
  if (localStorage.length === 0) {
    document.getElementById('team-container').insertAdjacentHTML('beforeend', 
      `<span class="empty">No teams added yet</span>`
    );
    document.getElementById('add-pokemon').disabled = true;
  } else {
    initializeTeams();
    initializeTeamList();
  }
});

document.getElementById('add-team').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('team-name').value;
  if (name === '' ) {
    alert('The team name cannot be empty');
  } else {
    if (isDuplicate(name)) {
      alert(`There is already a team named ${name}`);
    } else {      
      localStorage.setItem(name, JSON.stringify([]));
      if (localStorage.length - 1 === 0) {
        document.querySelector('.empty').style.display = 'none';
        document.getElementById('add-pokemon').disabled = false;
      }
      newTeamModal.style.display = 'none';
      document.getElementById('team-name').value = '';
      addTeam(name);
      updateTeamList(name);
    }
  }
});

document.getElementById('add-new-pokemon').addEventListener('submit', async (event) => {
  event.preventDefault();
  const pkmn = document.getElementById('autoComplete').textContent.toLowerCase();
  const teamName = document.getElementById('team-list').value;
  if (pkmn === '') {
    alert('Pokèmon name cannot be empty');
  } else {
    const selectedTeam = JSON.parse(localStorage.getItem(sanitize(teamName, '-', ' ')));
    if (selectedTeam.length === 6) {
      alert('You have 6 pokemon in your team');
    } else {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
      const json = await response.json();
      selectedTeam.push(json);
      localStorage.setItem(sanitize(teamName, '-', ' '), JSON.stringify(selectedTeam));
      appendNewPokèmon(teamName, json);
      document.getElementById('autoComplete').value = '';
      addPokemonModal.style.display = 'none';
      document.querySelector('#autoComplete').setAttribute('placeholder', '');
    }
  }
});

const deleteTeam = (team) => {
  localStorage.removeItem(sanitize(team, '-', ' '));
  const deletedTeam = document.getElementById(team);
  deletedTeam.parentNode.removeChild(deletedTeam);
  if (localStorage.length === 0) {
    document.getElementById('team-container').insertAdjacentHTML('beforeend',
      `<span class="empty">No teams added yet</span>`
      );
    document.getElementById('add-pokemon').disabled = true;
  }
}

const deletePokemon = (teamName, pokemonName) => {
  const team = JSON.parse(localStorage.getItem(sanitize(teamName, '-', ' ')));
  const filteredArray = team.filter(item => item.name != pokemonName);
  localStorage.setItem(sanitize(teamName, '-', ' '), JSON.stringify(filteredArray));
  const element = document.querySelector(`#${teamName} .pokemon-${pokemonName}`);
  element.parentNode.removeChild(element);
}