import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import Footer from '../../components/Footer';
import { colors, fontSizes, screen, api } from '../../constants/pattern';
import Header from '../../components/Header';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { content } from '../../localization/Localization';
import { match } from 'ramda';

const Goals = (props) => {

    const id = props.route.params.id;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPage = () => {
        axios.get(`page/${id}`)
        .then(res => {
            console.log(res.data);
            let pattern = /src=/g;
            // let mtc;
            while ( (mtc = pattern.exec(res.data.page[0][`content_${content.lang}`])) !== null ){
                console.log("match found at " + mtc.index);
                if(mtc.index + 5 != 'h'){
                    res.data.page[0][`content_${content.lang}`] = res.data.page[0][`content_${content.lang}`].slice(0, mtc.index + 5) + api + res.data.page[0][`content_${content.lang}`].slice(mtc.index + 5);
                    console.log(res.data.page[0][`content_${content.lang}`]);
                }
            }
            setData(res.data.page[0]);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getPage();
    }, [])

    return(
        <View style={styles.container}>
            <Header shareable={true} share={true} {...props} onBack={() => props.navigation.goBack()}/>
            {
                loading ?
                <ActivityIndicator  style={{marginTop: 100}} color={colors.color1}/>
                :
                <ScrollView contentContainerStyle={{paddingBottom: 100, paddingHorizontal: 16}}>
                    <Text style={styles.title}>{data[`title_${content.lang}`]}</Text>
                    <HTML 
                        // renderers={renderers}
                        // bounces={false}
                        
                        source={{html: data[`content_${content.lang}`] }}
                        // WebView={WebView} 
                        // customHTMLElementModels={customHTMLElementModels}
                        contentWidth={screen.width-32} 
                        tagsStyles={{div: styles.content}} 
                        // renderersProps={ {iframe: {scalesPageToFit: true, webViewProps: {} }} }
                    />
                </ScrollView>
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
        marginTop: 25
    },
    content: {
        marginTop: 20,
        alignSelf: 'center',
        marginHorizontal: 16,
    }
})

export default Goals;