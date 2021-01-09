import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.search = this.search.bind(this);
    this.updateRepos = this.updateRepos.bind(this);
  }

  componentDidMount() {
    this.updateRepos();
  }

  updateRepos() {
    return axios.get('/repos')
    .then((response) => {
      this.setState({
        repos: response.data
      });
    })
    .catch((err) => {
      console.error(err);
    })
  }

  search (term) {
    axios.post('/repos', { username: term })
      .then(() => {
        return this.updateRepos();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
