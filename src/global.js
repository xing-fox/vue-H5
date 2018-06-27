const env = process.env.NODE_ENV
let Global = {}
let Flag = 'www' // 浙江
/**
 * development是开发环境 --> 对应的是浙江的公众号（wx8b6bb04ed1ac3b29）, plus(wxa5b9d93b9a8d3283)
 */
if (env === 'development') {
  Global = {
    appId: 'wx8b6bb04ed1ac3b29',
    imageUrl: 'http://test.xclerk.com/upload/'
  }
} else {
  if (Flag === 'test') {
    Global = {
      appId: 'wx8b6bb04ed1ac3b29', // 浙江
      imageUrl: 'http://test.xclerk.com/upload/'
    }
  }
  if (Flag === 'www') {
    Global = {
      appId: 'wxa5b9d93b9a8d3283', // plus
      imageUrl: 'http://www.xclerk.com/upload/'
    }
  }
}

export default Global
