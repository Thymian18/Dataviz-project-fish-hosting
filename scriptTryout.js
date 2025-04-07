function updateCard() {
    const fish = fishSelect.value;
    const lake = lakeSelect.value;
  
    // Always update the fish name
    fishNameElem.textContent = fish ? fish.toUpperCase() : "-";
  
    // Always update the lake name
    lakeNameElem.textContent = lake ? lake.toUpperCase() : "-";
  
    // Check if both selections are valid
    if (fish && lake && fishData[lake] && fishData[lake][fish]) {
      // Calculate the average damage
      const yearlyData = Object.values(fishData[lake][fish]);
      const averageDamage = Math.round(yearlyData.reduce((sum, value) => sum + value, 0) / yearlyData.length);
      avgDamageElem.textContent = `${averageDamage} KG`;
  
      // Update fish image
      const formattedFishName = formatFishName(fish);
      fishImgElem.src = `assets/fish/${formattedFishName}.png`;
  
      // Set a random background for the card
      const backgrounds = [
        'assets/emptyCards/card_empty_1.png',
        'assets/emptyCards/card_empty_2.png',
        'assets/emptyCards/card_empty_3.png',
        'assets/emptyCards/card_empty_4.png',
        'assets/emptyCards/card_empty_5.png',
        'assets/emptyCards/card_empty_6.png'
      ];
      const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      cardElem.style.backgroundImage = `url('${randomBg}')`;
    } else {
      // Reset specific elements if both fish and lake are not valid
      avgDamageElem.textContent = "-";
      fishImgElem.src = "";
      cardElem.style.backgroundImage = "";
    }
  }
  

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


