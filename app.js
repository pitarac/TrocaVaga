const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Trocavaga  = require('./models/Trocavaga');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });

// Busca por vaga de origem e vaga de destino

app.get('/', (req, res) => {
  let search = req.query.trocavaga;
  let query = '%' + search + '%';

  if (!search) {
    Trocavaga.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(trocavagas => {
        res.render('index', {
          trocavagas
        });
      })
      .catch(err => console.log(err));
  } else {
    Trocavaga.findAll({
      where: {
        [Op.or]: [
          {
            escola_origem: {
              [Op.like]: query
            }
          },
          {
            escola_destino: {
              [Op.like]: query
            }
          },
          {
            regiao_origem: {
              [Op.like]: query
            }
          },
          {
            regiao_destino: {
              [Op.like]: query
            }
          }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(trocavagas => {
        res.render('index', {
          trocavagas,
          search
        });
      })
      .catch(err => console.log(err));
  }
});


// trocavagas routes
app.use('/trocavagas', require('./routes/trocavagas'));