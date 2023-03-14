from frameAnalyzer import FrameAnalyzer
from array import array
import cv2 as cv2
import numpy as np

class ContrastAnalyzer(FrameAnalyzer):
    def __init__(self):
        self.ratios = []
        

    def reset(self):
        self.ratios = []

    #from https://www.tutorialspoint.com/color-quantization-in-an-image-using-k-means-in-opencv-python
    def quantise(self, img):
        
        z = img.reshape((-1,3))

        # convert to np.float32
        z = np.float32(z)

        # define criteria, number of clusters(K) and apply kmeans()
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
        K = 8
        ret,label,center=cv2.kmeans(z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)

        # Convert back into uint8, and make original image
        center = np.uint8(center)
        res = center[label.flatten()]
        res2 = res.reshape((img.shape))

        return res2
    
    #https://www.w3.org/WAI/GL/wiki/Relative_luminance
    #calculates relative luminance from rgb
    def luminance(self, rgb):
        RGB = tuple()
        for x in rgb:
            x/= 255.0

            if x <= 0.03928:
                x /= 12.92
                temp = (x,)
                RGB += temp

            else:
                x = pow(((x + 0.055) / 1.055), 2.4)
                temp = (x,)
                RGB += temp

        L = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
        return L


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

        for col1 in rgb:
            lum1 = self.luminance(col1)
            lum2 = 0
            for col2 in rgb:
                if col2 != col1:
                    lum2 = self.luminance(col2)

                    if lum1 > lum2:
                        ratio = (lum2  + 0.05) / (lum1 + 0.05)
                    else:
                        ratio = (lum1  + 0.05) / (lum2 + 0.05)

                    temp = (col2, col1, ratio)
                    if temp not in self.ratios:
                        temp = (col1, col2, ratio)
                        self.ratios.append(temp)

        self.ratios = sorted(self.ratios, key = lambda a: a[2], reverse=True)
        print(self.ratios)
        cv2.imshow('Image with K=64',img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    
    def processResults(self):
        self.contrast = 0

