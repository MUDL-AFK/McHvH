from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
from datetime import datetime, timedelta

class NoCacheHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Redirect root URL to index.html
        if self.path == '/' or self.path.startswith('/?'):
            self.path = '/index.html'

        # Clean URL mappings for local dev
        if self.path == '/main' or self.path.startswith('/main?'):
            self.path = '/index.html'
        if self.path == '/changelog' or self.path.startswith('/changelog?'):
            self.path = '/changelog.html'
        return SimpleHTTPRequestHandler.do_GET(self)

    def send_response(self, code, message=None):
        SimpleHTTPRequestHandler.send_response(self, code, message)
        # Force content to be treated as modified
        self.send_header('Last-Modified', self.date_time_string())

    def end_headers(self):
        # Prevent caching
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        # Force fresh content
        self.send_header('ETag', datetime.now().isoformat())
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    server_address = ('127.0.0.1', 8000)
    httpd = HTTPServer(server_address, NoCacheHandler)
    print(f'Serving at http://127.0.0.1:8000/ with cache disabled')
    httpd.serve_forever()
