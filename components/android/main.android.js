/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TextInput,
    Animated,
    Image,
    DeviceEventEmitter,
    View,
    TouchableHighlight,
DrawerLayoutAndroid,
} from 'react-native';
import Loading from './loading.android.js';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoSize: new Animated.Value(40),
            loaded: false,
            slideLogin: new Animated.Value(0),
            logoBg: new Animated.Value(80),
        };

    }
    componentWillMount() {

        DeviceEventEmitter.addListener('keyboardDidShow', e => {
            Animated.parallel([
                Animated.spring(this.state.slideLogin,
                    {
                        toValue: 150,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoSize,
                    {
                        toValue: 30,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoBg,
                    {
                        toValue: 60,
                        friction: 10, // Animate to smaller size
                    }
                ),
            ]).start();
        });

        DeviceEventEmitter.addListener('keyboardDidHide', e => {
            Animated.parallel([
                Animated.spring(this.state.slideLogin,
                    {
                        toValue: 0,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoSize,
                    {
                        toValue: 40,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoBg,
                    {
                        toValue: 80,
                        friction: 10, // Animate to smaller size
                    }
                )
            ]).start();
        });
    }

    componentDidMount() {
        this.setState({loaded: true});
    }
    render() {
        if(this.state.loaded == false){
            return ( <Loading></Loading> );
        }
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}></Text>
            </View>
        );

        return (
        <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.container}>
                    <Animated.View style={[styles.logoBg, {height: this.state.logoBg, width: this.state.logoBg}]}>
                        <Animated.Text style={[styles.logo, {fontSize: this.state.logoSize}]}>
                            Vu
                        </Animated.Text>
                    </Animated.View>
                </View>
            </View>

        </DrawerLayoutAndroid>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    logo: {
        color: '#71ea9c',
        alignSelf: 'center',
    },
    logoBg: {
        borderRadius: 50,
        backgroundColor: '#405067',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,

    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 25,
        marginRight: 25,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 400,
        elevation: 4,
    },
    inputField: {
        fontSize: 15, //20
        color: '#626364'
    },
    loginButton: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        marginTop: 15,
        alignSelf: 'flex-end',
        backgroundColor: '#405067',
        elevation: 4,
    }
});

AppRegistry.registerComponent('Main', () => Main);
