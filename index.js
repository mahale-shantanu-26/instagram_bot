const Bot = require('./Bot');// this directly imports the index.js file
const config = require('./Bot/puppeteer');

const run = async () => {
    const bot = new Bot();

    const startTime = Date();

    await bot.initPuppeter().then(() => console.log("PUPPETEER INITIALIZED"));

    await bot.visitInstagram().then(() => console.log("BROWSING INSTAGRAM"));

    // await bot._doPostLikeAndFollow().then(() => console.log("LIKING POSTS INSTAGRAM"));

    await bot._doPostLikeFeed().then(() => console.log("LIKING FEED"));

    // await bot._doPostLikeAll().then(() => console.log("LIKING FOLLOWING ONE BY ONE"));

    // await bot._doViewStories().then(() => console.log("Viewing stories"));

    // await bot.visitHashtagUrl().then(() => console.log("VISITED HASH-TAG URL"));

    // await bot.unFollowUsers();

    await bot.closeBrowser().then(() => console.log("BROWSER CLOSED"));

    const endTime = Date();

    console.log(`START TIME - ${startTime} / END TIME - ${endTime}`)

};

run().catch(e=>console.log(e.message));
//run bot at certain interval we have set in our config file
setInterval(run, config.settings.run_every_x_hours * 3600000);
