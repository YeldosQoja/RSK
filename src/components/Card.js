import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {colors, fontSizes, screen, api} from '../constants/pattern';
import FastImage from 'react-native-fast-image';
import Play from '../assets/icons/play.svg';
import { content } from '../localization/Localization';

const Card = ({item, video, onPress, unpressable}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8} disabled={unpressable}>
            <FastImage style={styles.image} source={{uri: api + (item?.hasOwnProperty('image') ? item?.image : item?.images[0]), priority: 'high'}}>
                {
                    video &&
                    <View style={styles.circle}>
                        <Play/>
                    </View>
                }
            </FastImage>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={styles.title} numberOfLines={3}>{item?.[`title_${content.lang}`]}</Text>
                {
                    item?.created_at &&
                    <Text style={styles.date}>{new Date(item?.created_at.replace(' ', 'T')).toLocaleDateString()}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 13,
        marginHorizontal: 16,
        backgroundColor: colors.color2,
        flexDirection: 'row',
    },
    image: {
        width: screen.width/2.56,
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        borderRadius: 4,
        marginRight: 13
    },
    title: {
        fontSize: fontSizes.h4.size,
        color: colors.fontColor,
    },
    date: {
        fontSize: fontSizes.text2,
        color: colors.color5
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2,
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: colors.color1
    },
})

export default Card;
