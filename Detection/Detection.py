from imutils.video import VideoStream
import numpy as np
import argparse
import imutils
import cv2

def CreateArgumentParser():
    ap = argparse.ArgumentParser()
    ap.add_argument("-p", "--prototxt",
                    help="path to Caffe 'deploy' prototxt file")
    ap.add_argument("-m", "--model",
                    help="path to Caffe pre-trained model")
    ap.add_argument("-c", "--confidence", type=float, default=0.5,
                    help="minimum probability to filter weak detections")
    ap.add_argument("--camera_IP",help="camera IP")

    ap.add_argument("--camera_Port",help="camera Port")
    args = vars(ap.parse_args())
    return args

def GetDetectionFromImage(image):
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)),
                                 0.007843, (300, 300), 150.5)
    net = cv2.dnn.readNetFromCaffe(args["prototxt"], args["model"])
    net.setInput(blob)
    detections = net.forward()
    return  detections

def GetDetectedObjectClass(Object):
    return int(Object[1])

def GetDetectionConfidence(Object):
    return Object[2]

def PrintBoxAndLabelAroundObject(Object,Color=(255,0,0)):
    box =Object[3:7] * np.array([w, h, w, h])
    (startX, startY, endX, endY) = box.astype("int")

    # draw the prediction on the frame
    label = "{}: {:.2f}%".format("People",
                                 GetDetectionConfidence(Object) * 100)
    cv2.rectangle(frame, (startX, startY), (endX, endY),
                  Color, 2)
    y = startY - 15 if startY - 15 > 15 else startY + 15
    cv2.putText(frame, label, (startX, y),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5,Color, 2)
def PrintNumberOfPeople(Color=(0,0,255)):
    cv2.putText(frame,"{}".format(PeopleCounter), (w-20, 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, Color, 2)

args = CreateArgumentParser()
resizedFrameSize=600


vs = VideoStream("http://"+args["camera_IP"]+ ":"+ args["camera_Port"] + "/video?x.mjpeg").start()
#vs = VideoStream(1).start()

PeopleCounter = 0
frame = vs.read()

frame = imutils.resize(frame, width=resizedFrameSize, height=resizedFrameSize)
(h, w) = frame.shape[:2]

detections = GetDetectionFromImage(frame)
for i in detections[0,0]:#Loop over the detections
    if(int(i[1])==15): #Object Class
        PrintBoxAndLabelAroundObject(i)
        PeopleCounter=PeopleCounter+1


print(PeopleCounter)
vs.stop()