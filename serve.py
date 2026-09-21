#!/usr/bin/env python3
"""Local preview server for the NEAL landing page.

Plain `python3 -m http.server` also works, but this one:
  - hides `docs/` (the original signage photos) and dev files,
  - returns 404 instead of a directory listing,
  - disables caching, so a refresh always shows the latest edit.

Usage:  python3 serve.py [port]      # default 8765
"""

import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
BLOCKED = {'docs', 'serve.py', 'README.md', '.gitignore', '.git'}


class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        top = self.path.lstrip('/').split('/')[0].split('?')[0]
        if top in BLOCKED:
            self.send_error(404, 'Not Found')
            return None
        path = self.translate_path(self.path)
        if os.path.isdir(path) and not os.path.exists(os.path.join(path, 'index.html')):
            self.send_error(404, 'Not Found')
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write('%s %s\n' % (self.address_string(), fmt % args))


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
