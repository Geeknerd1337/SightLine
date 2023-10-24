//from https://www.geeksforgeeks.org/program-change-rgb-color-model-hsv-color-model/
//returns hue value from an rgb value
function rgb_to_h(r: number, g: number, b: number) {
  // R, G, B values are divided by 255
  // to change the range from 0..255 to 0..1
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;

  // h, s, v = hue, saturation, value
  var cmax = Math.max(r, Math.max(g, b)); // maximum of r, g, b
  var cmin = Math.min(r, Math.min(g, b)); // minimum of r, g, b
  var diff = cmax - cmin; // diff of cmax and cmin.
  var h = -1,
    s = -1;

  // if cmax and cmax are equal then h = 0
  if (cmax == cmin) h = 0;
  // if cmax equal r then compute h
  else if (cmax == r) h = (60 * ((g - b) / diff) + 360) % 360;
  // if cmax equal g then compute h
  else if (cmax == g) h = (60 * ((b - r) / diff) + 120) % 360;
  // if cmax equal b then compute h
  else if (cmax == b) h = (60 * ((r - g) / diff) + 240) % 360;

  // if cmax equal zero
  if (cmax == 0) s = 0;
  else s = (diff / cmax) * 100;

  const hs = {
    hue: h,
    sat: s,
  };

  return hs;
}

//from https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
//return luminance of an rgb value
function luminance(r: number, g: number, b: number) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

//from https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
//build an array of rgb objects, and return iy
const buildRgb = (imageData: Array<number>) => {
  const rgbValues = [];
  // note that we are loopin every 4!
  // for every Red, Green, Blue and Alpha
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = { r: imageData[i], g: imageData[i + 1], b: imageData[i + 2] };

    rgbValues.push(rgb);
  }

  return rgbValues;
};

//from https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
// returns what color channel has the biggest difference
const findBiggestColorRange = (rgbValues: any) => {
  /**
   * Min is initialized to the maximum value posible
   * from there we procced to find the minimum value for that color channel
   *
   * Max is initialized to the minimum value posible
   * from there we procced to fin the maximum value for that color channel
   */
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel: any) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  // determine which color has the biggest difference
  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return 'r';
  } else if (biggestRange === gRange) {
    return 'g';
  } else {
    return 'b';
  }
};

//from https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
//quantize with median cut
const quantization: any = (rgbValues: any, depth: number) => {
  const MAX_DEPTH = 4;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev: any, curr: any) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1: any, p2: any) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

//from https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
//sorts array of objects by key
//modified to go in descending order
function sortByKey(array: any, key: number) {
  return array.sort(function (a: any, b: any) {
    var x = a[key];
    var y = b[key];
    return x < y ? 1 : x > y ? -1 : 0;
  });
}

//decide which tests the colours will display for
const getColourRange = (hue: any) => {
  if (hue.sat < 15) {
    return 'NA';
  }

  //ranges might need adjusted
  //red
  if (hue.hue > 320 || hue.hue < 11) {
    return 'PD';
  }
  //green
  else if (hue.hue < 170 && hue.hue > 80) {
    return 'PD';
  }
  //yellow
  else if (hue.hue > 40 && hue.hue < 81) {
    return 'PDT';
  }
  //blue
  else if (hue.hue > 169 && hue.hue < 281) {
    return 'T';
  } else {
    return 'NA';
  }
};

//NEEDS THE MOST OPTIMISATION
//test contrast of image
const contrastTest = (rgbTestValues: any) => {
  //stores rgb pairs and their contrast
  let ratios = [];
  let skip = false;

  //get the luminance of every value pair
  for (let i = 0; i < rgbTestValues.length; i++) {
    const lumOne = luminance(
      rgbTestValues[i].r,
      rgbTestValues[i].g,
      rgbTestValues[i].b
    );

    for (let j = i + 1; j < rgbTestValues.length; j++) {
      //if values are the same, skip this iteration of loop
      if (
        rgbTestValues[i].r == rgbTestValues[j].r &&
        rgbTestValues[i].g == rgbTestValues[j].g &&
        rgbTestValues[i].b == rgbTestValues[j].b
      ) {
        continue;
      }

      //check if pair has all ready been added
      for (let k = 0; k < ratios.length; k++) {
        if (
          (ratios[k].colour1.r == rgbTestValues[i].r &&
            ratios[k].colour1.g == rgbTestValues[i].g &&
            ratios[k].colour1.b == rgbTestValues[i].b &&
            ratios[k].colour2.r == rgbTestValues[j].r &&
            ratios[k].colour2.g == rgbTestValues[j].g &&
            ratios[k].colour2.b == rgbTestValues[j].b) ||
          (ratios[k].colour1.r == rgbTestValues[j].r &&
            ratios[k].colour1.g == rgbTestValues[j].g &&
            ratios[k].colour1.b == rgbTestValues[j].b &&
            ratios[k].colour2.r == rgbTestValues[i].r &&
            ratios[k].colour2.g == rgbTestValues[i].g &&
            ratios[k].colour2.b == rgbTestValues[i].b)
        ) {
          skip = true;
        }
      }

      if (
        Math.abs(rgbTestValues[i].r - rgbTestValues[j].r) <= 10 ||
        Math.abs(rgbTestValues[i].g - rgbTestValues[j].g) <= 10 ||
        Math.abs(rgbTestValues[i].b - rgbTestValues[j].b) <= 10
      ) {
        skip = true;
      }

      //if it has been, skip adding again
      //if not, add it
      if (!skip) {
        const lumTwo = luminance(
          rgbTestValues[j].r,
          rgbTestValues[j].g,
          rgbTestValues[j].b
        );

        //use luminance to calculate contrast
        const ratio =
          lumOne > lumTwo
            ? (lumTwo + 0.05) / (lumOne + 0.05)
            : (lumOne + 0.05) / (lumTwo + 0.05);

        //add pair
        const ratioAndColours = {
          colour1: rgbTestValues[i],
          colour2: rgbTestValues[j],
          contrastRatio: ratio,
        };

        ratios.push(ratioAndColours);
      }

      //set skip back
      skip = false;
    }
  }
};

export {};
