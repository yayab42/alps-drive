console.log("hello c'moi l'serveur")

let express = require('express');
let app = express();

app.use(express.static('frontend'))

let port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })