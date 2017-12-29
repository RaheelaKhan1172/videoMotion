#!/usr/bin/env python

import os
import urllib
from http.server import BaseHTTPRequestHandler, HTTPServer
from camera import take_picture

LOOP_BACK_ADDRESS = '0.0.0.0'
index = 0

class RouteHandler(BaseHTTPRequestHandler):#

  def do_GET(self):
    self.send_response(200)
    
    ## send videos 

  def do_POST(self):
    global index
    self.send_response(200)
    
    self.send_header('Content-type',  'text/html')
    self.end_headers()
    
    index += 1
    take_picture('%03d'%index)
    self.wfile.write(bytes('hi', 'utf8'))

    return


if __name__ == '__main__':
  httpd = HTTPServer((LOOP_BACK_ADDRESS, 8000), RouteHandler)
  print('started server')
  httpd.serve_forever()  
