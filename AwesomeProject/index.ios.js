// @flow
import React, {
  AppRegistry,
  NavigatorIOS,
} from "react-native";

import GHList from "./GHList.js"


class GHNavigator extends React.Component {
  render() {
    return (
      <NavigatorIOS style={{flex: 1}}
        initialRoute={{
          component: GHList,
          title: 'GitHub users',
      }}/>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => GHNavigator);
