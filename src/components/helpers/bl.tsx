const RGBToHue = (r: number, g: number, b: number): number => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return 60 * h < 0 ? 60 * h + 360 : 60 * h;
  };
  
  const getFrameBlueLight = (canvas: HTMLCanvasElement): number => {
    // get the canvas context
    const context = canvas.getContext("2d");
  
    let numBLpixels = 0;
  
    if (!context) {
      return -1;
    }
  
    // get the pixel data for the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
  
      let hue = RGBToHue(r, g, b);
  
      if (hue >= 150 && hue <= 240) {
        numBLpixels += 1;
      }
    }
  
    return numBLpixels;
  };