from frameAnalyzer import FrameAnalyzer
import cv2 as cv2
import numpy as np
import colorsys

class ContrastAnalyzer(FrameAnalyzer):
    def __init__(self):
        self.ratios = []
        self.AAL = 1/3
        self.AASAAAL = 1/4.5
        self.AAAS = 1/7
        

    def reset(self):
        self.ratios = []

    #FIGURE OUT WHAT K SHOULD BE
    #K is how many colours we quantise to
    #less is quicker, more is accurate
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
    
    #decide which tests the colour is relevant for
    def relevantTests(self, hue, sat):

        hue *= 360
        sat *= 100

        if sat < 15:
            return "NA"
        
        if hue > 320 or hue < 11:
            return "PD"
        
        elif hue < 170 and hue > 80:
            return "PD"
        
        elif hue > 40 and hue < 81:
            return "PDT"
        
        elif hue > 169 and hue < 281:
            return "T"
        
        else:
            return "NA"


    def analyzeFrame(self, frame):
        rgb = set()

        #currently testing a different image instead of video
        #cv2.imshow("Image", frameRGB)

        img = cv2.imread("test.png")
        frame = img

        #quantise the colours
        img = self.quantise(img)
        #cv2.imshow("weh", img)
        h = img.shape[0]
        w = img.shape[1]
    
         # loop over the image, pixel by pixel
         #get every colour as a rgb value
        for y in range(0, h):
            for x in range(0, w):
                b,g,r = img[y,x]
                colours = (r,g,b)
                if colours not in rgb:
                    rgb.add(colours)

        #for every rgb value, get the luminance
        for col1 in rgb:
            lum1 = self.luminance(col1)
            lum2 = 0

            #get the luminance of every other colour
            for col2 in rgb:
                if col2 != col1:
                    lum2 = self.luminance(col2)

                    #get the contrast ratio, and which tests the colours count for
                    if lum1 > lum2:
                        ratio = (lum2  + 0.05) / (lum1 + 0.05)
                    else:
                        ratio = (lum1  + 0.05) / (lum2 + 0.05)

                    hue1 = colorsys.rgb_to_hsv(col1[0], col1[1], col1[2])
                    hue2 = colorsys.rgb_to_hsv(col2[0], col2[1], col2[2])

                    letters1 = self.relevantTests(hue1[0], hue1[1])
                    letters2 = self.relevantTests(hue2[0], hue2[1])

                    #add ratio to ratios if it hasn't been added
                    temp = (col2, col1, ratio, letters2, letters1)
                    if temp not in self.ratios:
                        temp = (col1, col2, ratio, letters1, letters2)
                        self.ratios.append(temp)

        #sort by ratio 
        self.ratios = sorted(self.ratios, key = lambda a: a[2], reverse=True)
        

        #test stuff
        #print(self.ratios)

        #cv2.imshow('Image with K=64',img)
        #cv2.waitKey(0)
        #cv2.destroyAllWindows()
    
    
    def processResults(self):
        #print every rgb duo, which tests they're relevant for, and which standards they pass

        """for x in self.ratios:
            print(x[0], x[1], "\nRelevant Tests: ")

            if x[3] == "PD" or x[3] == "PDT" and x[4] == "PD" or x[4] == "PDT":
                print("Protonopia, Deuteranopia, ")
            
            if x[3] == "T" or x[3] == "PDT" and x[4] == "T" or x[4] == "PDT":
                print("Tritanopia, ")

            print("Monochromacy\n")

            if x[2] < self.AAL:
                print("AA Large PASS | ")
            else:
                print("AA Large FAIL | ")

            if x[2] < self.AASAAAL:
                print("AA Small PASS | AAA Large PASS | ")
            else:
                print("AA Small FAIL | AAA Small FAIL | ")
            
            if x[2] < self.AAAS:
                print("AAA Small PASS | ")
            else:
                print("AAA Small FAIL | ")

            print("\n\n") """

