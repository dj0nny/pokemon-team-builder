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

const initializeTeamList = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const element = localStorage.key(i);
    document.getElementById('team-container').insertAdjacentHTML('beforeend',
      `
        <div class="grid-container full" id="team-${i}">
          <div class="grid-x">
            <div class="cell medium-12">
              <h2>${element}</h2>
            </div>
          </div>
        </div>
      `
    );
    // const team = localStorage.getItem(element);
    console.log(JSON.parse(localStorage.getItem(element)));
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
    <div class="grid-container full" id="team-${localStorage.length}">
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

// document.getElementById('submit-pkmn').addEventListener('click', async () => {
//   const pkmn = document.getElementById('pokemon-name').value;
//   if (pkmn === '') {
//     alert('Input cannot be empty');
//   } else {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn}`);
//       const json = await response.json();
//       console.log(json)

//     // let xhttp = new XMLHttpRequest();
//     // xhttp.onreadystatechange = function() {
//     //   if (this.readyState == 4 && this.status == 200) {
//     //     const parsedResponse = JSON.parse(this.responseText)
//     //     document.getElementById('team-container').insertAdjacentHTML('beforeend',
//     //       `
//     //       <div class="grid-container">
//     //         <div class="grid-x grid-margin-x">
//     //           <div class="cell medium-4">
//     //             <img src="${parsedResponse.sprites.front_default}" class="sprite" />
//     //           </div>
//     //           <div class="cell medium-8">
//     //             info
//     //           </div>
//     //         </div>
//     //       </div>
//     //       `
//     //     );
//     //     team.push(parsedResponse);
//     //     localStorage.setItem('pokemonTeam', JSON.stringify(team));
//     //   }
//     // }
//     // xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${pkmn}`, true);
//     // xhttp.send();
//   }
// });