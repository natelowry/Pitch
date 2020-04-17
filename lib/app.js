var Pitch = Pitch || {};

Pitch.EnvironmentVariables = Pitch.EnvironmentVariables || {
    authToken: null
}

Pitch.GoogleLoginPromise = Pitch.GoogleLoginPromise || $.getScript('https://apis.google.com/js/platform.js');

Pitch.Ajax = Pitch.Ajax ||
{
    get(url, data) {
        return $.ajax({
            method: 'GET',
            url: url,
            data: data,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'X-AUTH-TOKEN': Pitch.EnvironmentVariables.authToken }
        });
    },
    post(url, data) {
        return $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'X-AUTH-TOKEN': Pitch.EnvironmentVariables.authToken }
        });
    }
}

