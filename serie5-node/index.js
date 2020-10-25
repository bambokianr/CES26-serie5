const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

const fileName = './data.json';

app.get('/data_form', (req, res) => {
  
  if(fs.existsSync(fileName)) {
    const bufferDataFile = fs.readFileSync(fileName);
    console.log('--- Dados do arquivo data.json enviados.');
    res.send(bufferDataFile);
  } else {
    console.log('--- Arquivo data.json não existe!');
  }
});

app.post('/data_form', (req, res) => {
  if(!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, JSON.stringify(req.body));
  } else {
    const bufferDataFile = fs.readFileSync(fileName);
    const dataToSave = bufferDataFile + '\n' + JSON.stringify(req.body);
    fs.writeFileSync(fileName, dataToSave);
  }
      
  console.log(req.body);
  console.log('--- JSON salvo em arquivo data.json\n');
  res.sendStatus(200);
});

app.listen(8081, () => {
  console.log("Server running at http://localhost:8081");
});