import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Welcome
    welcome_tagline: "Technology Made Simple. Safety Made Strong.",
    welcome_subtitle: "Your Digital Confidence Starts Here.",
    lets_get_started: "LET'S GET STARTED",

    // Onboarding Screen 2 — Meet Sage
    meet_sage_speech: "Hello there! I'm Sage. I'm here to help you feel confident and safe with your phone and the internet. We'll go at your pace. There are no wrong answers — only learning moments. Ready?",
    im_ready_sage: "I'M READY, SAGE!",

    // Onboarding Screen 3 — Device
    choose_device_title: "Let's match your instructions to your device",
    iphone: "iPhone",
    android_phone: "Android Phone",
    ipad: "iPad",
    android_tablet: "Android Tablet",
    thats_my_device: "THAT'S MY DEVICE →",
    change_in_settings: "You can always change this in your settings",

    // Onboarding Screen 4 — Text Size
    text_size_title: "How would you like your text to look?",
    standard: "Standard",
    large: "Large",
    extra_large: "Extra Large",
    this_looks_good: "THIS LOOKS GOOD →",

    // Onboarding Screen 5 — Audio
    audio_title: "Would you like Sage to read everything aloud?",
    audio_yes: "YES — Read it all to me",
    audio_no: "NO — I prefer to read myself",
    got_it: "GOT IT →",

    // Onboarding Screen 6 — Zero Ads
    zero_ads_title: "TechWiseEasy is ad-free. Always.",
    zero_ads_body: "No pop-ups. No tracking. No distractions. Just your safety.",
    i_love_that: "I LOVE THAT →",

    // Onboarding Screen 7 — Privacy
    privacy_title: "Your Privacy Is Our Promise",
    privacy_body: "TechWiseEasy never collects your Social Security number, Medicare number, or any financial information. Ever.",
    privacy_subtext: "If any app, website, or person asks for this information unexpectedly — that is a red flag. Report it at reportfraud.ftc.gov",
    i_understand: "I UNDERSTAND — LET'S GO! →",

    // Onboarding Screen 8 — Avatar
    avatar_title: "Make it yours — choose your look!",
    avatar_name_placeholder: "What should Sage call you?",
    this_is_me: "THIS IS ME! →",

    // Language toggle
    language_label: "Español",
    back: "Back",

    // Home screen
    home_greeting: "Welcome back",
    home_subtitle: "What would you like to learn today?",
    wisdom_points: "Wisdom Points",
    daily_streak: "Day Streak",
    start_tutorial: "START TUTORIAL",
    play_spot_the_scam: "SPOT THE SCAM",
    play_password_power: "PASSWORD POWER",
    play_app_navigator: "APP NAVIGATOR",
    play_myth_vs_fact: "MYTH VS FACT",

    // Tutorial
    tutorial_title: "How TechWiseEasy Works",
    tutorial_next: "NEXT →",
    tutorial_finish: "LET'S PLAY! 🎉",
    tutorial_step1_title: "Tap to Answer",
    tutorial_step1_body: "Each question shows you choices. Just tap the one you think is right. There's no time pressure!",
    tutorial_step2_title: "Sage Guides You",
    tutorial_step2_body: "After every answer, Sage will explain what's right and why. You always learn something new.",
    tutorial_step3_title: "Earn Wisdom Points",
    tutorial_step3_body: "Every correct answer earns you Wisdom Points ⭐. Watch your score grow!",
    tutorial_step4_title: "Build Your Streak",
    tutorial_step4_body: "Play every day to build your streak 🔥. Streaks show your dedication!",
    tutorial_step5_title: "You're Safe Here",
    tutorial_step5_body: "Nothing you do here is wrong. Every mistake is a lesson. Sage is always cheering for you! 💜",

    // Milestones
    milestone_title: "You Earned a Badge! 🏅",
    milestone_dismiss: "AWESOME! →",
    badge_first_steps: "First Steps",
    badge_first_steps_desc: "Completed your first lesson",
    badge_streak_3: "3-Day Streak",
    badge_streak_3_desc: "Played 3 days in a row",
    badge_streak_7: "Week Warrior",
    badge_streak_7_desc: "Played 7 days in a row",
    badge_50_points: "Wise Beginner",
    badge_50_points_desc: "Earned 50 Wisdom Points",
    badge_100_points: "Digital Scholar",
    badge_100_points_desc: "Earned 100 Wisdom Points",
    badge_scam_buster: "Scam Buster",
    badge_scam_buster_desc: "Completed Spot the Scam",
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
    home_greeting: "Bienvenida de nuevo",
    home_subtitle: "¿Qué te gustaría aprender hoy?",
    wisdom_points: "Puntos de Sabiduría",
    daily_streak: "Días Seguidos",
    start_tutorial: "INICIAR TUTORIAL",
    play_spot_the_scam: "DETECTA EL FRAUDE",
    play_password_power: "PODER DE CONTRASEÑA",
    play_app_navigator: "NAVEGADOR DE APPS",
    play_myth_vs_fact: "MITO VS REALIDAD",
    tutorial_title: "Cómo Funciona TechWiseEasy",
    tutorial_next: "SIGUIENTE →",
    tutorial_finish: "¡A JUGAR! 🎉",
    tutorial_step1_title: "Toca para Responder",
    tutorial_step1_body: "Cada pregunta muestra opciones. ¡Solo toca la que crees que es correcta. ¡Sin presión de tiempo!",
    tutorial_step2_title: "Sage te Guía",
    tutorial_step2_body: "Después de cada respuesta, Sage explicará qué es correcto y por qué. ¡Siempre aprenderás algo nuevo!",
    tutorial_step3_title: "Gana Puntos de Sabiduría",
    tutorial_step3_body: "Cada respuesta correcta te da Puntos de Sabiduría ⭐. ¡Mira crecer tu puntuación!",
    tutorial_step4_title: "Construye tu Racha",
    tutorial_step4_body: "Juega cada día para construir tu racha 🔥. ¡Las rachas muestran tu dedicación!",
    tutorial_step5_title: "Estás Segura Aquí",
    tutorial_step5_body: "Nada de lo que hagas aquí está mal. Cada error es una lección. ¡Sage siempre te está animando! 💜",
    milestone_title: "¡Ganaste una Insignia! 🏅",
    milestone_dismiss: "¡GENIAL! →",
    badge_first_steps: "Primeros Pasos",
    badge_first_steps_desc: "Completaste tu primera lección",
    badge_streak_3: "Racha de 3 Días",
    badge_streak_3_desc: "Jugaste 3 días seguidos",
    badge_streak_7: "Guerrera Semanal",
    badge_streak_7_desc: "Jugaste 7 días seguidos",
    badge_50_points: "Principiante Sabia",
    badge_50_points_desc: "Ganaste 50 Puntos de Sabiduría",
    badge_100_points: "Estudiante Digital",
    badge_100_points_desc: "Ganaste 100 Puntos de Sabiduría",
    badge_scam_buster: "Cazadora de Fraudes",
    badge_scam_buster_desc: "Completaste Detecta el Fraude",
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