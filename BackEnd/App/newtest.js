const RGBToHSL = (r, g, b) => {
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
    return (60 * h < 0 ? 60 * h + 360 : 60 * h)
  };

  let numBLpixels = 0;

  for (let i = 0; i < 5; i++){
    let r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let b = Math.floor(Math.random() * (255 - 0 + 1) + 0);

    let hue = RGBToHSL(r, g, b);
    if (hue >= 200 && hue <= 211){
      numBLpixels += 1;
    }
  }


  let r = 0;
  let g = 149;
  let b = 255;
  let hue = RGBToHSL(r, g, b);
  if (hue >= 200 && hue <= 211){
    numBLpixels += 1;
  }

  console.log(numBLpixels);


  