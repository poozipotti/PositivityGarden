import { FlowerCanvas } from "./modules/FlowerCanvas.js";
import {initializeFlowers,updateFlowers} from './modules/Flower.js'

window.onload = function () {
  const flowerCanvas = new FlowerCanvas({
    canvasId: "flowerCanvas",
    canvasContainerId: "flowerCanvas",
  });
  flowerCanvas.flowers = initializeFlowers(4)
  flowerCanvas.update()
};

