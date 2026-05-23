import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    welcome_tagline: "Technology Made Simple. Safety Made Strong.",
    welcome_subtitle: "Your Digital Confidence Starts Here.",
    lets_get_started: "LET'S GET STARTED",
    meet_sage_speech: "Hello there! I'm Sage. I'm here to help you feel confident and safe with your phone and the internet. We'll go at your pace. There are no wrong answers — only learning moments. Ready?",
    im_ready_sage: "I'M READY, SAGE!",
    choose_device_title: "Let's match your instructions to your device",
    iphone: "iPhone",
    android_phone: "Android Phone",
    ipad: "iPad",
    android_tablet: "Android Tablet",
    thats_my_device: "THAT'S MY DEVICE →",
    change_in_settings: "You can always change this in your settings",
    text_size_title: "How would you like your text to look?",
    standard: "Standard",
    large: "Large",
    extra_large: "Extra Large",
    this_looks_good: "THIS LOOKS GOOD →",
    audio_title: "Would you like Sage to read everything aloud?",
    audio_yes: "YES — Read it all to me",
    audio_no: "NO — I prefer to read myself",
    got_it: "GOT IT →",
    zero_ads_title: "TechWiseEasy is ad-free. Always.",
    zero_ads_body: "No pop-ups. No tracking. No distractions. Just your safety.",
    i_love_that: "I LOVE THAT →",
    privacy_title: "Your Privacy Is Our Promise",
    privacy_body: "TechWiseEasy never collects your Social Security number, Medicare number, or any financial information. Ever.",
    privacy_subtext: "If any app, website, or person asks for this information unexpectedly — that is a red flag. Report it at reportfraud.ftc.gov",
    i_understand: "I UNDERSTAND — LET'S GO! →",
    avatar_title: "Make it yours — choose your look!",
    avatar_name_placeholder: "What should Sage call you?",
    this_is_me: "THIS IS ME! →",
    language_label: "Español",
    back: "Back",
  },
  es: {
    welcome_tagline: "Tecnología Simplificada. Seguridad Garantizada.",
    welcome_subtitle: "Tu Confianza Digital Comienza Aquí.",
    lets_get_started: "¡EMPECEMOS!",
    meet_sage_speech: "¡Hola! Soy Sage. Estoy aquí para ayudarte a sentirte segura y confiada con tu teléfono e internet. Iremos a tu ritmo. No hay respuestas incorrectas — solo momentos de aprendizaje. ¿Lista?",
    im_ready_sage: "¡ESTOY LISTA, SAGE!",
    choose_device_title: "Vamos a ajustar las instrucciones a tu dispositivo",
    iphone: "iPhone",
    android_phone: "Teléfono Android",
    ipad: "iPad",
    android_tablet: "Tableta Android",
    thats_my_device: "ESE ES MI DISPOSITIVO →",
    change_in_settings: "Siempre puedes cambiar esto en tu configuración",
    text_size_title: "¿Cómo te gustaría ver el texto?",
    standard: "Estándar",
    large: "Grande",
    extra_large: "Extra Grande",
    this_looks_good: "SE VE BIEN →",
    audio_title: "¿Te gustaría que Sage te lea todo en voz alta?",
    audio_yes: "SÍ — Léemelo todo",
    audio_no: "NO — Prefiero leer yo",
    got_it: "ENTENDIDO →",
    zero_ads_title: "TechWiseEasy no tiene anuncios. Nunca.",
    zero_ads_body: "Sin ventanas emergentes. Sin rastreo. Sin distracciones. Solo tu seguridad.",
    i_love_that: "¡ME ENCANTA! →",
    privacy_title: "Tu Privacidad Es Nuestra Promesa",
    privacy_body: "TechWiseEasy nunca recopila tu número de Seguro Social, número de Medicare, ni información financiera. Nunca.",
    privacy_subtext: "Si alguna aplicación, sitio web o persona te pide esta información inesperadamente — eso es una señal de alerta. Repórtalo en reportfraud.ftc.gov",
    i_understand: "ENTENDIDO — ¡VAMOS! →",
    avatar_title: "¡Hazlo tuyo — elige tu imagen!",
    avatar_name_placeholder: "¿Cómo debería llamarte Sage?",
    this_is_me: "¡ESTA SOY YO! →",
    language_label: "English",
    back: "Atrás",
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('twe_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('twe_lang', lang);
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;
  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'es' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}