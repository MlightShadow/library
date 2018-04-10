```JavaScript
$('.imgbox img').each(function () {
    var oReq = new XMLHttpRequest();
    oReq.open('GET', $(this).attr('src'), true);
    oReq.responseType = 'arraybuffer';
    oReq.onload = function (oEvent) {
        var blob = new Blob([oReq.response], { type: "image/png" });
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            base64data = reader.result;
            console.log(base64data);
        }
    };
    oReq.send();
});
```
