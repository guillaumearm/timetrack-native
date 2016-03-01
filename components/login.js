import React, {Component, PropTypes, Text, View} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

export class LoginButton extends Component {
  static propTypes = {
    webClientId: PropTypes.string.isRequired,
  };

  state = {user: null};

  componentDidMount(){
    GoogleSignin.configure({
      webClientId: this.props.webClientId,
    })
    GoogleSignin.currentUserAsync().then(user => {
      console.warn('USER: ', user)
      this.setState({user: user})
    }).done()
  }

  _login() {
    GoogleSignin.signIn()
    .then(user => {
      console.warn("LOGIN: ", user)
      this.setState({user: user})
    })
    .catch(err => {
      console.warn("ERROR LOGIN")
    })
    .done()
  }

  _logout() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut())
    .then(() => {
      this.setState({user: null})
    })
    .done()
  }

  render(){
    if (this.state.user) {
      return (<Text>Hello {this.state.user.name}</Text>)
    }
    else {
      return (
        <View style={{alignItems: "center"}}>
          <GoogleSigninButton
            style={{width: 312, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._login}
          />
        </View>
      )
    }
  }
}
