// @flow
import React, {
  ListView,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  WebView,
} from "react-native"

import GHUser from "./GHUser.js";

export default class GHList extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      items: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      loaded: false,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.items}
        renderRow={this.renderItem}
        style={styles.listView}/>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderItem(item: Object, sectionID: string, rowID: string) {
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressed(item)}>
      <View>
        <GHUser item={item} />
      </View>
      </TouchableWithoutFeedback>
    );
  }

  //
  fetchData() {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          items: this.state.items.cloneWithRows(data),
          loaded: true,
        });
      })
      .done();
  }

  //
  onPressed(item: Object) {
    this.props.navigator.push({
      title: item.login,
      component: GHItemView,
      passProps: { url: item.html_url }
    })
  }
}

//
class GHItemView extends React.Component {
  render() {
    return <WebView url={this.props.url}/>
  }
}

//
import _styles from "./Styles.js"
const styles = StyleSheet.create({
  ..._styles,

  listView: {
    backgroundColor: '#FFFFFF',
  },
})

