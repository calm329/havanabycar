const fs = require('fs');
const path = require("path");
const PdfPrinter = require('pdfmake');
const content = require("../data/content.js");
const carPrice = require("./carPrice.js");

const fonts = {
    // download default Roboto font from cdnjs.com
    Roboto: {
        normal: path.join(__dirname, '../static/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../static/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../static/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../static/fonts/Roboto-MediumItalic.ttf')
    }
}

const makeFinalVoucher = (booking) => {
    try {
        const folder = path.join(__dirname, "../static/pdf/", String(booking._id));
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        const translation = content.text[booking.language].summary;
        const searchTranslation = content.text[booking.language].search;
        const pdfTranslation = content.text[booking.language].pdf;

        const printer = new PdfPrinter(fonts);

        //Content Goes HERE
        const docDefinition = {

            background: function (currentPage, pageSize) {
                return {
                    table: {
                        widths: [pageSize.width - 30],
                        heights: [pageSize.height - 30],
                        body: [['']]
                    },
                    margin: 10
                };
            },

            content: [

                //VOUCHER TITLE
                {
                    fontSize: 20,
                    bold: true,
                    decoration: "underline",
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: "VOUCHER",
                                    alignment: 'center',
                                    border: [false, false, false, true],
                                    margin: [0, 0, 0, 10]
                                }
                            ]
                        ]
                    }
                },

                //BOOKING NUMBER
                {
                    fontSize: 16,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: translation.mainTitle + " " + booking.causale,
                                    alignment: 'left',
                                    border: [false, false, false, true],
                                    margin: [0, 0, 0, 0],
                                    fillColor: '#d3d3d3',
                                }
                            ]
                        ]
                    }
                },

                //TITLEs ROW
                {
                    fontSize: 14,
                    bold: true,
                    table: {
                        widths: ['45%', '10%', '45%'],
                        body: [
                            [
                                {
                                    text: "\n\n" + pdfTranslation.driver,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },

                                {
                                    text: '',
                                    border: [false, false, false, false],
                                },

                                {
                                    text: "\n\n" + pdfTranslation.documents,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                }
                            ]
                        ]
                    }
                },

                //DATA BOXES
                {
                    fontSize: 12,
                    bold: false,
                    table: {
                        widths: ['45%', '10%', '45%'],
                        body: [
                            [
                                {
                                    text: translation.driver + ': ' + booking.driver.name + " " + booking.driver.surname + "\n\n" + searchTranslation.passport + ': ' + booking.driver.passport + "\n\n" + searchTranslation.birth + ': ' + booking.driver.birth + "\n\n" + searchTranslation.nationality + ': ' + booking.driver.country,
                                    alignment: 'left',
                                    border: [true, true, true, true],
                                    margin: [0, 10, 0, 10]

                                },

                                {
                                    text: '',
                                    border: [false, false, false, false],
                                },

                                {
                                    text: pdfTranslation.passport + '\n\n' + pdfTranslation.license + "\n\n" + pdfTranslation.card,
                                    alignment: 'left',
                                    border: [true, true, true, true],
                                    margin: [0, 10, 0, 10]
                                },
                            ]
                        ]
                    }
                },

                //TITLEs ROW
                {
                    fontSize: 14,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: "\n\n" + pdfTranslation.reservationData,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                }
                            ]
                        ]
                    }
                },

                //DATA BOXES
                {
                    fontSize: 12,
                    bold: false,
                    table: {
                        widths: ['45%', '10%', '45%'],
                        body: [
                            [
                                {
                                    text: translation.pickUp.toUpperCase() + "\n\n" + pdfTranslation.place + ": " + booking.arrangement.city + "\n\n" + pdfTranslation.office + ": " + booking.arrangement.pickOffice.replace(/\(H24\)/g, '') + "\n\n" + pdfTranslation.date + ": " + booking.arrangement.startString + "\n\n" + pdfTranslation.time + ": " + booking.arrangement.pickupTime,
                                    alignment: 'left',
                                    border: [true, true, true, true],
                                    margin: [0, 10, 0, 10]

                                },

                                {
                                    text: '',
                                    border: [false, false, false, false],
                                },

                                {
                                    text: translation.dropOff.toUpperCase() + "\n\n" + pdfTranslation.place + ": " + booking.arrangement.dropoffCity + "\n\n" + pdfTranslation.office + ": " + booking.arrangement.dropoffOffice.replace(/\(H24\)/g, '') + "\n\n" + pdfTranslation.date + ": " + booking.arrangement.finishString + "\n\n" + pdfTranslation.time + ": " + booking.arrangement.dropoffTime,
                                    alignment: 'left',
                                    border: [true, true, true, true],
                                    margin: [0, 10, 0, 10]
                                },
                            ]
                        ]
                    }
                },

                //TITLEs ROW
                {
                    fontSize: 14,
                    bold: true,
                    table: {
                        widths: ['45%', '10%', '45%'],
                        body: [
                            [
                                {
                                    text: "\n\n" + pdfTranslation.car,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },

                                {
                                    text: '',
                                    border: [false, false, false, false],
                                },

                                {
                                    text: "\n\n" + pdfTranslation.payInCuba,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                }
                            ]
                        ]
                    }
                },

                //DATA BOXES
                {
                    fontSize: 12,
                    bold: false,
                    table: {
                        widths: ['45%', '10%', '45%'],
                        body: [
                            [
                                {
                                    text: translation.model + ': ' + booking.bookedCar.carModel + "\n\n" + translation.category + ': ' + booking.bookedCar.carType + "\n\n" + "Vendor: " + booking.bookedCar.vendor + "\n\n" + pdfTranslation.insuranceIncluded,
                                    alignment: 'left',
                                    border: [true, true, true, true],
                                    margin: [0, 10, 0, 10]
                                },

                                {
                                    text: '',
                                    border: [false, false, false, false],
                                },

                                {
                                    text: pdfTranslation.petrolZero + "\n\n" + pdfTranslation.airportZero + "\n\n" + pdfTranslation.secondDriverZero + "\n\n" + pdfTranslation.dropZero,
                                    alignment: 'left',
                                    border: [true, true, true, true],
                                    margin: [0, 10, 0, 10]
                                },
                            ]
                        ]
                    }
                },

            ]
        };

        const options = {};

        const target = path.join(__dirname, "../static/pdf/", String(booking._id), "/booking-CUBAGOLDCAR.pdf");
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(fs.createWriteStream(target));
        pdfDoc.end();

    } catch (error) {
        console.log(error);
    }
}


const make = (booking) => {

    try {
        const folder = path.join(__dirname, "../static/pdf/", String(booking._id));
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        const translation = content.text[booking.language].summary;
        const searchTranslation = content.text[booking.language].search;
        const pdfTranslation = content.text[booking.language].pdf;

        const printer = new PdfPrinter(fonts);

        const docDefinition = {
            content: [
                //BOOKING NUMBER
                {
                    fontSize: 18,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: translation.invoice + " " + translation.mainTitle + " " + booking.causale,
                                    alignment: 'right',
                                    border: [false, false, false, true],
                                    margin: [0, 0, 0, 10]
                                }
                            ]
                        ]
                    }
                },

                //BOOKING DATA
                {
                    fontSize: 16,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: translation.car.toUpperCase(),
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                }
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: translation.model + '\n' + booking.bookedCar.carModel,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                                {
                                    text: translation.category + '\n' + booking.bookedCar.carType,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: translation.duration + '\n' + booking.arrangement.rentalTime + " " + searchTranslation.day + "s",
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                                {
                                    text: translation.dailyPrice + '\n' + booking.pricing.dailyPrice + " " + booking.currencySymbol + " " + translation.insuranceIncluded,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                            ]
                        ]
                    }
                },
                {
                    fontSize: 16,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: translation.pickUp.toUpperCase(),
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                }
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: searchTranslation.date + '\n' + booking.arrangement.startString + ' (H' + booking.arrangement.pickupTime + ')',
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                                {
                                    text: searchTranslation.place + '\n' + booking.arrangement.pickOffice + " - " + booking.arrangement.city,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                            ]
                        ]
                    }
                },
                {
                    fontSize: 16,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: translation.dropOff.toUpperCase(),
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                }
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: searchTranslation.date + '\n' + booking.arrangement.finishString + ' (H' + booking.arrangement.dropoffTime + ')',
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                                {
                                    text: searchTranslation.place + '\n' + booking.arrangement.dropoffOffice + " - " + booking.arrangement.dropoffCity,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                },
                            ]
                        ]
                    }
                },
                {
                    fontSize: 16,
                    bold: true,
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: searchTranslation.driver.toUpperCase(),
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                }
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: translation.driver + '\n' + booking.driver.name + " " + booking.driver.surname,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                },
                                {
                                    text: searchTranslation.passport + '\n' + booking.driver.passport,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                },
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: searchTranslation.phone + '\n' + booking.driver.phone,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                },
                                {
                                    text: 'Email \n ' + booking.driver.email,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                }
                            ]
                        ]
                    }
                },
                {
                    fontSize: 14,
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    text: searchTranslation.birth + '\n' + booking.driver.birth,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]

                                },
                                {
                                    text: searchTranslation.nationality + '\n' + booking.driver.country,
                                    alignment: 'left',
                                    border: [false, false, false, false],
                                    margin: [0, 10, 0, 10]
                                },
                            ]
                        ]
                    }
                },

            ]
        };

        //Included in the Booking
        const extrasContent = [
            {
                fontSize: 16,
                bold: true,
                table: {
                    widths: ['100%'],
                    body: [
                        [{
                            text: translation.includes.toUpperCase(),
                            alignment: 'left',
                            border: [false, false, false, false],
                            margin: [0, 10, 0, 0]
                        }]
                    ]
                }
            },
            {
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: translation.cost + ": " + booking.pricing.carTotal + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            },

            {
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: pdfTranslation.extraPetrol + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            }

        ];

        if (booking.pricing.secondDriver > 0) {
            extrasContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: pdfTranslation.extraDriver + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (booking.pricing.returnInDifferentCity > 0) {
            extrasContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: pdfTranslation.extraReturn + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (booking.pricing.airportPickUp > 0) {
            extrasContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: pdfTranslation.extraAirport + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (booking.pricing.lateReturn > 0) {
            extrasContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: translation.lateReturn + booking.arrangement.pickupTime + ': ' + booking.pricing.dailyPrice + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (booking.paymentMethod == "creditCardPay") {
            extrasContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: pdfTranslation.creditCardDiscount + booking.discounts[booking.paymentMethod] + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        //Add All Selected Extras To Content
        extrasContent.forEach(item => docDefinition.content.push(item))

        //Display Discounts if Necessary
        const discountsContent = [
            {
                fontSize: 16,
                bold: true,
                table: {
                    widths: ['100%'],
                    body: [
                        [{
                            text: translation.discounts.toUpperCase(),
                            alignment: 'left',
                            border: [false, false, false, false],
                            margin: [0, 10, 0, 0]
                        }]
                    ]
                }
            },
        ];

        if (booking.paymentMethod == "zellePay") {
            discountsContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: translation.zelleDiscount + " " + booking.discounts[booking.paymentMethod] + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (booking.paymentMethod == "btcPay") {
            discountsContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: translation.btcDiscount + " " + booking.discounts[booking.paymentMethod] + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (booking.voucherCode != "") {
            discountsContent.push({
                fontSize: 14,
                table: {
                    widths: ['100%'],
                    body: [
                        [
                            {
                                text: translation.voucherDiscount + " " + booking.discounts.voucherDiscount + " " + booking.currencySymbol,
                                alignment: 'left',
                                border: [false, false, false, false],
                                margin: [0, 10, 0, 10]
                            }
                        ]
                    ]
                }
            })
        }

        if (discountsContent.length > 1) {
            discountsContent.forEach(item => docDefinition.content.push(item))
        }

        //Display Final Price
        const toBePaid = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod)

        const finalPriceContent = [
            {
                fontSize: 18,
                bold: true,
                table: {
                    widths: ['100%'],
                    body: [
                        [{ text: '', alignment: 'right', border: [false, false, false, false], margin: [0, 10, 0, 0] }]
                    ]
                }
            },
            {
                fontSize: 18,
                bold: true,
                table: {
                    widths: ['100%'],
                    body: [
                        [{
                            text: 'TOTAL: ' + toBePaid + ' ' + booking.currencySymbol,
                            alignment: 'right',
                            border: [false, true, false, false],
                            margin: [0, 10, 0, 0]
                        }]
                    ]
                }
            },
            {
                fontSize: 14,
                bold: true,
                table: {
                    widths: ['100%'],
                    body: [
                        [{ text: translation[booking.paymentMethod], alignment: 'right', border: [false, false, false, false], margin: [0, 10, 0, 0] }]
                    ]
                }
            }
        ];

        //ADD Pricing Info to Content
        finalPriceContent.forEach(item => docDefinition.content.push(item));

        const options = {};

        const target = path.join(__dirname, "../static/pdf/", String(booking._id), "/invoice-CUBAGOLDCAR.pdf");
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(fs.createWriteStream(target));
        pdfDoc.end();

    } catch (error) {
        console.log(error);
    }
}

module.exports = { make, makeFinalVoucher };