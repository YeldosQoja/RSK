import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import TopBar from '../components/TopBar';
import axios from 'axios';
import { content } from '../localization/Localization';
import Right from '../assets/icons/right.svg';
import Card from '../components/Card';

const NewsTab = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCategories = () => {
        axios.get('home')
        .then(res => {
            console.log(res);
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getCategories();
    }, [])

    const renderItem = ({item, index}) => {

        return(
        <TouchableOpacity onPress={() => props.navigation.navigate('News', {id: item.id})} activeOpacity={0.4}>
            <Text style={styles.title}>{item[`title_${content.lang}`]}</Text>
            <Card unpressable={true} item={item.latest} onPress={() => props.navigation.navigate('News', {id: item.id})}/>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('News', {id: item.id})}>
                <Text style={styles.buttonText}>{content.seeAll}</Text>
                <Right stroke={colors.color1} width='5' height='10'/>
            </TouchableOpacity>
            <View style={styles.separator}/>
        </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <Header shareable={false} {...props}></Header>
            <TopBar selected={content.news} {...props} ind={2}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <FlatList
                    renderItem={renderItem}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingBottom: 100}}
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
        marginTop: 25,
        marginBottom: 20
    },
    separator: {
        width: screen.width,
        borderWidth: 0.7,
        borderColor: colors.color4,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
    },  
    buttonText: {
        marginRight: 7,
        color: colors.color1,
        fontSize: fontSizes.text2
    },
})

export default NewsTab;
