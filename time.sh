#!/bin/bash

if [ "$1" == "start" ]; then
	python3 dev/videoMotion/server.py
else
	killall python3
	cd dev/camera_projects/images/
	ffmpeg -framerate 24 -i image%03d.jpg date +"%s".mp4
	rm *
  cd ../../
  python3 drive.py
fi
