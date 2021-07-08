import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import Navigator from './src/navigations/index';
import { getData } from './src/helper/LocalStorage';
import axios from 'axios';
import { content } from './src/localization/Localization';

const App = () => {
            
  axios.defaults.baseURL='https://rsk.almaty.kz/api/';

  const langOfApp = async() => {
    const lang = await getData('lang');
    console.log(lang);
    if (lang !== null) {
        content.setLanguage(lang);
        axios.defaults.headers.locale = lang;
    } else {
        content.setLanguage('kz');
        axios.defaults.headers.locale = 'kz';
    }
}

useEffect(() => {
    langOfApp();
},[])
  
  return(
      <Navigator/>
  )
}

export default App;

