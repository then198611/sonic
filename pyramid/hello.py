from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response


def hello(request):
    return Response('Hello %(name)s' % request.matchdict)


if __name__ == '__main__':
    config = Configurator()
    config.add_route('hello', '/hello/{name}')
    config.add_view(hello, route_name='hello')
    app = config.make_wsgi_app()
    server = make_server('127.0.0.1', 8000, app)
    print('8000 is starting...')
    server.serve_forever()
