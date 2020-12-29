import { FlowerCanvas } from "./modules/FlowerCanvas.js";
import { initializeFlowers } from "./modules/Flower.js";
import { analyzeText } from "./modules/Analysis.js";

window.onload = function () {
  const flowerCanvas = new FlowerCanvas({
    canvasId: "flowerCanvas",
    canvasContainerId: "flowerCanvas",
  });
  flowerCanvas.flowers = initializeFlowers(0);
  flowerCanvas.update();
  registerTextForm("message-form", "message-input", (text) => {
    flowerCanvas.clearFlowers();
    flowerCanvas.addTextFlower(text);
  });
};

function registerTextForm(formId, inputId, fn) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const textAnalysis = await analyzeText(input.value);
    fn(input.value);
  });
}
