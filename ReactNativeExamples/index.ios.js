/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigatorIOS,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';

class RootComponent extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          component: ReactNativeExamples,
          title: 'My View Title',
          passProps: { myProp: 'foo' },
        }}
        />
      //<Navigator
      //  style={{marginTop: 20}}
      //  initialRoute={{name: 'My First Scene', index: 0}}
      //  renderScene={(route, navigator) =>
      //    <ReactNativeExamples
      //      name={route.name}
      //      onForward={() => {
      //        var nextIndex = route.index + 1;
      //        navigator.push({
      //          name: 'Scene ' + nextIndex,
      //          index: nextIndex,
      //        });
      //      }}
      //      onBack={() => {
      //        if (route.index > 0) {
      //          navigator.pop();
      //        }
      //      }}
      //    />
      //  }/>
    )
  }
}

class ReactNativeExamples extends React.Component {
  constructor(props) {
    super(props);
    var source = [
      require("./ActivityIndicatorIOS.js"),
      require("./DatePickerIOS.js"),
      //require("./Image.js"),
      //require("./MapView.js"),
      require("./Modal.js"),
      require("./ActionSheetIOS.js"),
    ]
    var examples = {}
    source.forEach(sec => examples[sec.description] = sec.examples);
    let sectionIDs = source.map(e => e.description);
    let rowIDs = source.map(x => [...Array(x.examples.length).keys()])

    //let getSectionHeaderData = (data, sectionID) => data[sectionID]
    //let getRowData = (data, sectionID, rowID) => data[sectionID][rowID]
    let ds = new ListView.DataSource({
      //getSectionHeaderData,
      //getRowData,
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      items: ds.cloneWithRowsAndSections(examples, sectionIDs, rowIDs),
    };
    this.renderItem = this.renderItem.bind(this);
  }
  render() {
    return (
      <ListView
        dataSource={this.state.items}
        renderSectionHeader={this.renderSection}
        renderRow={this.renderItem}
        />
    );
  }
  renderSection(sectionData, sectionID) {
    return <Text style={styles.sectionHeader}>{sectionID}</Text>
  }
  renderItem(item, sectionID, rowID, highlightRow) {
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressed(item)}>
        <Text style={styles.listItem}>{item.title}</Text>
      </TouchableWithoutFeedback>
    )
  }
  onPressed(item) {
    class C extends React.Component {
      render() {
        return (<View style={{marginTop:64}}>{item.render()}</View>);
      }
    }
    this.props.navigator.push({
      title: item.title,
      component: C,
      passProps: {},
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    textAlign: 'center',
    backgroundColor: '#222222',
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 16,
  },
  listItem: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

AppRegistry.registerComponent('ReactNativeExamples', () => RootComponent);
