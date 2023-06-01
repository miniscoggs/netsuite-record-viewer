browser.contextMenus.create({
    id: 'netsuite-record-viewer-copy-record',
    title: 'Copy NetSuite Record',
    documentUrlPatterns: ['https://*.netsuite.com/*']
})

browser.contextMenus.onClicked.addListener(function (info, tab) {
    browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (info.menuItemId == 'netsuite-record-viewer-copy-record') {
            browser.tabs.sendMessage(
                tabs[0].id,
                {
                    action: 'getRecord'
                }
            )
        }
    })
});