import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import Header from '../components/Header';
import axios from 'axios';
import Card from '../components/Card';
import { content } from '../localization/Localization';

const PhotoGallery = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPhotoGalleries = () => {
        axios.get('photogalleries')
        .then(res => {
            console.log(res);
            setData(res.data.photogalleries);
            setLoading(false);
            setRefresh(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getPhotoGalleries();
    }, [])

    const renderItem = ({item}) => (
        <Card item={item} onPress={() => props.navigation.navigate('PhotoSlider', {id: item.id})}/>
    )

    const header = () => (
        <Text style={styles.title}>{content.photoGallery}</Text>
    )

    const [refresh, setRefresh] = useState(false);
    const onRefresh = () => {
        setRefresh(true);
        getPhotoGalleries();
    }
    return(
        <View style={styles.container}>
            <Header shareable={true} {...props} onBack={() => props.navigation.goBack()}/>
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

export default PhotoGallery;
