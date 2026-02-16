import cookieParser from "cookie-parser";

const useCookieParser = (app) => {
    app.use(cookieParser());
};


export default useCookieParser;