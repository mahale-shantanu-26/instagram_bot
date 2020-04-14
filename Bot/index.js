class InstagramBot {

    constructor() {
        this.config = require('./puppeteer.json');
    }

    async initPuppeter() {
        const puppeteer = require('puppeteer');
        this.browser = await puppeteer.launch({
            headless: this.config.settings.headless,
            args: ['--no-sandbox'],
        });
        this.page = await this.browser.newPage();
        this.page.setViewport({width: 1500, height: 764});
    }

    async visitInstagram() {
        await this.page.goto(this.config.base_url, {timeout: 60000});
        await this.page.waitFor(2500);
        await this.page.click(this.config.selectors.username_field);
        await this.page.keyboard.type(this.config.username);
        await this.page.click(this.config.selectors.password_field);
        await this.page.keyboard.type(this.config.password);
        await this.page.click(this.config.selectors.login_button);
        await this.page.waitForNavigation();
        //Close Turn On Notification modal after login
        await this.page.click(this.config.selectors.not_now_button);
    }

    async visitHashtagUrl() {
        const shuffle = require('shuffle-array');
        let hashTags = shuffle(this.config.hashTags);
        // loop through hashTags
        for (let tagIndex = 0; tagIndex < hashTags.length; tagIndex++) {
            console.log('<<<< Currently Exploring >>>> #' + hashTags[tagIndex]);
            //visit the hash tag url
            await this.page.goto(`${this.config.base_url}/explore/tags/` + hashTags[tagIndex] + '/?hl=en');
            // Loop through the latest 9 posts
            await this._doPostLikeAndFollow(this.config.selectors.hash_tags_base_class, this.page)
        }
    }


    async _doPostLikeAndFollow (){
        var pg1 = this.config.base_url+`shaantnu_/`
        
        await this.page.goto(pg1, {timeout: 60000});
        await this.page.waitFor(2500);

        for (let r = 1; r < 7; r++) {//loops through each row
            for (let c = 1; c < 4; c++) {//loops through each item in the row

                let br = false;
                //Try to select post
                await this.page.click(`article.ySN3v > div > div > .Nnq7C:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a`)
                    .catch((e) => {
                        console.log(e.message);
                        br = true;
                    });
                await this.page.waitFor(3500);//wait for random amount of time
                if (br) continue;//if successfully selecting post continue
                //get the current post like status by checking if the selector exist
            
                let hasEmptyHeart = await this.page.$(this.config.selectors.post_heart_grey);
                
                let liked = await this.page.evaluate(
                      () => document.getElementsByTagName("svg")[10].getAttribute("aria-label") );
                
                console.log("LIKE BUTTON: "+liked);

                //get the username of the current post
                let username = await this.page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.post_username);
                console.log(`INTERACTING WITH ${username}'s POST`);


                //like the post if not already liked. Check against our like ratio so we don't just like all post
                if (liked == "Like") {//&& Math.random() < this.config.settings.like_ratio) {
                    await this.page.click(this.config.selectors.post_like_button);//click the like button
                    await this.page.waitFor(2500);// wait for random amount of time.
                }
                else{ console.log("Alredy Liked");}

                //get the current status of the current user using the text content of the follow button selector
                let followStatus = await this.page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.post_follow_link);

                console.log("followStatus", followStatus);
                //If the text content of followStatus selector is Follow and we have not follow this user before
                // Save his name in the list of user we now follow and follow him, else log that we already follow him
                // or show any possible error

                //Closing the current post modal
                await this.page.click(this.config.selectors.post_close_button)
                    .catch((e) => console.log('<<< ERROR CLOSING POST >>> ' + e.message));
                //Wait for random amount of time
                await this.page.waitFor(2250 + Math.floor(Math.random() * 250));
            }
        }
    };


    async _doPostLikeFeed (){
        var itt=1;
        while(++itt){
            await this.page.click(`div > article._8Rm4L.M9sTE:nth-child(${itt}) > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button.wpO6b `);
            await this.page.waitFor(1500);
            if(itt==8){break;}
        }
        console.log("fisrts")

        await this.page.waitFor(100500);
    };

    async _doViewStories (){
        await this.page.click(`div._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv:nth-child(1)`);
        await this.page.waitFor(100500);
    };



    async _doPostLikeAll (){
        var pg1 = this.config.base_url+this.config.username;
        await this.page.goto(pg1, {timeout: 60000});
        await this.page.waitFor(2500);
        var foll = 3;
        
        await this.page.click(`div > header.vtbgv > section.zwlfE > ul.k9GMp > li.Y8-fY:nth-child(${foll}) > a.-nal3`);
        await this.page.waitFor(2500);
        //console.log(this.page);
        for(var i=2; i<20; i++){
            var br=false;
            await this.page.click(`div.RnEpo.Yx5HN > div > div.isgrP > ul > div > li:nth-child(${i}) > div > div.Igw0E.IwRSH.YBx95.vwCYk > div.Igw0E.IwRSH.eGOV_._4EzTm > div > div > a.FPmhX.notranslate._0imsa`)
            .catch((e) => {
                console.log(e.message);
                br = true;
            });
            await this.page.waitFor(3500);
            if(br) continue;
            for (let r = 1; r < 4; r++) {//loops through each row
                for (let c = 1; c < 4; c++) {//loops through each item in the row
    
                    let br = false;
                    //Try to select post
                    await this.page.click(`article.ySN3v > div > div > .Nnq7C:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a`)
                        .catch((e) => {
                            console.log(e.message);
                            br = true;
                        });
                    await this.page.waitFor(3000);//wait for random amount of time
                    if (br) continue;//if successfully selecting post continue
                    //get the current post like status by checking if the selector exist
                
                    let liked = await this.page.evaluate(
                        () => document.getElementsByTagName("svg")[9].getAttribute("aria-label") );
                  
                    console.log("LIKE BUTTON: "+liked);
  
                  //get the username of the current post
                  let username = await this.page.evaluate(x => {
                      let element = document.querySelector(x);
                      return Promise.resolve(element ? element.innerHTML : '');
                  }, this.config.selectors.post_username);
                  console.log(`INTERACTING WITH ${username}'s POST`);
  
  
                  //like the post if not already liked. Check against our like ratio so we don't just like all post
                  if (liked == "Like") {//&& Math.random() < this.config.settings.like_ratio) {
                      await this.page.click(this.config.selectors.post_like_button);//click the like button
                      await this.page.waitFor(2500);// wait for random amount of time.
                  }
                  else{ console.log("Alredy Liked");}
    
    
                    //get the current status of the current user using the text content of the follow button selector
                    let followStatus = await this.page.evaluate(x => {
                        let element = document.querySelector(x);
                        return Promise.resolve(element ? element.innerHTML : '');
                    }, this.config.selectors.post_follow_link);
    
                    console.log("followStatus", followStatus);
                    //If the text content of followStatus selector is Follow and we have not follow this user before
                    // Save his name in the list of user we now follow and follow him, else log that we already follow him
                    // or show any possible error
    
                    //Closing the current post modal
                    await this.page.click(this.config.selectors.post_close_button)
                        .catch((e) => console.log('<<< ERROR CLOSING POST >>> ' + e.message));
                    //Wait for random amount of time
                    await this.page.waitFor(2000);
                }
            }
            await this.page.goto(pg1, {timeout: 60000});
            await this.page.waitFor(2500);
            var folq = 3;
        
            await this.page.click(`div > header.vtbgv > section.zwlfE > ul.k9GMp > li.Y8-fY:nth-child(${folq}) > a.-nal3`);
            await this.page.waitFor(2500);
            
        }
        await this.page.waitFor(10000000);
        
    };


    async closeBrowser(){
        await this.browser.close();
    }


}

module.exports = InstagramBot;
