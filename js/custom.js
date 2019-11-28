// eliminare team e pokemon dai team
// gestione user friendly degli errori

const newTeamModal = document.getElementById('newTeamModal');
const addPokemonModal = document.getElementById('addPokemon');

const newTeamModalOpenBtn = document.getElementById('new-team');
const addPokemonOpenBtn = document.getElementById('add-pokemon');

const closeSpan = document.getElementsByClassName('close')[0];
const closeSpan2 = document.getElementsByClassName('close-2')[0];


newTeamModalOpenBtn.addEventListener('click', () => {
  newTeamModal.style.display = 'block';
});

addPokemonOpenBtn.addEventListener('click', () => {
  addPokemonModal.style.display = 'block';
});

closeSpan.addEventListener('click', () => {
  newTeamModal.style.display = 'none';
});

closeSpan2.addEventListener('click', () => {
  addPokemonModal.style.display = 'none';
});

const autoCompletejs = new autoComplete({
  data: {
    src: async function () {
      const source = await fetch("../db/pokèmon.json");
      const data = await source.json();
      return data;
    },
    key: ["name"],
  },
  sort: function (a, b) {
    if (a.match < b.match) {
      return -1;
    }
    if (a.match > b.match) {
      return 1;
    }
    return 0;
  },
  selector: "#autoComplete",
  debounce: 0,
  searchEngine: "strict",
  highlight: true,
  maxResults: 5,
  resultsList: {
    render: true,
    container: function (source) {
      source.setAttribute("id", "autoComplete_list");
    },
    element: "ul",
    destination: document.querySelector("#autoComplete"),
    position: "afterend",
  },
  resultItem: {
    content: function (data, source) {
      source.innerHTML = data.match;
    },
    element: "li",
  },
  noResults: function () {
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_list").appendChild(result);
  },
  onSelection: function (feedback) {
    document.querySelector("#autoComplete").blur();
    const selection = feedback.selection.value.name;
    document.querySelector("#autoComplete").innerHTML = selection;
    document.querySelector("#autoComplete").setAttribute("placeholder", selection);
    document.querySelector("#autoComplete").value = "";
    console.log(feedback);
  },
});

const initializeTeams = () => {
  const select = document.getElementById('team-list');
  for (let i = 0; i < localStorage.length; i++) {
    const option = document.createElement('option');
    option.text = localStorage.key(i).split('-').join(' ');
    option.value = localStorage.key(i).split(' ').join('-');
    select.appendChild(option);
  }
}

const initializePokemon = (index, team) => {
  if (team.length != 0) {
    team.forEach((element) => {
      document.getElementById(`${index}`).insertAdjacentHTML('beforeend',
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
    const teamID = element.split(' ').join('-');
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
  option.text = teamName.split('-').join(' ');
  option.value = teamName.split(' ').join('-');
  select.appendChild(option);
}

const updateTeamList = (teamName) => {
  document.getElementById('team-container').insertAdjacentHTML('beforeend',
    `
      <div class="grid-container" id="${teamName.split(' ').join('-')}">
        <span class="delete" onclick="deleteTeam('${teamName.split(' ').join('-')}')">&times;</span>
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
      <div class="grid-x">
        <img src="${pokèmon.sprites.front_default}"  class="sprite" />
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
    alert("Team's name cannot be empty");
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
});

document.getElementById('add-new-pokemon').addEventListener('submit', async (event) => {
  event.preventDefault();
  const pkmn = document.getElementById('autoComplete').textContent.toLowerCase();
  const teamName = document.getElementById('team-list').value;
  if (pkmn === '') {
    alert('Name cannot be empty');
  } else {
    const selectedTeam = JSON.parse(localStorage.getItem(teamName.split('-').join(' ')));
    if (selectedTeam.length === 6) {
      alert('You have 6 pokemon in your team');
    } else {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
      const json = await response.json();
      selectedTeam.push(json);
      localStorage.setItem(teamName.split('-').join(' '), JSON.stringify(selectedTeam));
      appendNewPokèmon(teamName, json);
      document.getElementById('autoComplete').value = '';
      addPokemonModal.style.display = 'none';
      document.querySelector('#autoComplete').setAttribute('placeholder', '');
    }
  }
});

const deleteTeam = (team) => {
  localStorage.removeItem(team.split('-').join(' '));
  const deletedTeam = document.getElementById(team);
  deletedTeam.parentNode.removeChild(deletedTeam);
  if (localStorage.length === 0) {
    document.getElementById('team-container').insertAdjacentHTML('beforeend',
      `<span class="empty">No teams added yet</span>`
    );
  }
}