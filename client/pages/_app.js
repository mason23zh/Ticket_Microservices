//global css can only be importted into _app
import "bootstrap/dist/css/bootstrap.css";

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
