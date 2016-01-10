// @flow
import React, {
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native"
import _styles from "./Styles.js"

export default class GHUser extends React.Component {
  render() {
    let item = this.props.item;
    return (
      <View style={_styles.container}>
        <Image
          source={{uri: item.avatar_url}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.html_url}</Text>
          <Text style={[styles.name, {backgroundColor: '#222222', color: 'white', padding: 2, borderRadius: 2}]}>{item.login}</Text>
        </View>
      </View>
    )
  }
}
GHUser.propTypes = {
  item: React.PropTypes.object,
}

const styles = StyleSheet.create({
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  name: {
    fontSize: 12,
    margin: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 48,
    height: 48,
    margin: 2,
  },
})


