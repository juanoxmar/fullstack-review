const express = require('express');
const db = require('../database');
const helper = require('../helpers/github')

const app = express();
const PORT = process.env.PORT || 1128;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  helper.getReposByUsername(req.body.username)
    .then((response) => {
      const data = response.data.map((repo) => {
        return db.save({
          repoName: repo.name,
          repoUrl: repo.html_url,
          repoStars: repo.stargazers_count,
          devName: repo.owner.login,
          devUrl: repo.owner.html_url
        })
      });
      return Promise.all(data);
    })
    .then((dbRes) => {
      console.log(dbRes);
      const updated = dbRes.reduce((a,b) => a + b.nModified, 0);
      const created = dbRes.reduce((a,b) => 'upserted' in b ? a + 1 : a, 0);

      res.json({ updated, created });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/repos', function (req, res) {
  db.get()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
    })
});


app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
