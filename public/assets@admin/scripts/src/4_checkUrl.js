checkUrl = function(slug) {
    var url = location.href;
    var regex = '^(http[s]?\:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-\_\:]+(\/)?' + slug + '(\#)?(\/)?$';
    if (url.match(new RegExp(regex))) { return true; } else { return false; };
}