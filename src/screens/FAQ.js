import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { content } from '../localization/Localization';
import { colors, fontSizes, screen } from '../constants/pattern';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Quit from '../assets/icons/quit.svg';
import axios from 'axios';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Forms from '../components/Forms';

const FAQ = (props) => {

    const [data, setData] = useState([0]);
    const [loading, setLoading] = useState(false);
    // const [modalAccr, setModalAccr] = useState(false);
    // const [modalRequest, setModalRequest] = useState(false);

    // const [name, setName] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [media, setMedia] = useState('');
    // const [organization, setOrganization] = useState('');
    // const [interestedQuests, setInterestedQuests] = useState('');
    // const [radio, setRadio] = useState(0);

    // const radioProps = [
    //     {label: content.individual, value: 0},
    //     {label: content.entity, value: 1},
    // ]

    // const getVideo = () => {
    //     axios.get('video')
    //     .then(res => {
    //         console.log(res);
    //         setData(res.data);
    //         setLoading(false);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    // useEffect(() => {
    //     getVideo();
    // },[])

    // const PopUp = () => 
    //     Alert.alert(
    //         content.error,
    //         content.errorMsg,
    //         [
    //             {
    //                 text: 'OK',
    //                 style: 'default'
    //             }
    //         ]
    //     )

    // const sendRequestPressed = (request, params) => {
    //     console.log('sssss');
    //     if(request == 'request') {
    //         if(params.radio && !params.organization) {
    //             PopUp();
    //         } else {
    //             axios.post(request, params)
    //             .then(function (response) {
    //                 console.log(response);
    //             })
    //             .catch(function (error) {
    //                 console.log(error.response);
    //             });
    //             }
    //     } else {
    //     axios.post(request, params)
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //     }
    // }

    const renderItem = ({item}) => (
        <View>
            
        </View>    
    )

    const footer = () => (
        <Forms outstyle={{
            button1: {
                backgroundColor: colors.color4
            }, 
            text1: {    
                color: colors.fontColor,
            },
            button2: {
                backgroundColor: colors.color1
            },
            text2: {
                color: colors.color2
            }
        
        }}/>
    )

    return(
        <View style={styles.container}>
            <Header shareable={true} share={false} {...props} onBack={() => props.navigation.goBack()}/>
            {
                loading ?
                <ActivityIndicator color={colors.color1} style={{marginTop: 100}}/>
                :
                <FlatList
                    data={data}
                    ListFooterComponent={footer}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{marginHorizontal: 16}}
                />
            }
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalAccr}
            >
                <View style={styles.modal}>
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
                            <TextInput
                                placeholder={content.phoneNum}
                                style={styles.input}
                                onChangeText={text => setPhone(text)}
                                value={phone}
                                autoCapitalize={'none'}
                            />
                            <TextInput
                                placeholder='E-mail'
                                style={styles.input}
                                onChangeText={text => setEmail(text)}
                                value={email}
                                autoCapitalize={'none'}
                            />
                            <TextInput
                                placeholder={content.media}
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
                        })} style={styles.sendButton}>
                            <Text style={styles.sendButtonLabel}>{content.sendRequest}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalRequest}
            >
                <View style={styles.modal}>
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
                            <TextInput
                                placeholder={content.phoneNum}
                                style={styles.input}
                                onChangeText={text => setPhone(text)}
                                value={phone}
                                autoCapitalize={'none'}
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
                            // organization: organization,
                            phone: phone,
                            content: interestedQuests
                        })} style={styles.sendButton}>
                            <Text style={styles.sendButtonLabel}>{content.sendRequest}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal> */}
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color2,
    },
    // modal: {
    //     flex: 1,
    //     backgroundColor: colors.color2,
    //     justifyContent: 'center',
    //     // alignItems: 'center'
    // },
    // modalTitle: {
    //     marginLeft: 16,
    //     marginTop: 70,
    //     marginBottom: 30,
    //     fontSize: fontSizes.h2.size,
    //     fontWeight: '600',
    //     color: colors.fontColor
    // },
    // input: {
    //     width: screen.width - 32,
    //     height: 50,
    //     borderRadius: 5,
    //     borderWidth: 1,
    //     borderColor: colors.color3,
    //     alignItems: 'center',
    //     marginBottom: 15,
    //     paddingLeft: 20
    // },
    // inputsContainer: {
    //     alignItems: 'center',
    //     // backgroundColor: 'red'
    // },
    // quitBtn: {
    //     position: 'absolute',
    //     right: 25,
    //     top: 25,
    //     width: 35,
    //     height: 35,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // sendButton: {
    //     alignSelf: 'center',
    //     width: screen.width - 32,
    //     height: 55,
    //     marginTop: 20,
    //     borderRadius: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: colors.color1
    // },
    // sendButtonLabel: {
    //     color: colors.color2,
    //     fontSize: fontSizes.h3.size,
    //     fontWeight: fontSizes.h3.weight,
    // }
})

export default FAQ;
