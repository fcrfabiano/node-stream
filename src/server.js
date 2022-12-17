import http from 'http';
import { Readable } from 'stream';
import { randomUUID  } from 'crypto';

function * run() {
  for(let index = 0; index <= 99; index += 1) {
    const data = {
      id: randomUUID(),
      name: `Fabiano-${index}`
    };

    yield data;
  }
}

async function handler(request, response) {
  const readable = new Readable({
    read() {
      for(const data of run()) {
        console.log('Sending', data);
        this.push(JSON.stringify(data) + '\n');
      }
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
