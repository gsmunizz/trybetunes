import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      artistInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

  // https://backefront.com.br/obter-parametro-url-react/
  getMusicsFromAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAndDesc = await getMusics(id);
    this.setState({
      musics: musicsAndDesc.slice(1),
      artistInfo: musicsAndDesc[0],
      isLoading: false,
    });
  }

  render() {
    const { musics, artistInfo, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading />
          : (
            <section>
              <div>
                <img src={ artistInfo.artworkUrl100 } alt={ artistInfo.collectionName } />
                <p data-testid="album-name">{artistInfo.collectionName}</p>
                <p data-testid="artist-name">{artistInfo.artistName}</p>
              </div>
              <div>
                {musics.map((music) => (
                  <MusicCard key={ music.trackId } music={ music } />
                ))}
              </div>
            </section>
          )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
