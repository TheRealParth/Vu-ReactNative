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
    DeviceEventEmitter,
    View,
    TouchableHighlight,
} from 'react-native';

import Register from './register.android.js';
import Main from './main.android.js';
import Loading from './loading.android.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            logoSize: new Animated.Value(60),
            loaded: false,
            slideLogin: new Animated.Value(0),
            logoBg: new Animated.Value(100),
            logoPos: [ new Animated.Value(105), new Animated.Value(145) ],
            logoBgShape: [new Animated.Value(120), new Animated.Value(0)],
            totalWidth: new Animated.Value(100)
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
                Animated.spring(this.state.totalWidth,
                    {
                        toValue: 390,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoBgShape[0],
                    {
                        toValue: 0,
                        friction: 10, // Animate to smaller size
                    }
                ),
                // Animated.spring(this.state.logoPos[1],
                //     {
                //         toValue: 0,
                //         friction: 10, // Animate to smaller size
                //     }
                // ),
                Animated.spring(this.state.logoPos[0],
                    {
                        toValue: 0,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoPos[1],
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
                Animated.spring(this.state.logoPos[0],
                    {
                        toValue: 105,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.totalWidth,
                    {
                        toValue: 100,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoPos[1],
                    {
                        toValue: 145,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoBgShape[0],
                    {
                        toValue: 120,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoSize,
                    {
                        toValue: 55,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoBgShape[1],
                    {
                        toValue: 0,
                        friction: 10, // Animate to smaller size
                    }
                ),
                Animated.spring(this.state.logoBg,
                    {
                        toValue: 100,
                        friction: 10, // Animate to smaller size
                    }
                )
            ]).start();
        });
    }

    componentDidMount() {
        this.setState({loaded: true});
    }
    logIn(){
        this.props.navigator.resetTo({
            name:"Main", component: Main
        })
    }
    register(){
        this.props.navigator.push({name:"Register", component: Register});
    }
    render() {
        if(this.state.loaded == false){
            return ( <Loading></Loading>);
        }
            return (
                <View style={styles.container}>
                    <Animated.View style={[styles.loginContainer, {marginBottom: this.state.slideLogin}]}>

                        <TextInput
                            style={styles.inputField}
                            onChangeText={(username) => this.setState({username})}
                            placeholder="Username"
                            onFocus={()=>{
                          }}
                            onEndEditing={()=>{
                          }}
                            value={this.state.username}
                        />
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(password) => this.setState({password})}
                            secureTextEntry = {true}
                            placeholder="Password"
                            // placeholderTextColor="#000000"
                            value={this.state.password}
                        />

                        <TouchableHighlight style={styles.loginButton} onPress = {this.logIn.bind(this)}>
                            <Text style={{fontSize:20, color: '#71ea9c'}}>Login</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress = {this.register.bind(this)}>
                            <Text style={{fontSize:12, color: '#05A5D1'}}>New user? Sign up</Text>
                        </TouchableHighlight>
                    </Animated.View>
                    <Animated.View style={[styles.logoBg, {height: this.state.logoBg, top: this.state.logoPos[0], left: this.state.logoPos[1], borderRadius: this.state.logoBgShape[0], width: this.state.totalWidth}]}>
                        <Animated.Text style={[styles.logo, {fontSize: this.state.logoSize}]}>
                            Vu
                        </Animated.Text>
                    </Animated.View>
                </View>
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
        backgroundColor: '#405067',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        position: 'absolute',
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
        height: 300,
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
        marginTop: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#405067',
        elevation: 4,
    }
});

AppRegistry.registerComponent('Login', () => Login);
