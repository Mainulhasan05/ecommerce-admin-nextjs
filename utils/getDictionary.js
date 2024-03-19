const dictionaries={
    en:()=>import('../locales/en.json').then((data)=>data.default),
    bn:()=>import('../locales/bn.json').then((data)=>data.default)
}


export const getDictionary = async (lang) => {
    return await dictionaries[lang]()
}