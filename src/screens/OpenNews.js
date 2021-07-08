import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import HTML from 'react-native-render-html';
import axios from 'axios';
import Card from '../components/Card';
import { content } from '../localization/Localization';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import { Platform } from 'react-native';


const OpenNews = (props) => {

    const id = props.route.params.id;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getOpen = () => {
        axios.get(`news/${id}`)
        .then(res => {
            console.log(res);
            setData(res.data);
            setLoading(false);
            setRefresh(false);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getOpen();
    },[])

    const renderers = {
        iframe: IframeRenderer,
    }
    const customHTMLElementModels = {
        iframe: iframeModel
    }

    const renderHeader = () => (
        <View>
            {
                data.news.video ?
                <HTML
                    source={{html: data.news.video}}
                    tagsStyles={{video: styles.video}} 
                    WebView={WebView}
                    contentWidth={screen.width} 
                    bounces={false}
                />
                :
                <FastImage style={styles.image} source={{uri: api + data.news?.image, priority: 'high'}}/>
            }
            <View style={{marginHorizontal: 16}}>
                <Text style={styles.title}>{data.news?.[`title_${content.lang}`]}</Text>
                <Text style={styles.date}>{new Date(data.news?.created_at.replace(' ','T')).toLocaleDateString()}</Text>
                {
                    Platform.OS = 'ios' ?
                    <HTML 
                        renderers={renderers}
                        bounces={false}
                        source={{html: data.news?.[`content_${content.lang}`] }}
                        WebView={WebView} 
                        customHTMLElementModels={customHTMLElementModels}
                        contentWidth={screen.width-32} 
                        tagsStyles={{p: styles.text, iframe: styles.video}} 
                        renderersProps={ {iframe: {scalesPageToFit: true, webViewProps: {} }} }
                    />
                    :
                    <WebView
                        source={{ html: data.news[`content_${content.lang}`] }}
                        allowsFullscreenVideo
                        style={styles.video}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        scalesPageToFit={false}
                        androidLayerType='hardware'
                    />
                }
            </View>
            <View style={{width: '100%', borderWidth: 1, borderColor: colors.color3, marginTop: 20}}/>
            <Text style={styles.collectionName}>{content.otherNews}</Text>
        </View>
    )

    const renderCard = ({item}) => (
        <Card item={item} video={false} onPress={() => props.navigation.push('OpenNews', {id: item.id})}/>
    )

    const [refresh, setRefresh] = useState(false);
    const onRefresh = () => {
        setRefresh(true);
        getOpen();
    }


    return(
        <View style={styles.container}>
            { loading == false &&
            <Header shareable={true} {...props} onBack={() => props.navigation.goBack()} options={{title: data.news?.[`title_${content.lang}`], url: data.url}} share={true}/>
            }
                {
                    loading ?
                    <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                    :
                    <FlatList
                        data={data.other_news}
                        ListHeaderComponent={renderHeader}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => index.toString()}
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
    image: {
        width: '100%',
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
        color: colors.color5,
        marginBottom: 10,
    },
    text: {
        fontSize: fontSizes.text1,
        color: colors.fontColor
    },
    video: {
        width: screen.width-32,
        height: 220,
    },
    collectionName: {
        fontSize: fontSizes.h4.size,
        fontWeight: fontSizes.h4.weight,
        color: colors.fontColor,
        marginLeft: 16,
        marginTop: 30,
        marginBottom: 10
    }
})

export default OpenNews;
