// const fishData = [
//     commercialData,
//     { species: "Trout", lake: "Lake Geneva", yearly_catch: { 2000: 500, 2001: 520, 2002: 480 } },
//     { species: "Pike", lake: "Lake Zurich", yearly_catch: { 2000: 450, 2001: 470, 2002: 500 } }
// ];

let fishData = null;
let selectedFish = [null, null];
let selectedLake = [null, null];
let currentYear = 2000;
const endYear = 2002;

function populateCardDropdowns(fishData) {
    const lakeList = Object.keys(fishData);
    lakeList.forEach(lake => {
        if (lake != 'Total') {
            let option1 = new Option(lake);
            let option2 = new Option(lake);
            lake1Select.add(option1);
            lake2Select.add(option2);
        }
    });

    const speciesList = Object.keys(fishData.Total);
    speciesList.forEach(species => {
        let option1 = new Option(species);
        let option2 = new Option(species);
        fish1Select.add(option1);
        fish2Select.add(option2);
    });
}

function updateSelection() {
    const fish1Value = document.getElementById("fish1Select").value;
    const fish2Value = document.getElementById("fish2Select").value;
    selectedFish[0] = fish1Value;
    selectedFish[1] = fish2Value;

    const lake1Value = document.getElementById("lake1Select").value;
    const lake2Value = document.getElementById("lake2Select").value;
    selectedLake[0] = lake1Value;
    selectedLake[1] = lake2Value;
    document.getElementById("startButton").disabled = selectedFish[0] === null || selectedFish[1] === null || selectedLake[0] === null || selectedLake[1] === null;
}

function startGame() {
    if (selectedFish[0] === null || selectedFish[1] === null || selectedLake[0] == null || selectedLake[1] == null) return;
    currentYear = 2000;
    iterateYears();
}

function iterateYears() {
    if (currentYear > endYear) return;
    
    const fish1 = fishData[selectedLake[0]][selectedFish[0]][currentYear] || 0;
    const fish2 = fishData[selectedLake[1]][selectedFish[1]][currentYear] || 0;
    
    document.getElementById("year").textContent = "Year: " + currentYear;
    if (fish1 > fish2) {
        document.getElementById("winner").textContent = "Winner: " + selectedLake[0];
    } else {
        document.getElementById("winner").textContent = "Winner: " + selectedLake[1];
    }
    currentYear++;
    setTimeout(iterateYears, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('./data/commercialFishing2.json')
        .then(response => response.json())
        .then(data => {
            fishData = data
            populateCardDropdowns(fishData);
        })
        .catch(error => console.error('Error fetching JSON:', error));
    document.getElementById("startButton").addEventListener("click", startGame);

    document.getElementById("fish1Select").addEventListener("change", updateSelection);
    document.getElementById("fish2Select").addEventListener("change", updateSelection);
    document.getElementById("lake1Select").addEventListener("change", updateSelection);
    document.getElementById("lake2Select").addEventListener("change", updateSelection);
});