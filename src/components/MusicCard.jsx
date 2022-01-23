import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      isLoading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  isFavorited = () => {
    const { trackId } = this.props;
    const { favorites } = this.state;
    const listVerification = favorites.some((id) => id.trackId === trackId);
    this.setState({
      isLoading: false,
      isFavorite: listVerification,
    });
  }

  getFavorites = async () => {
    const musicasFavoritas = await getFavoriteSongs();
    this.setState({
      isLoading: true,
      favorites: musicasFavoritas,
    }, this.isFavorited);
  }

  checkDisabled = async () => {
    const { musicObject } = this.props;
    this.setState((prevState) => ({
      isFavorite: !prevState.favorite,
      isLoading: true,
    }));
    await removeSong(musicObject);
    this.setState({ isLoading: false });
  }

  handleChange = async () => {
    const { musicObject } = this.props;
    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
      isLoading: !prevState.isLoading }));
    await addSong(musicObject);
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
      favorites: [...prevState.favorites, musicObject],
    }));
  };

  // Iago Medeiros e Felipe Shinkae ajudaram nos requisitos 08 e 10

  render() {
    const {
      music: { previewUrl, trackName, trackId },
    } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : '' }
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isFavorite }
            onChange={ !isFavorite ? this.handleChange : this.checkDisabled }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  musicObject: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
