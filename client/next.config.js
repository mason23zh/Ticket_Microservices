//tell webpack to watch the change ever 300ms
//this is to help skaffold sync

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
