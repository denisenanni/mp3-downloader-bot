const { ERROR_CONSTANT } = require('./constants')
const axios = require("axios");
const { extractDownloadUrl } = require('./utils');



const downaloadMp3 = async (youtubeLink) => {
  try {
    let response = await axios.request(getOptions(youtubeLink))

    if (response.status == 200) {

      return extractDownloadUrl(JSON.stringify(response.data))
    } else {
      return ERROR_CONSTANT
    }
  } catch (error) {
    //   console.log(error)
    return ERROR_CONSTANT

  }
};


const getOptions = (videoId) => {
  return {
    method: 'GET',
    url: `https://ytmp3to.com/api/single/mp3/${videoId}`
  }
};




module.exports = { downaloadMp3 }