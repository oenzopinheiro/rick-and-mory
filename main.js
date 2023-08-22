const rickElement = document.querySelector(".rickAndMoryApi");

let characterString = ""

async function getSingleCharacter(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
  .then((response) => {
    return response.json();
  })
  .then((response) => {


    rickElement.innerHTML = `
    <div class="box">
    <img src="${response.image}" class="img">
<div class="list">
    <div class="getSingleCharacter"> ${response.name}</div>
    </div>
    </div>
    `
  });
}

async function init() {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const { info, results} = response;

      results.forEach(showCharacters)

      rickElement.innerHTML = `
      <div class="characters_container">${characterString}
      </div>`
      
    }); 

    function showCharacters(character) {
      characterString = characterString + `
      <div class="box">
      <img src="${character.image}" class="img">
<div class="list">
      <div class="getSingleCharacter" onclick="getSingleCharacter(${character.id})"> ${character.name}</div><br>
      <div>Última localização conhecida:<br>${character.location.name}</div><br>
      <div>Genero:<br>${character.gender}</div>
      </div>
      </div>
      </div>

      `
    }
}

init();
