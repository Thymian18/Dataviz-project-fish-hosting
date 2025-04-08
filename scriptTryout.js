const cardBackgrounds = [
  'assets/emptyCards/card_empty_1.png',
  'assets/emptyCards/card_empty_2.png',
  'assets/emptyCards/card_empty_3.png',
  'assets/emptyCards/card_empty_4.png',
  'assets/emptyCards/card_empty_5.png',
  'assets/emptyCards/card_empty_6.png'
];

const fishSelect = document.getElementById("fishSelect");
const lakeSelect = document.getElementById("lakeSelect");
const fishImage = document.getElementById("fishImage");
const fishName = document.getElementById("fishName");
const lakeName = document.getElementById("lakeName");
const attackValue = document.getElementById("attackValue");

let fishData = {};

fetch("data/commercialFishing.json")
  .then(res => res.json())
  .then(data => {
    fishData = data;
    populateDropdowns(data);
  });

function populateDropdowns(data) {
  Object.keys(data).forEach(fish => {
    const option = document.createElement("option");
    option.value = fish;
    option.textContent = fish.toUpperCase();
    fishSelect.appendChild(option);
  });

  const lakes = data[Object.keys(data)[0]].map(entry => entry.Lake);
  lakes.forEach(lake => {
    const option = document.createElement("option");
    option.value = lake;
    option.textContent = lake.toUpperCase();
    lakeSelect.appendChild(option);
  });
}

function calculateAverage(data) {
  const years = Object.keys(data).filter(key => key !== "Lake");
  const values = years.map(y => parseFloat(data[y])).filter(v => !isNaN(v));
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg * 10) / 10;
}

function updateCard() {
  const fish = fishSelect.value;
  const lake = lakeSelect.value;

  fishName.textContent = fish ? fish.toUpperCase() : "-";
  lakeName.textContent = lake ? lake.toUpperCase() : "-";

  if (fish && lake && fishData[fish]) {
    const lakeData = fishData[fish].find(entry => entry.Lake === lake);

    if (lakeData) {
      const average = calculateAverage(lakeData);
      attackValue.textContent = `${average} KG`;

      fishImage.src = `assets/fish/${fish}.png`;
      const randomBg = cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];
      document.getElementById("fishCard").style.backgroundImage = `url('${randomBg}')`;
    }
  } else {
    attackValue.textContent = "-";
    fishImage.src = "";
    document.getElementById("fishCard").style.backgroundImage = "";
  }
}

// ✅ Correct event listeners
fishSelect.addEventListener("change", updateCard);
lakeSelect.addEventListener("change", updateCard);



// BATTLE CARDS

// Copies the selected champion info to the left battle card
function copyChampionToBattleCard() {
  // Copy values from the selection card
  const selectedFishName = fishName.textContent;
  const selectedLake = lakeName.textContent;
  const selectedAttack = attackValue.textContent;
  const selectedImage = fishImage.src;
  const selectedBg = document.getElementById("fishCard").style.backgroundImage;

  // Apply to battle card 1
  document.getElementById("card1").style.backgroundImage = selectedBg;
  document.querySelector("#card1 h3").textContent = selectedFishName;
  document.querySelector("#card1 img").src = selectedImage;
  document.querySelector("#card1 .card-footer span:nth-child(1)").textContent = selectedLake;
  document.querySelector("#card1 .card-footer span:nth-child(2)").textContent = selectedAttack;
}


function getRandomFishAndLake() {
  const fishList = Object.keys(fishData);
  const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
  const lakeEntries = fishData[randomFish];
  const randomLakeEntry = lakeEntries[Math.floor(Math.random() * lakeEntries.length)];
  return {
    fish: randomFish,
    lake: randomLakeEntry.Lake,
    data: randomLakeEntry
  };
}

function updateRightBattleCard() {
  const { fish, lake, data } = getRandomFishAndLake();
  const average = calculateAverage(data);
  const formattedFishName = fish.replaceAll(" ", "_").toLowerCase();
  const randomBg = cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];

  const card2 = document.getElementById("card2");
  card2.style.backgroundImage = `url('${randomBg}')`;
  document.querySelector("#card2 h3").textContent = fish.toUpperCase();
  document.querySelector("#card2 img").src = `assets/fish/${formattedFishName}.png`;
  document.querySelector("#card2 .card-footer span:nth-child(1)").textContent = lake.toUpperCase();
  document.querySelector("#card2 .card-footer span:nth-child(2)").textContent = `${average} KG`;
}

function prepareBattle() {
  copyChampionToBattleCard();
  updateRightBattleCard();
}
