import React from 'react';
import { connect } from 'react-redux';

import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  disabled = () => {
    const N5 = 5;
    const { email, password } = this.state;
    const valido = /\S+@\S+\.\S+/.test(email) && password.length > N5;
    // !
    this.setState({ disabled: !valido });
  }

  change = (aa) => {
    const { value, type } = aa.target;
    this.setState({ [type]: value }, () => this.disabled());
  };

  submit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    // console.log(this.props.dispatch);
    dispatch(loginAction(email));
    // console.log(dispatch(loginAction(email)));
    // console.log(window.store);
    history.push('/carteira', email);
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => this.change(e) }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => this.change(e) }
        />
        <button type="submit" disabled={ disabled } onClick={ this.submit }>
          Entrar
        </button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => ({ seila: state });

export default connect()(Login);
