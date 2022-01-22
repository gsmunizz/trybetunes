import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputString: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputString: value,
    });
  }

  isMoreThan = () => {
    const { inputString } = this.state;
    const minLength = 2;
    return (
      inputString.length < minLength
    );
  }

  render() {
    const { inputString } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ inputString }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ this.isMoreThan() }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
