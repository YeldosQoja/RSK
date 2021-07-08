import React, {useEffect, useRef, useState, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Linking, Alert, Platform } from 'react-native';
import { colors, fontSizes, screen } from '../constants/pattern';
import Menu, {MenuItem} from 'react-native-material-menu';
import { content } from '../localization/Localization';
import RNRestart from 'react-native-restart';
import SeeMore from '../assets/icons/seemore.svg';
import SeeLess from '../assets/icons/seeless.svg';
import Exit from '../assets/icons/exit.svg';
import axios from 'axios';
import Phone from '../assets/icons/contacts/phone.svg';
import Email from '../assets/icons/contacts/email.svg';
import Whatsapp from '../assets/icons/contacts/whatsapp.svg';
import Youtube from '../assets/icons/contacts/youtube.svg';
import Instagram from '../assets/icons/contacts/instagram.svg';
import Facebook from '../assets/icons/contacts/facebook.svg';
import { setData } from '../helper/LocalStorage';
import Forms from '../components/Forms';

const MenuScreen = ({navigation, route}) => {

    const DATA = [
        {
            id: 0,
            title: content.home,
            route: 'Home'
        },
        {   
            id: 1,
            title: content.rsk,
            route: 'RSK',
        },
        {
            id: 2,
            title: content.news,
            route: 'NewsTab',
        },
        {
            id: 3,
            title: content.briefings,
            route: 'Briefing',
        },
        {
            id: 4,
            title: content.media,
            route: 'Media'
        },
        {
            id: 5,
            title: content.answers,
            route: 'FAQ',
        },
    ]

    const [pages, setPages] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openRSK, setOpenRSK] = useState(false);
    const [openMedia, setOpenMedia] = useState(false);
    const [openNews, setOpenNews] = useState(false);

    const getPages = () => {
        axios.get('pages')
        .then(res => {
            console.log(res);
            setPages(res.data.pages);
            getContacts();
        })
    }

    const getContacts = () => {
        axios.get('contacts')
        .then(res => {
            console.log(res);
            setContacts(res.data);
            getCategories();
            setLoading(false);
        })
    }

    const getCategories = () => {
        axios.get('home')
        .then(res => {
            console.log(res);
            setNews(res.data);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getPages();
    }, []);

    const drop = useRef(null);
    const showMenu = () => {
        drop.current.show();
    }
    const hideMenu = (lang) => {
        setData('lang', lang);
        RNRestart.Restart();
    }

    const SMButton = ({url, children}) => {
        const handlePress = useCallback(async () => {

        const supported = await Linking.canOpenURL(url);
            
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, [url]);
        return(
            <TouchableOpacity style={styles.socials} onPress={handlePress}>
                {children}
            </TouchableOpacity>
        )
    }

    const openDialScreen = (num) => {
        if (Platform.OS === 'ios') {
            number = `telprompt:${num}`;
        } else {
            number = `tel:${num}`;
        }
        Linking.openURL(number);
    }

    const subsOfRSK = ['Symbols', 'Docs', 'Goals', 'Management', 'Structure', 'Procurements', 'Job'];

    const renderRSK = ({item, index}) => (
        <TouchableOpacity onPress={() => navigation.navigate(subsOfRSK[index], {id: item.id})}>
            <Text style={[styles.text, {marginTop: 20}]}>{item[`title_${content.lang}`]}</Text>
        </TouchableOpacity>
    )

    const subsOfMedia = ['PhotoGallery', 'VideoGallery'];

    const medias = [
        {
            title: content.photoGallery,
        },
        {
            title: content.videoGallery
        }
    ]

    const renderMedia = ({item, index}) => (
        <TouchableOpacity onPress={() => navigation.navigate(subsOfMedia[index])}>
            <Text style={[styles.text, {marginTop: 20}]}>{item.title}</Text>
        </TouchableOpacity>
    )

    const renderNews = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('News', {id: item.id})}>
            <Text style={[styles.text, {marginTop: 20}]}>{item[`title_${content.lang}`]}</Text>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => (
        <View>
            {
                item.id == 1 ?
                <View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setOpenRSK(openRSK ? false : true)}>
                        <Text style={[styles.text, {marginTop: 20}]}>{item.title}</Text>
                        {
                            openRSK ?
                            <SeeLess stroke={colors.color2} style={{marginTop: 20}}/>
                            :
                            <SeeMore stroke={colors.color2} style={{marginTop: 20}}/>
                        }
                    </TouchableOpacity>
                    {
                        openRSK &&
                        <FlatList
                            data={pages}
                            renderItem={renderRSK}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}

                        />
                    }
                </View>
                : item.id == 2 ?
                <View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setOpenNews(openNews ? false : true)}>
                        <Text style={[styles.text, {marginTop: 20}]}>{item.title}</Text>
                        {
                            openNews ?
                            <SeeLess stroke={colors.color2} style={{marginTop: 20}}/>
                            :
                            <SeeMore stroke={colors.color2} style={{marginTop: 20}}/>
                        }
                    </TouchableOpacity>
                    {
                        openNews &&
                        <FlatList
                            data={news}
                            renderItem={renderNews}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </View>
                : item.id == 4 ?
                <View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setOpenMedia(openMedia ? false : true)}>
                        <Text style={[styles.text, {marginTop: 20}]}>{item.title}</Text>
                        {
                            openMedia ?
                            <SeeLess stroke={colors.color2} style={{marginTop: 20}}/>
                            :
                            <SeeMore stroke={colors.color2} style={{marginTop: 20}}/>
                        }
                    </TouchableOpacity>
                    {
                        openMedia &&
                        <FlatList
                            data={medias}
                            renderItem={renderMedia}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </View>
                :
                <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
                    <Text style={[styles.text, {marginTop: 20}]}>{item.title}</Text>
                </TouchableOpacity>
            }
        </View>
    )

    const renderFooter = () => (
                    <View style={styles.contact}>
                        <Text style={styles.contactText}>{content.contact}</Text>
                        <TouchableOpacity style={styles.directContacts} onPress={() => openDialScreen(contacts.phone1)}>
                            <Phone style={{marginRight: 15}}/>
                            <Text style={{fontSize: fontSizes.h4.size, color: colors.color2}}>{contacts.phone1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.directContacts} onPress={() => openDialScreen(contacts.phone2)}>
                            <Phone style={{marginRight: 15}}/>
                            <Text style={{fontSize: fontSizes.h4.size, color: colors.color2}}>{contacts.phone2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.directContacts} onPress={() => Linking.openURL('mailto:' + contacts.email + '?subject=abcdefg&body=body')}>
                            <Email style={{marginRight: 15}}/>
                            <Text style={{fontSize: fontSizes.h4.size, color: colors.color2}}>{contacts.email}</Text>
                        </TouchableOpacity>
                        <Text style={styles.address}>{contacts.address}</Text>
                        <View style={styles.SMBlock}>
                            {contacts.facebook && 
                                <SMButton url={contacts.facebook}>
                                    <Facebook/>
                                </SMButton>
                            }
                            {contacts.instagram &&
                                <SMButton url={contacts.instagram}>
                                    <Instagram/>
                                </SMButton>
                            }
                            {contacts.whatsapp &&
                            <SMButton url={contacts.whatsapp}>
                                <Whatsapp/>
                            </SMButton>
                            }
                            {contacts.youtube &&
                            <SMButton url={contacts.youtube}>
                                <Youtube/>
                            </SMButton>
                            }
                        </View>
                        <Forms outstyle={{
                            button1: {
                                borderWidth: 1,
                                borderColor: colors.color2
                            },
                            text1: {
                                color: colors.color2
                            },
                            button2: {
                                backgroundColor: colors.color2
                            },
                            text2: {
                                color: colors.color1
                            }
                            }}/>
                    </View>
    )

    return(
        <View style={styles.container}>
            <Menu
                ref={drop}
                button={
                        <TouchableOpacity onPress={showMenu} style={styles.dropDown}>
                            <Text style={styles.text} numberOfLines={1}>{content.onLanguage}</Text>
                            <SeeMore stroke={colors.color2}/>
                        </TouchableOpacity>
                    }
                style={{marginTop: 90}}
            >
                <MenuItem onPress={() => hideMenu('kz')}>Қазақша</MenuItem>
                <MenuItem onPress={() => hideMenu('ru')}>Русский</MenuItem>
                <MenuItem onPress={() => hideMenu('en')}>English</MenuItem>
            </Menu>
            <TouchableOpacity style={styles.exitIcon} onPress={() => navigation.goBack()}>
                <Exit/>
            </TouchableOpacity>
            <View style={styles.mainBlock}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color='white'/>
                :
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{marginLeft: 16, paddingBottom: 50}}
                    ListFooterComponent={renderFooter}
                    showsVerticalScrollIndicator={false}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color1,
    },
    mainBlock: {
        width: '100%', 
        borderWidth: 0.5,
        borderColor: colors.color3,
        marginTop: 20
    },
    dropDown: {
        flexDirection: 'row', 
        marginTop: Platform.OS == 'android' ? 30 : 60, 
        alignItems: 'center',
        // backgroundColor: 'red',
        marginRight: screen.width/2,
        paddingLeft: 16,
    },
    exitIcon: {
        position: 'absolute', 
        right: 0,
        top: 0,
        marginRight: 16,
        marginTop: Platform.OS == 'android' ? 30 : 60,
    },
    text: {
        fontSize: fontSizes.h3.size, 
        color: colors.color2, 
        marginRight: 10
    },
    contact: {
        marginTop: 30
    },
    directContacts: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 15
    },
    address: {
        fontSize: fontSizes.h4.size, 
        color: colors.color2, 
        marginTop: 15
    },
    contactText: {
        fontSize: fontSizes.h3.size, 
        fontWeight: fontSizes.h3.weight, 
        color: colors.color2
    },
    SMBlock: {
        width: screen.width-32, 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        padding: 20
    },
    socials: {
        width: 60,
        height: 45,
        borderWidth: 1,
        borderColor: colors.color2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MenuScreen;
