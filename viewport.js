function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  

  function updateCardLabelBackground(cardBackgroundEl) {
    const screenWidth = window.innerWidth;
    const isSmall = screenWidth <= 1000;
  
    const img = isSmall
      ? 'assets/cardlabel_small.png'
      : 'assets/labels.png';
  
    cardBackgroundEl.style.backgroundImage = `url('${img}')`;
  
    // Apply scaling class only for the small version
    cardBackgroundEl.classList.toggle('scale-small', isSmall);
  }
  

  function updateAllCardLabels() {
    const cardBackgrounds = document.querySelectorAll('.card-background');
    cardBackgrounds.forEach(updateCardLabelBackground);
  }
  
  window.addEventListener('load', updateAllCardLabels);
  window.addEventListener('resize', updateAllCardLabels);
  