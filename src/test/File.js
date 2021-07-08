import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Header from '../components/Header';
import { content } from '../localization/Localization';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Left from '../assets/icons/left.svg';
import Right from '../assets/icons/right.svg';
import {FlatListSlider} from 'react-native-flatlist-slider';


const RenderSlider = ({item}) => {
    return(
    <TouchableOpacity onPress={() => props.navigation.navigate('OpenNews', {id: item.id})} activeOpacity={1}>
        <FastImage source={{uri: api + item.image, priority: 'high'}} style={styles.sliderImage}/>
        <View>
            <Text style={styles.sliderTitle} numberOfLines={3}>{item[`title_${content.lang}`]}</Text>
            <Text style={[styles.dateText, {color: colors.color5, marginBottom: 15}]}>{new Date(item.created_at.replace(' ', 'T')).toLocaleDateString()}</Text>
        </View>
    </TouchableOpacity>
    )
} 


const File = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [DATA, setDATA] = useState(null);

    const getData = () => {
        axios.get('index')
        .then(res => {
            let data = res.data;
            console.log(data);
            setDATA(data);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        console.log('useEffect');
        getData();
    }, []);

    const sliderNext = () => {
        setActiveIndex(activeIndex != DATA.slider.length - 1 ? activeIndex + 1 : activeIndex);
    }

    const sliderPrev = () => {
        setActiveIndex(activeIndex != 0 ? activeIndex - 1 : activeIndex);
    }

    const viewConfigRef = useRef({itemVisiblePercentThreshold: 40});
    const onViewRef = useRef((props) => {
        console.log(props);
        setActiveIndex(props.changed[0].index);
    });                          

    return(
        <View style={styles.container}>
            <Header shareable={false} share={false}/>
            {
                loading ?
                <ActivityIndicator/>
                :
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.sliderIcons, {left: 10}]} onPress={sliderPrev}>
                        <Left width={15} height={22} stroke={activeIndex == 0 ? colors.color5 : colors.color2}/>
                    </TouchableOpacity>
                    {/* <FlatList
                            data={DATA.slider}
                            renderItem={renderSlider}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            pagingEnabled
                            initialScrollIndex={activeIndex}
                            showsHorizontalScrollIndicator={false}
                            onViewableItemsChanged={onViewRef.current}
                            viewabilityConfig = {viewConfigRef.current}
                            // decelerationRate={0.5}
                            // disableVirtualization={false}
                            getItemLayout={(data, index) => {
                                return {length: screen.width, offset: screen.width * index, index}
                            }}
                    /> */}
                    <FlatListSlider
                        data={DATA.slider}
                        component={<RenderSlider/>}
                        width={screen.width}
                        onPress={index => setActiveIndex(index)}
                        indicatorContainerStyle={{position:'absolute', bottom: 80}}
                        indicatorActiveColor={'#8e44ad'}
                        indicatorInActiveColor={'#ffffff'}
                        indicatorActiveWidth={30}
                
                        animation
                    />
                    <TouchableOpacity style={[styles.sliderIcons, {right: 10}]} onPress={sliderNext}>
                        <Right width={15} height={22} stroke={activeIndex == DATA.slider.length - 1 ? colors.color5 : colors.color2}/>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.color2
    },
    sliderIcons: {
        width: 15, 
        height: 22, 
        position: 'absolute', 
        marginTop: 100,
        zIndex: 1
    },
    sliderImage: {
        width: screen.width,
        height: 230,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    sliderTitle: {
        alignSelf: 'center',
        width: screen.width-32,
        marginTop: 15, 
        marginRight: 16,
        fontSize: fontSizes.h3.size, 
        fontWeight: fontSizes.h3.weight
    },
})

export default File;
