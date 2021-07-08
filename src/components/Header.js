import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors, fontSizes, texts } from '../constants/pattern';
import Logo from '../assets/home/logo.svg';
import MenuIcon from '../assets/icons/menu.svg';
import ShareIcon from '../assets/icons/export.svg';
import BackIcon from '../assets/icons/back.svg';
import { content } from '../localization/Localization';
import Share from 'react-native-share';

const Header = ({shareable, onBack, navigation, options, share}) => {

    const sharePage = (options) => {
        const setOptionsByPlatform = Platform.select({
            ios: {
                activityItemSources: [
                    {
                        placeholderItem: { 
                            type: 'url', 
                            content: options.url 
                        },
                        item: {
                            default: { 
                                type: 'url', 
                                content: options.url 
                            },
                        },
                        subject: {
                            default: options.title,
                        },
                        linkMetadata: { 
                            originalUrl: options.url, 
                        },
                    }
                ]
            },
            android: options
        })
        Share.open(setOptionsByPlatform)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
    }
    
    return(
        <View style={styles.container}>
            {
            shareable ?
            <View style={[styles.headerItems, {width: '82%'}]}>
                <TouchableOpacity style={{width: 23, height: 35, justifyContent: 'center'}} onPress={onBack}>
                    <BackIcon/>
                </TouchableOpacity>
                {
                    share &&
                    <TouchableOpacity style={{width: 25, height: 35, justifyContent: 'center'}} onPress={() => sharePage(options)}>
                        <ShareIcon/>
                    </TouchableOpacity>
                }
            </View>
            :
            <View style={styles.headerItems}>
                <Logo/>
                <Text style={styles.text}>{content.fullName}</Text>
            </View>
            }
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                <MenuIcon/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS == 'android' ? 0 : 39,
        backgroundColor: colors.color1,
        width: '100%',
        height: 73,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    headerItems: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: fontSizes.h4.size,
        fontWeight: fontSizes.h4.weight,
        color: colors.color2,
    }
})

export default Header;
