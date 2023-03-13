from pathlib import Path
from videoHandler import VideoHandler


if __name__ == "__main__":
    #Get local path as string
    path = str(Path(__file__).parent.absolute())
    
    fileName = "test.mp4"

    filePath = path + "\\" + fileName

    video = VideoHandler(filePath);