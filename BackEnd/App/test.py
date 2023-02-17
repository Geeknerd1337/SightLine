import numpy as np
import cv2 as cv2
import time
from array import *

#install opencv
#pip install opencv-contrib-python

#video variable and get fps from it
video = cv2.VideoCapture('lightstest.mp4')
count = 0
fps = int(video.get(cv2.CAP_PROP_FPS))

#variables for lumanince, and data
lumalist = array('f', [])
# first point, second point, time between them, difference between them
data = [[]]
midpoints = array('i', [])
flashNum = 0
pointsInSecond = array('i', [])

#check if video opened
if (video.isOpened()== False):
    print("Error opening video file")

while video.isOpened():
    #read a frame
    ret,frame = video.read()
    #if it worked
    if ret == True:
        #ret, frame = cv2.threshold(frame, 220, 255, cv2.THRESH_BINARY)
        #change frame to colour space with luma attribute
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2YCrCb)
        #cv2.imshow('window-name', frame)
        #split frame into parts
        luma,a,b = cv2.split(frame)
        #get mean of frame luma and add it to list
        luma = cv2.mean(luma)
        #print(luma)
        lumalist.insert(count, luma[0])
        count = count + 1
    else:
        break
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

video.release()
count = 0
#include 0 and end in midpoints?

#find points where luminance is lower or higher than points next to it, ie midpoints
for i in range(1,len(lumalist) - 1):
    if ((lumalist[i] >= lumalist[i + 1]) & (lumalist[i] >= lumalist[i - 1])) | ((lumalist[i] <= lumalist[i + 1]) & (lumalist[i] <= lumalist[i - 1])):
        midpoints.insert(count, i) 
        count += 1



#check how many flashes go above a certain number, (10 is artbitrary), in the range of a second
for i in range(len(midpoints) - 1):
    j = 0
    inTime = True
    if flashNum > 6:
        break
    else:
        flashNum = 0

    while inTime:
        j += 1
        if (i + j) < len(midpoints):
            if (midpoints[i + j] - midpoints[i]) <= fps:
                if(abs(lumalist[midpoints[i + j]] - lumalist[midpoints[i]]) > 10):
                    flashNum += 1

            else:
                inTime = False
        else:
            break

if flashNum > 6:
    print("This video flashes too many times")
else:
    print("pass")

count = 0
#Store data version
#this could be useful in the future
#it stores a set of data: the first point, second point, time between points, and difference between lumanince of points
for i in range(len(midpoints) - 1):
    data.insert(count, [midpoints[i], midpoints[i + 1], (abs(midpoints[i] - midpoints[i + 1]) / fps), abs(lumalist[midpoints[i]] - lumalist[midpoints[i + 1]])])
    count += 1

print(data)

cv2.destroyAllWindows() # destroy all opened windows