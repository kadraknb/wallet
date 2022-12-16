import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './pages.css';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nome: '',
    };
  }

  change = (aa) => {
    const { value, name } = aa.target;
    this.setState({ [name]: value });
  }

  submit = () => {
    const { nome } = this.state;
    const { router, dispatch } = this.props;
    dispatch(loginAction(nome));
    router('Wallet');
  }

  render() {
    const { nome } = this.state;
    return (
      <div id="login_main_flex">
        <div id="W_login">
          <form id="W_form_login">
            <input
              className="W_F_input"
              name="nome"
              type="text"
              placeholder="Seu nome"
              value={ nome }
              onChange={ (e) => this.change(e) }
            />
            <button
              id="W_Bt_login"
              type="submit"
              disabled={ !nome.length > 2 }
              onClick={ (e) => {
                e.preventDefault();
                this.submit();
              } }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  router: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
