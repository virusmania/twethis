# Twitter Truth

![image](https://github.com/KoeiNaito/twitter_truth/assets/80163026/b5b112a0-c7c2-4809-9dee-8e6262ec7144)

Check the truth of the Twitter timeline. 

# Features

This is a Chrome Extension if you want to check the related thesis of some tweets(discussion). I made the own API for connect to the Microsoft Copilot and get a result through web scraping. Then I connected with background.js and other JavaScript programs to get the results of searching related thesis. 

# Installation

1. Download twitter_truth directory (Packages)
2. Go to "chrome://extensions"
3. Turn on the "Developer mode"
4. Click "Load unpacked"
5. Add "twitter_truth" directory

# Usage

1. Go to Twitter(X)
2. Click "Fact Check!!"
3. Wait a minute (There are looks not working but it is working😎)
4. That's it !!

# For developers

**This informations for Developers**

We created the API for Microsoft Copilot. Then if you cloned this repository, you have to install these packages respectively. 

```bash
npm install --save-dev webpack-cli

cd API

pip install requirements.txt

uvicorn API:app --reload
```

# Author

* Koei Naito
* AICJ high school
* virusgood7523184@gmail.com

# License
The source code is licensed MIT. The "Twitter_truth" content is licensed CC BY 4.0,see LICENSE.
