import { Drawer, Canvas } from "./Canvas.js";

class FlowerCanvas {
  canvas = null;
  flowers = [];
  constructor({ canvasId, canvasContainerId }) {
    let flowerCanvas = document.getElementById(canvasId);
    let flowerCanvasContainer = document.getElementById(canvasContainerId);
    let myContext = flowerCanvas.getContext("2d");

    const tempWidth = flowerCanvasContainer.clientWidth;
    myContext.canvas.width = tempWidth;
    myContext.canvas.height = tempWidth + 4;

    this.canvas = new Canvas(myContext);
    window.onresize = function () {
      myContext.canvas.width = tempWidth;
      myContext.canvas.height = tempWidth;
    };
  }
  update() {
    this.canvas.update(FlowerDrawer(this.flowers));
  }
}

const FlowerDrawer = (flowers) => {
  const { setupFlowers, cleanupFlowers } = getSetupCleanup();
  return new Drawer({
    setup: setupFlowers,
    drawStep: drawflowers(flowers),
    cleanup: cleanupFlowers,
  });
};

const drawflowers = (flowers) => (context) => {
  flowers.forEach((flower) => {
    console.log(flower);
    drawFlower({ flower, canvasContext: context });
  });
};
const getSetupCleanup = (
  primaryColor = "#87ceeb",
  secondaryColor = "#3F3931"
) => ({
  setupFlowers: (flowerContext) => {
    flowerContext.fillStyle = primaryColor;
    flowerContext.fillRect(0, 0, flowerCanvas.width, flowerCanvas.height);
  },
  cleanupFlowers: (flowerContext) => {
    flowerContext.fillStyle = secondaryColor;
    flowerContext.fillRect(0, flowerCanvas.height - 10, flowerCanvas.width, 10);
  },
});

function drawFlower({ flower, canvasContext }) {
  const { x, y, width, height, curveWeight, number, color } = flower;
  let TO_RADIANS = Math.PI / 180;

  //stem 
  canvasContext.translate(x, y);
  canvasContext.fillStyle = "#42f495";
  canvasContext.fillRect(-2.5, 0, 5, flowerCanvas.height - y);
  //petals
  for (let j = 0; j < number; j++) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);
    canvasContext.quadraticCurveTo(curveWeight * width, height, width, 0);
    canvasContext.moveTo(0, 0);
    canvasContext.quadraticCurveTo(curveWeight * width, -1 * height, width, 0);
    canvasContext.fill();
    canvasContext.rotate(TO_RADIANS * (360 / number));
  }
  canvasContext.rotate(TO_RADIANS * (360 / number));
  // flower's center
  canvasContext.fillStyle = "#fced7e";
  canvasContext.beginPath();
  canvasContext.arc(0, 0, 10, 0, 2 * Math.PI);
  canvasContext.fill();
  //reset
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
}
export { FlowerCanvas };
