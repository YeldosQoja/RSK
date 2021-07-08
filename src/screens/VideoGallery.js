import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes} from '../constants/pattern';
import Header from '../components/Header';
import axios from 'axios';
import Card from '../components/Card';
import { content } from '../localization/Localization';

const VideoGallery = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getVideoGalleries = () => {
        axios.get('videogalleries')
        .then(res => {
            console.log(res);
            setData(res.data.videogalleries);
            setLoading(false);
            setRefresh(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getVideoGalleries();
    }, [])

    const renderItem = ({item}) => (
        <Card item={item} onPress={() => props.navigation.navigate('OpenNews', {id: item.id})}/>
    )

    const header = () => (
        <Text style={styles.title}>{content.videoGallery}</Text>
    )

    const [refresh, setRefresh] = useState(false);
    const onRefresh = () => {
        setRefresh(true);
        getVideoGalleries();
    }
    return(
        <View style={styles.container}>
            <Header shareable={true} share={false} {...props} onBack={() => props.navigation.goBack()}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ListHeaderComponent={header}
                    contentContainerStyle={{paddingBottom: 100}}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
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
    title: {
        fontSize: fontSizes.h2.size,
        fontWeight: fontSizes.h2.weight,
        color: colors.fontColor,
        marginLeft: 16,
        marginTop: 25
    }
})

export default VideoGallery;
