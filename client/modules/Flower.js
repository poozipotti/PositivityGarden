class Flowers {
  flowers = [];
  constructor(flower, options, amountOfFlowers = 10) {
    let flowers = [];
    if (flower) {
      flowers = new Array(amountOfFlowers)
        .fill(null)
        .map(() => flower(options || {}));
    }
    this.flowers = flowers;
  }
  addFlower(flower, options) {
    this.flowers = [...this.flowers, flower(options)];
  }
  clear() {
    this.flowers = [];
  }
}

function TextFlower({ x, y, text, sentiment }) {
  const { score, magnitude } = sentiment;
  const longerWords =
    text.split(" ").filter((word) => word.length >= 5).length + 1;
  const shorterWords =
    text.split(" ").filter((word) => word.length < 5).length + 1;
  const petals = Math.floor(text.length / 4);
  const curveWeight = 1.5;
  //hue will be from 0 to 2 and then converted to hue
  // hue range 1-155
  const hue = (1 + score) / 4;
  const saturation = 1;
  //magnitude is not normailized!!
  const lightness = 1;

  let colorArr = hslToRgb(hue, saturation, lightness);
  const colorString = colorArr.map((colVal) => {
    let colorVal = Math.floor(colVal).toString(16);
    return colorVal.length === 2 ? colorVal: `0${colorVal}`;
  }).join("");
  const color = `#${colorString}`;

  return {
    x,
    y,
    curveWeight, //curve weight
    width: longerWords * 30, //longer words
    height: shorterWords * 30, //shorter words
    number: Math.floor(petals), //number
    growRate: Math.random() * 0.5 + 0.5, //grow rate
    color: color, //color
  };
}

function RandomFlower({ x, y }) {
  let randomColor = "#000000".replace(/0/g, () =>
    (~~(Math.random() * 16)).toString(16)
  );
  return {
    x,
    y,
    width: Math.random() * 30 + (500 / flowerCanvas.width) * 10, //width
    height: Math.random() * 30 + (500 / flowerCanvas.height) * 10, //height
    curveWeight: Math.random() * 2, //curve weight
    number: Math.floor(Math.random() * 30) / 2 + 3, //number
    color: randomColor + "AA", //color
    growRate: Math.random() * 0.5 + 0.5, //grow rate
  };
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

export { Flowers, TextFlower, RandomFlower };
