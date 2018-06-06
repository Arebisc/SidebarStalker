'use strict';

const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const Iso7816Application = smartcard.Iso7816Application;

var fs = require('fs');
var asn1js = require('asn1js');
const util = require('util');

const devices = new Devices();

devices.on('device-activated', event => {
	console.log('Smart card reader active');
    const currentDevices = event.devices;
			
    let device = event.device;
	
	device.on('error', function (message) {
		console.log(`Error '${message}' received`);
	});
    device.on('card-inserted', event => {
        let card = event.card;
        //console.log(`Card '${card.getAtr()}' inserted into '${event.device}'` + '\n');
        const application = new Iso7816Application(card);
	
        application.selectFile([0xD6, 0x16, 0x00, 0x00, 0x30, 0x01, 0x01])
            .then(response => {
              application.issueCommand([0x00,0xA4,0x02,0x00,0x02,0x00,0x02,0x12])
                  .then(response => {
                    application.issueCommand([0x00,0xB0,0x00,0x00,0xF8])
                        .then(response => {

                          var response2 = `${response}`;

                          var start = response2.indexOf("2a8468016504010101") + 18;
                          response2 = response2.substring(start);

                          while (1) {
                            var type = response2.substring(0,2);

                            if (type == "30") break;

                            if (parseInt(response2.substring(2,4),16) > 127) {

                              var count = parseInt(response2.substring(2,4),16) - 128;
                              var length = "";
                              var k = 1;

                              for (k = 1; k <= count; k++) {
                                length += response2.substring(2 + (k*2),4 + (k*2));
                              }

                              var total_length = parseInt(length,16) * 2;
                              response2 = response2.substr(4+(k-1)*2,total_length);

                            }
                            else {
                              var total_length = parseInt(response2.substring(2,4),16) * 2 + 4;
                              response2 = response2.substr(4,total_length);
                            }
                          }

                        //region How to work with ASN.1 strings
                        let bmp_string_encoded = new ArrayBuffer(response2.length/2); // This ArrayBuffer consinsts of encoded ASN.1 BMPString with "abc_" + three first chars from Russian alphabet

                        let bmp_string_view = new Uint8Array(bmp_string_encoded);

                        var kk = 0;

                        for (var i = 0; i < (response2.length / 2); i++){
                          bmp_string_view[i] = "0x" + response2.substring(kk,kk+2);
                          kk+=2;
                        }

                        let bmp_string_decoded = asn1js.fromBER(bmp_string_encoded);

                        if (bmp_string_decoded.offset === (-1)) return; // Error during decoding

                        let obj = bmp_string_decoded.result.valueBlock.value;

                        var names = obj[4].valueBlock.value[0].valueBlock.value;
                        var surnames = obj[3].valueBlock.value[0].valueBlock.value;
                        var index = obj[5].valueBlock.value;

                        var JSONobject = JSON.parse('{"firstName":"' + names + '","lastName":"' + surnames + '","index":"' + index + '"}');

                        console.log(JSONobject);

                    }).catch(error => {
                        //console.error('Error:', error, error.stack + '\n');
                    });
                  }).catch(error => {
                      //console.error('Error:', error, error.stack + '\n');
                  });
            }).catch(error => {
                //console.error('Error:', error, error.stack + '\n');
            });

    });

    device.on('card-removed', event => {
       console.log(`Card removed from '${event.name}' ` + '\n');
	});

});

devices.on('device-deactivated', event => {
    console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]` + '\n');
});
