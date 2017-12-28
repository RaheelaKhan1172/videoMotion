from http.server import BaseHTTPRequestHandler, HTTPServer
from os import curdir

LOOP_BACK_ADDRESS = '127.0.0.1' 

class ClientHandler(BaseHTTPRequestHandler):
  def do_GET(self):
    self.send_response(200)

    if (self.path == '/'):
      self.path = "/index.html"
    
    try:
      if self.path.endswith('.html'):
        mimetype = 'text/html'

      if self.path.endswith('.js'):
        mimetype = 'application/javascript'

      if self.path.endswith('.css'):
        mimetype = 'text/css'
  
    except IOError:
      self.send_error(404, 'Not Found: %s' % self.path) 
     
    current_file = open(curdir + '/static' + self.path)
    self.send_header('Content-type', mimetype)
    self.end_headers()
    self.wfile.write(bytes(current_file.read(),'utf8'))
    current_file.close()
    return


if __name__ == '__main__':
  httpd = HTTPServer((LOOP_BACK_ADDRESS, 8080), ClientHandler)
  print('started client server')
  httpd.serve_forever() 
