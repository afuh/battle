import React from 'react';
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api"


const SelectedLanguage = (props) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.selectedLanguage ? {color: "#F44336"} : null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}>
            {lang}
        </li>
        )
      )}
    </ul>
  )
}

const RepoGrid = (props) => {
    return (
      <ul className='popular-list'>
        {props.repos.map((repo, i) => {
          return (
            <li key={repo.name} className="popular-item">
              <div className='popular-rank'>#{i + 1}</div>
              <ul className='space-list-items'>
                <li>
                  <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={`Avatar for ${repo.owner.login}`}
                  />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          )
        })}
      </ul>
    )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(function(){
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    fetchPopularRepos(lang)
      .then(repos => this.setState(function() {
        return {
          repos: repos
        }
      }))
  }
  render () {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />
        {!this.state.repos
          ? <p>LOADING</p>
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

export default Popular;
