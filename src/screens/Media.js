import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import TopBar from '../components/TopBar';
import axios from 'axios';
import { content } from '../localization/Localization';
import Right from '../assets/icons/right.svg';

const Media = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMedia = () => {
        axios.get('media')
        .then(res => {
            console.log(res);
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getMedia();
    }, [])

    return(
        <View style={styles.container}>
            <Header ind={4} {...props}/>
            <TopBar selected={content.media} {...props} ind={4}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <ScrollView>
                    <TouchableOpacity style={styles.block} onPress={() => props.navigation.navigate('PhotoGallery')} activeOpacity={0.4}>
                        <Text style={styles.collectionText}>{content.photoGallery}</Text>
                        <FastImage source={{uri: api + data.photogallery.images[0]}} style={styles.image}/>
                        <Text style={styles.title}>{data.photogallery[`title_${content.lang}`]}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('PhotoGallery')}>
                            <Text style={styles.buttonText}>{content.seeAll}</Text>
                            <Right stroke={colors.color1} width='5' height='10'/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                <View style={styles.separator}/>
                    <TouchableOpacity style={[styles.block, {marginBottom: 100}]} onPress={() => props.navigation.navigate('VideoGallery')} activeOpacity={0.4}>
                        <Text style={styles.collectionText}>{content.videoGallery}</Text>
                        <FastImage source={{uri: api + data.video.image}} style={styles.image}/>
                        <Text style={styles.title}>{data.video[`title_${content.lang}`]}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('VideoGallery')}>
                            <Text style={styles.buttonText}>{content.seeAll}</Text>
                            <Right stroke={colors.color1} width='5' height='10'/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ScrollView>
            }
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color2,
    },
    block: {
        width: '100%'
    },
    collectionText: {
        marginLeft: 16,
        marginTop: 20,
        color: colors.fontColor,
        fontSize: fontSizes.h4.size,
        fontWeight: fontSizes.h4.weight
    },
    image: {
        width: screen.width-32,
        height: 170,
        margin: 16,
        marginBottom: 10,
        borderRadius: 5
    },
    title: {
        marginHorizontal: 16,
        color: colors.fontColor,
        fontSize: fontSizes.text1.size
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        marginTop: 10
    },  
    buttonText: {
        marginRight: 7,
        color: colors.color1,
        fontSize: fontSizes.text2
    },
    separator: {
        width: screen.width,
        borderWidth: 0.7,
        borderColor: colors.color4,
        marginTop: 10,
    }
})

export default Media;
