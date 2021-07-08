import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';
import {colors, fontSizes, api} from '../constants/pattern';
import Card from '../components/Card';
import FastImage from 'react-native-fast-image';
import Footer from '../components/Footer';
import { content } from '../localization/Localization';
import axios from 'axios';
import SeeMore from '../assets/icons/seemore.svg';

const News = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [news, setNews] = useState(null);
    const [newsURL, setNewsURL] = useState(null);

    const [seeMoreLoading, setSeeMoreLoading] = useState(false);

    const id = props.route.params.id;
    console.log(id);

    const getMain = () => {
        axios.get('news', {params: {category: id}})
        .then(res => {
            let data = res.data;
            setData(data);
            setNews(data.news.data);
            setNewsURL(data.news.next_page_url ? data.news.next_page_url.slice(26) : null);
            setLoading(false);
            setRefresh(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const getNews = () => {
        axios.get(newsURL)
        .then(res => {
            let data = res.data.news;
            console.log(data);
            setNews(news.concat(data.data));
            setNewsURL(data.next_page_url ? data.next_page_url.slice(26) : null);
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
        getNews();
    }

    const renderHeader = () => (
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('OpenNews', {id: data.latest?.id})}>
                <FastImage style={styles.image} source={{uri: api + data.latest?.image, priority: 'high'}}/>
                <View style={{marginHorizontal: 16}}>
                    <Text style={styles.title}>{data.latest?.[`title_${content.lang}`]}</Text>
                    <Text style={styles.date}>{new Date(data.latest?.created_at.replace(' ', 'T')).toLocaleDateString()}</Text>
                </View>
            </TouchableOpacity>
            <Text style={{fontSize: fontSizes.text1, fontWeight: '600', marginLeft: 16, marginTop: 25}}>{content.news}</Text>
        </View>
    )

    const renderCard = ({item, index}) => (
        <Fragment>
            { 
                index != 0 &&
                <Card item={item} video={false} onPress={() => props.navigation.navigate('OpenNews', {id: item.id})}/>
            }
        </Fragment>
    )

    const renderFooter = () => (
        <View>
            {
                newsURL !== null && seeMoreLoading == false ?
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20}} onPress={seeMorePressed} activeOpacity={0.8}>
                    <Text style={{fontSize: fontSizes.text1, textTransform: 'uppercase', marginRight: 7}}>{content.seeMore}</Text>
                    <SeeMore/>
                </TouchableOpacity>
                : seeMoreLoading &&
                <ActivityIndicator color={colors.color1} style={{marginTop: 15}}/>
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
            <Header shareable={true} share={false} {...props} onBack={() => props.navigation.goBack()}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/> 
                :
                <FlatList
                    data={news}
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

export default News;
