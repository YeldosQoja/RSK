import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';
import {colors, fontSizes} from '../constants/pattern';
import Card from '../components/Card';
import FastImage from 'react-native-fast-image';
import Footer from '../components/Footer';
import { content } from '../localization/Localization';
import Menu, { MenuItem } from 'react-native-material-menu';
import axios from 'axios';


const TopBar = ({navigation, route, ind}) => {

    const DATA = [
        {
            title: content.home,
            route: 'Home'
        },
        {
            title: content.rsk,
            route: 'RSK',
        },
        {
            title: content.news,
            route: 'NewsTab',
        },
        {
            title: content.briefings,
            route: 'Briefing',
        },
        {
            title: content.media,
            route: 'Media',
        },
    ]

    const params = route.params;

    const renderItem = ({item, index}) => (
        <View style={{height: '100%', paddingHorizontal: 15}}>
            <TouchableOpacity style={styles.bar} onPress={() => navigation.replace(item.route)}>
                <Text style={styles.label}>{item.title}</Text>
            </TouchableOpacity>
            <View style={[styles.indicator, {borderColor: ind == index ? colors.color1 : colors.color3}]}/>
        </View>
    )

    return(
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingRight: 120}}
                initialScrollIndex={ind}
                getItemLayout={(data, index) => {
                    return {length: 80, offset: 80 * index, index}
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: colors.color3
    },
    bar: {
        height: '100%',
        justifyContent: 'center'
    },
    indicator: {
        width: '100%', 
        bottom: 3, 
        borderWidth: 4, 
        borderColor: colors.color1
    },
    label: {
        fontSize: fontSizes.h3.size,
        fontWeight: fontSizes.h3.weight,
        color: colors.fontColor
    }
})

export default TopBar;
