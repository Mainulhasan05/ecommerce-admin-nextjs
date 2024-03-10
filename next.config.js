const path = require('path')

module.exports = {
  
  env:{
    API_URL: "https://api.rifatewu2.xyz",
    // API_URL:"http://localhost:5000"
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
