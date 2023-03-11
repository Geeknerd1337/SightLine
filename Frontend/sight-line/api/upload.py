from http.server import BaseHTTPRequestHandler
from datetime import datetime
 
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        file_content = self.rfile.read(content_length)

        # Do what you wish with file_content
        print(file_content)

        # Respond with 200 OK
        self.send_response(200)
        
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(str(datetime.now().strftime('%Y-%m-%d %H:%M:%S')).encode())