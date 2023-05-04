import { Writable } from 'stream';
import FormData from 'form-data';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10000000,
  maxFieldsSize: 10000000,
  maxFields: 7,
  allowEmptyFiles: false,
  multiples: false,
};

function formidablePromise(req, opts) {
  return new Promise((resolve, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      return resolve({ fields, files });
    });
  });
}

const fileConsumer = (acc) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).end();
  }

  try {
    const chunks = [];
    const { fields, files } = await formidablePromise(req, {
      ...formidableConfig,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });

    console.log(fields);
    console.log(files);
    const { file } = files;
    const fileData = Buffer.concat(chunks);

    const form = new FormData();
    form.append('my_field', 'my value');
    form.append('my_file', fileData);

    const apiRes = await fetch(
      `${API_URL}/playlist_api/playlists/${playlistid}/`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: form,
      }
    );

    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

