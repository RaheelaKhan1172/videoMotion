#!/usr/bin/env python
import os
from picamera import PiCamera
from time import sleep

def take_picture(index):
  camera = PiCamera()
  camera.start_preview()

  camera.capture('/home/pi/dev/camera_projects/images/image_{}.jpg'.format(index))

  camera.stop_preview()

  camera.close()

