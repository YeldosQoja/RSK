import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';
import {colors, fontSizes, api, screen} from '../constants/pattern';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { content } from '../localization/Localization';
import axios from 'axios';
import HTML from 'react-native-render-html';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import SeeMore from '../assets/icons/seemore.svg';
import { Platform } from 'react-native';

const Video = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [video, setVideo] = useState(null);
    const [videoURL, setVideoURL] = useState(null);

    const [seeMoreLoading, setSeeMoreLoading] = useState(false);

    const getMain = () => {
        axios.get('video')
        .then(res => {
            let data = res.data;
            setData(data);
            setVideo(data.videos.data);
            setVideoURL(data.videos.next_page_url ? data.videos.next_page_url.slice(26) : null);
            setLoading(false);
            setRefresh(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const getVideo = () => {
        axios.get(videoURL)
        .then(res => {
            let data = res.data.videos;
            console.log(data);
            setVideo(video.concat(data.data));
            setVideoURL(data.next_page_url ? data.next_page_url.slice(26) : null);
            setSeeMoreLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getMain();
    },[])

    const seeMorePressed = () => {
        setSeeMoreLoading(true);
        getVideo();
    }

    const renderers = {
        iframe: IframeRenderer,
    }
    const customHTMLElementModels = {
        iframe: iframeModel
    }

    const renderHeader = () => (
        <View style={{}}>
            <View>
                {
                    Platform.OS = 'ios' ?
                    <HTML 
                        renderers={renderers}
                        bounces={false}
                        // source={{html: data.latest.video}}
                        source={{html: data.latest?.video}}
                        WebView={WebView} 
                        customHTMLElementModels={customHTMLElementModels}
                        contentWidth={screen.width} 
                        tagsStyles={{iframe: styles.video}} 
                        renderersProps={ {iframe: {scalesPageToFit: true, webViewProps: {} }} }
                    /> 
                :
                    <WebView
                        source={{ html: data.latest?.video }}
                        allowsFullscreenVideo
                        style={styles.video}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        scalesPageToFit={false}
                        androidLayerType='hardware'
                    />
                }
                <TouchableOpacity style={{marginHorizontal: 16}} onPress={() => props.navigation.navigate('OpenNews', {id: data.latest?.id})}>
                    <Text style={styles.title}>{data.latest?.[`title_${content.lang}`]}</Text>
                    <Text style={styles.date}>{new Date(data.latest?.created_at.replace(' ', 'T')).toLocaleDateString()}</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: fontSizes.text1, fontWeight: '600', marginLeft: 16, marginTop: 25}}>{content.video}</Text>
        </View>
    )

    const renderCard = ({item, index}) => (
        <Fragment>
            { index != 0 &&
            <Card item={item} video={true} onPress={() => props.navigation.navigate('OpenNews', {id: item?.id})}/>
            }
        </Fragment>
    )

    const renderFooter = () => (
        <View>
            {
                videoURL !== null && seeMoreLoading == false ?
                <TouchableOpacity style={styles.seeMore} onPress={seeMorePressed} activeOpacity={0.8}>
                    <Text style={styles.seeMoreText}>{content.seeMore}</Text>
                    <SeeMore/>
                </TouchableOpacity>
                : seeMoreLoading &&
                <ActivityIndicator style={{}} color={colors.color1} style={{marginTop: 15}}/>
            }
        </View>
    )

    const [refresh, setRefresh] = useState(false);
    const onRefresh = () => {
        setRefresh(true);
        getMain();
    }
    return(
        <View style={styles.container}>
            <Header ind={3} {...props} share={false} onPress={() => props.navigation.goBack()}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}}/> 
                :
                <FlatList
                    data={video}
                    ListHeaderComponent={renderHeader}
                    renderItem={renderCard}
                    ListFooterComponent={renderFooter}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    refreshing={refresh}
                    onRefresh={onRefresh}
                />
            }
            <Footer/>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color2
    },
    // image: {
    //     width: '100%',
    //     height: 220,
    //     borderBottomRightRadius: 7,
    //     borderBottomLeftRadius: 7,
    // },
    video: {
        width: screen.width,
        height: 220,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
    },
    title: {
        marginTop: 15,
        fontSize: fontSizes.h1.size,
        fontWeight: fontSizes.h1.weight
    },
    date: {
        marginTop: 8,
        fontSize: fontSizes.text2,
        color: colors.color5
    },
    seeMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    seeMoreText: {
        fontSize: fontSizes.text1, 
        textTransform: 'uppercase', 
        marginRight: 7
    },
})

export default Video;
