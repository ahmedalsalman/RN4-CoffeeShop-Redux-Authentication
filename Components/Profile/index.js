import React, { useReducer } from "react";
import { Text, View } from "native-base";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
// Components
import LogoutButton from "./LogoutButton";

const Profile = () => (
  <View>
    <Text>PROFILE PAGE</Text>
    <Text>You are logged in as {user.username}</Text>

    <LogoutButton onPress={() => logout()} />
  </View>
);

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
