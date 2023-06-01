// inject main script
if (!document.getElementById('netsuite-record-viewer')) {
    const script = document.createElement('script');
    script.id = 'netsuite-record-viewer';
    script.src = browser.extension.getURL('inject.js');
    (document.head || document.documentElement).appendChild(script);
}

function injectScript(id, url) {
    if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.src = browser.extension.getURL(url);
        (document.head || document.documentElement).appendChild(script);
    }
}

injectScript('netsuite-record-viewer', 'inject.js');
injectScript('netsuite-record-viewer-lib-xml2json', 'lib/xml2json.js');

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
        request.action && window.postMessage(request, '*')
    } catch (e) {
        console.error(e.message)
    }
});