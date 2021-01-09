import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <div>Top 25 Repos</div>
    {props.repos.map((item, index) => {
      return (
        <div key={index}>
          {index + 1}. <a href={item.repoUrl}>{item.repoName}</a> by <a href={item.devUrl}>{item.devName}</a>
        </div>
      );
    })}
  </div>
)

export default RepoList;