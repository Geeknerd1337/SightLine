const getMidpoints = (values) =>{
    let count = 0

    console.log("le fuck");
  
    const midpoints = [];
  
    //find the spots where the luminance is between the last and next values
    for (let i = 1; i < values.length - 1; i++){
        let brighterThanNext = (values[i] >= values[i + 1]);
        let brighterThanPrev = (values[i] >= values[i - 1]);
        let darkerThanNext = (values[i] <= values[i + 1]);
        let darkerThanPrev = (values[i] <= values[i - 1]);
        console.log("no here");
  
        if(brighterThanNext && brighterThanPrev || darkerThanNext && darkerThanPrev){
            console.log("here");
          midpoints.push(i)
        }
    }
  
    console.log(midpoints);
    return midpoints
  }
  
  const checkFlashes = (values, midpoints, fps) =>{
  
    let flashNum = 0;
  
    //check how many flashes there are in a second
    for (let i = 0; i < midpoints.length - 1; i++){
      let j = 0;
      let inTime = true;
      
      if (flashNum > 6) {
        break;
      }
      else {
        flashNum = 0;
      }
  
      while (inTime){
        j += 1;
  
        if ((i + j) < midpoints.length) {
          //if the this point is still in the second
          if ((midpoints[i + j] - midpoints[i]) <= fps){
          //if it counts as a flash
            if (Math.abs(values[midpoints[i + j]] - values[midpoints[i]]) > 20){
              flashNum += 1;
            }
          }
          else {
            inTime = false;
          }
        }
        else {
          break;
        }
      }
    }
  
    return flashNum;
  }


      //SEE IF WE CAN FIND FPS FROM VIDEO
      const fps = 30;

      const values = [255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0, 255, 255, 0, 0]
      const midpoints = getMidpoints(values);
      const flashNum = checkFlashes(values, midpoints, fps);

      //console.log(values);
      //console.log(midpoints);

      console.log(flashNum);