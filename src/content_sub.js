// webpack.config.jsをsrc/content_output.jsに戻す

"use strict";

// Sleep関数の作成
const sleep = (waitMsec) => new Promise(resolve => setTimeout(resolve, waitMsec));

const observer = new MutationObserver(records => {
    records.forEach(record => {
      Array.from(record.addedNodes)
        .filter(node => isNewTweetsBarElement(node))
        .forEach(newTweetsBar => newTweetsBar.click())
    })
});

const get_tweets = async () => {
    const tweets = document.querySelectorAll('article[data-testid="tweet"]');
    console.log(tweets);
};

window.addEventListener("load", () => get_tweets(), false);