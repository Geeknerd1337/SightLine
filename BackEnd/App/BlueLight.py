import numpy as np
import cv2 as cv2

from array import *

x = 0

# test function because opencv is a bitch about hue range
def rgb_to_hsv(r, g, b):
    r, g, b = r/255.0, g/255.0, b/255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx-mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g-b)/df) + 360) % 360
    elif mx == g:
        h = (60 * ((b-r)/df) + 120) % 360
    elif mx == b:
        h = (60 * ((r-g)/df) + 240) % 360
    if mx == 0:
        s = 0
    else:
        s = (df/mx)*100
    v = mx*100
    return h, s, v

def getBlueLight(video):
    #testing with image instead of video
    img = cv2.imread("test.png")
    #array for amount of pixels in blue light range for each frame
    blueLightInImage = array('i', [])
    arrayPlace = 0
    #while video.isOpened():
    for i in range(4):
        #read a frame
        ret,frame = video.read()
        #if it worked
        #if ret == True:
        if True:
            #number of blue light pixels in the frame
            countBLpixels = 0

            #TEST
            #b,g,r = cv2.split(img)
            #hue1,s,v = rgb_to_hsv(r[0][0], g[0][0], b[0][0])
            #print(hue1)
            
            #change to hsv
            imgHSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV_FULL)
            #cv2.imshow('window', imgHSV)

            #get hue
            hue = imgHSV[...,0]
            #hue, a, b = cv2.split(imgHSV)
            print(hue)

            #find pixels in range
            (rows1, cols1) = np.where(np.logical_and(hue >= 142, hue <= 150))

            #increment count and draw over relevant pixels
            for r, c in zip(rows1, cols1):
                countBLpixels += 1
                cv2.rectangle(img, (c,r), (c,r), (255, 255, 255), 1)

            cv2.imshow("Image", img)
            print(countBLpixels)

            #add to array
            blueLightInImage.insert(arrayPlace, countBLpixels)
            arrayPlace += 1
        else:
            break

    print(blueLightInImage)

getBlueLight(x)
