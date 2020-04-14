import React, { Component } from "react";

import { connect } from "react-redux"
import { signup } from "../../redux/actions"
// Screen Names
import { LOGIN } from "../../Navigation/screenNames";

// Styling Components
import { TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "native-base";
import styles from "./styles";

class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    if (this.props.user) this.props.navigation.replace(SHOP)
    const { navigation } = this.props;
    const { username, password } = this.state;
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Signup</Text>
        <TextInput
          style={styles.authTextInput}
          placeholder="Username"
          placeholderTextColor="#A6AEC1"
          value={username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.authTextInput}
          placeholder="Password"
          placeholderTextColor="#A6AEC1"
          secureTextEntry={true}
          value={password}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => this.props.signup(this.state)}
        >
          <Text style={styles.authButtonText}>Sign up</Text>
        </TouchableOpacity>
        <Text
          style={styles.authOther}
          onPress={() => navigation.replace(LOGIN)}
        >
          Click here to log in!
        </Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signup(userData))
})

export default connect(null, mapDispatchToProps)(Signup);