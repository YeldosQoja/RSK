import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Modal, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { content } from '../localization/Localization';
import { colors, fontSizes, screen } from '../constants/pattern';
import Quit from '../assets/icons/quit.svg';
import axios from 'axios';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { TextInputMask } from 'react-native-masked-text';


const Forms = (outstyle) => {
    const [modalAccr, setModalAccr] = useState(false);
    const [modalRequest, setModalRequest] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [media, setMedia] = useState('');
    const [organization, setOrganization] = useState('');
    const [interestedQuests, setInterestedQuests] = useState('');
    const [radio, setRadio] = useState(0);

    const [sendLoading, setSendLoading] = useState(false);

    const radioProps = [
        {label: content.individual, value: 0},
        {label: content.entity, value: 1},
    ]

    const PopUp = (msg) => 
        Alert.alert(
            content.error,
            msg,
            [
                {
                    text: 'OK',
                    style: 'default'
                }
            ]
        )

    const sendRequestPressed = (request, params) => {
        setSendLoading(true);
        // console.log('sssss');
        if(request == 'request') {
            let org;
            if(params.legal) {
                if(params.organization.length > 0) {
                    console.log('1.1');
                    org = true;
                }
                else {
                    console.log('1.2');
                    org = false;
                }
            }
            else {
                if(params.organization.length < 1){
                    params.organization = null;
                }
                console.log('2');
                org = true;
            }
            if(!params.name || !params.phone || !org || !params.content){
                console.log('alert');
                PopUp(content.errorMsg);
                setSendLoading(false);
            }
            else {
                axios.post(request, params)
                .then(function (response) {
                    console.log(response);
                    setSendLoading(false);
                })
                .catch(function (error) {
                    console.log(error.response);
                    PopUp('Invalid data!');
                    setSendLoading(false);
                });
            }
        } 
        else {
            console.log('accreditation');
            if(!params.name || !params.phone || !params.email || !params.media){
                console.log('alert');
                PopUp(content.errorMsg);
                setSendLoading(false);
            }
            else {
                axios.post(request, params)
                .then(function (response) {
                console.log(response);
                setSendLoading(false);
                })
                .catch(function (error) {
                console.log(error.response);
                PopUp('Invalid email!');
                setSendLoading(false);
                });
            }
        }
    }


    return(
        <View>
            <View>
                <TouchableOpacity style={[styles.button, outstyle.outstyle.button1]} onPress={() => setModalRequest(true)}>
                    <Text style={[styles.buttonText, outstyle.outstyle.text1]}>{content.sendQuestion}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, outstyle.outstyle.button2]} onPress={() => setModalAccr(true)}>
                    <Text style={[styles.buttonText, outstyle.outstyle.text2]}>{content.accreditation}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAccr}
            >
                <View style={styles.modal}>
                    {
                        Platform.OS == 'ios' ?
                        <KeyboardAwareScrollView>
                            <TouchableOpacity style={styles.quitBtn} onPress={() => setModalAccr(false)}>
                                <Quit fill={colors.fontColor}/>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{content.accreditation}</Text>
                            <View style={styles.inputsContainer}>
                                <TextInput
                                    placeholder={content.names}
                                    style={styles.input}
                                    onChangeText={text => setName(text)}
                                    value={name}
                                    autoCapitalize={'none'}
                                />
                                {/* <TextInput
                                    placeholder={content.phoneNum}
                                    style={styles.input}
                                    onChangeText={text => setPhone(text)}
                                    value={phone}
                                    autoCapitalize={'none'}
                                /> */}
                                <TextInputMask
                                    type='custom'
                                    placeholder={content.phoneNum}
                                    options = {{
                                        mask: '+9(999)-999-99-99',
                                    }}
                                    style={styles.input}
                                    value={phone}
                                    keyboardType='number-pad'
                                    onChangeText={text => setPhone(text)}
                                />
                                <TextInput
                                    placeholder='E-mail'
                                    style={styles.input}
                                    onChangeText={text => setEmail(text)}
                                    value={email}
                                    autoCapitalize={'none'}
                                />
                                <TextInput
                                    placeholder={content.Media}
                                    style={styles.input}
                                    onChangeText={text => setMedia(text)}
                                    value={media}
                                    autoCapitalize={'none'}
                                />
                            </View>
                            <TouchableOpacity onPress={() => 
                            sendRequestPressed('accreditation', {
                                name: name, 
                                phone: phone, 
                                email: email, 
                                media: media
                            })} style={styles.sendButton} disabled={sendLoading}>
                                {
                                    sendLoading ?
                                    <ActivityIndicator color={colors.color2}/>
                                    :
                                <Text style={styles.sendButtonLabel}>{content.sendRequest}</Text>
                                }
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                        :
                        <ScrollView>
                            <TouchableOpacity style={styles.quitBtn} onPress={() => setModalAccr(false)}>
                                <Quit fill={colors.fontColor}/>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{content.accreditation}</Text>
                            <View style={styles.inputsContainer}>
                                <TextInput
                                    placeholder={content.names}
                                    style={styles.input}
                                    onChangeText={text => setName(text)}
                                    value={name}
                                    autoCapitalize={'none'}
                                />
                                {/* <TextInput
                                    placeholder={content.phoneNum}
                                    style={styles.input}
                                    onChangeText={text => setPhone(text)}
                                    value={phone}
                                    autoCapitalize={'none'}
                                /> */}
                                <TextInputMask
                                    type='custom'
                                    placeholder={content.phoneNum}
                                    options = {{
                                        mask: '+9(999)-999-99-99',
                                    }}
                                    style={styles.input}
                                    value={phone}
                                    keyboardType='number-pad'
                                    onChangeText={text => setPhone(text)}
                                />
                                <TextInput
                                    placeholder='E-mail'
                                    style={styles.input}
                                    onChangeText={text => setEmail(text)}
                                    value={email}
                                    autoCapitalize={'none'}
                                />
                                <TextInput
                                    placeholder={content.Media}
                                    style={styles.input}
                                    onChangeText={text => setMedia(text)}
                                    value={media}
                                    autoCapitalize={'none'}
                                />
                            </View>
                            <TouchableOpacity onPress={() => 
                            sendRequestPressed('accreditation', {
                                name: name, 
                                phone: phone, 
                                email: email, 
                                media: media
                            })} style={styles.sendButton} disabled={sendLoading}>
                                {
                                    sendLoading ?
                                    <ActivityIndicator color={colors.color2}/>
                                    :
                                    <Text style={styles.sendButtonLabel}>{content.sendRequest}</Text>
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    }
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalRequest}
            >
                <View style={styles.modal}>
                    {
                        Platform.OS == 'ios' ?
                        <KeyboardAwareScrollView>
                            <TouchableOpacity style={styles.quitBtn} onPress={() => setModalRequest(false)}>
                                <Quit fill={colors.fontColor}/>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{content.onlineRequestToBriefing}</Text>
                            <View style={{marginLeft: 16, marginBottom: 15}}>
                                <RadioForm
                                    radio_props={radioProps}
                                    initial={radio}
                                    onPress={(value) => setRadio(value)}
                                    // buttonColor={colors.color1}
                                />
                            </View>
                            <View style={styles.inputsContainer}>
                                <TextInput
                                    placeholder={content.names}
                                    style={styles.input}
                                    onChangeText={text => setName(text)}
                                    value={name}
                                    autoCapitalize={'none'}
                                />
                                <TextInput
                                    placeholder={content.organization}
                                    style={styles.input}
                                    onChangeText={text => setOrganization(text)}
                                    value={organization}
                                    autoCapitalize={'none'}
                                />
                                {/* <TextInput
                                    placeholder={content.phoneNum}
                                    style={styles.input}
                                    onChangeText={text => setPhone(text)}
                                    value={phone}
                                    autoCapitalize={'none'}
                                /> */}
                                <TextInputMask
                                    type='custom'
                                    placeholder={content.phoneNum}
                                    options = {{
                                        mask: '+9(999)-999-99-99',
                                    }}
                                    style={styles.input}
                                    value={phone}
                                    keyboardType='number-pad'
                                    onChangeText={text => setPhone(text)}
                                />
                                <TextInput
                                    placeholder={content.interestedQuests}
                                    style={styles.input}
                                    onChangeText={text => setInterestedQuests(text)}
                                    value={interestedQuests}
                                    autoCapitalize={'none'}
                                />
                            </View>
                            <TouchableOpacity onPress={() => sendRequestPressed('request', {
                                legal: radio,
                                name:  name,
                                organization: organization,
                                phone: phone,
                                content: interestedQuests
                            })} style={styles.sendButton} disabled={sendLoading}>
                                {
                                    sendLoading ?
                                    <ActivityIndicator color={colors.color2}/>
                                    :
                                    <Text style={styles.sendButtonLabel}>{content.sendRequest}</Text>
                                }
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                        :
                        <ScrollView>
                            <TouchableOpacity style={styles.quitBtn} onPress={() => setModalRequest(false)}>
                                <Quit fill={colors.fontColor}/>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{content.onlineRequestToBriefing}</Text>
                            <View style={{marginLeft: 16, marginBottom: 15}}>
                                <RadioForm
                                    radio_props={radioProps}
                                    initial={radio}
                                    onPress={(value) => setRadio(value)}
                                    // buttonColor={colors.color1}
                                />
                            </View>
                            <View style={styles.inputsContainer}>
                                <TextInput
                                    placeholder={content.names}
                                    style={styles.input}
                                    onChangeText={text => setName(text)}
                                    value={name}
                                    autoCapitalize={'none'}
                                />
                                <TextInput
                                    placeholder={content.organization}
                                    style={styles.input}
                                    onChangeText={text => setOrganization(text)}
                                    value={organization}
                                    autoCapitalize={'none'}
                                />
                                {/* <TextInput
                                    placeholder={content.phoneNum}
                                    style={styles.input}
                                    onChangeText={text => setPhone(text)}
                                    value={phone}
                                    autoCapitalize={'none'}
                                /> */}
                                <TextInputMask
                                    type='custom'
                                    placeholder={content.phoneNum}
                                    options = {{
                                        mask: '+9(999)-999-99-99',
                                    }}
                                    style={styles.input}
                                    value={phone}
                                    keyboardType='number-pad'
                                    onChangeText={text => setPhone(text)}
                                />
                                <TextInput
                                    placeholder={content.interestedQuests}
                                    style={styles.input}
                                    onChangeText={text => setInterestedQuests(text)}
                                    value={interestedQuests}
                                    autoCapitalize={'none'}
                                />
                            </View>
                            <TouchableOpacity onPress={() => sendRequestPressed('request', {
                                legal: radio,
                                name:  name,
                                organization: organization,
                                phone: phone,
                                content: interestedQuests
                            })} style={styles.sendButton} disabled={sendLoading}>
                                {
                                    sendLoading ?
                                    <ActivityIndicator color={colors.color2}/>
                                    :
                                    <Text style={styles.sendButtonLabel}>{content.sendRequest}</Text>
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    }
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: screen.width-32,
        height: 50,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: fontSizes.h4.size,
        fontWeight: fontSizes.h4.weight
    },
    modal: {
        flex: 1,
        backgroundColor: colors.color2,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    modalTitle: {
        marginLeft: 16,
        marginTop: 70,
        marginBottom: 30,
        fontSize: fontSizes.h2.size,
        fontWeight: '600',
        color: colors.fontColor
    },
    input: {
        width: screen.width - 32,
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.color3,
        alignItems: 'center',
        marginBottom: 15,
        paddingLeft: 20
    },
    inputsContainer: {
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    quitBtn: {
        position: 'absolute',
        right: 25,
        top: Platform.OS == 'android' ? 30 : 50,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendButton: {
        alignSelf: 'center',
        width: screen.width - 32,
        height: 55,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.color1
    },
    sendButtonLabel: {
        color: colors.color2,
        fontSize: fontSizes.h3.size,
        fontWeight: fontSizes.h3.weight,
    }
})

export default Forms;
