from http.server import BaseHTTPRequestHandler
import os
from os.path import join
from datetime import datetime
# from flask_restful import reqparse


# class handler(BaseHTTPRequestHandler):

# def POST(self):
#     # parser = reqparse.RequestParser()
#     # parser.add_argument('rate', type=int, help='Rate cannot be converted')
#     # parser.add_argument('name')
#     # args = parser.parse_args()
#     file_nameup = args.file.filename
#     print(file_nameup)

class handler(BaseHTTPRequestHandler):

    def do_PUT(self):
        # """Save a file following a HTTP PUT request"""
        filename = os.path.basename(self.path)

        # Don't overwrite files
        if os.path.exists(filename):
            self.send_response(409, 'Conflict')
            self.send_header(
                'Content-Type:', 'application/octet-stream')
            self.send_header(
                'Content-Disposition', 'attachment; filename="filename.png"; filename*="filename.png"')
            self.end_headers()
            reply_body = '"%s" already exists\n' % filename
            self.wfile.write(reply_body.encode('utf-8'))
            return

        file_length = int(self.headers['Content-Length'])
        read = 0
        with open(filename, 'wb+') as output_file:
            while read < file_length:
                new_read = self.rfile.read(min(66556, file_length - read))
                read += len(new_read)
                output_file.write(new_read)
        self.send_response(201, 'Created')
        self.end_headers()
        reply_body = 'Saved "%s"\n' % filename
        self.wfile.write(reply_body.encode('utf-8'))
