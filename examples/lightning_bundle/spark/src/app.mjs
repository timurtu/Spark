import ux from "./ux";
import lng from "wpe-lightning-spark";
import fetch from "node-fetch";
const Headers = fetch.Headers;


class MyApp extends ux.App {
    static _template() {
        return {
            BackgroundImage: { src: MyApp.getPath("background.png")},
            MainImage: { src: MyApp.getPath("rockies.jpeg")},
            Text: {color: 0xff00B74F, text: {text: "Hello World"}}
        };
    }
}

MyApp.COLORS = {
    BACKGROUND: 0xff282e32
};

export default MyApp;
