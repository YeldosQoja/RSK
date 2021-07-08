import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import Header from '../components/Header';
import axios from 'axios';
import { content } from '../localization/Localization';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import Left from '../assets/icons/left.svg';
import Right from '../assets/icons/right.svg';

const PhotoSlider = (props) => {

    const id = props.route.params.id;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const carousel = useRef(null);

    const snapNext = () => {
        carousel.current.snapToNext();
        setActiveIndex(activeIndex != data.photogallery.images.length - 1 ? activeIndex + 1 : activeIndex);
    }

    const snapPrev = () => {
        carousel.current.snapToPrev();
        setActiveIndex(activeIndex != 0 ? activeIndex - 1 : activeIndex);
    }

    const getPhotoSlider = () => {
        axios.get(`photo/${id}`)
        .then(res => {
            console.log(res);
            setData(res.data);
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getPhotoSlider();
    }, [])

    const renderSlider = ({item}) => (
        <FastImage source={{uri: api + item, priority: 'high'}} style={styles.image}/>
    )

    return(
        <View style={styles.container}>
            {
                loading == false &&
                <Header shareable={true} {...props} onBack={() => props.navigation.goBack()} options={{title: data.photogallery[`title_${content.lang}`], url: data.url}} share={true}/>
            }
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                    <Text style={styles.title}>{data.photogallery[`title_${content.lang}`]}</Text>
                    <View style={styles.imageBlock}>
                        <TouchableOpacity style={styles.snapIcon} onPress={snapPrev}>
                            <Left width={15} height={22} stroke={activeIndex == 0 ? colors.color5 : colors.color1}/>
                        </TouchableOpacity>
                        <Carousel
                            ref={carousel}
                            data={data.photogallery.images}
                            sliderWidth={screen.width}
                            itemWidth={screen.width}
                            renderItem={renderSlider}
                            onSnapToItem={index => setActiveIndex(index)}
                        />
                        <TouchableOpacity style={styles.snapIcon} onPress={snapNext}>
                            <Right width={15} height={22} stroke={activeIndex == data.photogallery.images.length - 1 ? colors.color5 : colors.color1}/>
                        </TouchableOpacity>
                    </View>
                    <Pagination
                        dotsLength={data.photogallery.images.length}
                        activeDotIndex={activeIndex}
                        containerStyle={styles.pagination}
                        dotStyle={styles.barIndicator}
                        inactiveDotStyle={styles.inactiveIndicator}
                        inactiveDotOpacity = {1}
                        inactiveDotScale={1}
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
        backgroundColor: colors.color2,
    },
    title: {
        fontSize: fontSizes.h3.size,
        fontWeight: fontSizes.h3.weight,
        color: colors.fontColor,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
        marginHorizontal: 16
    },
    imageBlock: {
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: screen.width/1.2,
        height: 308,
        borderRadius: 5,
        marginHorizontal: 17
    },
    pagination: {
        width: screen.width,
        justifyContent: 'space-evenly',
        alignSelf: 'center', 
    },
    barIndicator: {
        width: 30,
        height: 3,
        backgroundColor: colors.color1,
    },
    inactiveIndicator: {
        width: 30,
        height: 3,
        backgroundColor: colors.fontColor,
    },
    snapIcon: {
        width: 15, 
        height: 22
    }
})

export default PhotoSlider;
