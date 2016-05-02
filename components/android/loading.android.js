/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    AppRegistry,
    Component,
    View,
    Image,
Easing,
    Animated,
StyleSheet
} from 'react-native';
export default class Loading extends Component {
    constructor(props) {
        super(props);
        // this.state = {angle: new Animated.Value(0)};
    }
    componentDidMount() {
        // this._animate();
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                source={require("./loader.gif")}>
                </Image>

            </View>
        )
    };
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotateCard: {
        width:35,
        height:35,
        justifyContent:'center',
        backgroundColor:'transparent'
    }
});
AppRegistry.registerComponent('Loading', () => Loading);
