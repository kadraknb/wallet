import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

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
      <>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}
const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps)(Wallet);
