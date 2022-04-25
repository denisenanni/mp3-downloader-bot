const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('5161885332:AAHh9NauPjIQg8bdQEqiIjsfGyD82A3Wsls')
const youtubeService = require('./youtube-service')
const { extractVideoId } = require('./utils');
const { WILDCARD_REGEX } = require('./constants');


bot.command('/dwnld', (ctx) => {
    const message = ctx.message.text;
    if (message.length > 6) {

        const youtubeLink = message.substring(6).trim()
        const linkPattern = 'https://'

        if (youtubeLink.includes(linkPattern)) {
            const videoId = extractVideoId(youtubeLink);
            //  console.log(videoId);

            youtubeService.downaloadMp3(videoId).then(resp => {

                //  console.log(resp)
                const opts = keyboard(resp);
                return ctx.reply('Here the link ', opts)
            }).catch((error) => {
              //  console.log(error)
                return ctx.reply('Something\'s wrong with that link')

            });

        } else {
            return ctx.reply('Dude that is not a link')
        }

    } else {
        return ctx.reply('Dude where is the link')

    }

});


const keyboard = ((_url) => {
    return Markup.inlineKeyboard([
        Markup.button.url('Link to download', _url),
    ])

});

bot.hears(WILDCARD_REGEX, (ctx) => {
    ctx.reply('What?')})

bot.launch()

bot.catch((err) => {
    console.error('Ooops', err);
    process.exit(1);  
})



