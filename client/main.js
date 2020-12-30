import { FlowerCanvas } from "./modules/FlowerCanvas.js";
import { analyzeText } from "./modules/Analysis.js";
import { TextFlower } from "./modules/Flower.js";

window.onload = function () {
  const flowerCanvas = new FlowerCanvas({
    canvasId: "flowerCanvas",
    canvasContainerId: "flowerCanvas",
    flower: TextFlower,
    flowerOptions: {
      text: "i am a very kind happy message",
      sentiment: { score: 0, magnitude: 0 },
      x: 500,
      y: 500,
    },
    amountOfFlowers: 1,
  });
  registerTextForm("message-form", "message-input", ({ text, sentiment }) => {
    flowerCanvas.clearFlowers();
    flowerCanvas.addTextFlower({ text, sentiment });
  });
};

function registerTextForm(formId, inputId, fn) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { documentSentiment } = await analyzeText(input.value);
    document.getElementById(
      "sentiment-display"
    ).innerHTML = `score:${documentSentiment.score} magnitude:${documentSentiment.magnitude}`;

    fn({ text: input.value, sentiment: documentSentiment });
  });
}
