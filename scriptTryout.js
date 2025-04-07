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
  