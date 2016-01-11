'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  NavigatorIOS,
  ListView,
  Alert,
  ScrollView,
} from 'react-native';

require("./html5-cloud-sdk")
Kii.initializeWithSite("bf048b71", "35e5a29ad853fe5c53879362e43d7466", KiiSite.JP);

class Root extends React.Component {
  render() {
    return (
      <NavigatorIOS style={{flex: 1}}
        initialRoute={{
          component: KiiSignup,
          title: "Kii Sign up/in",
        }}/>
    )
  }
}

class KiiSignup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "foobar1", password: "abc123",
      bgcolor: null,
    }
  }
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        horizontal={false}>
        <View style={[styles.container, {backgroundColor: this.state.bgcolor}]}>
          <Text>username</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={username => this.setState({username})}
            value={this.state.username}
            placeholder="username"
            autoCapitalize={'none'}
            />

          <Text>password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            placeholder="passwrod"
            secureTextEntry={true}
            />

          <TouchableOpacity onPress={() => this.onSignup()}>
            <Text
              style={[styles.button, styles.item]}>
              Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onSignin()}>
            <Text
              style={styles.button}>
              Sign in</Text>
          </TouchableOpacity>

          <Text>{this.state.message}</Text>
        </View>
      </ScrollView>
    );
  }
  onSignup() {
    this.setState({message: "Signing up..."}, () => {
      this._transit(KiiUser.userWithUsername(this.state.username, this.state.password).register());
    })
  }
  onSignin() {
    this.setState({message: "Signing in..."}, () => {
      this._transit(KiiUser.authenticate(this.state.username, this.state.password));
    })
  }
  _transit(user_) {
    user_
      .then(user => {
        let msg = `loginName: ${this.state.username}\nuserID: ${user.getUUID()}`
        this.setState({message: msg, bgcolor: null})
        setTimeout(() => {
          this.props.navigator.push({
            title: this.state.username,
            component: KiiObjectList,
            passProps: { user },
          });
        }, 0)
      })
      .catch(err => {
        this.setState({message: err.message, bgcolor: "#ff9999"});
        setTimeout(() => this.setState({bgcolor: null}), 1500);
      })
  }
}

class KiiObjectList extends React.Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, });
    this.state = {
      items: ds.cloneWithRows([]),
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.items}
          renderRow={(item) => {
            return (
              <TouchableWithoutFeedback onPress={() => this.onDeleted(item)}>
              <View style={styles.item}>
                <Text>{item.getUUID()}</Text>
                <Text>{new Date(item.getCreated()).toString()}</Text>
              </View>
              </TouchableWithoutFeedback>
            )
          }}
          />

        <TouchableOpacity onPress={() => this.onCreated()}>
          <Text
            style={styles.button}>
            Create</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.onReloaded()}>
          <Text
            style={styles.button}>
            Reload</Text>
        </TouchableOpacity>
      </View>
    )
  }
  onCreated() {
    this.props.user.bucketWithName("react-native-sample")
      .createObject().save()
      .then(obj => this.componentDidMount())
  }
  onReloaded() {
    this.componentDidMount()
  }
  onDeleted(item) {
    Alert.alert(
      'Delete?',
      `${item.getUUID()}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => item.delete().then(obj => this.componentDidMount())},
      ]
    )
  }
  componentDidMount() {
    this.props.user.bucketWithName("react-native-sample")
      .executeQuery(KiiQuery.queryWithClause())
      .then(([query, objs]) => {
        this.setState({
          items: this.state.items.cloneWithRows(objs),
        });
      })
      .catch(err =>  console.log(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: "white",
    margin: 2,
    paddingLeft: 2,
  },
  button: {
    textAlign: 'center',
    fontWeight: '900',
    margin: 2,
    padding: 18,
  },
  item: {
    flex: 1,
    paddingBottom: 16,
  },
});

AppRegistry.registerComponent('KiiSignup', () => Root);
