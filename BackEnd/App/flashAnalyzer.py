from frameAnalyzer import FrameAnalyzer
from array import array
import cv2 as cv2

class FlashAnalyzer(FrameAnalyzer):
    def __init__(self,fps):
        super().__init__(fps)
        #variables for lumanince, and data
        self.lumalist = array('f', [])
        # first point, second point, time between them, difference between them
        self.data = [[]]
        self.midpoints = array('i', [])
        self.flashNum = 0
        self.pointsInSecond = array('i', [])
        self.count = 0

    def reset(self):
        self.lumalist = array('f', [])
        self.data = [[]]
        self.midpoints = array('i', [])
        self.flashNum = 0
        self.pointsInSecond = array('i', [])
        self.count = 0

    def analyzeFrame(self, frame):
        #ret, frame = cv2.threshold(frame, 220, 255, cv2.THRESH_BINARY)
        #change frame to colour space with luma attribute
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2YCrCb)
        #cv2.imshow('window-name', frame)
        #split frame into parts
        luma,a,b = cv2.split(frame)
        #get mean of frame luma and add it to list
        luma = cv2.mean(luma)

        self.lumalist.insert(self.count, luma[0])
        self.count += 1
    
    def processResults(self):
        self.populateMidPoints()
        self.checkFlashes()
        if self.flashNum > 6:
            print("This video flashes too many times")
        else:
            print("pass")

    def populateMidPoints(self):
        lumalist = self.lumalist
        for i in range(1,len(lumalist) - 1):
            brighterThanNext = (lumalist[i] >= lumalist[i + 1])
            brighterThanPrev = (lumalist[i] >= lumalist[i - 1])
            darkerThanNext = (lumalist[i] <= lumalist[i + 1])
            darkerThanPrev = (lumalist[i] <= lumalist[i - 1])
            if (brighterThanNext & brighterThanPrev) | (darkerThanNext & darkerThanPrev):
                self.midpoints.insert(self.count, i) 
                self.count += 1


    
    def checkFlashes(self):
        midpoints = self.midpoints
        lumalist = self.lumalist

        for i in range(len(midpoints) - 1):
            j = 0
            self.inTime = True
            if self.flashNum > 6:
                break
            else:
                self.flashNum = 0

            while self.inTime:
                j += 1
                if (i + j) < len(midpoints):
                    if (midpoints[i + j] - midpoints[i]) <= self.fps:
                        if(abs(lumalist[midpoints[i + j]] - lumalist[midpoints[i]]) > 10):
                            self.flashNum += 1

                    else:
                        self.inTime = False
                else:
                    break
