import cv2 as cv2
from flashAnalyzer import FlashAnalyzer
from contrastAnalyzer import ContrastAnalyzer
from bluelightAnalyzer import BlueLightAnalyzer

import numpy as np



class VideoHandler:
    def __init__(self, videoPath):
        self.video = cv2.VideoCapture(videoPath)

        print("---------")
        print(self.video.isOpened());
        print("---------")
        print(self.video);

        self.fps = int(self.video.get(cv2.CAP_PROP_FPS))
        self.count = 0
        
        self.analyzers = []

        #Add a flash Analyzer
        self.analyzers.append(FlashAnalyzer(self.fps))
        self.analyzers.append(ContrastAnalyzer())
        self.analyzers.append(BlueLightAnalyzer())
        self.analyzeVideo(self.video)

    def analyzeVideo(self,video):

        if (self.video.isOpened()== False):
            print("Error opening video file")

        #while video.isOpened():
        for i in range(1):
            #read a frame
            ret,frame = video.read()
            #if it worked
            if ret == True:
                # Call analyzeFrame on each analyzer
                for analyzer in self.analyzers:
                    analyzer.analyzeFrame(frame)
            else:
                break

        video.release()

        # Call processResults on each analyzer
        for analyzer in self.analyzers:
            analyzer.processResults()
        

        
