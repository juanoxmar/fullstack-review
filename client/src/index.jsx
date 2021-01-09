import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      updated: null,
      created: null,
      search: false
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
      .then((response) => {
        this.setState({
          updated: response.data.updated,
          created: response.data.created,
          search: true,
        })
        return this.updateRepos();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    let updated = null;
    if (this.state.search) {
      updated = `${this.state.created} new repos imported, ${this.state.updated} repos updated`;
    }
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos}/>
        <Search onSearch={this.search}/>
        {updated}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
