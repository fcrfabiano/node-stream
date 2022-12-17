import http from 'http';
import { Readable } from 'stream';

async function handler(request, response) {
  const readable = new Readable({
    read() {

      // Para informar que os dados acabaram
      this.push(null);
    }
  });

  readable
    .pipe(response);
}

http
  .createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('Server running at 3000'));
