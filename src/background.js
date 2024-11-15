chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        fetch("http://127.0.0.1:8000/tweets/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tweets: request.message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async data => {
                // console.log(data);
                // await sendResponse(data);
                await sendResponse(data);
                // console.log(data);
            })
            .catch(e => {
                console.log('There was a problem with fetch operation: ' + e.message);
            });
            
            return true;
    });