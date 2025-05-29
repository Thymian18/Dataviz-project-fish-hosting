const cardBackgrounds = [
  'assets/emptyCards/card_empty_1.png',
  'assets/emptyCards/card_empty_2.png',
  'assets/emptyCards/card_empty_3.png',
  'assets/emptyCards/card_empty_4.png',
  'assets/emptyCards/card_empty_5.png',
  'assets/emptyCards/card_empty_6.png'
];

let selectedFish1 = "";
let selectedLake1 = "";
let selectedFish2 = "";
let selectedLake2 = "";
let currentScores = [0, 0];



const fishSelect = document.getElementById("fishSelect");
const lakeSelect = document.getElementById("lakeSelect");
const fishImage = document.getElementById("fishImage");
const fishName = document.getElementById("fishName");
const lakeName = document.getElementById("lakeName");
const attackValue = document.getElementById("attackValue");

let fishDataHobby = {};
let fishDataCommercial = {};
let lakeToFishMapCommercial = {};
let lakeToFishMapHobby = {};
let currentMode = 'hobby';

// to hold the mapping of lakes to fish for the sampling of the right battle card


// fetch("data/commercial_lakesToFish.json")
//   .then(res => res.json())
//   .then(data => {
//     lakeToFishMapCommercial = data;
//   });

Promise.all([
  fetch("data/hobbyFishing.json").then(res => res.json()),
  fetch("data/commercialFishing.json").then(res => res.json()),
  fetch("data/hobby_lakesToFish.json").then(res => res.json()),
  fetch("data/commercial_lakesToFish.json").then(res => res.json()),
]).then(([hobbyData, commercialData, hobbyLakesToFish, commercialLakesToFish]) => {
  fishDataHobby = hobbyData;
  fishDataCommercial = commercialData;
  lakeToFishMapHobby = hobbyLakesToFish;
  lakeToFishMapCommercial = commercialLakesToFish;

  // Initialize dropdowns using default mode
  populateDropdowns(getCurrentData());
  setLakePlaceholder();
});

// fetch("data/hobbyFishing.json")
//   .then(res => res.json())
//   .then(data => {
//     fishDataHobby = data;
//     populateDropdowns(data);
//     setLakePlaceholder();
//   });

// fetch("data/commercialFishing.json")
//   .then(res => res.json())
//   .then(data => {
//     fishDataCommercial = data;
//     // If you want to populate commercial data, you can do it here
//     // populateDropdowns(data);
//   });

function getCurrentData() {
  return currentMode === "hobby" ? fishDataHobby : fishDataCommercial;
}

function getCurrentLakeToFishMap() {
  return currentMode === "hobby" ? lakeToFishMapHobby : lakeToFishMapCommercial;
}


function populateDropdowns(data) {
  Object.keys(data).forEach(fish => {
    const option = document.createElement("option");
    option.value = fish;
    option.textContent = fish.toUpperCase();
    fishSelect.appendChild(option);
  });
}

fishSelect.addEventListener("change", () => {
  const selectedFish = fishSelect.value;
  populateLakesForFish(selectedFish);
});

function populateLakesForFish(fish) {
  lakeSelect.innerHTML = "";

  const lakeEntries = getCurrentData()[fish];
  // const lakeEntries = fishDataHobby[fish];
  if (!lakeEntries) return;
  const yearKeys = Object.keys(lakeEntries[0]).filter(key => /^\d{4}$/.test(key));

  let addedAny = false;

  lakeEntries.forEach(entry => {
    const lake = entry.Lake;
    const allZero = yearKeys.every(year => entry[year] === 0);

    if (!allZero && lake.toUpperCase() !== "TOTAL") {
      const option = document.createElement("option");
      option.value = lake;
      option.textContent = lake.toUpperCase();
      lakeSelect.appendChild(option);
      addedAny = true;
    }
  });

  if (!addedAny) {
    const noValid = document.createElement("option");
    noValid.disabled = true;
    noValid.selected = true;
    noValid.textContent = "No lakes with data";
    lakeSelect.appendChild(noValid);
  }
}

function setLakePlaceholder() {
  lakeSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = "-- Choose your fighter first --";
  lakeSelect.appendChild(placeholder);
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

  const fishData = getCurrentData();
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
  const selectedFishName = fishName.textContent;
  const selectedLake = lakeName.textContent;
  const selectedAttack = attackValue.textContent;
  const selectedImage = fishImage.src;
  const selectedBg = document.getElementById("fishCard").style.backgroundImage;

  const card1 = document.getElementById("card1");
  card1.style.backgroundImage = selectedBg;
  const card1Title = card1.querySelector("h3");
  card1Title.textContent = selectedFishName;
  card1Title.style.color = "#6666FF"; // Blue
  card1.querySelector("img").src = selectedImage;
  card1.querySelector(".card-footer span:nth-child(1)").textContent = selectedLake;
  card1.querySelector(".card-footer span:nth-child(2)").textContent = selectedAttack;
}


// function getRandomFishFromSameLake(lakeName) {
//   const fishEntries = Object.keys(fishDataHobby).filter(fish => {
//     return fishDataHobby[fish].some(entry => entry.Lake === lakeName);
//   });

//   const randomFish = fishEntries[Math.floor(Math.random() * fishEntries.length)];
//   const lakeEntry = fishDataHobby[randomFish].find(entry => entry.Lake === lakeName);

//   return {
//     fish: randomFish,
//     lake: lakeName,
//     data: lakeEntry
//   };
// }

function getRandomFishFromSameLake(lakeName) {
  const allowedFish = getCurrentLakeToFishMap()[lakeName] || [];

  const fishData = getCurrentData();
  const validFishEntries = allowedFish.filter(fish => {
    const lakeEntry = fishData[fish]?.find(entry => entry.Lake === lakeName);
    if (!lakeEntry) return false;

    const yearKeys = Object.keys(lakeEntry).filter(k => /^\d{4}$/.test(k));
    return yearKeys.some(year => lakeEntry[year] > 0);
  });

  if (validFishEntries.length === 0) {
    console.warn(`No valid opponent fish found for lake "${lakeName}"`);
    return null;
  }

  const randomFish = validFishEntries[Math.floor(Math.random() * validFishEntries.length)];
  const lakeEntry = fishData[randomFish].find(entry => entry.Lake === lakeName);

  return {
    fish: randomFish,
    lake: lakeName,
    data: lakeEntry
  };
}


// function updateRightBattleCard() {
//   const selectedLake = lakeSelect.value;
//   if (!selectedLake) {
//     console.warn("No lake selected for opponent generation.");
//     return;
//   }

//   const { fish, lake, data } = getRandomFishFromSameLake(selectedLake);

//   selectedFish2 = fish;
//   selectedLake2 = lake;

//   const average = calculateAverage(data);
//   const formattedFishName = fish.replaceAll(" ", "_").toLowerCase();
//   const randomBg = cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];

//   const card2 = document.getElementById("card2");
//   card2.style.backgroundImage = `url('${randomBg}')`;
 
//   const card2Title = document.querySelector("#card2 h3");
//   card2Title.textContent = fish.toUpperCase();
//   card2Title.style.color = "#FF6663"; // Red

//   document.querySelector("#card2 img").src = `assets/fish/${formattedFishName}.png`;
//   document.querySelector("#card2 .card-footer span:nth-child(1)").textContent = lake.toUpperCase();
//   document.querySelector("#card2 .card-footer span:nth-child(2)").textContent = `${average} KG`;
// }

function updateRightBattleCard() {
  const selectedLake = lakeSelect.value;
  if (!selectedLake) {
    console.warn("No lake selected for opponent generation.");
    return;
  }

  const result = getRandomFishFromSameLake(selectedLake);
  if (!result) {
    alert("No valid opponent fish found for this lake.");
    return;
  }

  const { fish, lake, data } = result;

  selectedFish2 = fish;
  selectedLake2 = lake;

  const average = calculateAverage(data);
  const formattedFishName = fish.replaceAll(" ", "_").toLowerCase();
  const randomBg = cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)];

  const card2 = document.getElementById("card2");
  card2.style.backgroundImage = `url('${randomBg}')`;

  const card2Title = document.querySelector("#card2 h3");
  card2Title.textContent = fish.toUpperCase();
  card2Title.style.color = "#FF6663";

  document.querySelector("#card2 img").src = `assets/fish/${formattedFishName}.png`;
  document.querySelector("#card2 .card-footer span:nth-child(1)").textContent = lake.toUpperCase();
  document.querySelector("#card2 .card-footer span:nth-child(2)").textContent = `${average} KG`;
}



// BATTLE STUFF --------------------------


function prepareBattle() {
  copyChampionToBattleCard();
  updateRightBattleCard();

  // Set score names before fight starts
  const fish1 = fishSelect.value.toUpperCase();
  const fish2 = selectedFish2.toUpperCase();

  document.getElementById("fish1Name").textContent = fish1;
  document.getElementById("fish2Name").textContent = fish2;

  // Reset score display
  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";

  // Reset winner display
  document.getElementById("winnerName").textContent = "-";
  document.getElementById("winnerStatement").textContent = "WINS WITH X POINTS!";
}

function startBattle() {
  selectedFish1 = fishSelect.value;
  selectedLake1 = lakeSelect.value;

  const fishData = getCurrentData();

  const entry1 = fishData[selectedFish1]?.find(e => e.Lake === selectedLake1);
  const entry2 = fishData[selectedFish2]?.find(e => e.Lake === selectedLake2);

  if (!entry1 || !entry2) {
    console.error("Missing data for fish or lake");
    return;
  }

  const years = Object.keys(entry1)
    .filter(key => key !== "Lake" && key in entry2)
    .sort((a, b) => a - b);

  // Prepare year-by-year values
  const fish1Yearly = {};
  const fish2Yearly = {};
  years.forEach(year => {
    fish1Yearly[year] = parseFloat(entry1[year]) || 0;
    fish2Yearly[year] = parseFloat(entry2[year]) || 0;
  });

  // Reset
  currentScores = [0, 0];
  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";
  document.getElementById("winnerName").textContent = "-";
  document.getElementById("winnerStatement").textContent = "WINS WITH X POINTS!";

  // Show fish names in the score display
  document.getElementById("fish1Name").textContent = selectedFish1.toUpperCase();
  document.getElementById("fish2Name").textContent = selectedFish2.toUpperCase();

  // Setup animated chart
  setupBattlePlot(
    years,
    Math.max(...Object.values(fish1Yearly), ...Object.values(fish2Yearly))
  );

  let linePoints1 = [];
  let linePoints2 = [];
  let index = 0;

  function iterate() {
    if (index >= years.length) {
      announceWinner();
      return;
    }

    const year = years[index];
    const val1 = fish1Yearly[year];
    const val2 = fish2Yearly[year];

    if (val1 > val2) currentScores[0]++;
    else if (val2 > val1) currentScores[1]++;

    document.getElementById("score1").textContent = currentScores[0];
    document.getElementById("score2").textContent = currentScores[1];

    // Add data to chart
    linePoints1.push({ year, value: val1 });
    linePoints2.push({ year, value: val2 });

    lineBlue.datum(linePoints1).attr("d", lineGen);
    lineRed.datum(linePoints2).attr("d", lineGen);

    index++;
    setTimeout(iterate, 700);
  }

  iterate();
}


function announceWinner() {
  const fish1Name = selectedFish1.toUpperCase();
  const fish2Name = selectedFish2.toUpperCase();
  document.getElementById("fish1Name").textContent = fish1Name;
  document.getElementById("fish2Name").textContent = fish2Name;

  if (currentScores[0] > currentScores[1]) {
    document.getElementById("winnerName").textContent = fish1Name;
    document.getElementById("winnerStatement").textContent = `WINS WITH ${currentScores[0]} POINTS!`;
  } else if (currentScores[1] > currentScores[0]) {
    document.getElementById("winnerName").textContent = fish2Name;
    document.getElementById("winnerStatement").textContent = `WINS WITH ${currentScores[1]} POINTS!`;
  } else {
    document.getElementById("winnerName").textContent = "IT'S A TIE!";
    document.getElementById("winnerStatement").textContent = `BOTH HAVE ${currentScores[0]} POINTS!`;
  }
}

// PLOTTING ---------------

let svg, xScale, yScale, lineGen, lineBlue, lineRed, yearsGlobal;

function setupBattlePlot(years, maxY) {
  const container = d3.select(".battle-plot-segment");
  container.selectAll("*").remove();

  yearsGlobal = years;

  const outerWidth = 0.8 * container.node().clientWidth;
  const outerHeight = 0.8 * container.node().clientHeight;
  const margin = { top: 20, right: 20, bottom: 60, left: 80 };

  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  const svgContainer = container.append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);

  svg = svgContainer.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


  xScale = d3.scaleLinear()
    .domain(d3.extent(years.map(Number)))
    .range([0, width]);

  yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0]);

  lineGen = d3.line()
    .x(d => xScale(+d.year))
    .y(d => yScale(d.value))
    .curve(d3.curveMonotoneX);

  lineBlue = svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "#676AF4")
    .attr("stroke-width", 3);

  lineRed = svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "#FF6663")
    .attr("stroke-width", 3);

  // Y-Axis: KG
  svg.append("g")
    .call(d3.axisLeft(yScale))
    .call(g => {
      g.selectAll("text")
        .style("fill", "#FFFAE9")
        .style("font-family", "'JetBrains Mono', monospace")
        .style("font-size", "12px");

      g.selectAll("line").style("stroke", "#FFFAE9");
      g.select(".domain").style("stroke", "#FFFAE9");
    });

  // X-Axis: Year
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.format("d")))
    .call(g => {
      g.selectAll("text")
        .style("fill", "#FFFAE9")
        .style("font-family", "'JetBrains Mono', monospace")
        .style("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("dy", "1.2em");

      g.selectAll("line").style("stroke", "#FFFAE9");
      g.select(".domain").style("stroke", "#FFFAE9");
    });

  // X-Axis Label
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .style("fill", "#FFFAE9")
    .style("font-size", "14px")
    .style("font-family", "var(--font-titles)")
    .text("YEAR");

  // Y-Axis Label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .attr("text-anchor", "middle")
    .style("fill", "#FFFAE9")
    .style("font-size", "14px")
    .style("font-family", "var(--font-titles)")
    .text("KG FISHED");
}




function handleModeToggle(toggle) {
  const modeText = document.getElementById('modeText');
  currentMode = toggle.checked ? "commercial" : "hobby";
  modeText.textContent = toggle.checked ? "Commercial" : "Hobby";
  fishSelect.selectedIndex = 0;

  // Re-populate with correct dataset
  populateDropdowns(getCurrentData());
  setLakePlaceholder();
}