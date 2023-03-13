from frameAnalyzer import FrameAnalyzer
from array import array
import cv2 as cv2
import numpy as np

class ContrastAnalyzer(FrameAnalyzer):
    def __init__(self):
        self.contrast = 0
        

    def reset(self):
        self.contrast = 0

    #from https://www.tutorialspoint.com/color-quantization-in-an-image-using-k-means-in-opencv-python
    def quantise(self, img):
        
        z = img.reshape((-1,3))

        # convert to np.float32
        z = np.float32(z)

        # define criteria, number of clusters(K) and apply kmeans()
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
        K = 64
        ret,label,center=cv2.kmeans(z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)

        # Convert back into uint8, and make original image
        center = np.uint8(center)
        res = center[label.flatten()]
        res2 = res.reshape((img.shape))

        return res2

    def analyzeFrame(self, frame):
        rgb = set()
        frameRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        #cv2.imshow("Image", frameRGB)

        img = cv2.imread("test.png")

        #quantise the colours
        img = self.quantise(img)
        frame = img
        #cv2.imshow("weh", img)

        h = frame.shape[0]
        w = frame.shape[1]
    
         # loop over the image, pixel by pixel
        for y in range(0, h):
            for x in range(0, w):
                b,g,r = frame[y,x]
                colours = (r,g,b)
                if colours not in rgb:
                    rgb.add(colours)

        print(rgb)

        cv2.imshow('Image with K=64',img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    
    def processResults(self):
        self.contrast = 0

