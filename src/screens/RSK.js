import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import Header from '../components/Header';
import TopBar from '../components/TopBar';
import axios from 'axios';
import Card from '../components/Card';
import { content } from '../localization/Localization';

const RSK = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPages = () => {
        axios.get('pages')
        .then(res => {
            console.log(res);
            setData(res.data.pages);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getPages();
    }, [])

    const header = () => (
        <Text style={styles.title}>{content.fullName}</Text>
    )

    const subRoutes = ['Symbols', 'Docs', 'Goals', 'Management', 'Structure', 'Procurements', 'Job'];
    
    const renderItem = ({item, index}) => (
        <TouchableOpacity onPress={() => props.navigation.navigate(subRoutes[index], {id: item.id})}>
            <Text style={styles.subfolderText}>{item[`title_${content.lang}`]}</Text>
        </TouchableOpacity>
    )

    return(
        <View style={styles.container}>
            <Header ind={1} {...props}/>
            <TopBar selected={content.briefings} {...props} ind={1}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <FlatList
                    data={data}
                    ListHeaderComponent={header}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{marginLeft: 16}}
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
        marginTop: 16,
        marginBottom: 20
    },
    subfolderText: {
        fontSize: fontSizes.h4.size,
        fontWeight: '500',
        color: colors.color1,
        marginBottom: 10
    }
})

export default RSK;