window.addEventListener(
    'message',
    (event) => {
        const sendMessageToExtension = (type, text = null) => {
            window.postMessage({dest: 'extension', type, text}, '*');
        }

        if (!(event.data.action && event.data.action == 'getRecord')) return;

        try {
            if (typeof nlapiGetRecordType === 'undefined') {
                console.error('Are you on a NetSuite page?');
                return;
            }
        
            const id = nlapiGetRecordId();
            const type = nlapiGetRecordType();
            const url = '/app/common/scripting/nlapihandler.nl';
            const payload = `<nlapiRequest type="nlapiLoadRecord" id="${id}" recordType="${type}"/>`;
        
            nlapiRequestURL(url, payload, null, (response) => {
                if (response.getError()) {
                    console.error('Are you logged in?');
                } else {
                    navigator.clipboard.writeText(JSON.stringify(xmlToJson.parse(response.getBody())));
                }
            });
        } catch (error) {
            console.error(error.toString());
        }
    },
    false
);
