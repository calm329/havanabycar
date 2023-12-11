const { config } = require("./config.js");

const text = {

    ES: {
	down: {
            title: "PAGINA EN MANTENIMIENTO",
            sorry: "Pedimos disculpas por las molestias. Estamos trabajando para mejorar el servicio.",
            soon: "Pronto volveremos a estar en línea",
            contact: "Para solicitudes de información y/o reservas contactar al correo " + config.email
        },
        //Home
        home: {

            title: 'Conducir un carro rentado en Cuba con HAVANABYCAR',
            description: "Descubre los tesoros de Cuba en un viaje en carro con Cuba Rentar Carro. Explora La Habana, Varadero, Trinidad, Baracoa, Santiago de Cuba, Holguín, Guardalavaca y Las Tunas.",
            keywords: "Cuba rentar carro, alquiler de carros en Cuba, road trip Cuba, turismo Cuba",
            start: "RECOGIDA",
            end: "ENTREGA",
            hero: "CARROS DE RENTA EN CUBA",
            hint: "Donde Quiere Recoger el Carro?",
            search: "BUSCAR CARRO",
            date: "Fecha",
            place: "Lugar",
            promo: "PROMO",
            offers: "OFERTAS",
            perDay: "DESDE",
            insuranceIncluded: "SEGURO INCLUIDO",
            manualCheap: "Manual<br>Economico",
            automaticoCheap: "Automatico<br>Economico",
            amigo: "Promo Amigo",
            forYou: "para ti",
            forHim: "para el",
            pic: "Fotografa el Carro",
            nextTime: "Ahorras <b>100<span class='currencySymbol'></span></b> la proxima vez",
            upload: "Sube la foto",
            btc: "Paga en Bitcoin",
            save10: "Ahorras el <b>10%</b>",
            fast: "Confirmacion Rapida",
            catalogo: {
                title: "Alquiler de carros economicos o de lujo",
                explainer: "Nuestra extensa red de agencias de alquiler de carros en Cuba pone a disposicion de nuestros cliente carros de gama alta, baja y intermedia. Tenemos cochos para todos los bolsillos.",
                economy: "ECONOMICO",
                medium: "MEDIO",
                luxory: "LUJO",
                from: "Desde"
            },
        },

        results: {
            found: "Carros Disponibles: ",
            car: "CARRO",
            results: "RESULTADOS",
            filter: "Filtro",
            availableNow: "Carros en Cuba con disponibilidad inmediata",
            sort: "Ordenar y Filtrar ",
            byAscendingPrice: "Precio (ascendente)",
            byDescendingPrice: "Precio (descendente)",
            search: "BUSCAR CARRO",
            date: "Fecha",
            place: "Lugar",
            start: "RECOGIDA",
            end: "ENTREGA",
            equivalent: "u equivalente",
            day: "Dia",
            action: "RESERVAR",

            newSearch: "BUSCA DE NUEVO",
            close: "CERRAR"
        },

        faq: {
            mainTitle: "Alquiler Cuba Carros [ FAQs ] - havanabycar",
            description: "¿Alguna pregunta relacionada con el alquiler Cuba carros? Esta página de preguntas frecuentes resolverá todos sus problemas relacionados con los precios, etc.",
            title: "F.A.Q.",
            subtitle: "Preguntas frecuentes sobre alquiler de carros en Cuba",
            questions: [
                {
                    q: "¿Cómo busquar un carro para alquilar en Cuba?",
                    a: "Debes prestar atención a varios elementos: el precio por día, el número de plazas de ese auto, el tipo de caja de cambio si el carro de renta ec Cuba lo prefieres MANUAL o AUTOMATICO.<br><br> Durante todo el proceso de reserva, havanabycar te mostrará los servicios incluidos y los que no, para que puedas tomar la decisión con toda la información a tu disposición."
                },
                {
                    q: "¿Qué sucede si recojo mi carro con retraso?",
                    a: "havanabycar acepta un retraso de 30 minutos durante las horas de la agencia de alquiler de carros en Cuba. En caso de producirse un retraso mayor, el carro no estará garantizado, ya que la empresa puede decidir entregar ese carro a otro cliente. Por lo tanto, te recomiendo que nos notifiques si llegarás más tarde de la hora programada."
                },
                {
                    q: "¿Qué sucede si me demoro en la entrega del carro alquilado?",
                    a: "Si entregas el carro alquilado después del minuto 59 de la hora programada te cobrarán cada hora extra (de 1 a 5) con 1/5 de la tarifa pública (3/6 días). Mientras, si entregas el carro con un retraso de más de 6 horas te cobrarán un día extra, más un día de seguro."
                },
                {
                    q: "¿Cómo puedo pagar el alquiler del carro en Cuba?",
                    a: "Una vez hayas seleccionado el carro de tu preferencia, confirma la reserva y recibiras un correo con todas las informaciones de pago para el alquiler de tu carro en Cuba. Aceptamos transferencia bancaria, tarjeta de credito y BIZUM."
                },
                {
                    q: "¿Qué incluye el precio?",
                    a: "El precio por alquilar un carro en Cuba se obtiene al multiplicar el precio establecido por 24 horas por la cantidad de días contratados. El kilometraje es ilimitado; aunque el combustible sí corre por completo a tu cuenta.<br><br> El precio no incluye elementos que puedan tener un costo adicional: seguro del auto, depósito de seguridad, contratación de un chófer profesional, la entrega del carro en un lugar diferente al de la recogida, el combustible"
                },
                {
                    q: "¿Qué incluye el seguro?",
                    a: "El seguro cubre daños al auto, incendio, robo total o parcial, accidentes, desastres naturales, daños a bienes ajenos y lesiones a terceros. Es obligatorio informar inmediatamente a las autoridades competentes. El seguro no cubre el robo del reproductor musical del auto, los 5 neumáticos (4, más el de repuesto) ni el limpiaparabrisas. Por todo esto es muy recomendable que siempre estaciones el auto en un lugar seguro."
                },
                {
                    q: "¿Qué sucede cuando me confirman el carro?",
                    a: "havanabycar te envía un correo electrónico con la reserva final y el voucher con todos los datos del alquiler del carro en Cuba."
                },
                {
                    q: "¿Y si no me confirman el carro, qué sucede con mi dinero?",
                    a: "Solamente te cobramos cuando tenemos la seguridad de la confirma de tu carro de alquiler en Cuba."
                },
                {
                    q: "¿Puedo utilizar GPS en Cuba?",
                    a: "Aunque la conexión a Internet en Cuba ha mejorado, de todas formas te recomiendo que descargues, gratuitamente, la aplicación Maps Me y ahí el mapa de toda Cuba. De esta forma no te perderás, no te estresarás más de la cuenta si fallara la conexión."
                },
                {
                    q: "¿Necesito un permiso de conducir internacional para alquilar un carro en Cuba?",
                    a: "En Cuba se aceptan permisos de conducir tanto internacionales como nacionales, siempre y cuando estén en su formato original (no se aceptan fotocopias"
                },
                {
                    q: "¿Es obligatorio tener un seguro para alquilar un carro en Cuba?",
                    a: "Si, es obligatorio"
                },
                {
                    q: "¿Puedo solicitar un asiento infantil?",
                    a: "Sí, aunque tendrás que pagar una cuota adicional. No obstante, es posible que la empresa no tenga uno disponible en el momento en que lo solicitas, por lo que si lo necesitaras es mejor traer uno de casa."
                },
                {
                    q: "¿Qué documentos debo presentar a la oficina de alquiler de carro en Cuba?",
                    a: "Para alquilar un carro en Cuba tienes que presentar los siguientes documentos:<br><br><ul class='browser-default'><li>Licencia de conducir vigente</li><li>Pasaporte</li><li>Tarjeta de crédito o débito Visa o Mastercard a nombre del conductor principal (no se acepta efectivo)</li><li>Voucher de la reserva inprimido</li></ul>"
                },
                {
                    q: "¿Qué debo hacer en caso de accidente?",
                    a: "En caso de accidente, daño o robo del auto, te recomiendo ponerte en contacto con la oficina de alquiler en un plazo de 48 horas utilizando los números de emergencia que encontrarás en el voucher que recibiste por correo electrónico. En caso de notificación tardía del incidente, serás responsable del costo de reparación del vehículo"
                },
                {
                    q: "¿Qué debo hacer si cometo una infracción de tráfico y recibo una multa?",
                    a: "Si recibes una multa, la policía registrará el incidente en el contrato de alquiler y tendrás que pagar el coste al devolver el carro."
                },

            ]
        },
        //CAR
        car: {
            mainTitle: "Renta de Carro en Cuba",
            title: "Carro de Renta en Cuba - HAVANABYCAR",
            day: "Dia",
            car: "CARRO",
            fleet: "FLOTA",
            results: "RESULTADOS",
            included: "INCLUIDO",
            details: "CARACTERISTICAS",
            description: "DESCRIPCION"
        },
        //About
        about: {
            mainTitle: "Renta de Carros en Cuba [Sobre Nosotros] - havanabycar",
            title: "SOBRE NOS OTROS",
            best: "<b>HAVANABYCAR</b> es una Agencia de Viajes propiedad de SERVICE TRAVEL GROUP LTD una empresa registrada en Holanda en 2021 y contamos con licencia regular de Rent car nr 64696847 Registrada en la Camera de comercio de Amsterdam Garantizamos asistencia en Cuba a través de nuestra oficina en La Habana.<br><br>Garantizamos asistencia en Cuba a través de nuestra oficina en La Habana.",
            action: "Somos un Agencia totalmente Online y somos líder en las Renta de Carros en Cuba. Procesamos más de 10.000 reservas al año y garantizamos el mejor precio del mercado",
            goals: "Tenemos tres objetivos principales:",
            pOne: "Confirmar tu Carro en Cuba al mejor precio ",
            pTwo: "Asegurarnos de que no tenga problema con la renta",
            pThree: "Ganar tu confianza para volver a reservar con nos otros",
            contactTitle: "CÓMO CONTACTARNOS",
            howContact: "Estos son nuestros principales contactos:",
        },
        //Success
        refundSuccess: {
            mainTitle: "Datos Enviados",
            title: 'Datos Bancarios Enviados',
            description: '<b>Revise el Correo para mas detalles sobre los proximos pasos</b><br> Para revisar el estado de su reserva haga click</b>',
            here: '<a href="" target="_blank" id="linkPortal">AQUI</a>'
        },
        success: {
            mainTitle: "Booking Completado",
            title: 'Reserva realizada!',
            car: "CARRO",
            success: "EXITO",
            description: '<b>¡Hemos recibido tu reserva!</b><br> Recibirás un correo para proceder con el pago.'
        },
        paySuccess: {
            mainTitle: "Gracias por Enviar el Pago",
            title: 'Gracias por Enviar el Pago',
            car: "CARRO",
            success: "EXITO",
            description: '<b>¡Un vez registrado el pago, va a poder descargar el voucher!</b><br>',
            canCheck: '<b> Para revisar el estado de su reserva</b>',
            here: '<a href="" target="_blank" id="linkPortal">AQUI</a>'
        },
        reactivate: {
            mainTitle: "Reserva Extendida",
            title: 'Reserva Extendida',
            description: '<b>Vas a tener 48h más para pagar</b>'
        },
        //Pay
        summary: {
            mainTitle: "Reserva",
            car: "Carro",
            driver: "Conductor",
            pickUp: "Recogida",
            dropOff: "Entrega",
            passport: "Pasaporte",
            duration: "Duración de la Renta",
            dailyPrice: "Precio Diario",
            dates: "Fechas de la Renta",
            cost: "Costo Renta del Carro",
            confirm: "Confirma Reserva",
            code: "Inserte Codigo de Rebaja",
            extra: "Costo Dia Extra",
            payMethod: "Metodo de Pago",
            category: "Clase",
            model: "Modelo",
            equivalent: "(u equivalente)",
            includes: "El Precio Incluye",
            methods: {
                btcPay: "en Bitcoin",
                zellePay: "por Zelle",
                creditCardPay: "por Tarjeta de Credito",
                bankPay: "por Transferencia Bancaria"
            },
            lateReturn: "Devolución despues de las ",
            extraAirport: "<b>Recogida en Aeropuerto</b><br>",
            extraPetrol: "<b>Primer Tanque de Combustible</b><br>",
            extraReturn: "<b>Devolución en otra Ciudad</b><br>",
            extraDriver: "<b>Segundo Conductor</b><br>",
            btcDiscount: "10% Descuento Bitcoin:",
            zelleDiscount: "5% Descuento Zelle:",
            voucherDiscount: "Descuento Coupon:",
            creditCardDiscount: "<b>10% Comisión Tarjeta de Credito</b>",
            toBePaid: "A Pagar:",
            saveMore: "Ahorra Más",
            insuranceIncluded: "(seguro incluido)",
            discounts: "Descuentos",
            download: "Descargar Voucher",
            downloadInvoice: "Descargar Factura",
            downloadEvidence: "Descargar Pago",
            uploadEvidence: "Cargar Evidencia del Pago",
            yourBank: "Obtener Reembolso",
            invoice: "Factura",
            state: {
                PAGADO: "CONFIRMADO",
                CANCELADO: "CANCELADO",
                RECHAZADO: "CANCELADO",
                VENCIDO: "VENCIDO",
                CREADO: "CREADO",
                PENDIENTE: "ESPERANDO PAGO",
                PENDING: "ESPERANDO PAGO",
                PROCESANDO: "PROCESANDO EL PAGO",
                REFUNDING: "PROCESANDO REEMBOLSO",
                REFUNDED: "REEMBOLSADO"
            }
        },

        refund: {
            mainTitle: "Datos para Reembolso",
            title: "Datos para Reembolso",
            bankData: "Datos Banacarios",
            explainer: "Por favor, utilize el formulario a continuación para proporcionarnos los detalles de la cuenta bancaria donde Usted desea recibir el reembolso.",
            bank: "Banco",
            beneficiary: "Beneficiario",
            address: "Dirección"
        },

        pdf: {
            documents: "DOCUMENTOS",
            driver: "DATOS DEL CONDUCTOR",
            reservationData: "DATOS DE RESERVA",
            car: "VEHICULO",
            payInCuba: "PAGAR EN CUBA",
            passport: "- Pasaporte Vigente",
            license: "- Licencia de Conduccion Vigente",
            card: "- Tarjeta de Credito/Debito VISA o MASTERCARD para el pago de eventuales gastos (no se acepta efectivo)",
            place: "Lugar",
            office: "Oficina",
            date: "Fecha",
            time: "Hora",
            insuranceIncluded: "Seguro: Incluido",
            extraAirport: "Recogida en Aeropuerto: 25",
            extraPetrol: "Primer Tanque de Combustible: 60",
            extraReturn: "Devolución en otra Ciudad: 35",
            extraDriver: "Segundo Conductor: 35",
            creditCardDiscount: "10% Comisión Tarjeta de Credito: ",
            petrolZero: "Tanque de Comustible: -",
            airportZero: "Impuesto Aeropuerto: -",
            secondDriverZero: "Segundo Conductor: -",
            dropZero: "Drop-Off: -"
        },

        how: {
            mainTitle: "Como Funciona",
            title: "Como Funciona",
            action: "Siga estos pasos para rentar un carro en Cuba:",
            pick: "Elejir Carro",
            pickExplainer: "Elija un carro en el sitio. Disponibilidad y precios visibles en tiempo real",
            pay: "Pagar Carro",
            payExplainer: "Puede pagar por tarjeta de credito, transferencia bancaria, Zelle y Bitcoin.",
            voucher: "Descargar Voucher",
            voucherExplainer: "Visite el portal del Cliente y descargue el voucher de la reserva"
        },

        nav: {
            home: "INICIO",
            about: "QUIENES SOMOS",
            how: "COMO FUNCIONA",
            cars: "CARROS",
            offers: "OFERTAS",
            howLink: "/como-funciona",
            homeLink: "/",
            aboutLink: "/quienes-somos",
        },
        pay: {
            title: "Pagar",
            booking: "Reserva",
            method: "Pago por",
            cardMethod: "Tarjeta de Credito",
            bankMethod: "Transferencia Bancaria",
            send: "Enviar",
            payB4: "Pagar dentro de:",
            toBTC: "a la dirección a continuación:",
            toZellePhone: "o al numero de telefono a continuación:",
            pleaseCausale: "En el campo concepto de la transacción ponga",
            toBank: "a la cuenta bancaria a continuación:",
            cubaWarning: "<b>ATENCION:</b> en el concepto no mencione la palabra <b>'CUBA'</b>. Solo ponga ",
            next: function (url) { return "<b>Luego, cargue evidencia del pago por medio del <a href='" + url + "' class='red-link'>PORTAL DEL USUARIO</a></b>"; },
            beneficiary: "Beneficiario de la Cuenta",
            bank: "Banco",
            address: "Dirección del Banco",
            accountNumber: "Numbero de la Cuenta",
            causale: "Concepto de la Transferencia Bancaria",
            amount: "Monto",
            paymentMethods: {
                btcPay: "Bitcoin",
                zellePay: "Zelle",
                creditCardPay: "Tarjeta de Credito",
                bankPay: "Transferencia Bancaria"
            },

            titleCard: "Puedes pagar por medio de todas las tarjetas Visa, Mastercard, Maestro y American Express. Para hacerlo proporcione los datos de su tarjeta.",
            alsoUpload: "Es necesario enviar tambien:",
            holder: "Titular",
            number: "Numero",
            expiry: "Se Vence",
            action: "Pagar",
            cardPicture: "Foto Tarjeta de Credito",
            passportPicture: "Foto Pasaporte",
            selfiePicture: "Selfie con Pasaporte"

        },
        expired: {
            title: "Reserva Vencida",
            description: "Por Favor Empieze de nuevo el Proceso de Reserva."
        },
        cardRejected: {
            title: "Transacción con Tarjeta Fallida",
            description: "Revise su Correo para ver Diferentes Opciónes de Pago"
        },
        footer: {
            join: 'Unase para:',
            news: 'Ultimas Noticias de Cuba',
            specialDeals: 'Ofertas Especiales',
            about: "Quienes Somos",
            tc: "Terminos y Condiciones",
            privacy: "Privacidad y Cookies",
            usefull: "Reembolsos",
            tcL: "/terminos-y-condiciones",
            privacyL: "/privacidad",
            usefullL: "/devoluciones-rules",
            mapL: "/mapa",
            feedbacks: "Reseñas",
            support: "Soporte",
            contact: "Contactenos",
            howto: "Como Reservar",
            map: "Mapa del sitio",
            social: "Redes",
            sort: "Filtrar y Ordenar",
            cheapest: "Precio (ascendente)",
            dearest: "Precio (descendente)",
            all: "Todos los Carros",
            manual: "Solo Manual",
            auto: "Solo Automatico",
            sortTitle: "ORDENAR POR",
            filterTitle: "FILTRAR",
            pax: "Pasajeros",
            doors: "Puertas",
            intercity: "Entrega en otra ciudad",
            airportFee: "Recogida en Aeropuerto",
            insurance: "Seguro Incluido",
            unlimited: "Km Ilimitados",
            fuel: "Tanque LLeno",
            important: "IMPORTANTE",
            lateExplainerOne: "Por devolver el carro despues de las ",
            lateExplainerTwo: " se le va a cobrar un dia extra.",
        },
        search: {
            place: "Lugar",
            date: "Fecha",
            action: "BUSCAR CARROS",
            close: "CERRAR",
            start: "RECOGIDA",
            end: "ENTREGA",
            city: "Ciudad",
            time: "Horario",
            office: "Oficina",
            startTitle: "Detalles Recogida",
            endTitle: "Detalles Entrega",
            pay: "Metodo de Pago",
            driver: "Datos del Conductor",
            name: "Nombre",
            surname: "Apellidos",
            birth: "Fecha de Nacimiento",
            day: "Dia",
            month: "Mes",
            year: "Año",
            passport: "Pasaporte",
            mail: "Correo",
            phone: "Telefono",
            nationality: "Pais",
            commish: "Comisión",
            months: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            monthsShort: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ],
            book: "RESERVA",
            second: "Agrega el Segundo Conductor",
            bank: "Transferencia Bancaria",
            creditCard: "Tarjeta de Credito",
            save: "Ahorra"
        },
        map: {
            title: "Mapa del Sitio - HAVANABYCAR",
            description: "Este mapa del sitio de rent a car Cuba le ayudará a navegar por nuestro sitio de manera efectiva. ¡Consulta la breve estructura de havanabycar desde aquí!",
            superTitle: "Mapa del Sitio",
            mapOneTitle: "SITIO",
            mapTwoTitle: "CARROS",
            mapThreeTitle: "REGLAS",
            about: "Quienes Somos",
            tc: "Terminos y Condiciones",
            privacy: "Privacidad y Cookies",
            usefull: "Reembolsos",
            aboutL: "/quienes-somos",
            tcL: "/terminos-y-condiciones",
            privacyL: "/privacidad",
            usefullL: "/devoluciones",
            blogOne: "Bienvenido al Blog de havanabycar",
            blogOneL: "/blog/bienvenido_blog_havanabycar"
        },
        blog: {
            mainTitle: "Carro Cuba Alquiler Blogs Y Actualizaciones - havanabycar",
            description: "En esta sección del blog, encontrará las últimas actualizaciones, consejos y asistencia con respecto al servicio carro Cuba alquiler. ¡Échale un vistazo ahora!",
            descriptionSEO: "Algunos consejos prácticos para alquilar un carro en Cuba",
            readMore: "Leer Más",
        },
        welcomeBlog: {
            mainTitle: "Mejor Empresa De Alquiler De Carros En Cuba - havanabycar",
            description: "¿Busca información sobre alquiler de autos en Cuba? ¡Lee nuestros últimos artículos relacionados con los servicios de alquiler de carros y sus características!",
            title: "Bienvenido al Blog de havanabycar.",
            subtitle: "el mejor sitio de alquiler de carros en Cuba."
        }
    },
    ENG: {
	down: {
            title: "WEBSITE UNDER MAINTENANCE",
            sorry: "We apologize for any inconvenience. We are working to improve the service.",
            soon: "We will be back online soon.",
            contact: "For information requests and reservations, contact by email " + config.email
        },
        //Home
        home: {
            title: 'Travel through Cuba with Cuba Car Rental',
            keywords: "Cuba car rental, car rental in Cuba, Cuba road trip",
            description: "Rent a car in Cuba and explore the island's top destinations, including Havana, Viñales, Trinidad, and Varadero. Discover the best of Cuba with Cuba Car Rental.",
            start: "PICKUP",
            end: "DROPOFF",
            hero: "CAR RENTA IN CUBA",
            search: "FIND CAR",
            hint: "Donde Quiere Recoger el Carro?",
            date: "Date",
            place: "Place",
            promo: "PROMO",
            offers: "BARGAINS",
            perDay: "FROM",
            insuranceIncluded: "INSURANCE INCLUDED",
            manualCheap: "Manual<br>Economy",
            automaticoCheap: "Automatic<br>Economy",
            amigo: "Friends Promo",
            forYou: "for you",
            forHim: "for him",
            pic: "Take a Picture",
            nextTime: "Save <b>100<span class='currencySymbol'></span></b> Next Time",
            upload: "Upload Your Car",
            btc: "Pay in Bitcoin",
            save10: "Save <b>10%</b>",
            fast: "Fast Confirmation",

            catalogo: {
                title: "Economy and Luxory Car Rental",
                explainer: "Our extended network of Car Rental Agencies in Cuba puts at out customers' disposal a wide range of cars to suit any pocket.",
                economy: "ECONOMY",
                medium: "MEDIUM",
                luxory: "LUXORY",
                from: "From"
            },

        },

        results: {
            found: "Cars Found: ",
            car: "CAR",
            results: "RESULTS",
            filter: "Filter",
            availableNow: "Cars in Cuba Available Right Now",
            sort: "Sort & Filter",
            byAscendingPrice: "Price (ascending)",
            byDescendingPrice: "Price (descending)",
            equivalent: "or equivalent",
            day: "Day",
            action: "BOOK",
            newSearch: "NEW SEARCH",
            close: "CLOSE"
        },
        //CAR
        car: {
            mainTitle: "Car Rental in Cuba",
            title: "Car Rental in Cuba - HAVANABYCAR",
            day: "Day",
            car: "CAR",
            results: "RESULTS",
            included: "INCLUDED",
            details: "FEATURES",
            description: "DESCRIPTION",
            fleet: "FLEET"
        },
        //About
        about: {
            mainTitle: "About Us || HAVANABYCAR",
            title: "About Us",
            best: "<b>HAVANABYCAR</b> is a Travel Agency owned by SERVICE TRAVEL GROUP LTD, a company registered in the Netherlands in 2021, and we have a regular Rent Car license nr 64696847 registered at the Chamber of Commerce in Amsterdam. We guarantee assistance in Cuba through our office in Havana.<br><br>We guarantee assistance in Cuba through our office in Havana.",
            action: "We are a 100% online agency and we are the leader in the market of Car Rental in Cuba. We process over 10.000 bookings per year and we offer the best prices on the market.",
            goals: "We have 3 main goals:",
            pOne: "Confirm your Car at the best price",
            pTwo: "Making sure your rental goes as smoothly as possible",
            pThree: "Turn you into a repeating customer",
            contactTitle: "CONTACT US",
            howContact: "Please find below our main contacts:",
        },
        faq: {
            mainTitle: "Frequently Asked Questions on Car Rental in Cuba",
            title: "Frequently Asked Questions on Car Rental in Cuba",
            questions: [
                {
                    q: "How Do I find a car to rent in Cuba?",
                    a: "You must pay attention to several elements: price per day, passengers capacity, type of transmission (AUTOMATIC VS MANUAL).<br><br> Along the booking process, havanabycar will show you what's included and what's not included, so that you can make a well informed decision."
                },
                {
                    q: "What if I pick up my car with some delay?",
                    a: "havanabycar a 30 minutes delay. In case the delay is greater, the car cannot be guaranted, for the agency may decide to give the car to someone else. So, you are strongly adviced to let us know if you think you'll be late."
                },
                {
                    q: "What if drop off the car with some delay?",
                    a: "If you arrive at the agency after the minute 59 of the established hour, the agency will charge you depending on the magnitude of the delay. From 1h to 5h the charge  is 1/5 of the public tarif (3/6 days). If the delay is larger than 6 hours a full day will be charged",
                },
                {
                    q: "How can I pay for the car?",
                    a: "We accept bank transfers only."
                },
                {
                    q: "What's included in the price?",
                    a: "Unlimited kilometres<br><br>You shall pay for parking fees, professional chofeur (if required), fuel, insurance, drop off in a different location."
                },
                {
                    q: "What's included in the insurance?",
                    a: "The insurance includes theft, fire, accidents with damahes to things and people. In case of accident, please contact the agency immediately."
                },
                {
                    q: "What happens when the car is confirmed?",
                    a: "havanabycar will send you an email with all the details of the reservation and a voucher"
                },
                {
                    q: "What if the car is not confirmed?",
                    a: "We only charge you when we are 100% sure that your car is available."
                },
                {
                    q: "Can I use GPS in Cuba?",
                    a: "Internet connection in Cuba is improving. However, in country road the signal may be weak or totally lacking."
                },
                {
                    q: "Do I need a special driving permit to drive in Cuba?",
                    a: "As long as you show up with your driving licence, you are going to be fine. No Copies accepted. Only the original."
                },
                {
                    q: "Do I need an insurance?",
                    a: "Yes, you do."
                },
                {
                    q: "Can I have a seat for my child?",
                    a: "Yes, but this comes at an extra cost."
                },
                {
                    q: "Which documents do I need to present at the agency when I pick up my car?",
                    a: "You need to show the following:<br><br><ul class='browser-default'><li>Driving License</li><li>Passport</li><li>A Credit/Debit Car (Visa or Mastercard)</li><li>Printed copy of the Voucher</li></ul>"
                },

                {
                    q: "What if I get fined?",
                    a: "If you get a fine, you will need to pay it when you return the car"
                },

            ]
        },
        //Success
        success: {
            mainTitle: "Booking Completed",
            title: 'Booking done!',
            car: "CAR",
            success: "SUCCESS",
            description: '<b>We have received your booking!</b><br> You will get an email with payment instructions.'
        },
        refundSuccess: {
            mainTitle: "Data Sent",
            title: 'Bank Data Sent',
            description: '<b>Check your email for more information on next steps.</b><br> To check the status of your refund, please click</b>',
            here: '<a href="" target="_blank" id="linkPortal">HERE</a>'
        },
        paySuccess: {
            mainTitle: "Thanks for Sending the Payment",
            title: 'Thanks for Sending the Payment',
            car: "CAR",
            success: "SUCCESS",
            description: '<b>As soon as your payment is registered you will be able to download the Voucher.</b><br>',
            canCheck: '<b> You can check the status of your booking</b>',
            here: '<a href="" target="_blank" id="linkPortal">HERE</a>'
        },
        reactivate: {
            mainTitle: "Booking Extended",
            title: 'Booking Extended!',
            description: '<b>You have 48 more hours to make the payment.</b>'
        },

        //Pay
        summary: {
            mainTitle: "Booking",
            car: "Car",
            driver: "Driver",
            passport: "Passport",
            pickUp: "Pick-Up",
            dropOff: "Drop-Off",
            dates: "Rental Dates",
            duration: "Rental Duration",
            dailyPrice: "Daily Price",
            cost: "Rental Cost",
            confirm: "Confirm Booking",
            code: "Insert Discount Code",
            extra: "Extra Day Premium",
            payMethod: "Payment Method",
            category: "Category",
            model: "Model",
            equivalent: "(or equivalent)",
            includes: "Included in the Price",
            methods: {
                btcPay: "in Bitcoin",
                zellePay: "by Zelle",
                creditCardPay: "by Credit Card",
                bankPay: "by Bank Transfer"
            },
            lateReturn: "Drop-Off after ",
            extraAirport: "<b>Airport Pickup</b><br>",
            extraPetrol: "<b>First Tank of Fuel</b><br>",
            extraReturn: "<b>Drop-Off in different City</b><br>",
            extraDriver: "<b>Second Driver</b><br>",
            btcDiscount: "10% Bitcoin Discount:",
            zelleDiscount: "5% Zelle Discount:",
            voucherDiscount: "Coupon Discount:",
            creditCardDiscount: "<b>10% Credit Card Commission</b>",
            toBePaid: "To be Paid:",
            saveMore: "Save More",
            insuranceIncluded: "(insurance included)",
            discounts: "Discounts",
            yourBank: "Get Refund",
            download: "Download Voucher",
            downloadInvoice: "Download Invoice",
            downloadEvidence: "Dowload Payment",
            uploadEvidence: "Upload Payment Evidence",
            invoice: "Invoice",
            state: {
                PAGADO: "CONFIRMED",
                CANCELADO: "CANCELLED",
                RECHAZADO: "CANCELLED",
                VENCIDO: "EXPIRED",
                CREADO: "CREATED",
                PENDIENTE: "WAITING FOR PAYMENT",
                PENDING: "WAITING FOR PAYMENT",
                PROCESANDO: "PROCESSING PAYMENT",
                REFUNDING: "PROCESSING REFUND",
                REFUNDED: "REFUNDED"
            }
        },

        refund: {
            mainTitle: "New Refund",
            title: "New Refund",
            bankData: "Bank Account Data",
            explainer: "Please use the form below to provide us with the details of the bank account where you would like to receive your refund.",
            bank: "Bank",
            beneficiary: "Beneficiary",
            address: "Address"
        },

        pdf: {
            documents: "DOCUMENTS",
            driver: "DRIVER'S DATA",
            reservationData: "RESERVATION DATA",
            car: "CAR",
            payInCuba: "PAY IN CUBA",
            place: "Place",
            office: "Office",
            date: "Date",
            time: "Time",
            passport: "- Valid Passport",
            license: "- Valid Driving License",
            card: "- A VISA or MASTERCARD Credit/Debit Card for possible extras (cash not accepted)",
            insuranceIncluded: "Insurance: Included",
            extraAirport: "Airport Pickup: 25",
            extraPetrol: "First Tank of Fuel: 60",
            extraReturn: "Drop-Off in different City: 35",
            extraDriver: "Second Driver: 35",
            creditCardDiscount: "10% Credit Card Commission: ",
            petrolZero: "Fuel Tank: -",
            airportZero: "Airport Fees: -",
            secondDriverZero: "Second Driver: -",
            dropZero: "Drop-Off: -"
        },

        how: {
            mainTitle: "How it Works",
            title: "How it Works",
            action: "Follow these steps to book a car:",
            pick: "Choose Your Car",
            pickExplainer: "Find the car you want on our website. Availability and prices are shown in real time.",
            pay: "Pay for the Car",
            payExplainer: "You can pay by Credit Card, Bank Transfer, Zelle and Bitcoin.",
            voucher: "Download Voucher",
            voucherExplainer: "Check the details of your reservation in the Customer Portal and download the Booking Voucher"
        },

        nav: {
            home: "HOME",
            about: "ABOUT US",
            cars: "CARS",
            offers: "OFFERS",
            aboutLink: "/ENG/about-us",
            how: "HOW IT WORKS",
            howLink: "/ENG/how-it-works",
            homeLink: "/ENG/",
        },
        pay: {
            title: "Pay",
            booking: "Booking",
            method: "Pay with",
            cardMethod: "Credit Card",
            bankMethod: "Bank Transfer",
            send: "Send",
            toBTC: "to the following address:",
            toZellePhone: "or to the following phone number:",
            pleaseCausale: "In the reason for the transaction field, please make sure you insert",
            toBank: "to the following bank account:",
            payB4: "Pay before:",
            cubaWarning: "<b>ATTENTION</b>: in the reason for transfer field, never mention the word <b>'CUBA'</b>. Just put ",
            next: function (url) { return "<b>Finally, please upload evidence of the transaction through the <a href='" + url + "' class='red-link'>USER PORTAL</a></b>"; },
            beneficiary: "Account Beneficiary",
            bank: "Bank",
            address: "Bank Address",
            accountNumber: "Account Number",
            causale: "Reason for the Bank Transfer",
            amount: "Amount",
            paymentMethods: {
                btcPay: "Bitcoin",
                zellePay: "Zelle",
                creditCardPay: "Credit Card",
                bankPay: "Bank Transfer"
            },

            titleCard: "You can pay with any Visa, Mastercard, Maestro y American Express. To do that, please provide your card data.",
            alsoUpload: "Moreover, you should provide the following:",
            holder: "Holder",
            number: "Number",
            expiry: "Expiry",
            action: "Pay",
            cardPicture: "Photo Credit Card",
            passportPicture: "Photo of Passport",
            selfiePicture: "Selfie with Passport"
        },
        expired: {
            title: "Booking Expired",
            description: "Please Start the Booking Process Again"
        },
        cardRejected: {
            title: "Credit Card Transaction Failed",
            description: "Please Check Your Email for Alternative Payment Methods"
        },
        footer: {
            join: 'Join to:',
            news: 'Latest news from Cuba',
            specialDeals: 'Special Deals',
            about: "About Us",
            tc: "Terms & Conditions",
            privacy: "Privacy and Cookies",
            usefull: "Refunds",
            tcL: "/ENG/terms-and-conditions",
            feedbacks: "Reviews",
            privacyL: "/ENG/privacy",
            usefullL: "/ENG/refunds",
            mapL: "/ENG/map",
            support: "Support",
            contact: "Contact Us",
            howto: "How to Book",
            map: "Site Map",
            social: "Social",
            sort: "Sort & Filter",
            cheapest: "Price (ascending)",
            dearest: "Price (descending)",
            all: "All Cars",
            manual: "Only Manual",
            auto: "Only Automatic",
            sortTitle: "SORT",
            filterTitle: "FILTER",
            pax: "Passengers",
            doors: "Doors",
            intercity: "Dropoff in different city",
            airportFee: "Airport Pickup Fee",
            insurance: "Insurance Included",
            unlimited: "Unlimited Km",
            fuel: "Full Tank",
            important: "IMPORTANT",
            lateExplainerOne: "By returning the car after ",
            lateExplainerTwo: " an additional day is charged.",
        },
        search: {
            place: "Location",
            date: "Date",
            action: "FIND CARS",
            close: "CLOSE",
            start: "PICK-UP",
            end: "DROP-OFF",
            city: "City",
            time: "Time",
            office: "Office",
            startTitle: "Pick-up Details",
            endTitle: "Drop-off Details",
            pay: "Payment Method",
            driver: "Driver's Data",
            name: "Name",
            surname: "Surname",
            birth: "Date of Birth",
            day: "Day",
            month: "Month",
            year: "Year",
            passport: "Passport",
            mail: "Email",
            phone: "Phone",
            nationality: "Country",
            commish: "Commission",
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            monthsShort: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            book: "BOOK",
            second: "Add a Second Driver",
            creditCard: "Credit Card",
            bank: "Bank Transfer",
            save: "Save"
        },
        map: {
            title: "Website Map - HAVANABYCAR",
            superTitle: "Site Map",
            mapOneTitle: "SITE",
            mapTwoTitle: "CARS",
            mapThreeTitle: "RULES",
            about: "About Us",
            tc: "Terminos y Condiciones",
            privacy: "Privacidad y Cookies",
            usefull: "Informacion Util",
            aboutL: "/quienes-somos",
            tcL: "/terminos-y-condiciones",
            privacyL: "/politica-de-privacidad",
            usefullL: "/informacion-util",
        }

    },

}

module.exports = { text }
