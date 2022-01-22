import React, { Component } from 'react';
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
            <p data-testid="header-user-name">{userName}</p>
          ) }
      </header>

    );
  }
}

export default Header;
