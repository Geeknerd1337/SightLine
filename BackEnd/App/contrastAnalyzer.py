from frameAnalyzer import FrameAnalyzer
from array import array
import cv2 as cv2

class ContrastAnalyzer(FrameAnalyzer):
    def __init__(self):
        self.contrast = 0
        

    def reset(self):
        self.contrast = 0

    def analyzeFrame(self, frame):
        self.contrast = 0
    
    def processResults(self):
        self.contrast = 0

