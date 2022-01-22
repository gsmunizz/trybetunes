import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetUserName();
  }

  handleGetUserName = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : (
            <div>
              <p data-testid="header-user-name">{userName}</p>
              <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </div>
          )}
      </header>

    );
  }
}

export default Header;
