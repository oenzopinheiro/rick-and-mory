const seilaElement = document.querySelector(".seila");

async function init() {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const { info, result } = response;
      seilaElement.innerHTML = info.next;
    });
}

init();
