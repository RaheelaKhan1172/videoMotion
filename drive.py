#!/usr/bin/env python
import dropbox
import glob
import os

def main():
  access_token = os.getenv('VIDEOACCESS')
  box = dropbox.Dropbox(access_token)
  files = glob.glob('/home/pi/dev/camera_projects/images/*.mp4')
  latest = max(files, key=os.path.getctime) # get all videos from ^^, and pick latest saved video
  path_to = '/raheelasVideos/' + latest
  with open(latest, 'rb') as f:
    box.files_upload(f.read(), path_to) 


if __name__ == '__main__':
  main()
