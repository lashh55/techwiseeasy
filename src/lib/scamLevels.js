// Spot the Scam — 5 Text Message levels, bilingual

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
        "Your SSN cannot be verified or updated by text",
      ],
      es: [
        "Solicita tu número de Seguro Social por mensaje de texto",
        "Medicare nunca te contacta de esta manera",
        "Tu número de Seguro Social no puede verificarse por mensaje",
      ],
    },
    sageExplanation: {
      en: "Medicare will NEVER ask for your Social Security number by text or phone. If you receive this, delete it immediately and call Medicare directly at 1-800-MEDICARE.",
      es: "Medicare NUNCA pedirá tu número de Seguro Social por mensaje o teléfono. Si recibes esto, elimínalo de inmediato y llama a Medicare directamente al 1-800-MEDICARE.",
    },
  },
];