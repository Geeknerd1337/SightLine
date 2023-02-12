import numpy as np
import cv2 as cv2
import time
from array import *

#install opencv
#pip install opencv-contrib-python

video = cv2.VideoCapture('lightstest.mp4')
count = 0
fps = int(video.get(cv2.CAP_PROP_FPS))

lumalist = array('f', [])
# first point, second point, time between them, difference between them
data = [[]]
midpoints = array('i', [])
flashNum = 0
pointsInSecond = array('i', [])

if (video.isOpened()== False):
    print("Error opening video file")

while video.isOpened():
    ret,frame = video.read()
    if ret == True:
        #ret, frame = cv2.threshold(frame, 220, 255, cv2.THRESH_BINARY)
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2YCrCb)
        #cv2.imshow('window-name', frame)
        luma,a,b = cv2.split(frame)
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


for i in range(1,len(lumalist) - 1):
    if ((lumalist[i] >= lumalist[i + 1]) & (lumalist[i] >= lumalist[i - 1])) | ((lumalist[i] <= lumalist[i + 1]) & (lumalist[i] <= lumalist[i - 1])):
        midpoints.insert(count, i) 
        count += 1




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
for i in range(len(midpoints) - 1):
    data.insert(count, [midpoints[i], midpoints[i + 1], (abs(midpoints[i] - midpoints[i + 1]) / fps), abs(lumalist[midpoints[i]] - lumalist[midpoints[i + 1]])])
    count += 1

print(data)

cv2.destroyAllWindows() # destroy all opened windows