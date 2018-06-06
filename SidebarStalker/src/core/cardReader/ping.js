function pingMessage() {
    setTimeout(function () {
        // console.log('ping');
        pingMessage();
    }, 5000);
}

pingMessage();