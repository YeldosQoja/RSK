import React, {useState, useEffect, useRef, Fragment} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import Footer from '../components/Footer';
import { colors, fontSizes, screen, api } from '../constants/pattern';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import TopBar from '../components/TopBar';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/Card';
import { content } from '../localization/Localization';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Left from '../assets/icons/left.svg';
import Right from '../assets/icons/right.svg';
import SeeMore from '../assets/icons/seemore.svg';
import Play from '../assets/icons/play.svg';
import {FlatListSlider} from 'react-native-flatlist-slider';


const Home = (props) => {
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [press, setPress] = useState(0);
    const [pressData, setPressData] = useState(null);
    const carousel = useRef(null);

    const [DATA, setDATA] = useState(null);

    const [news, setNews] = useState(null);
    const [newsURL, setNewsURL] = useState(null);

    const [video, setVideo] = useState(null);
    const [videoURL, setVideoURL] = useState(null);

    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);

    const [seeMoreNewsLoading, setSeeMoreNewsLoading] = useState(false);
    const [seeMoreVideoLoading, setSeeMoreVideoLoading] = useState(false);

    const getData = () => {
        axios.get('index')
        .then(res => {
            let data = res.data;
            console.log(data);
            setDATA(data);
            setNews(data.news.data);
            setVideo(data.videos.data);
            setPhoto(data.photo.data);
            setNewsURL(data.news.next_page_url ? data.news.next_page_url.slice(26) : null);
            setVideoURL(data.videos.next_page_url ? data.videos.next_page_url.slice(26) : null);
            setPhotoURL(data.photo.next_page_url ? data.photo.next_page_url.slice(26) : null);
            setLoading(false);
            setRefresh(false);
        }).catch(err => console.log(err));
    }

    const getNews = () => {
        axios.get(newsURL)
        .then(res => {
            let data = res.data.news;
            console.log('news', data);
            setNews(news.concat(data.data));
            setNewsURL(data.next_page_url ? data.next_page_url.slice(26) : null);
            setSeeMoreNewsLoading(false);
        }).catch(err => console.log(err));
    }

    const getVideos = () => {
        axios.get(videoURL)
        .then(res => {
            let data = res.data.videos;
            console.log('videos', data);
            setVideo(video.concat(data.data));
            setVideoURL(data.next_page_url ? data.next_page_url.slice(26) : null);
            setSeeMoreVideoLoading(false);
        }).catch(err => console.log(err));
    }

    const getPhoto = () => {
        if(photoURL) {
            axios.get(photoURL)
            .then(res => {
                let data = res.data.photo;
                console.log('photo', data);
                setPhoto(photo.concat(data.data));
                setPhotoURL(data.next_page_url ? data.next_page_url.slice(26) : null);
            }).catch(err => console.log(err));
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // const snapNext = () => {
    //     carousel.current.snapToNext();
    //     setActiveIndex(activeIndex != DATA.slider.length - 1 ? activeIndex + 1 : activeIndex);
    // }

    // const snapPrev = () => {
    //     carousel.current.snapToPrev();
    //     setActiveIndex(activeIndex != 0 ? activeIndex - 1 : activeIndex);
    // }

    const sliderNext = () => {
        setActiveIndex(activeIndex != DATA.slider.length - 1 ? activeIndex + 1 : activeIndex);
    }

    const sliderPrev = () => {
        setActiveIndex(activeIndex != 0 ? activeIndex - 1 : activeIndex);
    }

    const sliderNextCarousel = () => {
        carousel.current.snapToNext();
        setActiveIndex(activeIndex != DATA.slider.length - 1 ? activeIndex + 1 : DATA.slider.length - 1);
    }

    const sliderPrevCarousel = () => {
        carousel.current.snapToPrev();
        setActiveIndex(activeIndex != 0 ? activeIndex - 1 : activeIndex);
    }

    const seeMorePressed = (index) => {
        if(index) {
            setSeeMoreVideoLoading(true);
            getVideos();
        } else {
            setSeeMoreNewsLoading(true);
            getNews();
        }
    }

    const viewConfigRef = useRef({itemVisiblePercentThreshold: 40});
    const onViewRef = useRef((props) => {
        console.log(props);
        setActiveIndex(props.changed[0].index);
    })

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

    const renderPress = (data) => {
        return data.map( (item, index) => {
            return(
            <TouchableOpacity key={index} style={{width: screen.width, backgroundColor: '#FAFAFA'}} onPress={() => props.navigation.navigate('OpenNews', {id: item.id})} activeOpacity={0.8}>
                <View style={[styles.separator, {marginTop: 0, borderWidth: 0.7, width: screen.width-32, alignSelf: 'center'}]}/>
                <Text style={[styles.photoTitle, {fontSize: fontSizes.text1, marginLeft: 16}]}>{item[`title_${content.lang}`]}</Text>
                <Text style={[styles.dateText, {color: colors.color1}]}>{new Date(item.created_at.replace(' ', 'T')).toLocaleDateString()}</Text>
            </TouchableOpacity>
            )
        })
    }

    // const [sliderLoading, setSliderLoading] = useState(true);
    // const componentDidMount = () => {
    //     setTimeout(() => {
    //       setSliderLoading(false);
    //     }, 100);
    //   }

    
    const ListHeader = () => (
        <View>
                <View style={{flexDirection: 'row'}}>
                    {/* <TouchableOpacity style={[styles.sliderIcons, {left: 10}]} onPress={sliderPrev}>
                        <Left width={15} height={22} stroke={colors.color2}/>
                    </TouchableOpacity> */}
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
                        disableVirtualization={false}
                        getItemLayout={(data, index) => {
                            return {length: screen.width, offset: screen.width * index, index}
                        }}
                    /> */}
                    {/* <Carousel
                        // layout={'default'}
                        data={DATA.slider}
                        renderItem={renderSlider}
                        ref={carousel}
                        sliderWidth={screen.width}
                        itemWidth={screen.width}
                        onSnapToItem={index => setActiveIndex(index)}
                        removeClippedSubviews={false}
                    /> */}
                    <FlatListSlider
                        data={DATA.slider}
                        component={<RenderSlider/>}
                        width={screen.width}
                        // imageKey={activeIndex}
                        // initialScrollIndex={activeIndex}
                        // onPress={index => setActiveIndex(index)}
                        indicatorContainerStyle={{position:'absolute', bottom: 140}}
                        indicatorActiveColor={colors.color1}
                        indicatorInActiveColor={colors.color2}
                        autoScroll={false}
                        loop={false}
                        indicatorActiveWidth={30}
                        // indicatorInActiveWidth={30}
                        // currentIndexCallback={setActiveIndex}
                        // getItemLayout={(data, index) => {
                        //     return {length: screen.width, offset: screen.width * index, index}
                        // }}
                        animation
                    />

                    {/* <FlatList
                        data={DATA.slider}
                        renderItem={RenderSlider}
                        keyExtractor={(_,index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        initialScrollIndex={activeIndex}
                    /> */}
                    {/* <TouchableOpacity style={[styles.sliderIcons, {right: 10}]} onPress={sliderNext}>
                        <Right width={15} height={22} stroke={colors.color2}/>
                    </TouchableOpacity> */}
                </View>
            {/* <Pagination
                dotsLength={DATA.slider.length}
                activeDotIndex={activeIndex}
                containerStyle={{position: 'absolute', alignSelf: 'center', marginTop: 175}}
                dotStyle={styles.barIndicator}
                inactiveDotStyle={styles.inactiveIndicator}
                inactiveDotOpacity = {1}
                inactiveDotScale={1}
            /> */}
            <View>
                <View style={styles.press}>
                    <Text style={[styles.pressTitle, {
                        fontSize: content.lang != 'ru' ? fontSizes.h4.size : fontSizes.h1.size ,
                        fontWeight: content.lang != 'ru' ? fontSizes.h4.weight : fontSizes.h1.weight
                        }]}>{content.press}</Text>
                    <View style={{flexDirection: 'row', marginRight: 16, justifyContent: 'space-between'}}>
                        {
                            DATA.today_press.length > 0 &&
                        <TouchableOpacity onPress={() => setPress(0)}>
                            <Text style={[styles.pressDay, {
                                color: press == 0 ? colors.fontColor : colors.color5,
                                textDecorationColor: press == 0 ? colors.color1 : colors.color5,
                                textDecorationStyle: 'solid',
                                textDecorationLine: press == 0 ? 'underline' : 'none',
                                marginRight: 8,
                                fontSize: content.lang != 'ru' ? fontSizes.text2 : fontSizes.text1 ,
                            }]}>{content.today}</Text>
                        </TouchableOpacity>
                        }
                        {
                            DATA.tomorrow_press.length > 0 &&
                        <TouchableOpacity onPress={() => setPress(1)}>
                            <Text style={[styles.pressDay, {
                                color: press == 1 ? colors.fontColor : colors.color5,
                                textDecorationColor: press == 1 ? colors.color1 : colors.color5,
                                textDecorationStyle: 'solid',
                                textDecorationLine:  press == 1 ? 'underline' : 'none',
                                fontSize: content.lang != 'ru' ? fontSizes.text2 : fontSizes.text1 ,
                            }]}>{content.tomorrow}</Text>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                {
                    press == 0 ?
                    <ScrollView
                        style={{height: DATA.today_press.length > 0 ? 200 : 0}}
                        // contentContainerStyle={{height: 200}}
                        indicatorStyle={''}
                    >
                        {renderPress(DATA.today_press)}
                    </ScrollView>
                    :
                    <ScrollView
                        style={{height: DATA.tomorrow_press.length > 0 ? 200 : 0}}
                        // contentContainerStyle={{height: 200}}
                        indicatorStyle={{color: colors.c1}}
                    >
                        {renderPress(DATA.tomorrow_press)}
                    </ScrollView>
                }
            </View>
            <Text style={styles.collectionName}>{content.news}</Text>
        </View>
    )

    const renderItem = ({item}) => {
        return(
            <Card item={item} video={false} onPress={() => props.navigation.navigate('OpenNews', {id: item.id})}/>
        )
    }   

    const ListFooter = () => (
        <View>
            {
                newsURL !== null && seeMoreNewsLoading == false ?
                <TouchableOpacity style={styles.seeMore} onPress={() => seeMorePressed(0)}>
                    <Text style={styles.seeMoreText}>{content.seeMore}</Text>
                    <SeeMore/>
                </TouchableOpacity>
                : seeMoreNewsLoading &&
                <ActivityIndicator color={colors.color1} style={{marginTop: 15}}/>
            }
            <View style={styles.separator}/>
            <Text style={styles.collectionName}>{content.video}</Text>
            <FlatList
                data={video}
                renderItem={renderVideos}
                keyExtractor={(item, index) => index.toString()}
            />
            {
                videoURL !== null && seeMoreVideoLoading == false ?
                <TouchableOpacity style={styles.seeMore} onPress={() => seeMorePressed(1)}>
                    <Text style={styles.seeMoreText}>{content.seeMore}</Text>
                    <SeeMore/>
                </TouchableOpacity>
                : seeMoreVideoLoading &&
                <ActivityIndicator color={colors.color1} style={{marginTop: 15}}/>
            }
            <View style={styles.separator}/>
            <Text style={styles.collectionName}>{content.photo}</Text>
            <FlatList
                data={photo}
                renderItem={renderPhotos}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                onEndReached={getPhoto}
            />
        </View>
    )

    const renderVideos = ({item}) => (
        <TouchableOpacity style={styles.videoCard} onPress={() => props.navigation.navigate('OpenNews', {id: item.id})} activeOpacity={0.8}>
            <FastImage
                source={{uri: api + item?.image, priority: 'high'}}
                style={styles.videoImage}
            >
                <View style={styles.videoImageCover}>
                    <View style={styles.circle}>
                        <Play fill={colors.color1} width='17' height='24'/>
                    </View>
                    <View style={styles.videoTextContainer}>
                        <Text style={styles.videoText} numberOfLines={3}>{item[`title_${content.lang}`]}</Text>
                        <Text style={[styles.dateText, {color: colors.color2}]}>{new Date(item?.created_at?.replace(' ', 'T')).toLocaleDateString()}</Text>
                    </View>
                </View>
            </FastImage>
        </TouchableOpacity>
    )

    const renderPhotos = ({item , index}) => (
        <TouchableOpacity style={[styles.photoItem, {
            marginLeft: index == 0 ? 16 : 10, 
            marginRight: index == photo.length-1 ? 16 : 0
            }]} onPress={() => props.navigation.navigate('PhotoSlider', {id: item?.id})} activeOpacity={0.8}>
            <FastImage
                source={{uri: api + item.images[0], priority: 'high'}}
                style={styles.photoImage}
            />
            <Text style={styles.photoTitle} numberOfLines={3}>{item[`title_${content.lang}`]}</Text>
        </TouchableOpacity>
    )

    const [refresh, setRefresh] = useState(false);
    const onRefresh = () => {
        setRefresh(true);
        getData();
    }

    // const mainList = useRef(null);

    // const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(false);
    return(
        <View style={styles.container}>
            <Header shareable={false} share={false} {...props}/>
            <TopBar ind={0} {...props}/>
            {
                loading ?
                <ActivityIndicator style={{marginTop: 100}} color={colors.color1}/>
                :
                <FlatList
                    data={news}
                    // ref={mainList}
                    ListHeaderComponent={ListHeader}
                    renderItem={renderItem}
                    ListFooterComponent={ListFooter}
                    ListFooterComponentStyle={{marginBottom: 100}}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    // scrollEnabled={enableScrollViewScroll}
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
    barIndicator: {
        width: 30,
        height: 3,
        backgroundColor: colors.color1,
    },
    inactiveIndicator: {
        width: 30,
        height: 3,
        backgroundColor: colors.color2,
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
    separator: {
        width: '100%', 
        borderWidth: 1, 
        borderColor: colors.color3,
        marginTop: 15
    },
    videoCard: {
        marginTop: 13, 
        width: screen.width-32, 
        height: 210, 
        borderRadius: 9, 
        marginHorizontal: 16
    },
    videoImageCover: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 9
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2,
        margin: 16,
        width: 60,
        height: 60,
        opacity: 0.86,
        borderRadius: 60,
        backgroundColor: colors.color2
    },
    videoImage: {
        width: '100%', 
        height: '100%', 
    },
    collectionName: {
        fontSize: fontSizes.h3.size, 
        fontWeight: fontSizes.h3.weight, 
        marginLeft: 16, 
        marginBottom: 2,
        marginTop: 20
    },
    videoTextContainer: {
        left: 0, 
        bottom: 0, 
        margin: 16,
        position: 'absolute'
    },
    videoText: {
        fontSize: fontSizes.h2.size,
        fontWeight: fontSizes.h2.weight,
        color: colors.color2
    },
    dateText: {
        marginVertical: 8, 
        fontSize: fontSizes.text2,
        marginLeft: 16,
    },
    photoItem: {
        width: screen.width/2.3, 
        height: 210,
        marginTop: 13
    },
    photoImage: {
        width: '100%', 
        height: 120, 
        borderRadius: 5
    },
    photoTitle: {
        marginTop: 10,
        fontSize: fontSizes.h4.size,
        color: colors.fontColor
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
    press: {
        width: screen.width, 
        backgroundColor: '#FAFAFA', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    pressTitle: {
        color: colors.color1,
        marginLeft: 16,
        
    },
    pressDay: {
        fontSize: fontSizes.text1,
        textTransform: 'uppercase',
    },
    sliderIcons: {
        width: 15, 
        height: 22, 
        position: 'absolute', 
        marginTop: 100,
        zIndex: 1
    }
})

export default Home;
