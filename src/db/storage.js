const THEME_KEY = "oscrud.theme";
const APPTHEME_KEY = 'oscrud.app_theme';

class Storage {

    getTheme = () => {
        return localStorage.getItem(THEME_KEY);
    }

    setTheme = (theme) => {
        localStorage.setItem(THEME_KEY, theme);
    }

    getAppTheme = () => {
        return localStorage.getItem(APPTHEME_KEY);
    }

    setAppTheme = (darkMode) => {
        localStorage.setItem(APPTHEME_KEY, darkMode);
    }

}


export default Storage;