const stateSelectField = document.querySelector("select[name=uf]");
const citySelectField = document.querySelector("select[name=city]");
const stateInputField = document.querySelector("input[name=state]");
const itemsInputField = document.querySelector("input[name=items]");
const buttonsCollectItems = document.querySelectorAll(".collect-items button");

async function populateUFs() {
  await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => response.json())
    .then(states => {
      for (let state of states) {
        stateSelectField.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}
populateUFs()


stateSelectField.addEventListener("change", async (event) => {
  citySelectField.disabled = true;

  const indexOfSelectedState = event.target.selectedIndex;
  const selectedState = event.target.options[indexOfSelectedState].text;
  stateInputField.value = selectedState;

  const cityId = (event.target.value);
  citySelectField.innerHTML = '<option value="">Choose your city</option>';

  await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cityId}/municipios`)
    .then(response => response.json())
    .then(cities => {
      for (city of cities) {
        citySelectField.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelectField.disabled = false;
    })
})


let selectedItems = [];

for (button of buttonsCollectItems) {
  button.addEventListener("click", (event) => {
    const buttonClicked = event.currentTarget;
    buttonClicked.classList.toggle("selected");
  
    const itemButtonClicked = buttonClicked.dataset.id;
    const indexOfIdButton = selectedItems.indexOf(itemButtonClicked);
  
    indexOfIdButton !== -1
    ? selectedItems.splice(indexOfIdButton, 1)
    : selectedItems.push(itemButtonClicked);
  
    itemsInputField.value = selectedItems;
  })
}



