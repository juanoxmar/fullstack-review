const mongoose = require('mongoose');
mongoose.connect(process.env.db || 'mongodb://localhost:27017/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const repoSchema = new mongoose.Schema({
  repoName: String,
  repoUrl: String,
  repoStars: String,
  devName: String,
  devUrl: String
});

const Repo = mongoose.model('Repo', repoSchema);

const save = (data) => {
  return Repo.updateOne({ repoUrl: data.repoUrl }, data, { upsert: true });
}

const get = () => {
  return Repo.find({}).sort({ repoStars: 'desc'}).limit(25).exec();
}

module.exports.save = save;
module.exports.get = get;
