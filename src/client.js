import axios from 'axios';
import { Transform, Writable } from 'stream';

const url = 'http:/localhost:3000';

async function consume() {
  const { data } = await axios({
    url,
    method: 'get',
    responseType: 'stream'
  });

  return data;
}

const stream = await consume();
stream
  .pipe(
    new Transform({
      transform(chunk, enc, callback) {
        const item = JSON.parse(chunk);
        const myNumber = /\d+/.exec(item.name)[0];
        let name = item.name;
        if (myNumber % 2 === 0) name = name.concat(' é par');
        else name = name.concat(' é impar');
        item.name = name;
        callback(null, JSON.stringify(item));
      }
    })
  )
  .pipe(
    new Writable({
      write(chunk, enc, callback) {
        console.log('Já chegou o disco voador!', chunk.toString());
        callback();
      }
    })
  );
