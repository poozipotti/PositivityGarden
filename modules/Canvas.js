class Canvas {
  context = null;
  constructor(context) {
    if (!context) {
      throw new Error("Expected a context!");
    }
    this.context = context;
  }

  update(drawer) {
    drawer.setup(this.context);
    drawer.drawStep(this.context);
    drawer.cleanup(this.context);
  }
}

class Drawer {
  setup = null;
  cleanup = null;
  drawStep = null;
  constructor({ setup, cleanup, drawStep }) {
    this.setup = setup;
    this.cleanup = cleanup;
    this.drawStep = drawStep;
  }
}

export { Canvas, Drawer };
