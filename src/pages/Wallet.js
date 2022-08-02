import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     email: '',
  //   };
  // }

  componentDidMount() {
    // const { email } = this.props;
    // this.setState({ email });
  }

  render() {
    // const { email } = this.state;
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps)(Wallet);
