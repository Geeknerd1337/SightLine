const removeDuplicates = (arr) => {
    let unique = arr.reduce(function (acc, curr) {
        if (!acc.includes(curr))
            acc.push(curr);
        return acc;
    }, []);
    return unique;
  }
  
  //https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
  const findBiggestColorRange = (rgbValues) => {
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
  
    rgbValues.forEach((pixel) => {
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
      return "r";
    } else if (biggestRange === gRange) {
      return "g";
    } else {
      return "b";
    }
  };
  
  //https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
  const quantization = (rgbValues, depth) => {
    const MAX_DEPTH = 4;
  
    // Base case
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
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
    rgbValues.sort((p1, p2) => {
      return p1[componentToSortBy] - p2[componentToSortBy];
    });
  
    const mid = rgbValues.length / 2;
    return [
      ...quantization(rgbValues.slice(0, mid), depth + 1),
      ...quantization(rgbValues.slice(mid + 1), depth + 1),
    ];
  };

  //const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
const getContrastArray = (RGB) => {

    const contrastArray = []
    let ratio = 0;
  
    for (let i = 0; i < RGB.length; i++){
        for (let j = 0; j < RGB.length; j++){
  
          if (i != j){
            const lum1 = RGB[i].r * 0.2126 + RGB[i].g * 0.7152 + RGB[i].b * 0.0722;
            const lum2 = RGB[j].r * 0.2126 + RGB[j].g * 0.7152 + RGB[j].b * 0.0722;
  
            if (lum1 > lum2){
              ratio = (lum2  + 0.05) / (lum1 + 0.05) 
            }
            else {
              ratio = (lum1  + 0.05) / (lum2 + 0.05) 
            }
  
            //const temp = [ratio, RGB[i], RGB[j]];
            //contrastArray.push(temp);
            contrastArray.push(ratio);
          }
        }
    }
  
    return contrastArray;
  }


  let values = [];

  for (let i = 0; i < 5; i++){
    const rgb = {
      r: Math.floor(Math.random() * (255 - 0) + 0),
      g: Math.floor(Math.random() * (255 - 0) + 0),
      b: Math.floor(Math.random() * (255 - 0) + 0)
    }

    values.push(rgb);
  }

  console.log(values);

    //let RGB = quantization(values, 0);
    //console.log(RGB);
    let RGB = removeDuplicates(values);
    console.log(RGB);

    let contrast = getContrastArray(RGB)

    console.log(contrast);