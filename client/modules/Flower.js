function initializeFlowers(amountOfFlowers = 10) {
  const aTextFlower = randomFlower()
  const flowers = new Array(amountOfFlowers)
    .fill(null)
    .map((_,i) => ({ ...aTextFlower,x: (i+1)*200 }));

  /*setInterval(function () {
    updateCanvas();
  }, 100);
  */
  return flowers;
}

function textFlower({ x, y }, textToConvert) {
  const longerWords = textToConvert
    .split(" ")
    .filter((word) => word.length >= 5).length + 1;
  const shorterWords = textToConvert
    .split(" ")
    .filter((word) => word.length < 5).length + 1; 
  const petals = Math.floor(textToConvert.length / 4);
  const curveWeight = 1.5
  let randomColor = "#000000".replace(/0/g, () =>
    (~~(Math.random() * 16)).toString(16)
  );

  return {
    x,
    y,
    curveWeight, //curve weight
    width: longerWords * 30, //longer words
    height: shorterWords * 30, //shorter words
    number: Math.floor(petals), //number
    growRate: Math.random() * 0.5 + 0.5, //grow rate
    color: randomColor + "AA", //color
  };
}

function randomFlower() {
  let randomColor = "#000000".replace(/0/g, () =>
    (~~(Math.random() * 16)).toString(16)
  );
  return {
    x: Math.random() * flowerCanvas.width, //x
    y: flowerCanvas.height - flowerCanvas.height * 0.1, //y
    width: Math.random() * 30 + (500 / flowerCanvas.width) * 10, //width
    height: Math.random() * 30 + (500 / flowerCanvas.height) * 10, //height
    curveWeight: Math.random() * 2, //curve weight
    number: Math.floor(Math.random() * 30) / 2 + 3, //number
    color: randomColor + "AA", //color
    growRate: Math.random() * 0.5 + 0.5, //grow rate
  };
}

function updateFlowers(flowers) {
  //update flowers
  return flowers.map((flower) =>
    flower.y >= flowerCanvas.height / 2 ? flower : randomFlower()
  );
}
export { initializeFlowers, updateFlowers, textFlower };
