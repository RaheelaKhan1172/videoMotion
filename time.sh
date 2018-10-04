#!/bin/bash

if [ "$1" == "start" ]; then
	python3 dev/videoMotion/server.py
else if [ "$1" == "end" ]; then
	killall python3
	cd dev/camera_projects/images/
	ffmpeg -framerate 24 -i image%03d.jpg date +"%s".mp4
	rm *.jpg
  cd ../../
  python3 drive.py
else
	echo "No command entered. Enter 'start' to start the camera server or 'end' to kill all running instances"
fi
