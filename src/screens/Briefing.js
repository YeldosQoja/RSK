import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import Header from '../components/Header';
import TopBar from '../components/TopBar';
import axios from 'axios';
import Card from '../components/Card';
import { content } from '../localization/Localization';

const Briefing = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getBriefings = () => {
        axios.get('briefings')
        .then(res => {
            console.log(res);
            setData(res.data.briefings);
            setLoading(false);
            setRefresh(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getBriefings();
    }, [])
    
    const header = () => (
        <Text style={styles.title}>{content.briefings}</Text>
    )

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => props.navigation.navigate('OpenBriefing', {id: item.id})} activeOpacity={0.6}>
            <Text style={styles.itemTitle}>{item?.[`title_${content.lang}`]}</Text>
            <Text style={styles.date}>{new Date(item?.created_at?.replace(' ', 'T')).toLocaleDateString()}</Text>
            <View style={styles.separator}/>
        </TouchableOpacity>
    )

    const [refresh, setRefresh] = useState(false);
    const onRefresh = () => {
        setRefresh(true);
        getBriefings();
    }
    return(
        <View style={styles.container}>
            <Header ind={3} {...props}/>
            <TopBar selected={content.briefings} {...props} ind={3}/>
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
    title: {
        fontSize: fontSizes.h2.size,
        fontWeight: fontSizes.h2.weight,
        color: colors.fontColor,
        marginHorizontal: 16,
        marginTop: 25,
        marginBottom: 15
    },
    itemContainer: {
        marginTop: 16,
        // marginHorizontal: 16
    },
    itemTitle: {
        fontSize: fontSizes.h4.size,
        color: colors.fontColor,
        marginBottom: 7,
        marginHorizontal: 16,
        // marginLeft: 16
    },
    date: {
        fontSize: fontSizes.text2,
        color: colors.color5,
        marginLeft: 16,
        marginBottom: 10
    },
    separator: {
        width: screen.width,
        borderWidth: 0.7,
        borderColor: colors.color4,
        marginTop: 10,
    }
})

export default Briefing;