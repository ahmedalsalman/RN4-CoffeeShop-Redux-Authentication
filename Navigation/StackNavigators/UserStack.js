import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

// Screens
import { LOGIN, SIGNUP, PROFILE } from "../screenNames";
import Login from "../../Components/Authentication/Login";
import Signup from "../../Components/Authentication/Signup";
import Profile from "../../Components/Profile";

// Config
import screenOptions from "../screenOptions";

const { Navigator, Screen } = createStackNavigator();

const UserStack = (props) => {
  return (
    <Navigator initialRouteName={PROFILE} screenOptions={screenOptions}>
      {props.user ? (
        <>
          <Screen name={PROFILE} component={Profile} />
        </>
      ) : (
        <>
          <Screen
            name={LOGIN}
            component={Login}
            options={{ headerShown: false }}
          />
          <Screen
            name={SIGNUP}
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Navigator>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(UserStack);
