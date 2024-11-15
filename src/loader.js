(async() => {
    const src = chrome.runtime.getURL("src/content_output.js");
    const contentMain = await import(src);
})()