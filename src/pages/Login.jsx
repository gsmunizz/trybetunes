import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputString: '',
      isLoading: false,
      isCreated: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputString: value,
    });
  }

  isMoreThan = () => {
    const { inputString } = this.state;
    const minLength = 3;
    return (
      inputString.length < minLength
    );
  }

  handleCreateUser = async () => {
    const { inputString } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: inputString });
    this.setState({
      isCreated: true,
    });
  }

  submitNewUser = (isLoading, isCreated, loginForm) => {
    if (isLoading === true) {
      if (isCreated === true) {
        return <Redirect to="/search" />;
      }
      return <Loading />;
    }
    return loginForm;
  }

  // Felipe Shinkae me ajudou a completar o requisito.

  render() {
    const { inputString, isLoading, isCreated } = this.state;
    const login = (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          value={ inputString }
          onChange={ this.handleInputChange }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ this.isMoreThan() }
          onClick={ this.handleCreateUser }
        >
          Entrar
        </button>
      </div>
    );
    return (this.submitNewUser(isLoading, isCreated, login));
  }
}

export default Login;
