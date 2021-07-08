import React, {useEffect} from 'react';
import { Text, View } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import News from '../screens/News';
import OpenNews from '../screens/OpenNews';
import Video from '../screens/Video';
import Home from '../screens/Home';
import FAQ from '../screens/FAQ';
import Media from '../screens/Media';
import Briefing from '../screens/Briefing';
import OpenBriefing from '../screens/OpenBriefing';
import MenuScreen from '../screens/Menu';
import PhotoGallery from '../screens/PhotoGallery';
import PhotoSlider from '../screens/PhotoSlider';
import VideoGallery from '../screens/VideoGallery';
import RSK from '../screens/RSK';
import Docs from '../screens/rsk/Docs';
import Goals from '../screens/rsk/Goals';
import Job from '../screens/rsk/Job';
import Management from '../screens/rsk/Management';
import Structure from '../screens/rsk/Structure';
import NewsTab from '../screens/NewsTab';
import Symbols from '../screens/rsk/Symbols';
import Procurements from '../screens/rsk/Procurements';
import File from '../test/File';
import Symbol from '../screens/rsk/Symbol';
import { colors } from '../constants/pattern';
import Logo from '../assets/home/logo.svg';


const MainStack = createStackNavigator();

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout(() => navigation.replace('Home'), 1500);
    },[])

    return(
        <View style={{flex: 1, backgroundColor: colors.color1, justifyContent: 'center', alignItems: 'center'}}>
            <Logo width={120} height={120}/>
        </View>
    )
}

const Navigator = () => {
    return(
        <NavigationContainer>
            <MainStack.Navigator initialRouteName='Splash'>
                <MainStack.Screen name='Splash' component={SplashScreen} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Home' component={Home} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Menu' component={MenuScreen} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='File' component={File} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Briefing' component={Briefing} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='OpenBriefing' component={OpenBriefing} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='NewsTab' component={NewsTab} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='News' component={News} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='OpenNews' component={OpenNews} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Video' component={Video} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Media' component={Media} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='FAQ' component={FAQ} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='PhotoGallery' component={PhotoGallery} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='PhotoSlider' component={PhotoSlider} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='RSK' component={RSK} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='VideoGallery' component={VideoGallery} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Docs' component={Docs} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Goals' component={Goals} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Job' component={Job} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Management' component={Management} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Structure' component={Structure} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Symbols' component={Symbols} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Symbol' component={Symbol} options={{
                    headerShown: false
                }}/>
                <MainStack.Screen name='Procurements' component={Procurements} options={{
                    headerShown: false
                }}/>
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;
