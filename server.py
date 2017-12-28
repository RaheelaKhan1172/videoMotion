#!/usr/bin/env python

import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from camera import take_picture
import threading
#import pdb
from picamera import PiCamera

LOOP_BACK_ADDRESS = '127.0.0.1'



class RouteHandler(BaseHTTPRequestHandler):#
  index = 0
  def do_GET(self):
    self.send_response(200)

    self.send_header('Content-type',  'text/html')
    self.end_headers()
    #on each ping, take a picture, save it in directory, and at end of day at
    #12:00 am, shut it down, make video, and save it in directory\
    
   # thread = threading.Thread(target=take_picture, args=('%03d'%self.index,)) #starts new thread take takes picture
    #thread.start()

    self.index += 1
    take_picture('%03d'%self.index)
    self.wfile.write(bytes('hi', 'utf8'))

    return


if __name__ == '__main__':
  httpd = HTTPServer((LOOP_BACK_ADDRESS, 8000), RouteHandler)
  print('started server')
  httpd.serve_forever()  
