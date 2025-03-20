const fishData = [
    { species: "Trout", lake: "Lake Geneva", yearly_catch: { 2000: 500, 2001: 520, 2002: 480 } },
    { species: "Pike", lake: "Lake Zurich", yearly_catch: { 2000: 450, 2001: 470, 2002: 500 } }
];

let selectedFish = [null, null];
let selectedLake = [null, null];
let currentYear = 2000;
const endYear = 2002;

function populateCardDropdowns() {
    const fish1Select = document.getElementById("fish1Select");
    const fish2Select = document.getElementById("fish2Select");
    const lake1Select = document.getElementById("lake1Select");
    const lake2Select = document.getElementById("lake2Select");
    fishData.forEach((fish, index) => {
        let option1 = new Option(`${fish.species}`, index);
        let option2 = new Option(`${fish.species}`, index);
        fish1Select.add(option1);
        fish2Select.add(option2);

        option1 = new Option(`${fish.lake}`, index);
        option2 = new Option(`${fish.lake}`, index);
        lake1Select.add(option1);
        lake2Select.add(option2);
    });
}

function updateSelection(player) {

    const fish1Value = document.getElementById("fish1Select").value;
    const fish2Value = document.getElementById("fish2Select").value;
    selectedFish[0] = fish1Value ? parseInt(fish1Value) : null;
    selectedFish[1] = fish2Value ? parseInt(fish2Value) : null;

    const lake1Value = document.getElementById("lake1Select").value;
    const lake2Value = document.getElementById("lake2Select").value;
    selectedLake[0] = lake1Value ? parseInt(lake1Value) : null;
    selectedLake[1] = lake2Value ? parseInt(lake2Value) : null;
    document.getElementById("startButton").disabled = selectedFish[0] === null || selectedFish[1] === null || selectedLake[0] === null || selectedLake[1] === null;
}

function startGame() {
    if (selectedFish[0] === null || selectedFish[1] === null || selectedLake[0] == null || selectedLake[1] == null) return;
    currentYear = 2000;
    iterateYears();
}

function iterateYears() {
    if (currentYear > endYear) return;
    
    const fish1 = fishData[selectedFish[0]].yearly_catch[currentYear] || 0;
    const fish2 = fishData[selectedFish[1]].yearly_catch[currentYear] || 0;
    
    document.getElementById("year").textContent = "Year: " + currentYear;
    if (fish1 > fish2) {
        document.getElementById("winner").textContent = "Winner: " + fishData[selectedFish[0]].species;
    } else {
        document.getElementById("winner").textContent = "Winner: " + fishData[selectedFish[1]].species;
    }
    currentYear++;
    setTimeout(iterateYears, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    populateCardDropdowns();
});