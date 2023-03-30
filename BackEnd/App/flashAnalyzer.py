from frameAnalyzer import FrameAnalyzer
from array import array
import cv2 as cv2

#if less than 3%, it good

class FlashAnalyzer(FrameAnalyzer):
    def __init__(self,fps):
        super().__init__(fps)
        #variables for lumanince, and data

        # first point, second point, time between them, difference between them
        self.data = [[]]
        self.midpoints = []
        self.flashNum = 0
        self.pointsInSecond = array('i', [])
        self.count = 0
        self.highestFlashCount = 0
        self.lumaSquares = []

    def reset(self):
        self.lumaSquares = array('f', [])
        self.data = [[]]
        self.midpoints = array('i', [])
        self.flashNum = 0
        self.pointsInSecond = array('i', [])
        self.count = 0
        self.highestFlashCount = 0


    def analyzeFrame(self, frame):

        #change frame to colour space with luma attribute
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2YCrCb)
        
        #get grid of 1% squares

        width = frame.shape[1]
        height = frame.shape[0]

        hChange = int(height / 5)
        wChange = int(width / 5)

        curWidth = 0
        curHeight = 0

        #add the luma of each grid area to the list

        #go grid area by grid area, and add its luminance to the lumaSqaures array
        for i in range(5):
            for j in range(5):
                croppedImg = frame[curHeight:curHeight + hChange, curWidth:curWidth + wChange]

                curHeight += hChange
                luma = croppedImg[0]
                luma = cv2.mean(luma)
                #self.lumaSquares.insert(self.count, luma[0])
                self.lumaSquares.append(luma[0])
                self.count += 1

            curWidth += wChange
            curHeight = 0

        
    
    def processResults(self):
        self.count = 0
        j = 0

        #for each square, create a list of the luminance in all frames of that square
        for i in range(24):
            squares = []
            while j < len(self.lumaSquares):
                squares.append(self.lumaSquares[j])
                j += 24
            
            self.count += 1
            j = self.count

            #find the midpoints, and count the flashes
            self.populateMidPoints(squares)
            self.checkFlashes(squares)

            self.midpoints.clear()
            
            #if the amount of flashes from that square is highest, change it to that amount
            if self.flashNum > self.highestFlashCount:
                self.highestFlashCount = self.flashNum
            self.flashNum = 0

        if self.highestFlashCount > 6:
            print("This video flashes too many times")
        else:
            print("pass")


    def populateMidPoints(self, squares):
        self.count = 0

        #find the spots where the luminance is between the last and next values
        for i in range(1,len(squares) - 1):
            brighterThanNext = (squares[i] >= squares[i + 1])
            brighterThanPrev = (squares[i] >= squares[i - 1])
            darkerThanNext = (squares[i] <= squares[i + 1])
            darkerThanPrev = (squares[i] <= squares[i - 1])
            if (brighterThanNext & brighterThanPrev) | (darkerThanNext & darkerThanPrev):
                #self.midpoints.insert(self.count, i)
                self.midpoints.append(i)




    
    def checkFlashes(self, squares):
        midpoints = self.midpoints

        #check how many flashes there are in a second
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
                    #if the this point is still in the second
                    if (midpoints[i + j] - midpoints[i]) <= self.fps:
                        #if it counts as a flash
                        if(abs(squares[midpoints[i + j]] - squares[midpoints[i]]) > 10):
                            self.flashNum += 1

                    else:
                        self.inTime = False
                else:
                    break
