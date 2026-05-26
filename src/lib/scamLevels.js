// Spot the Scam — 5 Text Message levels, bilingual
// redFlags = correct answers; distractor = one plausible-but-wrong item per scam level

export const SCAM_LEVELS = [
  {
    id: 1,
    isScam: true,
    sender: { en: "USPS Alerts", es: "Alertas USPS" },
    message: {
      en: "USPS ALERT: Your package could not be delivered. Click here to reschedule: usps-delivery-now.net/track",
      es: "ALERTA USPS: Tu paquete no pudo ser entregado. Haz clic aquí para reprogramar: usps-delivery-now.net/track",
    },
    redFlags: {
      en: [
        "Suspicious link — not a real USPS domain",
        "Creates urgency about a package",
        "Asks you to click an unknown link",
      ],
      es: [
        "Enlace sospechoso — no es un dominio real de USPS",
        "Crea urgencia sobre un paquete",
        "Te pide que hagas clic en un enlace desconocido",
      ],
    },
    distractor: {
      en: "The message was sent during daytime hours",
      es: "El mensaje fue enviado durante el día",
    },
    sageExplanation: {
      en: "Real USPS messages never ask you to click a link to reschedule. Always go directly to usps.com by typing it yourself — never through a link in a text.",
      es: "Los mensajes reales de USPS nunca te piden que hagas clic en un enlace para reprogramar. Siempre ve directamente a usps.com escribiéndolo tú misma — nunca a través de un enlace en un mensaje.",
    },
  },
  {
    id: 2,
    isScam: true,
    sender: { en: "Bank of America", es: "Bank of America" },
    message: {
      en: "URGENT: Your Bank of America account has been locked. Verify your identity now at bofa-secure-verify.com or your account will be closed.",
      es: "URGENTE: Tu cuenta de Bank of America ha sido bloqueada. Verifica tu identidad ahora en bofa-secure-verify.com o tu cuenta será cerrada.",
    },
    redFlags: {
      en: [
        "Urgency language — 'URGENT' and threats",
        "Fake website domain (not bankofamerica.com)",
        "Threatens account closure to scare you",
      ],
      es: [
        "Lenguaje urgente — 'URGENTE' y amenazas",
        "Dominio de sitio web falso (no bankofamerica.com)",
        "Amenaza con cerrar tu cuenta para asustarte",
      ],
    },
    distractor: {
      en: "The message mentions your bank by name",
      es: "El mensaje menciona tu banco por nombre",
    },
    sageExplanation: {
      en: "Banks never send texts with urgent threats and random links. If you are ever worried about your account, call the number printed on the back of your card directly.",
      es: "Los bancos nunca envían mensajes con amenazas urgentes y enlaces aleatorios. Si alguna vez te preocupa tu cuenta, llama directamente al número impreso en el reverso de tu tarjeta.",
    },
  },
  {
    id: 3,
    isScam: false,
    sender: { en: "Amazon", es: "Amazon" },
    message: {
      en: "Amazon: Your order #114-8827364 has shipped. Track at amazon.com/orders",
      es: "Amazon: Tu pedido #114-8827364 ha sido enviado. Rastréalo en amazon.com/orders",
    },
    redFlags: null,
    distractor: null,
    sageExplanation: {
      en: "This one is real — it uses amazon.com, has a specific order number, and does not ask for personal information or create urgency. Always check for these three things.",
      es: "Este es real — usa amazon.com, tiene un número de pedido específico y no pide información personal ni crea urgencia. Siempre verifica estas tres cosas.",
    },
  },
  {
    id: 4,
    isScam: true,
    sender: { en: "Prize Center", es: "Centro de Premios" },
    message: {
      en: "Congratulations! You have been selected as our $1,000 weekly winner! Reply YES to claim your prize. Limited time!",
      es: "¡Felicitaciones! ¡Fuiste seleccionada como nuestra ganadora semanal de $1,000! Responde SÍ para reclamar tu premio. ¡Tiempo limitado!",
    },
    redFlags: {
      en: [
        "Unsolicited prize — you never entered a contest",
        "Creates urgency with 'Limited time!'",
        "Asks you to reply with personal confirmation",
      ],
      es: [
        "Premio no solicitado — nunca participaste en ningún concurso",
        "Crea urgencia con '¡Tiempo limitado!'",
        "Te pide que respondas con confirmación personal",
      ],
    },
    distractor: {
      en: "The message uses friendly language",
      es: "El mensaje usa un lenguaje amigable",
    },
    sageExplanation: {
      en: "You cannot win a contest you never entered. Scammers use excitement and urgency to make you act before you think. Always pause — and delete.",
      es: "No puedes ganar un concurso en el que nunca participaste. Los estafadores usan entusiasmo y urgencia para hacerte actuar antes de pensar. Siempre haz una pausa — y elimina el mensaje.",
    },
  },
  {
    id: 5,
    isScam: true,
    sender: { en: "Medicare Notice", es: "Aviso de Medicare" },
    message: {
      en: "Medicare notice: Your new benefits card is ready. Confirm your Social Security number to receive it: 1-800-555-0147",
      es: "Aviso de Medicare: Tu nueva tarjeta de beneficios está lista. Confirma tu número de Seguro Social para recibirla: 1-800-555-0147",
    },
    redFlags: {
      en: [
        "Requests your Social Security number via text",
        "Medicare never contacts you this way",
        "You should never verify or update your SSN with anyone over text or email",
      ],
      es: [
        "Solicita tu número de Seguro Social por mensaje de texto",
        "Medicare nunca te contacta de esta manera",
        "Nunca debes verificar ni actualizar tu SSN con nadie por mensaje o correo",
      ],
    },
    distractor: {
      en: "The message appears to be from a government agency",
      es: "El mensaje parece provenir de una agencia gubernamental",
    },
    sageExplanation: {
      en: "Medicare will NEVER ask for your Social Security number by text or phone. If you receive this, delete it immediately and call Medicare directly at 1-800-MEDICARE.",
      es: "Medicare NUNCA pedirá tu número de Seguro Social por mensaje o teléfono. Si recibes esto, elimínalo de inmediato y llama a Medicare directamente al 1-800-MEDICARE.",
    },
  },
  {
    id: 10,
    isBossChallenge: true,
    title: {
      en: "Boss Challenge — Email Expert!",
      es: "Reto Final — ¡Experta en Correos!",
    },
    instructions: {
      en: "You've seen text scams and email scams. Now sort these 5 emails — are they REAL or SCAM? Think carefully!",
      es: "Ya viste estafas por texto y por correo. Ahora clasifica estos 5 correos — ¿son REALES o FRAUDE? ¡Piénsalo bien!",
    },
    emails: [
      {
        id: "b1",
        isScam: false,
        sender: { en: "City Library", es: "Biblioteca Municipal" },
        senderEmail: "library@citylib.org",
        subject: { en: "Your book hold is ready for pickup", es: "Tu libro reservado está listo para recoger" },
        message: {
          en: "The book you requested is ready for pickup at the Main Branch. It will be held for 7 days. Library hours are Mon-Sat 9AM-8PM.",
          es: "El libro que solicitaste está listo para recoger en la Sucursal Principal. Se guardará por 7 días. Horario: lunes a sábado de 9AM a 8PM.",
        },
        realReasons: {
          en: ["Official library domain", "Specific details with no urgency", "No links to click, no personal info requested"],
          es: ["Dominio oficial de la biblioteca", "Detalles específicos sin urgencia", "Sin enlaces ni solicitud de información personal"],
        },
        sageExplanation: {
          en: "This is a real library notification — it uses an official domain, gives specific details, creates no urgency, and asks for nothing personal.",
          es: "Esta es una notificación real de la biblioteca — usa un dominio oficial, da detalles específicos, no crea urgencia y no pide nada personal.",
        },
      },
      {
        id: "b2",
        isScam: true,
        sender: { en: "Netflix Billing", es: "Facturación de Netflix" },
        senderEmail: "netflix-billing@netf1ix-support.com",
        subject: { en: "Your Netflix payment has failed — action required", es: "Tu pago de Netflix ha fallado — acción requerida" },
        message: {
          en: "Your payment method was declined. Update your billing information within 24 hours or your account will be cancelled.",
          es: "Tu método de pago fue rechazado. Actualiza tu información de facturación en 24 horas o tu cuenta será cancelada.",
        },
        redFlags: {
          en: ["Misspelled domain — 'netf1ix' uses a number 1 instead of the letter l", "24-hour deadline is an urgency threat", "Requests your billing information"],
          es: ["Dominio mal escrito — 'netf1ix' usa el número 1 en lugar de la letra l", "El plazo de 24 horas es una amenaza de urgencia", "Solicita tu información de facturación"],
        },
        distractor: { en: "The email mentions your subscription", es: "El correo menciona tu suscripción" },
        sageExplanation: {
          en: "Netflix's real domain is netflix.com only. Scammers swap letters for numbers — 'netf1ix' with a '1' is a fake. If Netflix ever has a billing issue, log in directly at netflix.com yourself.",
          es: "El dominio real de Netflix es solo netflix.com. Los estafadores cambian letras por números — 'netf1ix' con un '1' es falso. Si Netflix tiene un problema de pago, inicia sesión directamente en netflix.com tú misma.",
        },
      },
      {
        id: "b3",
        isScam: false,
        sender: { en: "UPS", es: "UPS" },
        senderEmail: "auto-notify@ups.com",
        subject: { en: "UPS Shipment Notification — Tracking #1Z999AA10123456784", es: "Notificación de envío UPS — Seguimiento #1Z999AA10123456784" },
        message: {
          en: "Your package has shipped. Expected delivery: Tuesday. Track at ups.com",
          es: "Tu paquete ha sido enviado. Entrega prevista: martes. Rastrea en ups.com",
        },
        realReasons: {
          en: ["Official UPS domain (ups.com)", "Real tracking number format", "Directs you to ups.com — not a suspicious link"],
          es: ["Dominio oficial de UPS (ups.com)", "Formato real de número de seguimiento", "Te dirige a ups.com — no a un enlace sospechoso"],
        },
        sageExplanation: {
          en: "This is a real UPS notification — it comes from ups.com, has a real tracking number format, and directs you to the official UPS website.",
          es: "Esta es una notificación real de UPS — viene de ups.com, tiene un formato de número de seguimiento real y te dirige al sitio web oficial de UPS.",
        },
      },
      {
        id: "b4",
        isScam: true,
        sender: { en: "SSA Benefits", es: "Beneficios SSA" },
        senderEmail: "ssa-benefits@gmail.com",
        subject: { en: "URGENT — Your Social Security benefits have been suspended", es: "URGENTE — Tus beneficios del Seguro Social han sido suspendidos" },
        message: {
          en: "Due to suspicious activity your benefits have been suspended. Call 1-888-555-0199 immediately to restore them.",
          es: "Debido a actividad sospechosa, tus beneficios han sido suspendidos. Llama al 1-888-555-0199 de inmediato para restaurarlos.",
        },
        redFlags: {
          en: ["The Social Security Administration never uses Gmail", "Social Security benefits cannot be suspended this way", "URGENT language is designed to panic you"],
          es: ["La Administración del Seguro Social nunca usa Gmail", "Los beneficios del Seguro Social no se pueden suspender de esta manera", "El lenguaje URGENTE está diseñado para generarte pánico"],
        },
        distractor: { en: "The email mentions your Social Security benefits", es: "El correo menciona tus beneficios del Seguro Social" },
        sageExplanation: {
          en: "The Social Security Administration only contacts you by official U.S. mail — never by email or phone. Any email about suspended benefits is always a scam. If concerned, call SSA directly at 1-800-772-1213.",
          es: "La Administración del Seguro Social solo se comunica por correo postal oficial — nunca por email o teléfono. Cualquier correo sobre beneficios suspendidos es siempre una estafa. Si te preocupa, llama directamente a SSA al 1-800-772-1213.",
        },
      },
      {
        id: "b5",
        isScam: false,
        sender: { en: "Lakeside Medical", es: "Lakeside Medical" },
        senderEmail: "reminders@lakesidemedical.com",
        subject: { en: "Appointment reminder — Dr. Johnson — Thursday at 10:30 AM", es: "Recordatorio de cita — Dr. Johnson — Jueves a las 10:30 AM" },
        message: {
          en: "This is a reminder for your appointment with Dr. Johnson on Thursday at 10:30 AM. Call 312-555-0200 to reschedule. Please arrive 15 minutes early.",
          es: "Este es un recordatorio de tu cita con el Dr. Johnson el jueves a las 10:30 AM. Llama al 312-555-0200 para reprogramar. Por favor llega 15 minutos antes.",
        },
        realReasons: {
          en: ["Legitimate medical domain", "Specific appointment details — no urgency", "Provides a direct phone number, no links to click"],
          es: ["Dominio médico legítimo", "Detalles específicos de la cita — sin urgencia", "Proporciona un número directo, sin enlaces que hacer clic"],
        },
        sageExplanation: {
          en: "This is a real appointment reminder — it has a legitimate domain, specific details, a direct phone number, and creates no urgency. Real medical offices never ask for personal information by email.",
          es: "Este es un recordatorio de cita real — tiene un dominio legítimo, detalles específicos, un número directo y no crea urgencia. Los consultorios médicos reales nunca piden información personal por correo.",
        },
      },
    ],
  },
  {
    id: 7,
    isScam: false,
    sender: { en: "Northside Medical Group", es: "Northside Medical Group" },
    senderEmail: "appointments@northsidemedical.org",
    subject: {
      en: "Reminder: Your appointment tomorrow at 2:00 PM",
      es: "Recordatorio: Tu cita mañana a las 2:00 PM",
    },
    message: {
      en: "This is a reminder from Northside Medical Group for your appointment with Dr. Williams on Tuesday at 2:00 PM. Reply to confirm or call 312-555-0100 to reschedule.",
      es: "Este es un recordatorio de Northside Medical Group para tu cita con la Dra. Williams el martes a las 2:00 PM. Responde para confirmar o llama al 312-555-0100 para reprogramar.",
    },
    redFlags: null,
    distractor: null,
    realReasons: {
      en: [
        "Comes from a legitimate, verified domain",
        "Contains specific appointment details — no urgency",
        "Provides a direct phone number to call",
      ],
      es: [
        "Proviene de un dominio legítimo y verificado",
        "Contiene detalles específicos de la cita — sin urgencia",
        "Proporciona un número de teléfono directo para llamar",
      ],
    },
    sageExplanation: {
      en: "This is a real email — it comes from a legitimate domain, has specific details, creates no urgency, and gives you a direct phone number. Good habit: always check that emails from organizations come from their official domain. When in doubt, go directly to the organization's website — never through a link in an email.",
      es: "Este es un correo real — proviene de un dominio legítimo, tiene detalles específicos, no crea urgencia y te da un número de teléfono directo. Buen hábito: siempre verifica que los correos de organizaciones vengan de su dominio oficial. En caso de duda, ve directamente al sitio web de la organización — nunca a través de un enlace en un correo.",
    },
  },
  {
    id: 9,
    isScam: true,
    sender: { en: "Amazon Security Team", es: "Equipo de Seguridad de Amazon" },
    senderEmail: "amazon-security-team@amazon-alerts-center.com",
    subject: {
      en: "Your Amazon account was accessed from an unknown device",
      es: "Se accedió a tu cuenta de Amazon desde un dispositivo desconocido",
    },
    message: {
      en: "Someone in Nigeria has logged into your account. Click SECURE MY ACCOUNT NOW immediately.",
      es: "Alguien en Nigeria ha iniciado sesión en tu cuenta. Haz clic en PROTEGER MI CUENTA AHORA de inmediato.",
    },
    redFlags: {
      en: [
        "Not a real Amazon domain — amazon.com is the only legitimate Amazon domain",
        "Uses fear tactics about your account being accessed",
        "Pressures you to click immediately without thinking",
      ],
      es: [
        "No es un dominio real de Amazon — amazon.com es el único dominio legítimo de Amazon",
        "Usa tácticas de miedo sobre el acceso a tu cuenta",
        "Te presiona a hacer clic de inmediato sin pensar",
      ],
    },
    distractor: {
      en: "The email mentions your account by name",
      es: "El correo menciona tu cuenta por nombre",
    },
    sageExplanation: {
      en: "Amazon's only real domain is amazon.com — nothing else is legitimate. Scammers use fear about account security to make you click fast. Always go directly to amazon.com yourself and check your account — never click any link in an email.",
      es: "El único dominio real de Amazon es amazon.com — nada más es legítimo. Los estafadores usan el miedo sobre la seguridad de tu cuenta para hacerte hacer clic rápido. Siempre ve directamente a amazon.com tú misma y verifica tu cuenta — nunca hagas clic en ningún enlace de un correo.",
    },
  },
  {
    id: 8,
    isScam: true,
    sender: { en: "IRS Tax Refund", es: "Reembolso de Impuestos IRS" },
    senderEmail: "irs.tax.refund@gmail.com",
    subject: {
      en: "You have a pending tax refund of $847.00",
      es: "Tienes un reembolso de impuestos pendiente de $847.00",
    },
    message: {
      en: "The IRS has processed a refund in your name. Verify your bank account information immediately to receive your funds.",
      es: "El IRS ha procesado un reembolso a tu nombre. Verifica la información de tu cuenta bancaria de inmediato para recibir tus fondos.",
    },
    redFlags: {
      en: [
        "The IRS does not use Gmail. The IRS does not use any email service — period.",
        "The IRS only communicates through official U.S. mail — never email",
        "Requests your bank account information",
      ],
      es: [
        "El IRS no usa Gmail. El IRS no usa ningún servicio de correo electrónico — punto.",
        "El IRS solo se comunica por correo postal oficial de EE.UU. — nunca por email",
        "Solicita la información de tu cuenta bancaria",
      ],
    },
    distractor: {
      en: "The refund amount seems too small",
      es: "El monto del reembolso parece demasiado pequeño",
    },
    sageExplanation: {
      en: "The IRS does not use Gmail. The IRS does not use any email service to contact taxpayers. The IRS only communicates through official U.S. mail. Any email claiming to be from the IRS is always a scam — no exceptions.",
      es: "El IRS no usa Gmail. El IRS no usa ningún servicio de correo electrónico para contactar a los contribuyentes. El IRS solo se comunica por correo postal oficial de EE.UU. Cualquier correo electrónico que afirme ser del IRS es siempre una estafa — sin excepciones.",
    },
  },
  {
    id: 11,
    isScam: true,
    isPhoneCall: true,
    callerName: { en: "Social Security Administration", es: "Administración del Seguro Social" },
    callerNumber: "1-800-555-0147",
    scenario: {
      en: "You receive a call from a man who says he is from the Social Security Administration. He says your Social Security number has been suspended due to suspicious activity and you must confirm your number immediately to avoid arrest.",
      es: "Recibes una llamada de un hombre que dice ser de la Administración del Seguro Social. Dice que tu número de Seguro Social ha sido suspendido por actividad sospechosa y que debes confirmar tu número de inmediato para evitar ser arrestada.",
    },
    redFlags: {
      en: [
        "Your Social Security number cannot be suspended — that is not how it works",
        "The SSA never calls to threaten arrest",
        "Demands you confirm your SSN immediately",
      ],
      es: [
        "Tu número de Seguro Social no puede ser suspendido — así no funciona",
        "La SSA nunca llama para amenazar con arresto",
        "Te exige que confirmes tu SSN de inmediato",
      ],
    },
    distractor: {
      en: "The caller knows your name and address",
      es: "El llamante conoce tu nombre y dirección",
    },
    sageExplanation: {
      en: "This is one of the most common scams targeting seniors. Your Social Security number cannot be suspended like a driver's license — that threat is completely fabricated. The Social Security Administration will never call to threaten you or ask for your number. Hang up immediately.",
      es: "Esta es una de las estafas más comunes dirigidas a personas mayores. Tu número de Seguro Social no puede ser suspendido como una licencia de conducir — esa amenaza es completamente falsa. La Administración del Seguro Social nunca llamará para amenazarte ni pedirte tu número. Cuelga de inmediato.",
    },
  },
  {
    id: 12,
    isScam: true,
    isComputerPopup: true,
    scenario: {
      en: "A loud alarm pop-up appears on your screen. A person calls back and asks to remotely access your computer to fix the virus.",
      es: "Una ventana emergente con una alarma fuerte aparece en tu pantalla. Una persona te llama de vuelta y pide acceso remoto a tu computadora para arreglar el virus.",
    },
    redFlags: {
      en: [
        "Microsoft never contacts you through browser pop-ups",
        "Legitimate companies never ask for remote computer access this way",
        "Never allow remote access unless YOU personally initiated the contact with a trusted source",
      ],
      es: [
        "Microsoft nunca te contacta a través de ventanas emergentes del navegador",
        "Las empresas legítimas nunca piden acceso remoto a tu computadora de esta manera",
        "Nunca permitas acceso remoto a menos que TÚ hayas iniciado el contacto con una fuente de confianza",
      ],
    },
    distractor: {
      en: "The pop-up appears while you are browsing the internet",
      es: "La ventana emergente aparece mientras navegas por internet",
    },
    sageExplanation: {
      en: "Microsoft never contacts you this way. Never allow anyone to remotely access your computer unless you personally initiated the contact AND you fully trust the source. Even individuals posing as legitimate professionals have been known to exploit remote access to steal personal information or install harmful software. When in doubt, close the browser, restart your computer, and call a trusted family member before doing anything else.",
      es: "Microsoft nunca te contacta de esta manera. Nunca permitas que nadie acceda remotamente a tu computadora a menos que tú hayas iniciado el contacto Y confíes plenamente en la fuente. Incluso personas que se hacen pasar por profesionales legítimos han utilizado el acceso remoto para robar información personal o instalar software dañino. En caso de duda, cierra el navegador, reinicia tu computadora y llama a un familiar de confianza antes de hacer cualquier otra cosa.",
    },
  },
  {
    id: 6,
    isScam: true,
    sender: { en: "PayPal Support", es: "Soporte de PayPal" },
    message: {
      en: "PayPal: Your account has been suspended due to unusual activity. Verify your information within 24 hours to restore access: paypal-account-verify.net/restore",
      es: "PayPal: Tu cuenta ha sido suspendida por actividad inusual. Verifica tu información dentro de 24 horas para restaurar el acceso: paypal-account-verify.net/restore",
    },
    redFlags: {
      en: [
        "Fake domain — real PayPal uses paypal.com only",
        "Artificial 24-hour deadline creates panic",
        "Threatens account suspension to force action",
        "Asks you to click a link to 'verify' information",
      ],
      es: [
        "Dominio falso — el PayPal real solo usa paypal.com",
        "El plazo artificial de 24 horas crea pánico",
        "Amenaza con suspensión de cuenta para forzarte a actuar",
        "Te pide que hagas clic en un enlace para 'verificar' información",
      ],
    },
    distractor: {
      en: "The message mentions your account has unusual activity",
      es: "El mensaje menciona que tu cuenta tiene actividad inusual",
    },
    sageExplanation: {
      en: "PayPal will NEVER send you to a site other than paypal.com. Scammers copy the look of real companies. If you are worried, open your browser and type paypal.com yourself — never click the link in the message.",
      es: "PayPal NUNCA te enviará a un sitio que no sea paypal.com. Los estafadores copian la apariencia de empresas reales. Si te preocupa, abre tu navegador y escribe paypal.com tú misma — nunca hagas clic en el enlace del mensaje.",
    },
  },
];