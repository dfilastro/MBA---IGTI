import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

// 1 - brand with most models

router.get('/maisModelos', async (_req, res, _next) => {
  try {
    const data = JSON.parse(await readFile('car-list.json'));

    let most = [];
    let numberOfMmodels = [];

    for (let i = 0; i < data.length; i++) {
      if (numberOfMmodels.length < data[i].models.length) {
        numberOfMmodels = data[i].models;
        most = data[i].brand;
      }
    }

    res.send(most);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 2 - brand with less models

router.get('/menosModelos', async (_req, res, _next) => {
  try {
    const data = JSON.parse(await readFile('car-list.json'));

    let less = [];
    let numberOfMmodels = data[0].models;

    for (let i = 0; i < data.length; i++) {
      if (numberOfMmodels.length >= data[i].models.length) {
        numberOfMmodels = data[i].models;
        less = data[i].brand;
      }
    }

    res.send(less);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 3 - X most models list

router.get('/listaMaisModelos/:id', async (req, res, _next) => {
  try {
    const data = JSON.parse(await readFile('car-list.json'));
    let oL = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].models.length > 9) {
        oL.push(`${data[i].models.length} - ${data[i].brand}`);
      } else {
        oL.push(`0${data[i].models.length} - ${data[i].brand}`);
      }
    }

    oL.sort();

    function mostList(a) {
      let newCars = [];
      let correctNewCars = [];

      for (let i = 1; i <= a; i++) {
        newCars.push(oL[oL.length - i]);
      }

      for (let i = 0; i < newCars.length; i++) {
        correctNewCars.push(newCars[i].slice(5, 20) + ' - ' + newCars[i].slice(0, 2));
      }

      return correctNewCars;
    }

    res.send(mostList(`${req.params.id}`));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 4 - X less models list

router.get('/listaMenosModelos/:id', async (req, res, _next) => {
  try {
    const data = JSON.parse(await readFile('car-list.json'));
    let oL = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].models.length > 9) {
        oL.push(`${data[i].models.length} - ${data[i].brand}`);
      } else {
        oL.push(`0${data[i].models.length} - ${data[i].brand}`);
      }
    }

    oL.sort();

    function mostList(a) {
      let newCars = [];
      let correctNewCars = [];

      for (let i = 0; i < a; i++) {
        newCars.push(oL[i]);
      }

      for (let i = 0; i < newCars.length; i++) {
        correctNewCars.push(newCars[i].slice(5, 20) + ' - ' + newCars[i].slice(0, 2));
      }

      return correctNewCars;
    }

    res.send(mostList(`${req.params.id}`));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 5 - Models list

router.post('/listaModelos', async (req, res, _next) => {
  try {
    let brand = req.body;

    if (!brand.nomeMarca) throw new Error('A requisição deve ser um objeto no formato: {"nomeMarca": "Marca A"}');

    const data = JSON.parse(await readFile('car-list.json'));

    function filter(a) {
      for (let i = 0; i < data.length; i++) {
        if (a.nomeMarca.toLowerCase() === data[i].brand.toLowerCase()) return data[i].models;
      }
    }

    let filtered = filter(brand);

    res.send(filtered || []);

    console.log(brand);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
