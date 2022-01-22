import React, { Component } from 'react';
import AlbumRender from '../components/AlbumRender';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputString: '',
      artistName: '',
      allAlbums: [],
      isAlbumFound: false,
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputString: value,
    });
  }

  // https://www.geeksforgeeks.org/why-we-use-then-method-in-javascript/
  getAlbums = async () => {
    const { artistName } = this.state;
    await searchAlbumsAPI(artistName).then((element) => this.setState({
      allAlbums: [...element],
      isAlbumFound: true,
      isLoading: false,
    }));
  }

  handleClickButton = () => {
    const { inputString } = this.state;
    const artistName = inputString;
    this.setState({
      inputString: '',
      artistName,
      isLoading: true,
    }, () => this.getAlbums());
  }

  handleRenderAlbum = (allAlbums) => allAlbums.map((album) => (
    <AlbumRender key={ album.collectionId } album={ album } />
  ))

  // Requisito realizado com a ajuda de Felipe Shinkae e Julio Rieger

  render() {
    const { inputString, isAlbumFound, isLoading, allAlbums, artistName } = this.state;
    const albumCards = (
      <section>
        <h2>
          {allAlbums.length
            ? `Resultado de álbuns de: ${artistName}`
            : isAlbumFound && 'Nenhum álbum foi encontrado'}
        </h2>
        {this.handleRenderAlbum(allAlbums)}
      </section>
    );
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ inputString }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ inputString.length <= 1 }
            onClick={ this.handleClickButton }
          >
            Pesquisar
          </button>
        </section>
        {isLoading ? <Loading /> : albumCards}
      </div>
    );
  }
}

export default Search;
