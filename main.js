const rickElement = document.querySelector(".rickAndMoryApi");
const rickTexts = document.querySelector(".texts");
let characters = [];
let likesIds = [];
let charactersArray = []
let characterString = "";

function cleanContentElement() {
  characterString =  ''
}

function addLike(id) {
  if (!likesIds.includes(String(id))) {
    likesIds.push(String(id))  
  } else {
    likesIds = likesIds.filter((likeId) => {
      return likeId !== String(id)
    })
  }

  localStorage.setItem('@rickAndMortyLikes', likesIds);

  cleanContentElement()
  charactersArray.forEach(showCharacters);
  rickElement.innerHTML = `
  <div class="characters_container">${characterString}</div>
`;
}

async function getSingleCharacter(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      rickTexts.innerHTML = `
      <img src="/Assets/Vector.png" class="vector">
      <a href="http://localhost:5500/" class="back" id="back">Voltar</a>`

      rickElement.innerHTML = `
        <div class="box boxTwo">
        <div class="imgContainer">
          <img src="${response.image}" class="imgTwo" id="ImgTwoResponsive">
          </div>
          <div class="list">
            <div class="getSingleCharacter"> ${response.name}</div>
            <div>Última localização conhecida:<br>${response.location.name}</div><br>
            <div>Genero:<br>${response.gender}</div><br>
          </div>
        </div>
      `;
    });


}

async function init() { 
  
  let rickAndMortyLikesStorage = localStorage.getItem('@rickAndMortyLikes');
  if (!rickAndMortyLikesStorage) {
    localStorage.setItem('@rickAndMortyLikes', likesIds);
  } else {
    likesIds = localStorage.getItem('@rickAndMortyLikes').split(",");
  }

  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const { info, results } = response;

      charactersArray = results
      charactersArray.forEach(character => {
        showCharacters(character)
      });

      rickElement.innerHTML = `
        <div class="characters_container">${characterString}</div>
      `;
    });

 
}

function showCharacters(character) {
  const isLiked = likesIds.includes(String(character.id))

  characterString += `
    <div class="box">
      <img src="${character.image}" class="img">
      <div class="list">
        <div class="getSingleCharacter" onclick="getSingleCharacter(${character.id})"><p> ${character.name} </p></div><br>
        <div>Última localização conhecida:<br>${character.location.name}</div><br>
        <div>Genero:<br>${character.gender}</div><br>
        <div class="heart">
          <button id="${character.id}"  onclick="addLike(${character.id})" class="button-heart" onClick="isCharacterLiked(${character.id})">
          ${isLiked ? `<svg xmlns="http://www.w3.org/2000/svg" widht="1.5rem" height="1.25rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ff0000}</style><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>` : '<img src="/Assets/Heart.png">'} 
          </button>
        </div>
      </div>
    </div>
  `;
}

function showLikedCharacters(){
  cleanContentElement();

  charactersArray.forEach(character => {
    if (likesIds.includes(String(character.id))) {
      showCharacters(character);
    }
  });

  document.getElementById('likeds').classList.add("selected")
  document.getElementById('all').classList.remove("selected")
  rickElement.innerHTML = `
    <div class="characters_container">${characterString}</div>
  `;
    
}

init();
