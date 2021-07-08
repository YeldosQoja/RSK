import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Header from '../components/Header';
import axios from 'axios';
import { colors, api, screen, fontSizes } from '../constants/pattern';
import HTML from 'react-native-render-html';
import { content } from '../localization/Localization';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import Footer from '../components/Footer';

const OpenBriefing = (props) => {

    const id = props.route.params.id;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getBriefings = () => {
        axios.get(`briefing/${id}`)
        .then(res => {
            console.log(res);
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getBriefings();
    }, [])

    const renderers = {
        iframe: IframeRenderer,
    }
    const customHTMLElementModels = {
        iframe: iframeModel
    }

    return(
        <View style={{flex: 1}}>
            { loading == false &&
                <Header shareable={true} onBack={() => props.navigation.goBack()} {...props} options={{title: data.briefing[`title_${content.lang}`], url: data.url}} share={true}/>
            }
            <ScrollView style={styles.container}>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <View style={{marginBottom: 100}}>
                    {/* <FastImage style={styles.image} source={{uri: api + data.briefing.image, priority: 'high'}}/> */}
                    <View style={{marginHorizontal: 16}}>
                        <Text style={styles.title}>{data.briefing[`title_${content.lang}`]}</Text>
                        <Text style={styles.date}>{new Date(data.briefing.created_at.replace(' ', 'T')).toLocaleDateString()}</Text>
                        <HTML 
                            renderers={renderers}
                            bounces={false}
                            source={{html: data.briefing[`content_${content.lang}`]}}
                            WebView={WebView} 
                            customHTMLElementModels={customHTMLElementModels}
                            contentWidth={screen.width} 
                            tagsStyles={{p: styles.text, iframe: styles.video}} 
                            renderersProps={ {iframe: {scalesPageToFit: true, webViewProps: {} }} }
                        /> 
                        <Text style={styles.speaker}>{data.briefing[`speaker_${content.lang}`]}</Text>
                    </View>
                </View>
            }
            </ScrollView>
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color2,
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
        color: colors.color5
    },
    text: {
        fontSize: fontSizes.text1,
        color: colors.fontColor
    },
    speaker: {
        marginTop: 20,
        fontSize: fontSizes.text1,
        fontWeight: '500',
        fontStyle: 'italic',
        color: colors.fontColor,
    },
    video: {
        margin: 16,
        width: screen.width,
        height: 220,
    }
})

export default OpenBriefing;
