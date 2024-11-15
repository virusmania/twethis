// 'section[aria-labelledby="accessible-list-0"]'
//'article[data-testid="tweet"]'

"use strict";

const targetNode = document.body;
const config = { childList: true, subtree: true };

const sleep = (waitMsec) => new Promise(resolve => setTimeout(resolve, waitMsec));

// const API_request = (tl) => {
//     chrome.runtime.sendMessage({message : tl}, async (response) => {
//         // console.log("Details: ", response.text, "URL: ", response.link);
//         sleep(3000);
//         // alert("Details: "+"\n"+response.text+"\n"+"URL: "+response.link);
//         return {"texts": response.text, "link": response.link};
//     });
// }

const tweetObserverCallback = (mutationsList, observer) => {
    observer.disconnect();
    for(let mutation of mutationsList) {
        if(mutation.type === "childList") {
            const tweets_query = document.querySelectorAll('div[data-testid="tweetText"]');
            tweets_query.forEach(tweet => {
                if (!tweet.querySelector('button')) {
                    const factCheck = async () => {
                        const tweet_text = tweet.innerText.replace("Fact Check!!", "");
                        // デザインサンプル作ってみた
                        const waiting_text = '<div class="alerts"><p id="time">Just a few minutes🫠</p><div class="loader"></div></div><style>.alerts { background-color: #9E76B4; padding-top: 5px; padding-bottom: 5px; padding-right: 3px;border: 2px solid #6658A6; border-radius: 10px;} .loader { border: 15px solid #39d4ff; border-radius: 50%; width: 10px; height: 10px; animation: spin 2s linear infinite; } @keyframes spin{ 0%{ transform: rotate(0deg); } 50%{ transform: rotate(180deg); border-radius: 0%; width: 20px; height: 20px; border: 5px double #061fd5; } 100%{ transform: rotate(360deg); } }</style>';
                        tweet.innerHTML += waiting_text;
                        chrome.runtime.sendMessage({message : tweet_text}, async (response) => {
                            // console.log("Details: ", response.text, "URL: ", response.link);
                            let alert_text = "Details: "+"\n"+response.text+"\n"+"URL: "+"<a href=\""+response.link+"\" target=\"_blank\">THESIS LINK"+"</a>";
                            // alert(alert_text);
                            tweet.innerHTML = tweet.innerHTML.replace(waiting_text, '');
                            // ここでTweetの下に紫色の枠を表示しているんだけど、このデザインをCSSで整えたい。
                            tweet.innerHTML += '<div class="alerts"><fieldset class="fields">'+alert_text+'</fieldset></div><style>.alerts { background-color: #9E76B4; padding-top: 5px; padding-bottom: 5px; padding-right: 3px;border: 2px solid #6658A6; border-radius: 10px;} .fields { border:0px solid #000; background-color:#9E76B4; font-size:12px; width:500px; padding-left: 5px}</style>';
                            // tweet.innerHTML += '<div aria-live="polite" role="status" class="css-175oi2r r-1xfd6ze r-6koalj r-18u37iz r-ymttw5 r-1f1sjgu r-1dt6qoi r-5oul0u r-1ydw1k6 r-iyfy8q" style="background: rgb(0, 255, 0)"><div class="css-175oi2r r-13awgt0 r-18u37iz" data-testid="icon"><div class="css-175oi2r r-1habvwh r-13awgt0 r-1777fci"><div dir="ltr" class="css-1rynq56 r-bcqeeo r-qvutc0 r-1tl8opc r-a023e6 r-rjixqe r-b88u0q r-15zivkp" style="text-overflow: unset; color: rgb(231, 233, 234);"><span class="css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc" style="text-overflow: unset;">検索結果</span></div><div dir="ltr" class="css-1rynq56 r-bcqeeo r-qvutc0 r-1tl8opc r-1b43r93 r-1cwl3u0 r-16dba41" style="text-overflow: unset; color: rgb(231, 233, 234);"><span class="css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc" style="text-overflow: unset;">'+alert_text+'</span></div></div></div></div>'
                        });
                    }

                    const button = document.createElement("button");
                    button.textContent = "Thesis Check!!";
                    button.className = "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-15ysp7h r-4wgw6l r-ymttw5 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc css-1rynq56 r-bcqeeo r-qvutc0 r-1tl8opc r-q4m81j r-a023e6 r-rjixqe r-b88u0q r-1awozwy r-6koalj r-18u37iz r-16y2uox r-1777fci";
                    button.setAttribute("style", "border-color: rgba(0, 0, 0, 0); background-color: rgb(239, 243, 244); padding-bottom: 5px;");
                    button.addEventListener("click", factCheck);
                    tweet.appendChild(button);
                }
            });
        }
    }
    observer.observe(targetNode, config);
};

const tweetObserver = new MutationObserver(tweetObserverCallback);

tweetObserver.observe(targetNode, config);