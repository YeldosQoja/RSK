import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../constants/pattern';
import { content } from '../localization/Localization';

const Footer = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{content.AllRights}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 65,
        backgroundColor: colors.color1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: fontSizes.text1,
        color: colors.color2
    }
})

export default Footer;
