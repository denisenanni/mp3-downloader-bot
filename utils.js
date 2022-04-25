const extractVideoId = (link) => {
    let index = link.indexOf('=');
    if (index > -1) {
        return link.substring(link.indexOf('=') + 1)
    }
    return link.substring(link.indexOf('be/') + 3)
}


const extractDownloadUrl = (data) => {
    const regex = new RegExp('https://ytmp3to.com/download[^"]*', 'gm')
    return data.match(regex)[0]
}

module.exports = { extractVideoId, extractDownloadUrl }