function iexBuildUrl(symbol, action) {
  // temporary - will probably be deprecated soon
  // and replaced by iexcloud API (~June 1st, 2019)
  let uri = 'https://api.iextrading.com/1.0/stock';

  if (action === 'chart') {
    let range = '1y';
    uri += `/${symbol}/chart/${range}`;
  } else if (action === 'quote') {
    uri += `/${symbol}/quote/`;
  } else if (action === 'price') {
    uri += `/${symbol}/price/`;
  }

  return uri;
}

module.exports = {
  uri: iexBuildUrl
};
