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
const fish1Name = document.getElementById("fishName");
const lake1Name = document.getElementById("lakeName");
const attack1Value = document.getElementById("attackValue");

let fish1NameLowercase = "";
let lake1NameLowercase = "";
let fish2Name = "";
let lake2Name = "";

let lakeData = {};

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/commercialFishing2.json")
    .then(res => res.json())
    .then(data => {
      lakeData = data;
      populateDropdowns(data);
    })
    .catch(error => console.error('Error fetching JSON:', error));

  // ✅ Correct event listeners
  const toArenaButton = document.getElementById("to-arena-button");
  toArenaButton.addEventListener("click", prepareBattle)

  const startButton = document.getElementById("fight-button");
  startButton.addEventListener("click", startGame);

  fishSelect.addEventListener("change", updateCard);
  lakeSelect.addEventListener("change", updateCard);
});

function populateDropdowns(data) {
  Object.keys(data).forEach(lake => {
    const option = document.createElement("option");
    option.value = lake;
    option.textContent = lake.toUpperCase();
    lakeSelect.appendChild(option);
  });

  const fishes = Object.keys(data["Total"]); //.map(entry => entry.Fish);
  fishes.forEach(fish => {
    const option = document.createElement("option");
    option.value = fish;
    option.textContent = fish.toUpperCase();
    fishSelect.appendChild(option);
  });
}

function calculateAverage(data) {
  const years = Object.keys(data);
  const values = years.map(y => parseFloat(data[y])).filter(v => !isNaN(v));
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg * 10) / 10;
}

function updateCard() {
  const fish = fishSelect.value;
  const lake = lakeSelect.value;

  fish1NameLowercase = fish ? fish : "";
  lake1NameLowercase = lake ? lake : "";

  fish1Name.textContent = fish ? fish.toUpperCase() : "-";
  lake1Name.textContent = lake ? lake.toUpperCase() : "-";

  if (fish && lake && lakeData[lake]) {
    // console.log(`Type of lakeData[${lake}]:`, typeof lakeData[lake]);
    // console.log(`Value of lakeData[${lake}]:`, lakeData[lake]);

    const fishData = lakeData[lake][fish];//.find(entry => entry.Fish === fish);

    if (fishData) {
      const average = calculateAverage(fishData);
      attack1Value.textContent = `${average} KG`;

      fishImage.src = `assets/fish/${fish}.png`;
      const randomBg = cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];
      document.getElementById("fishCard").style.backgroundImage = `url('${randomBg}')`;
    }
  } else {
    attack1Value.textContent = "-";
    fishImage.src = "";
    document.getElementById("fishCard").style.backgroundImage = "";
  }
}





// BATTLE CARDS

// Copies the selected champion info to the left battle card
function copyChampionToBattleCard() {
  // Copy values from the selection card
  const selectedFishName = fish1Name.textContent;
  const selectedLake = lake1Name.textContent;
  const selectedAttack = attack1Value.textContent;
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
  const lakeList = Object.keys(lakeData).filter(lake => lake != "Total");
  // console.log(`lake list: ${lakeList}`);
  const randomLake = lakeList[Math.floor(Math.random() * lakeList.length)];
  // console.log(`random lake: ${randomLake}`);
  const fishEntries = Object.keys(lakeData[randomLake]);
  // console.log(`fish entries: ${fishEntries}`);
  const randomFishEntry = fishEntries[Math.floor(Math.random() * fishEntries.length)];
  // console.log(`random fish entry: ${randomFishEntry}`);
  return {
    fish: randomFishEntry,
    lake: randomLake,
    data: lakeData[randomLake][randomFishEntry]
  };
}

function updateRightBattleCard() {
  const { fish, lake, data } = getRandomFishAndLake();

  fish2Name = fish;
  lake2Name = lake;

  const average = calculateAverage(data);
  // console.log(`Type of ${fish}:`, typeof fish);
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

  const battleSection = document.getElementById("battle");
  if (battleSection) {
    battleSection.scrollIntoView({ behavior: "smooth" });
  }
}




// Manage the battle
let currentScores = [0, 0];
let currentYear = 2000;
const endYear = 2005;

function iterateYears(callback) {
  if (currentYear > endYear) {
      console.log("Iteration complete, return to callback.");
      callback();  // Call the callback when iteration is complete
      return;
  }

  // console.log(`Fish data keys: ${Object.keys(lakeData)}`);
  const fish1name = fish1NameLowercase;
  const lake1name = lake1NameLowercase;
  // console.log(`fish1 keys = ${Object.keys(lakeData[lake1name])}, lake1name_lc = ${lake1name}`);

  const fish1 = lakeData[lake1name][fish1name][currentYear] || 0;
  const fish2name = fish2Name;
  const lake2name = lake2Name;
  const fish2 = lakeData[lake2name][fish2name][currentYear] || 0;
  
  // document.getElementById("year").textContent = "Year: " + currentYear;
  console.log(`Year: ${currentYear}`);
  if (fish1 > fish2) {
      // document.getElementById("pointWinner").textContent = "Last point won by: Fish Card 1";
      console.log(`You won the last point`);
      currentScores[0]++;
      // document.getElementById("score1").textContent = "Fish Card 1: " + currentScores[0];
      console.log(`Your current score: ${currentScores[0]}`);
  } else {
      // document.getElementById("pointWinner").textContent = "Last point won by: Fish Card 2";
      console.log(`You lost the last point`);
      currentScores[1]++;
      // document.getElementById("score2").textContent = "Fish Card 2: " + currentScores[1];
      console.log(`The computer's current score: ${currentScores[1]}`);
  }
  currentYear++;
  console.log("Next year!");
  setTimeout(() => iterateYears(callback), 1000); // Continue iterating until finished
}


function announceWinner() {
  if (currentScores[0] > currentScores[1]) {
      document.getElementById("winnerName").textContent = "Winner: Card 1";
  }
  else if (currentScores[0] < currentScores[1]) {
      document.getElementById("winnerName").textContent = "Winner: Card 2";
  }
  else {
      document.getElementById("winnerName").textContent = "Winner: Both!";
  }
}


function startGame() {
  const fish1name = fish1Name.textContent;
  const lake1name = lake1Name.textContent;
  const fish2name = fish2Name;
  const lake2name = lake2Name;

  console.log("The game gets started...");
  console.log(`fish1name = ${fish1name}, fish2name = ${fish2name}, lake1name = ${lake1name}, lake2name = ${lake2name}`);

  if (fish1name === '' || fish2name === '' || lake1name == '' || lake2name == '') {
    console.log("Return early");
    return;
  }
  currentYear = 2000;
  currentScores = [0, 0];

  console.log("About to call iterateYears");

  iterateYears(() => {
      announceWinner();  // Call announceWinner() only after all years are processed
  });
}
