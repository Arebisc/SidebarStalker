'use strict';

const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const Iso7816Application = smartcard.Iso7816Application;

var fs = require('fs');
var Ber = require('asn1').Ber;

const devices = new Devices();

devices.on('device-activated', event => {
    const currentDevices = event.devices;
    let device = event.device;
    console.log(`Device '${device}' activated, devices: ${currentDevices}` + '\n');
    for (let prop in currentDevices) {
        console.log("Devices: " + currentDevices[prop] + '\n');
    }

    device.on('card-inserted', event => {
        let card = event.card;
        console.log(`Card '${card.getAtr()}' inserted into '${event.device}'` + '\n');

        card.on('response-received', event => {
            console.log(`Response '${event.response}' received from '${event.card}' in response to '${event.command}'` + '\n');
        });

        const application = new Iso7816Application(card);
        //0x31, 0x50, 0x41, 0x59, 0x2E, 0x53, 0x59, 0x53, 0x2E, 0x44, 0x44, 0x46, 0x30, 0x31

        application.selectFile([0xD6, 0x16, 0x00, 0x00, 0x30, 0x01, 0x01])
            .then(response => {
                console.info(`Odpowiedz wybierz DF: '${response}' '${response.meaning()}'` + '\n');
            }).catch(error => {
                console.error('Error:', error, error.stack + '\n');
            });

        application.issueCommand([0x00,0xA4,0x02,0x00,0x02,0x00,0x02,0x12])
            .then(response => {
                console.info(`Odpowiedz wybierz EF: '${response}' '${response.meaning()}'` + '\n');
            }).catch(error => {
                console.error('Error:', error, error.stack + '\n');
            });

        application.issueCommand([0x00,0xB0,0x00,0x00,0xF8])
            .then(response => {

//CHUNKIFY
              var chunks = [];

              for (var i = 0, charsLength = `${response}`.length; i < charsLength; i += 2) {
                  chunks.push(/*'0x' +*/ `${response}`.substring(i, i + 2));
              }


            var stream = fs.createWriteStream("test.txt");
            stream.once('open', function(fd) {

                //stream.write(`${response}`);
                stream.write(chunks.toString().replace(/,/g , " "));
                stream.end();

            });

            console.info(`Odpowiedz czytaj EF: '${response}' '${response.meaning()}'` + '\n');

            }).catch(error => {

                console.error('Error:', error, error.stack + '\n');

            });


    });
    device.on('card-removed', event => {
        console.log(`Card removed from '${event.name}' ` + '\n');
    });

});

devices.on('device-deactivated', event => {
    console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]` + '\n');
});
