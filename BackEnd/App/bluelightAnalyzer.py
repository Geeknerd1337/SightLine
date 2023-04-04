from frameAnalyzer import FrameAnalyzer
from array import array
import cv2 as cv2
import numpy as np

class BlueLightAnalyzer(FrameAnalyzer):
    def __init__(self):
        #array for amount of pixels in blue light range for each frame
        self.blueLightInImage = array('i', [])
        self.arrayPlace = 0
        

    def reset(self):
        self.blueLightInImage = array('i', [])
        self.arrayPlace = 0

    def analyzeFrame(self, frame):
        #test on assured image
        #img = cv2.imread("test.png")
        #frame = img
        #number of blue light pixels in the frame
        countBLpixels = 0
 
        #change to hsv
        frameHSV = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV_FULL)
        #cv2.imshow('window', img)
        #cv2.waitKey()

        #get hue
        hue = frameHSV[...,0]

        #print(hue)

        #find pixels in range
        (rows1, cols1) = np.where(np.logical_and(hue >= 142, hue <= 150))

        #increment count and draw over relevant pixels
        for r, c in zip(rows1, cols1):
            countBLpixels += 1
            cv2.rectangle(frame, (c,r), (c,r), (255, 255, 255), 1)

        cv2.imshow("Image", frame)
        cv2.waitKey(10)
        #print(countBLpixels)

        #add to array
        self.blueLightInImage.insert(self.arrayPlace, countBLpixels)
        self.arrayPlace += 1

    
    def processResults(self):
        print(self.blueLightInImage)

