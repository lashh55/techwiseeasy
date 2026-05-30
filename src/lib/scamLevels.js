// Spot the Scam — levels in display order
// displayOrder controls the Jump dropdown and gameplay sequence — never change existing values
// redFlags = correct answers; distractor = one plausible-but-wrong item per scam level

export const SCAM_LEVELS = [
  {
    id: 1,
    displayOrder: 1,
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
    displayOrder: 2,
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
    displayOrder: 3,
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
    displayOrder: 4,
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
    displayOrder: 5,
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
    displayOrder: 6,
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
    id: 6,
    displayOrder: 7,
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
  {
    id: 7,
    displayOrder: 8,
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
    id: 8,
    displayOrder: 9,
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
    id: 9,
    displayOrder: 10,
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
    id: 10,
    displayOrder: 11,
    isScam: true,
    sender: { en: "Geek Squad Protection", es: "Geek Squad Protection" },
    senderEmail: "geeksquad@protection-billing-center.com",
    subject: {
      en: "Your Geek Squad Total Protection Plan Has Renewed — $429.99",
      es: "Tu Plan de Protección Total de Geek Squad Ha Sido Renovado — $429.99",
    },
    message: {
      en: "Dear Valued Member,\n\nThank you for renewing your Geek Squad Total Protection annual plan. This email confirms your subscription has been successfully renewed.\n\nAmount Charged: $429.99\nBilling Date: May 27, 2026\nPayment Method: Card ending on file\n\nIf you did not authorize this renewal, or you wish to cancel for a FULL REFUND, you must call our Billing Department within 24 hours at 1-888-555-0162.\n\nFailure to call within 24 hours will make this charge final and non-refundable.\n\nGeek Squad Billing Team",
      es: "Estimado Miembro,\n\nGracias por renovar su plan anual de Protección Total de Geek Squad. Este correo confirma que su suscripción ha sido renovada exitosamente.\n\nCargo: $429.99\nFecha de Facturación: 27 de mayo de 2026\nMétodo de Pago: Tarjeta registrada en archivo\n\nSi usted no autorizó esta renovación, o desea cancelar para obtener un REEMBOLSO COMPLETO, debe llamar a nuestro Departamento de Facturación dentro de las 24 horas al 1-888-555-0162.\n\nNo llamar dentro de las 24 horas hará que este cargo sea final e irrembolsable.\n\nEquipo de Facturación de Geek Squad",
    },
    redFlags: {
      en: [
        "Pressures you to call a phone number quickly to cancel or get a refund",
        "Uses a 24-hour deadline to rush your decision",
        "The sender's email is not an official Best Buy or Geek Squad address",
      ],
      es: [
        "Te presiona a llamar rápidamente a un número de teléfono para cancelar o recibir un reembolso",
        "Usa un plazo de 24 horas para apresurarte",
        "El correo del remitente no es una dirección oficial de Best Buy o Geek Squad",
      ],
    },
    distractor: {
      en: "The email lists a specific dollar amount",
      es: "El correo indica una cantidad específica en dólares",
    },
    sageExplanation: {
      en: "This is a subscription renewal scam — one of the most common email scams today. The scammers want that big charge to make you panic and call the number. The moment you call, they'll try to get your card details or talk you into letting them onto your computer to 'process a refund' — and that is the real trap. A real company would never make a refund depend on calling within 24 hours. If a charge ever worries you, don't use the number in the email — look up the company's real number yourself, or check your bank statement directly. When an email rushes you to call, slow down. That hurry IS the scam.",
      es: "Esta es una estafa de renovación de suscripción — una de las estafas por correo más comunes hoy en día. Los estafadores quieren que ese gran cargo te haga entrar en pánico y llamar al número. En el momento en que llamas, intentarán obtener los detalles de tu tarjeta o convencerte de que les dejes acceder a tu computadora para 'procesar un reembolso' — y esa es la trampa real. Una empresa real nunca haría que un reembolso dependiera de llamar dentro de 24 horas. Si algún cargo te preocupa, no uses el número del correo — busca tú misma el número real de la empresa, o revisa tu estado de cuenta directamente. Cuando un correo te apresura a llamar, frena. Esa prisa ES la estafa.",
    },
  },
  {
    id: 'bc2',
    displayOrder: 12,
    isEmailBossChallenge: true,
    title: {
      en: '🏆 Email Boss Challenge',
      es: '🏆 Reto Final de Correos',
    },
    passingScore: 8,
    emails: [
      {
        id: 'eb1',
        isScam: true,
        sender: { en: 'PayPal Security', es: 'Seguridad de PayPal' },
        senderEmail: 'security@paypal-account-verify.net',
        subject: { en: 'Unusual activity detected on your account', es: 'Actividad inusual detectada en tu cuenta' },
        message: { en: 'We detected unusual activity on your PayPal account. You must verify your account now to avoid suspension.', es: 'Detectamos actividad inusual en tu cuenta de PayPal. Debes verificar tu cuenta ahora para evitar la suspensión.' },
      },
      {
        id: 'eb2',
        isScam: false,
        sender: { en: 'Amazon', es: 'Amazon' },
        senderEmail: 'shipment-tracking@amazon.com',
        subject: { en: 'Your order #112-4455667 has shipped', es: 'Tu pedido #112-4455667 ha sido enviado' },
        message: { en: 'Your order has shipped and is on its way. Track your package at amazon.com/orders. Estimated delivery: Thursday.', es: 'Tu pedido ha sido enviado. Rastrea tu paquete en amazon.com/orders. Entrega estimada: jueves.' },
      },
      {
        id: 'eb3',
        isScam: true,
        sender: { en: 'IRS Refund Center', es: 'Centro de Reembolsos IRS' },
        senderEmail: 'refunds@irs-taxpayer-center.com',
        subject: { en: 'You are owed a tax refund — claim it now', es: 'Se te debe un reembolso de impuestos — reclámalos ahora' },
        message: { en: 'Our records show you are owed a federal tax refund. Click the link below to verify your identity and claim your refund immediately.', es: 'Nuestros registros muestran que se te debe un reembolso federal. Haz clic en el enlace para verificar tu identidad y reclamar tu reembolso de inmediato.' },
      },
      {
        id: 'eb4',
        isScam: true,
        sender: { en: 'Geek Squad Billing', es: 'Facturación Geek Squad' },
        senderEmail: 'billing@geeksquad-renewal-center.com',
        subject: { en: 'Your Geek Squad plan renewed — $429.99 charged', es: 'Tu plan de Geek Squad fue renovado — $429.99 cobrado' },
        message: { en: 'Your annual Geek Squad Total Protection plan has been renewed for $429.99. Call 1-888-555-0162 within 24 hours to cancel and receive a full refund.', es: 'Tu plan anual de Protección Total de Geek Squad fue renovado por $429.99. Llama al 1-888-555-0162 dentro de 24 horas para cancelar y recibir un reembolso completo.' },
      },
      {
        id: 'eb5',
        isScam: false,
        sender: { en: 'Macy\'s', es: 'Macy\'s' },
        senderEmail: 'newsletter@macys.com',
        subject: { en: 'This week\'s deals — just for you', es: 'Las ofertas de esta semana — solo para ti' },
        message: { en: 'Hi! Here are this week\'s top deals picked for you. Shop online at macys.com or visit your nearest store. Unsubscribe anytime below.', es: '¡Hola! Estas son las mejores ofertas de esta semana seleccionadas para ti. Compra en macys.com o visita tu tienda más cercana. Cancela la suscripción en cualquier momento.' },
      },
      {
        id: 'eb6',
        isScam: true,
        sender: { en: 'Amazon Security Team', es: 'Equipo de Seguridad Amazon' },
        senderEmail: 'security-alert@amazon-accounts-center.com',
        subject: { en: 'Your Amazon account has been locked', es: 'Tu cuenta de Amazon ha sido bloqueada' },
        message: { en: 'Your Amazon account has been locked due to suspicious sign-in attempts. Confirm your password immediately to restore access before your account is permanently disabled.', es: 'Tu cuenta de Amazon fue bloqueada por intentos sospechosos. Confirma tu contraseña de inmediato para restaurar el acceso antes de que tu cuenta sea deshabilitada permanentemente.' },
      },
      {
        id: 'eb7',
        isScam: false,
        sender: { en: 'Riverside Family Clinic', es: 'Clínica Familiar Riverside' },
        senderEmail: 'reminders@riversidefamilyclinic.com',
        subject: { en: 'Reminder: Appointment with Dr. Patel — Friday at 9:00 AM', es: 'Recordatorio: Cita con el Dr. Patel — viernes a las 9:00 AM' },
        message: { en: 'This is a reminder for your appointment with Dr. Patel on Friday at 9:00 AM. Please arrive 15 minutes early. Call 773-555-0180 to reschedule.', es: 'Este es un recordatorio de tu cita con el Dr. Patel el viernes a las 9:00 AM. Llega 15 minutos antes. Llama al 773-555-0180 para reprogramar.' },
      },
      {
        id: 'eb8',
        isScam: true,
        sender: { en: 'Northside Medical Group', es: 'Northside Medical Group' },
        senderEmail: 'records@northside-medical-portal.net',
        subject: { en: 'Action required — confirm your SSN to release records', es: 'Acción requerida — confirma tu SSN para liberar registros' },
        message: { en: 'To release your medical records as requested, please reply with your Social Security number and date of birth to verify your identity.', es: 'Para liberar tus registros médicos según lo solicitado, responde con tu número de Seguro Social y fecha de nacimiento para verificar tu identidad.' },
      },
      {
        id: 'eb9',
        isScam: false,
        sender: { en: 'Chase Bank', es: 'Chase Bank' },
        senderEmail: 'statements@chase.com',
        subject: { en: 'Your monthly statement is ready', es: 'Tu estado de cuenta mensual está listo' },
        message: { en: 'Your May statement is now available. To view it, log in through the Chase mobile app or visit chase.com directly. Do not reply to this email.', es: 'Tu estado de cuenta de mayo ya está disponible. Para verlo, inicia sesión en la aplicación móvil de Chase o visita chase.com directamente. No respondas a este correo.' },
      },
      {
        id: 'eb10',
        isScam: true,
        sender: { en: 'PayPal', es: 'PayPal' },
        senderEmail: 'payments@paypal-money-center.com',
        subject: { en: 'You received $250.00 — click to accept', es: 'Recibiste $250.00 — haz clic para aceptar' },
        message: { en: 'Great news! Someone sent you $250.00 via PayPal. Click the button below to accept your payment. This transfer will expire in 48 hours.', es: '¡Buenas noticias! Alguien te envió $250.00 por PayPal. Haz clic en el botón para aceptar tu pago. Esta transferencia vencerá en 48 horas.' },
      },
    ],
  },
  {
    id: 13,
    displayOrder: 13,
    section: 'phone',
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
    id: 14,
    displayOrder: 14,
    section: 'tech_support',
    isScam: true,
    isComputerPopup: true,
    scenario: {
      en: "You're reading an article online when a loud alarm pop-up suddenly fills your screen. It says 'VIRUS DETECTED' and warns you not to close the window. It tells you to call Microsoft Support immediately at the number shown. If you call that number, the person who answers will ask to remotely access your computer to 'remove the virus.'",
      es: "Estás leyendo un artículo en línea cuando una ventana emergente con una alarma fuerte de repente llena tu pantalla. Dice 'VIRUS DETECTADO' y te advierte que no cierres la ventana. Te indica que llames a Microsoft Support de inmediato al número que se muestra. Si llamas a ese número, la persona que contesta pedirá acceso remoto a tu computadora para 'eliminar el virus.'",
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
      en: "This is a tech support scam. The pop-up is fake — a real virus warning never tells you to call a phone number. The whole goal is to scare you into calling, and once you do, the scammer asks to control your computer from far away. The moment they have access, they can see your passwords, your bank accounts, and your personal files. Real companies like Microsoft will never put a phone number in a pop-up. If a scary alert like this appears, do not call the number and do not panic — close the browser, or shut the computer down and restart it. The alarm is the scam.",
      es: "Esta es una estafa de soporte técnico. La ventana emergente es falsa — una advertencia real de virus nunca te dice que llames a un número de teléfono. El objetivo es asustarte para que llames, y una vez que lo haces, el estafador pide controlar tu computadora desde lejos. En el momento en que tienen acceso, pueden ver tus contraseñas, tus cuentas bancarias y tus archivos personales. Las empresas reales como Microsoft nunca pondrán un número de teléfono en una ventana emergente. Si aparece una alerta aterradora como esta, no llames al número y no te asustes — cierra el navegador, o apaga la computadora y reiníciala. La alarma es la estafa.",
    },
  },
  {
    id: 16,
    displayOrder: 16,
    section: 'tech_support',
    isScam: true,
    isComputerPopupButton: true,
    scenario: {
      en: "A warning pops up on your screen saying your computer is infected. Instead of a phone number, it shows a button that says 'Scan and Remove Virus.' The pop-up warns that closing the page could cause data loss.",
      es: "Una advertencia aparece en tu pantalla diciendo que tu computadora está infectada. En lugar de un número de teléfono, muestra un botón que dice 'Escanear y eliminar virus.' La ventana emergente advierte que cerrar la página podría causar pérdida de datos.",
    },
    redFlags: {
      en: [
        "It pressures you to click a button right now to fix a problem",
        "It threatens that closing the page will cause data loss",
        "A real virus warning does not appear as a pop-up in your web browser",
      ],
      es: [
        "Te presiona para que hagas clic en un botón ahora mismo para solucionar un problema",
        "Amenaza con que cerrar la página causará pérdida de datos",
        "Una advertencia real de virus no aparece como ventana emergente en tu navegador web",
      ],
    },
    distractor: {
      en: "The pop-up mentions Microsoft by name",
      es: "La ventana emergente menciona a Microsoft por nombre",
    },
    sageExplanation: {
      en: "This is the other kind of fake virus scam. There's no phone number this time — just a button. But that button is the trap. Clicking it can install harmful software that locks you out of your own computer or quietly copies your passwords and keystrokes as you type. Your web browser cannot actually scan your computer for viruses, so any pop-up that claims to is fake. Never click inside a pop-up like this — not even the X to close it, because the X can be fake too. Instead, close the whole browser, or restart your computer. When in doubt, shut it down. A scam can't hurt you on a computer that's turned off.",
      es: "Este es el otro tipo de estafa de virus falso. Esta vez no hay número de teléfono — solo un botón. Pero ese botón es la trampa. Hacer clic en él puede instalar software dañino que te bloquea el acceso a tu propia computadora o copia silenciosamente tus contraseñas y pulsaciones de teclas mientras escribes. Tu navegador web no puede realmente escanear tu computadora en busca de virus, así que cualquier ventana emergente que lo afirme es falsa. Nunca hagas clic dentro de una ventana emergente como esta — ni siquiera en la X para cerrarla, porque la X también puede ser falsa. En cambio, cierra todo el navegador o reinicia tu computadora. En caso de duda, apágala. Una estafa no puede hacerte daño en una computadora que está apagada.",
    },
  },
  {
    id: 17,
    displayOrder: 17,
    section: 'social_media',
    isScam: true,
    isFacebookPost: true,
    pageName: 'Riverside RV Center',
    postText: "🎉 CONGRATULATIONS! 🎉 We have 3 brand-new 2024 motorhomes we cannot sell and must give away THIS WEEK! To claim yours, you must: 1) Like and Share this post, 2) Comment 'ME', and 3) Send us a private message with your name, address, and date of birth to arrange free delivery. Only 3 left — claim now before they're gone!",
    redFlags: {
      en: [
        "It asks you to send personal information like your address and date of birth in a private message",
        "It pressures you with 'only 3 left' and 'claim now' to make you rush",
        "A real business does not give away expensive items for liking and sharing a post",
      ],
      es: [
        "Te pide que envíes información personal como tu dirección y fecha de nacimiento en un mensaje privado",
        "Te presiona con 'solo quedan 3' y 'reclama ahora' para que actúes rápido",
        "Un negocio real no regala artículos caros por darle 'Me gusta' y compartir una publicación",
      ],
    },
    distractor: {
      en: "The page has a checkmark next to its name",
      es: "La página tiene una marca de verificación junto a su nombre",
    },
    sageExplanation: {
      en: "This is a fake giveaway scam. No real company gives away motorhomes — or cars, or campers — just for liking and sharing a post. The 'prize' is bait. Once you send a private message, the scammer either steals the personal information you gave them, or tells you to pay a 'delivery fee' or 'taxes' to receive a prize that does not exist. Your date of birth and address are exactly what someone needs to steal your identity, so never send those to claim anything online. If a giveaway sounds too good to be true, it is — every time.",
      es: "Esta es una estafa de sorteo falso. Ninguna empresa real regala casas rodantes — ni autos, ni campers — solo por darle 'Me gusta' y compartir una publicación. El 'premio' es el anzuelo. Una vez que envías un mensaje privado, el estafador roba la información personal que le diste, o te dice que pagues una 'tarifa de entrega' o 'impuestos' para recibir un premio que no existe. Tu fecha de nacimiento y dirección son exactamente lo que alguien necesita para robar tu identidad, así que nunca las envíes para reclamar nada en línea. Si un sorteo suena demasiado bueno para ser verdad, lo es — siempre.",
    },
  },
  {
    id: 18,
    displayOrder: 18,
    section: 'romance',
    isScam: true,
    isPrivateMessageThread: true,
    contactName: 'Robert Mills',
    messages: [
      "Good morning my beautiful queen. From the moment I wake up you are the only thing inside my mind. I never feel this kind of love so fast before. 💕",
      "I am wishing so much to hear your voice but the signal here on the oil rig is very bad always. Soon my love, very soon we will be together for always.",
      "My darling I am having a big problem now. The customs office is holding my work equipment and they say I cannot receive my payment until the fee is clear. I am too much embarrassed to ask you this — but can you please send to me $1,800 in gift cards? I will be paying you back the moment I reach home to you.",
    ],
    scenario: {
      en: "You met Robert online a few weeks ago. He is loving and attentive, says he works on an oil rig overseas, and talks about a future together — but he has never video called you or met you in person. Now he is asking for money.",
      es: "Conociste a Robert en línea hace unas semanas. Es cariñoso y atento, dice que trabaja en una plataforma petrolera en el extranjero, y habla de un futuro juntos — pero nunca te ha llamado por video ni te ha conocido en persona. Ahora te está pidiendo dinero.",
    },
    redFlags: {
      en: [
        "He asks you for money, and specifically for gift cards",
        "He has never video called you or met you in person",
        "He says he loves you very quickly, before you have really met",
      ],
      es: [
        "Te pide dinero, y específicamente tarjetas de regalo",
        "Nunca te ha llamado por video ni te ha conocido en persona",
        "Dice que te ama muy rápido, antes de que realmente se hayan conocido",
      ],
    },
    distractor: {
      en: "He says he works on an oil rig",
      es: "Dice que trabaja en una plataforma petrolera",
    },
    sageExplanation: {
      en: "This is a romance scam. Did you notice the messages were written in awkward, broken English? That is often a deliberate trick — scammers use messages like these on purpose, because people who overlook the strange writing are the ones they believe will be easiest to fool. So awkward writing is a clue to look closer. But be careful: it is only a clue, not proof. Many honest people write imperfect English too. What truly gives a romance scam away is the pattern — saying 'I love you' very fast, always having a reason they cannot video call or meet, and finally asking for money or gift cards. Here is the rule that protects you: never send money or gift cards to someone you have not met in person, no matter how strong the feelings are. Real love is patient and will never pressure you to pay.",
      es: "Esta es una estafa romántica. ¿Notaste que los mensajes estaban escritos en un inglés torpe y roto? Eso a menudo es un truco deliberado — los estafadores usan mensajes así a propósito, porque las personas que pasan por alto la escritura extraña son las que creen que serán más fáciles de engañar. Entonces la escritura torpe es una pista para mirar más de cerca. Pero ten cuidado: es solo una pista, no una prueba. Muchas personas honestas también escriben un inglés imperfecto. Lo que realmente delata una estafa romántica es el patrón — decir 'te amo' muy rápido, siempre tener una razón por la que no pueden hacer videollamadas ni conocerte, y finalmente pedir dinero o tarjetas de regalo. Esta es la regla que te protege: nunca envíes dinero ni tarjetas de regalo a alguien que no hayas conocido en persona, sin importar cuán fuertes sean los sentimientos. El amor real es paciente y nunca te presionará para que pagues.",
    },
  },
  {
    id: 15,
    displayOrder: 15,
    section: 'phone',
    isScam: true,
    isPhoneCall: true,
    callerName: { en: "Unknown Caller", es: "Llamada Desconocida" },
    callerNumber: "1-407-555-0188",
    scenario: {
      en: "You answer the phone. A young man's voice says 'Grandma? It's me!' He sounds upset and says he's been in a car accident in another state and is in jail. He begs you not to tell his parents because he's embarrassed. He says a lawyer will call you next and you need to send $2,500 for bail money right away — by gift cards or a wire transfer.",
      es: "Contestas el teléfono. Una voz joven dice '¿Abuela? ¡Soy yo!' Suena angustiado y dice que tuvo un accidente de auto en otro estado y está en la cárcel. Te ruega que no se lo digas a sus padres porque está avergonzado. Dice que un abogado te llamará enseguida y que necesitas enviar $2,500 para la fianza de inmediato — con tarjetas de regalo o una transferencia bancaria.",
    },
    redFlags: {
      en: [
        "He asks you to send money by gift cards or wire transfer",
        "He pressures you to act right away and send money fast",
        "He begs you to keep it secret and not call his parents",
      ],
      es: [
        "Te pide que envíes dinero con tarjetas de regalo o transferencia bancaria",
        "Te presiona para que actúes de inmediato y envíes dinero rápido",
        "Te ruega que guardes el secreto y no llames a sus padres",
      ],
    },
    distractor: {
      en: "The caller sounds like he is crying or upset",
      es: "El llamante suena como si estuviera llorando o angustiado",
    },
    sageExplanation: {
      en: "This is the grandparent scam, and it works by scaring you before you can think. Two things give it away every time. First — real emergencies are not paid for with gift cards. No jail, lawyer, or hospital will ever ask for gift cards. Second — the scammer tells you to keep it secret so you won't call the one person who could stop you. So do exactly that: hang up and call your grandchild or their parents directly on a number you already have. You will almost always find your grandchild safe at home. When someone says 'don't tell anyone,' that is your signal to tell someone.",
      es: "Esta es la estafa del abuelo, y funciona asustándote antes de que puedas pensar. Dos cosas la delatan siempre. Primero — las emergencias reales no se pagan con tarjetas de regalo. Ninguna cárcel, abogado ni hospital pedirá jamás tarjetas de regalo. Segundo — el estafador te dice que guardes el secreto para que no llames a la única persona que podría detenerte. Así que haz exactamente eso: cuelga y llama a tu nieto o a sus padres directamente a un número que ya tengas. Casi siempre encontrarás a tu nieto sano y salvo en casa. Cuando alguien dice 'no le digas a nadie,' esa es tu señal para decírselo a alguien.",
    },
  },
];

// Always sort by displayOrder to guarantee stable gameplay and dropdown order
export const SORTED_SCAM_LEVELS = [...SCAM_LEVELS].sort((a, b) => a.displayOrder - b.displayOrder);