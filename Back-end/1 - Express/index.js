import express from 'express';

const app = express();

app.all('/testAll', (req, res) => {
  res.send(req.method);
});

app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + ' ' + req.params.a);
});

app.listen(3000, () => {
  console.log('API Working');
});
