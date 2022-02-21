function getUrlParser(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser;
}

function getAuthorization(xhr, settings) {
    var parser = getUrlParser(settings.url);
    var encString = `(request-target): ${settings.type.toLowerCase()} /${parser.pathname.split("/").slice(2).join("/")}\nhost: ${parser.host}\nx-requested-time: ${new Date().toString()}`
    console.log(encString);
    var dataHash = CryptoJS.SHA256(JSON.stringify(settings.data), "secret1").toString();

    let hash = CryptoJS.HmacSHA256(encString, "secret1");
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    let Authorization = `Signature keyId="123456789",algorithm="hmac-sha256",headers="(request-target) host x-requested-time",signature="${hashInBase64}"`
    return Authorization;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('Authorization', getAuthorization(xhr, settings));
        xhr.setRequestHeader('X-Requested-Time', new Date().toString())
    }
});

$(function() {
    /**
     * dumping sample data
     */
    $('#my-ajax-table').dynatable({
        features: {
            paginate: false,
            search: false
        },
        dataset: {
            ajax: true,
            ajaxUrl: '/dynatable-ajax.json',
            ajaxOnLoad: true,
            records: []
        }
    });

    /**
     * showing cities list.
     */
     $('#city-table').dynatable({
        features: {
            paginate: false,
            search: false
        },
        dataset: {
            ajax: true,
            ajaxUrl: '/api/cities',
            ajaxOnLoad: true,
            records: []
        }
    });
});