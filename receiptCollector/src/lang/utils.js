import en from './en'
import pl from './pl';

export const languages = {
    en: "en",
    pl: "pl"
}

const getLang = () => {
    const lang = localStorage.getItem("lang");

    switch (lang) {
        case languages.pl: {
            return pl;
        }
        default:
            return en;
    }
}
export default getLang;