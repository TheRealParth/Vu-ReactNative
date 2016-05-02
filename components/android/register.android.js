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
import Loading from './loading.android.js';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPass: "",
            logoSize: new Animated.Value(40),
            loaded: false,
            slideLogin: new Animated.Value(0),
            logoBg: new Animated.Value(80),
            name: "",
            email: ""
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
    login(){
        this.props.navigator.pop();
    }
    signUp(){
        console.log(this.state.username );
        console.log(this.state.password );
        console.log(this.state.confirmPass);
        console.log(this.state.name );
        console.log(this.state.email );
    }
    render() {
        if(this.state.loaded == false){
            return ( <Loading></Loading>);
        }
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.logoBg, {height: this.state.logoBg, width: this.state.logoBg}]}>
                    <Animated.Text style={[styles.logo, {fontSize: this.state.logoSize}]}>
                        Vu
                    </Animated.Text>
                </Animated.View>
                <Animated.View style={[styles.loginContainer, {marginBottom: this.state.slideLogin}]}>

                    <TextInput
                        style={styles.inputField}
                        onChangeText={(name) => this.setState({name})}
                        placeholder="Full Name"
                        value={this.state.name}
                    />
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
                        onChangeText={(email) => this.setState({email})}
                        placeholder="Email"
                        onFocus={()=>{
                          }}
                        onEndEditing={()=>{
                          }}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry = {true}
                        placeholder="Password"
                        // placeholderTextColor="#000000"
                        value={this.state.password}
                    />
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(confirmPass) => this.setState({confirmPass})}
                        secureTextEntry = {true}
                        placeholder="Confirm Password"
                        // placeholderTextColor="#000000"
                        value={this.state.confirmPass}
                    />

                    <TouchableHighlight style={styles.loginButton} onPress = {this.signUp.bind(this)}>
                        <Text style={{fontSize:20, color: '#71ea9c'}}>Sign Up</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.login.bind(this)}>
                        <Text style={{fontSize:12, color: '#05A5D1'}}>Already Signed Up?</Text>
                    </TouchableHighlight>
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
        height: 325,
        elevation: 4,
    },
    inputField: {
        fontSize: 15, //20
        color: '#626364',
        height: 45,
    },
    loginButton: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#405067',
        elevation: 4,
    }
});

AppRegistry.registerComponent('Register', () => Register);
