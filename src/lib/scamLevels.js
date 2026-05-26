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