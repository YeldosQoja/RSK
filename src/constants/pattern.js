import { Dimensions } from "react-native"

export const colors = {
    color1: '#0E3F8B',
    color2: '#FFFFFF',
    color3: '#F0F0F0',
    color4: '#F3F3F3',
    color5: '#9C9C9C',
    fontColor: '#222222',
}

export const fontSizes = {
    h1: {
        size: 24,
        weight: '700'
    },
    h2: {
        size: 22,
        weight: '600'
    },
    h3: {
        size: 20,
        weight: '500'
    },
    h4: {
        size: 18,
        weight: '600'
    },
    text1: 16,
    text2: 14
}

export const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export const texts = {
    headerText: 'Региональная служба коммуникаций Алматы',
    footerText: 'Все права защищены © 2021 РСКА'
}

export const api = 'https://rsk.almaty.kz';