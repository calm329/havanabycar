const mongoose = require('mongoose');
const { encrypt, decrypt } = require("../helpers/encryption.js");

const locationSchema = new mongoose.Schema({
	min_hour: String,
	max_hour: String,
	id: String,
	ufficio: String,
	indirizzo: String,
	citta: String,
	azienda: String,
	onlyHavana: Boolean,
	telefono: String,
	sundayClosed: Boolean,
	saturdayHalf: Boolean
});

const carSchema = new mongoose.Schema({
	id: String,
	car_title: String,
	car_slug: String,
	car_desc: String,
	car_stars: String,
	car_is_featured: String,
	car_featured_from: String,
	car_featured_to: String,
	car_owned_by: String,
	car_type: String,
	car_passengers: Number,
	car_doors: Number,
	car_transmission: String,
	car_baggage: String,
	car_conditioner: Boolean,
	isBestPrice: Boolean,
	isActive: Boolean,
	car_tank: String,
	deposito: Number,
	minimo_giorni: Number,
	assicurazione_inclusa: Boolean,
	car_unlimited_mile: String,
	car_basic_price: String,
	only_havana: Boolean,
	car_meta_title: String,
	car_meta_keywords: String,
	car_meta_desc: String,
	car_payment_opt: String,
	car_policy: String,
	car_address: String,
	car_latitude: String,
	car_longitude: String,
	car_location: String,
	car_mapaddress: String,
	car_country: String,
	car_city_address: String,
	car_city: String,
	car_zip: String,
	car_status: String,
	car_order: String,
	car_related: String,
	car_assicurazione: Number,
	car_deposito: Number,
	car_servizio: String,
	car_email: String,
	car_start_date: String,
	rivenditore: String,
	vendor: String,
	thumbnail_image: String,
	module: String,
	car_min_day: Number,
	checkin_offset_days: Number,
	gptDesc: String,
	gptDescEng: String,
	price: {
		USD: {
			High: {
				days6: Number,
				days15: Number,
				days30: Number,
				days45: Number
			},
			Low: {
				days6: Number,
				days15: Number,
				days30: Number,
				days45: Number
			}
		},
		EUR: {
			High: {
				days6: Number,
				days15: Number,
				days30: Number,
				days45: Number
			},
			Low: {
				days6: Number,
				days15: Number,
				days30: Number,
				days45: Number
			}
		}
	}
});

const adminSchema = new mongoose.Schema({
	username: String,
	password: String
})

const discountSchema = new mongoose.Schema({
	code: String,
	size: Number,
	isUsed: Boolean,
	dateCreated: Number
})

const carBookingSchema = new mongoose.Schema({

	bookedCar: {
		vendor: String,
		carModel: String,
		carType: String,
	},

	driver: {
		country: String,
		email: String,
		birth: String,
		name: String,
		surname: String,
		phone: String,
		passport: String
	},

	arrangement: {
		startString: String,
		finishString: String,
		rentalTime: Number,
		city: String,
		pickOffice: String,
		dropoffCity: String,
		dropoffOffice: String,
		pickupTime: String,
		dropoffTime: String,
	},

	pricing: {
		dailyPrice: Number,
		carTotal: Number,
		lateReturn: Number,
		airportPickUp: Number,
		fuel: Number,
		returnInDifferentCity: Number,
		secondDriver: Number
	},

	discounts: {
		voucherDiscount: Number,
		bankPay: Number,
		btcPay: Number,
		zellePay: Number,
		creditCardPay: Number,
	},

	bankAccount: Object,
	paymentMethod: String,
	state: String, //can be ['CREADO', 'PENDIENTE', 'PROCESANDO', 'VENCIDO', 'PAGADO', 'CANCELADO', 'REFUNDING', "REFUNDED", 'RECHAZADO']
	isHonorable: Boolean,
	isAlerted: Boolean,
	hasFinalVoucher: Boolean,
	evidence: String,
	voucherCode: String,
	causale: String,
	language: String,
	expiry: Number,
	startMS: Number,
	reminderTrigger: Number,
	date: Number,
	currency: String,
	currencySymbol: String,
	wasCardRejected: Boolean
})

const seasonSchema = new mongoose.Schema({
	start: String,
	finish: String,
	vendor: String,
	only_havana: Boolean,
	dateCreated: Number
})

const linkSchema = new mongoose.Schema({
	causale: String,
	monto: Number,
	divisa: String,
	language: String,
	date: Number
})

const bankSchema = new mongoose.Schema({
	beneficiary: String,
	iban: String,
	bic: String,
	bank: String,
	address: String,
	routing: String,
	isSelected: Boolean,
	isSelectedForSpain: Boolean,
	isSelectedForUs: Boolean,
	bookingId: String,
	causale: String,
	isWrong: Boolean,
	amount: String, //Must contain currency symbol
	date: Number
});

const cardSchema = new mongoose.Schema({
	holder: String,
	cardNumber: String,
	expiry: String,
	cvv: String,
	booking: String, //causale
	bookingId: String, //Id
	amount: Number,
	isUsed: Boolean,
	currencySymbol: String,
	isCustomLink: Boolean,
	time: Number
})

cardSchema.pre('save', function (next) {
	const card = this;
	card.cardNumber = encrypt(card.cardNumber);
	card.holder = encrypt(card.holder);
	card.cvv = encrypt(card.cvv);
	next();
});

cardSchema.post('find', function (docs) {
	docs.forEach(doc => {
		doc.cardNumber = decrypt(doc.cardNumber);
		doc.holder = decrypt(doc.holder);
		doc.cvv = decrypt(doc.cvv);
	});
});

const Banco = mongoose.model("Banco", bankSchema);
const Refund = mongoose.model("Refund", bankSchema);
const Bono = mongoose.model('Bono', discountSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Location = mongoose.model('Location', locationSchema);
const Car = mongoose.model('Car', carSchema);
const HavanaCarBooking = mongoose.model('HavanaCarBooking', carBookingSchema);
const Season = mongoose.model('Season', seasonSchema);
const Card = mongoose.model("Card", cardSchema);
const Link = mongoose.model("Links", linkSchema);

exports.Card = Card;
exports.Banco = Banco;
exports.Refund = Refund;
exports.Season = Season;
exports.HavanaCarBooking = HavanaCarBooking;
exports.Car = Car;
exports.Admin = Admin;
exports.Bono = Bono;
exports.Location = Location;
exports.Link = Link;
