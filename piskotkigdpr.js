/**
KONČNI UPORABNIŠKI LICENČNI SPORAZUM (EULA) ZA vtičnik: piskotkiGDPR

Ta končni uporabniški licenčni sporazum ("Sporazum") predstavlja pravni dogovor med vami, končnim uporabnikom, in Agencijo Pakt d.o.o. ("Razvijalec"), v zvezi z uporabo vtičnika piskotkiGDPR ("Vtičnik"). Z namestitvijo, kopiranjem ali drugačno uporabo vtičnika se strinjate, da boste zavezani pogojem tega sporazuma. Če se s pogoji ne strinjate, vtičnika ne smete namestiti ali uporabljati.

1. Podelitev licence

Razvijalec vam podeljuje omejeno, neekskluzivno, neprenosljivo licenco za namestitev in uporabo vtičnika na eni (1) spletni strani. Ta licenca izrecno prepoveduje preprodajo, razdeljevanje ali dajanje vtičnika na voljo kateri koli tretji osebi, razen če je to izrecno dovoljeno s tem sporazumom.

2. Omejitve uporabe

Razen kot je izrecno dovoljeno s tem sporazumom ali z zakonom, ne smete modificirati, kopirati, razstavljati, obratno inženirati, dekompilirati ali ustvarjati izpeljanih del na podlagi vtičnika ali katerega koli njegovega dela.

3. Avtorske pravice in lastništvo

Vtičnik, vključno z vso pripadajočo programsko kodo, dokumentacijo in drugimi materiali, je zaščiten z avtorskimi pravicami in drugimi zakoni o intelektualni lastnini pod zaščito EU in Republike Slovenije. Razvijalec ohranja vse pravice, ki niso izrecno podeljene v tem sporazumu.

4. Nadgradnje

Razvijalec lahko, a ni dolžan, ponudi nadgradnje ali posodobitve za vtičnik. Vse nadgradnje ali posodobitve bodo urejene s pogoji tega sporazuma, razen če je za posamezno nadgradnjo ali posodobitev naveden drugačen licenčni sporazum.

5. Preklic licence

Če ne upoštevate pogojev tega sporazuma, se vam lahko licenca za uporabo vtičnika avtomatsko prekliče brez obvestila s strani razvijalca.

6. Vračilo

V skladu z zakonodajo EU in Republike Slovenije imate pravico do odstopa od nakupa brez navedbe razloga v roku 14 dni od dneva nakupa, pod pogojem, da vtičnika niste namestili ali uporabili. Zahtevke za vračilo obravnavamo v skladu z veljavnimi zakoni o varstvu potrošnikov.

7. Skladnost z GDPR in ZVOP-1/ZVOP-2

Uporabnik vtičnika sam zagotavlja, da je spletno mesto v skladu z veljavnimi predpisi o varstvu podatkov, vključno z Splošno uredbo EU o varstvu podatkov (GDPR), Zakonom o varstvu osebnih podatkov (ZVOP-1) in morebitnimi naslednjimi spremembami ali nadomestnimi zakoni (ZVOP-2), ter je odgovornost za pravilno uporabo vtičnika v skladu z omenjenimi predpisi na strani uporabnika. Razvijalec ne prevzema odgovornosti za kakršno koli uporabo vtičnika.

8. Omejitev odgovornosti

Razvijalec ne prevzema nikakršne odgovornosti za morebitno škodo ali izgubo podatkov, ki izhaja iz uporabe ali nezmožnosti uporabe vtičnika. Poleg tega uporabnik vtičnika prevzema vso odgovornost v primeru kakršnih koli pravnih sporov, ki izhajajo iz uporabe vtičnika, vključno z, a ne omejeno na, vprašanja skladnosti z zakonodajo o varstvu podatkov ali intelektualne lastnine. Razvijalec vtičnika je izrecno oproščen kakršne koli odgovornosti v zvezi s pravnimi spori, ki bi lahko nastali v povezavi z uporabo vtičnika. Uporabnik se strinja, da bo branil, nadomestil škodo in razbremenil razvijalca od vseh obveznosti, škod, stroškov in izdatkov (vključno z, vendar ne omejeno na, odvetniške honorarje), ki izhajajo iz kakršnih koli zahtevkov, tožb ali drugih postopkov, ki izhajajo iz uporabe vtičnika, kršitve tega sporazuma ali kršitve katere koli pravice tretjih oseb.


Z namestitvijo ali uporabo vtičnika se izrecno strinjate z zgornjimi pogoji.

AGENCIJA PAKT d.o.o.
Pod hrasti 29, Poslovna cona Žeje pri Komendi, 1218 Komenda
Matična številka: 834747600
*/


/**
  * Piskotki GDPR https://www.digitalocean.com/community/tools/minify
  */
function piskotkiGDPR(e) {
  // Sinhronizira stanje checkboxov med različnimi instancami (npr. popup in stran)
  const synchronizeCheckboxPairs = (sourceId) => {
    const suffix = sourceId.includes('-popup') ? '-popup' : '-site';
    const targetSuffix = suffix === '-popup' ? '-site' : '-popup';
    const targetId = sourceId.replace(suffix, targetSuffix);

    const sourceCheckbox = document.getElementById(sourceId);
    const targetCheckbox = document.getElementById(targetId);

    if (targetCheckbox && sourceCheckbox) {
      targetCheckbox.checked = sourceCheckbox.checked;
    }
  };


  /**
    * Omogočanje ročno dodanih skript glede na soglasja
    */
  const activateScriptsBasedOnConsent = () => {
    const scripts = document.querySelectorAll('script[type="text/plain"][data-cookieconsent]');
    const consentMode = JSON.parse(localStorage.getItem('consentMode') || '{}');

    const consentMapping = {
      'marketing': ['ad_personalization', 'ad_storage'],
      'analytics': ['analytics_storage'],
      'necessary': ['functionality_storage', 'security_storage'],
      'preferences': ['personalization', 'preferences_storage'],
      'aduserdata': ['ad_user_data']
    };

    scripts.forEach((script) => {
      const dataConsent = script.getAttribute('data-cookieconsent');
      const relatedConsents = consentMapping[dataConsent] || [];
      const isGranted = relatedConsents.every(consent => consentMode[consent] === 'granted');

      if (isGranted) {
        const activeScript = document.createElement('script');
        activeScript.text = script.text;
        document.body.appendChild(activeScript);
        script.setAttribute('type', 'executed');
      }
    });
  };


  /**
    * Posodobi stanje checkboxov glede na shranjena soglasja v LocalStorage
    */
  const updateCheckboxStates = (consentMode) => {
    const idMap = {
      'functionality_storage': ['piskotki-gdpr-necessary-site', 'piskotki-gdpr-necessary-popup'],
      'security_storage': ['piskotki-gdpr-necessary-site', 'piskotki-gdpr-necessary-popup'],
      'analytics_storage': ['piskotki-gdpr-analytics-site', 'piskotki-gdpr-analytics-popup'],
      'preferences_storage': ['piskotki-gdpr-preferences-site', 'piskotki-gdpr-preferences-popup'],
      'ad_storage': ['piskotki-gdpr-marketing-site', 'piskotki-gdpr-marketing-popup'],
      'personalization': ['piskotki-gdpr-preferences-site', 'piskotki-gdpr-preferences-popup'],
      'ad_personalization': ['piskotki-gdpr-marketing-site', 'piskotki-gdpr-marketing-popup'],
      'ad_user_data': ['piskotki-gdpr-aduserdata-site', 'piskotki-gdpr-aduserdata-popup'],
    };

    Object.entries(idMap).forEach(([consentType, ids]) => {
      const isGranted = consentMode[consentType] === 'granted';
      ids.forEach((id) => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = isGranted;

          const slider = checkbox.nextElementSibling;
          if (slider) {
            slider.style.backgroundColor = isGranted ? e.slider_on_color : e.slider_off_color;
          }
        }
      });
    });
  };

  
  /**
    * Pridobi podatke iz LocalStorage in posodobi Checkboxe
    */
  const syncUIWithConsents = () => {
    const consentMode = JSON.parse(localStorage.getItem('consentMode') || '{}');
    updateCheckboxStates(consentMode);

    activateScriptsBasedOnConsent();
  };


  /**
    * Sprejme in shrani uporabnikova soglasja v LocalStorage
    */
  const setConsent = (consent) => {
    const consentMode = {
      'functionality_storage': consent.necessary ? 'granted' : 'denied',
      'security_storage': consent.necessary ? 'granted' : 'denied',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'preferences_storage': consent.preferences ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'personalization': consent.preferences ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.aduserdata ? 'granted' : 'denied',
    };

    if (typeof window.gtag === "function") {
      gtag('consent', 'update', consentMode);
    }

    localStorage.setItem('consentMode', JSON.stringify(consentMode));
    updateCheckboxStates(consentMode);

    activateScriptsBasedOnConsent();

    // Skrijemo zaveso, če je omogočena
    if (e.backdrop) {
      document.getElementById('piskotki-gdpr-zavesa').style.display = 'none';
    }
  }


  /**
    * Dodaja poslušalce dogodkov za spremembo stanja checkboxov
    */
  const addFormListeners = () => {
    document.body.addEventListener('change', (event) => {
      if (event.target.closest('.piskotki-gdpr-form-container') && event.target.type === 'checkbox') {
        const sourceId = event.target.id;
        const isChecked = event.target.checked;

        const consentTypeMap = {
          'analytics': ['piskotki-gdpr-analytics-site', 'piskotki-gdpr-analytics-popup'],
          'preferences': ['piskotki-gdpr-preferences-site', 'piskotki-gdpr-preferences-popup'],
          'marketing': ['piskotki-gdpr-marketing-site', 'piskotki-gdpr-marketing-popup'],
          'aduserdata': ['piskotki-gdpr-aduserdata-site', 'piskotki-gdpr-aduserdata-popup']
        };

        Object.entries(consentTypeMap).forEach(([key, value]) => {
          if (value.includes(sourceId)) {
            const consent = {
              necessary: true, // Obvezni piškotki so vedno odobreni
              analytics: document.getElementById('piskotki-gdpr-analytics-site')?.checked || document.getElementById('piskotki-gdpr-analytics-popup')?.checked,
              preferences: document.getElementById('piskotki-gdpr-preferences-site')?.checked || document.getElementById('piskotki-gdpr-preferences-popup')?.checked,
              marketing: document.getElementById('piskotki-gdpr-marketing-site')?.checked || document.getElementById('piskotki-gdpr-marketing-popup')?.checked,
              aduserdata: document.getElementById('piskotki-gdpr-aduserdata-site')?.checked || document.getElementById('piskotki-gdpr-aduserdata-popup')?.checked
            };
            consent[key] = isChecked; // Posodobi samo spremenjeno vrsto
            synchronizeCheckboxPairs(sourceId);
            setConsent(consent);
          }
        });

        const anyChecked = Object.values(consentTypeMap).flat().some(id => document.getElementById(id)?.checked);
        const dynBtn = document.querySelector('.piskotki-gdpr-btn span');
        dynBtn.textContent = anyChecked ? e.edit_view_main_btn_name : e.main_btn_name;
        dynBtn.title = anyChecked ? e.edit_view_main_btn_title : e.main_btn_title;
      }
    });
  };


  /**
    * Preveri, ali uporabnik že ima shranjena soglasja
    */
  const hasConsent = () => !!localStorage.getItem('consentMode');
  if (!hasConsent()) {


    /**
      * HTML okno za piškotke
      */
    const modal = document.createElement('div');
    const backdrop = document.createElement('div');


    /**
      * HTML okno za piškotke
      */
    modal.innerHTML = `
      <p class="piskotki-gdpr-title">
        <a class="piskotki-gdpr-icon" title="Piškotki GDPR" href="https://piskotki-gdpr.pakt.si/">
          <svg aria-label="Piškotki GDPR" fill="${e.icon_color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M494.6 255.9c-65.63-.8203-118.6-54.14-118.6-119.9c-65.74 0-119.1-52.97-119.8-118.6c-25.66-3.867-51.8 .2346-74.77 12.07L116.7 62.41C93.35 74.36 74.36 93.35 62.41 116.7L29.6 181.2c-11.95 23.44-16.17 49.92-12.07 75.94l11.37 71.48c4.102 25.9 16.29 49.8 34.81 68.32l51.36 51.39C133.6 466.9 157.3 479 183.2 483.1l71.84 11.37c25.9 4.101 52.27-.1172 75.59-11.95l64.81-33.05c23.32-11.84 42.31-30.82 54.14-54.14l32.93-64.57C494.3 307.7 498.5 281.4 494.6 255.9zM176 367.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S193.6 367.1 176 367.1zM208 208c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S225.6 208 208 208zM368 335.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S385.6 335.1 368 335.1z"/>
          </svg>
        </a> <span>${e.title_txt}</span>
      </p>

      <p class="piskotki-gdpr-main-text">${e.txt}</p>

      <div class="piskotki-gdpr-form-container piskotki-gdpr-input piskotki-gdpr-flex" style="display: none;">
        <div class="piskotki-gdpr-flex-inside">
          <p>${e.slider_txt_necessary}</p>
          <div class="right">
            <label class="piskotki-gdpr-switch" for="piskotki-gdpr-necessary-popup">
              <input type="checkbox" id="piskotki-gdpr-necessary-popup" disabled checked>
              <div class="piskotki-gdpr-slider piskotki-gdpr-round piskotki-gdpr-disabled"></div>
            </label>
          </div>
        </div>

        <div class="piskotki-gdpr-flex-inside">
          <p>${e.slider_txt_analytics}</p>
          <div class="right">
            <label class="piskotki-gdpr-switch" for="piskotki-gdpr-analytics-popup">
              <input type="checkbox" id="piskotki-gdpr-analytics-popup">
              <div class="piskotki-gdpr-slider piskotki-gdpr-round"></div>
            </label>
          </div>
        </div>

        <div class="piskotki-gdpr-flex-inside">
          <p>${e.slider_txt_preferences}</p>
          <div class="right">
            <label class="piskotki-gdpr-switch" for="piskotki-gdpr-preferences-popup">
              <input type="checkbox" id="piskotki-gdpr-preferences-popup">
              <div class="piskotki-gdpr-slider piskotki-gdpr-round"></div>
            </label>
          </div>
        </div>

        <div class="piskotki-gdpr-flex-inside">
          <p>${e.slider_txt_marketing}</p>
          <div class="right">
            <label class="piskotki-gdpr-switch" for="piskotki-gdpr-marketing-popup">
              <input type="checkbox" id="piskotki-gdpr-marketing-popup">
              <div class="piskotki-gdpr-slider piskotki-gdpr-round"></div>
            </label>
          </div>
        </div>

        <div class="piskotki-gdpr-flex-inside">
          <p>${e.slider_txt_ad_user_data}</p>
          <div class="right">
            <label class="piskotki-gdpr-switch" for="piskotki-gdpr-aduserdata-popup">
              <input type="checkbox" id="piskotki-gdpr-aduserdata-popup">
              <div class="piskotki-gdpr-slider piskotki-gdpr-round"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div class="piskotki-gdpr-center">
        <a class="piskotki-gdpr-btn-sec piskotki-gdpr-cancel" href="#" title="${e.reject_btn_title}">${e.reject_btn_name}</a> <a class="piskotki-gdpr-btn" href="#" title="${e.main_btn_title}"><?xml version="1.0" encoding="utf-8"?><svg version="1.1" fill="${e.main_btn_icon_color}" width="${e.main_btn_icon_size}" height="${e.main_btn_icon_size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.877px" height="101.052px" viewBox="0 0 122.877 101.052" enable-background="new 0 0 122.877 101.052" xml:space="preserve"><g><path d="M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z"/></g></svg> <span>${e.main_btn_name}</span></a> <a class="piskotki-gdpr-btn-sec piskotki-gdpr-settings" title="${e.edit_btn_title}" href="#">${e.edit_btn_name}</a>
      </div>
    `;
  
    // Dodelitev ID
    modal.setAttribute('id', 'piskotki-gdpr');
    backdrop.setAttribute('id', 'piskotki-gdpr-zavesa');
  
    // Dodelitev Class - Lokacija
    modal.classList.add('piskotki-gdpr-'+ e.window_position);

    // Če je animacija omogočena
    if (e.window_animation) {
      modal.classList.add('piskotki-gdpr-bounce');

      // Odstranitev animacije (bounce)
      setTimeout(() => {
        modal.classList.remove('bounce');
      }, 12000);
    }
    document.body.appendChild(modal);
    const mainWindow = document.getElementById('piskotki-gdpr');


    /**
      * Osnovno oblikovanje
      */
    mainWindow.style.background = e.window_background;
    mainWindow.style.boxShadow = e.window_shadow;
    mainWindow.style.borderRadius = e.window_radius;

    document.querySelector('.piskotki-gdpr-title span').style.fontSize = e.title_font_size;

    // Oblikovanje pisave
    const pisave = document.querySelectorAll('#piskotki-gdpr p, #piskotki-gdpr label');
    for (let i = 0; i < pisave.length; i++) {
      pisave[i].style.color = e.font_color;
      pisave[i].style.fontSize = e.font_size;
    }

    // Oblikovanje drugo-razrednih gumbov
    const secbtn = document.querySelectorAll('a.piskotki-gdpr-btn-sec');
    for (let i = 0; i < secbtn.length; i++) {
      secbtn[i].style.color = e.sec_btn_color;
      secbtn[i].style.borderColor = e.sec_btn_border_color;
      secbtn[i].style.borderStyle = e.sec_btn_border_style;
      secbtn[i].style.borderRadius = e.sec_btn_radius;
      secbtn[i].style.fontSize = e.sec_btn_font_size;
    }

    // Oblikovanje gumba
    document.querySelector('.piskotki-gdpr-btn').style.background = e.main_btn_color;
    document.querySelector('.piskotki-gdpr-btn').style.color = e.main_btn_link_color;
    document.querySelector('.piskotki-gdpr-btn').style.borderRadius = e.main_btn_radius;
    document.querySelector('.piskotki-gdpr-btn').style.fontSize = e.main_btn_font_size;
    document.querySelector('.piskotki-gdpr-btn').style.textTransform = e.oblikaGumbaPovezave;

    // Oblikovanje prikaza soglasij
    const border = document.querySelectorAll('.piskotki-gdpr-flex-inside');
    for (let i = 0; i < border.length; i++) {
      border[i].style.borderColor = e.edit_view_border_color;
      border[i].style.borderStyle = e.edit_view_border_style;
    }


    /**
      * Prikaz okna 
      */
    const consentBanner = mainWindow;
    if (consentBanner) {
      consentBanner.style.display = 'block';

      // Če je zavesa omogočena
      if (e.backdrop) {
        const backdrop = document.getElementById('piskotki-gdpr-zavesa') || document.createElement('div');
        backdrop.setAttribute('id', 'piskotki-gdpr-zavesa');
        document.body.appendChild(backdrop); // Zavesa
        backdrop.style.display = 'block';
        
        if (e.backdrop_background) {
          backdrop.style.background = e.backdrop_background;
        }
      }


      /**
        * Sprejeto soglasje
        */
      document.querySelector('.piskotki-gdpr-btn')?.addEventListener('click', (event) => {
        event.preventDefault(); // Preprečitev osvežitve strani ali skoka na vrh
        
        const analytics = document.getElementById('piskotki-gdpr-analytics-popup')?.checked || false;
        const preferences = document.getElementById('piskotki-gdpr-preferences-popup')?.checked || false;
        const marketing = document.getElementById('piskotki-gdpr-marketing-popup')?.checked || false;
        const aduserdata = document.getElementById('piskotki-gdpr-aduserdata-popup')?.checked || false;

        // Če so vsi specifični piškotki označeni, uporabi te izbire, sicer predpostavi sprejetje vseh
        if (analytics || preferences || marketing || aduserdata) {
          setConsent({
            necessary: true,
            analytics: analytics,
            preferences: preferences,
            marketing: marketing,
            aduserdata: aduserdata,
          });
        } else {
          setConsent({
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true,
            aduserdata: true,
          });
        }

        // Skrij okno
        const consentBanner = mainWindow;
        if (consentBanner) {
          fadeOutEffect();
        }
      });


      /**
        * Funkcija za postopno izginjanje
        */
      function fadeOutEffect() {
        const fadeEffect = setInterval(function () {
          if (!consentBanner.style.opacity) {
            consentBanner.style.opacity = 1;
          }
          if (consentBanner.style.opacity > 0) {
            consentBanner.style.opacity -= 0.1;
          } else {
            clearInterval(fadeEffect);
            consentBanner.style.display = 'none';
          }
        }, 65);
      }


      /**
        * Urejanje dovolenj
        */
      document.querySelector('.piskotki-gdpr-settings').addEventListener('click', function(x) {
        x.preventDefault();

        const settings = document.querySelector('.piskotki-gdpr-flex');
        const text = document.querySelector('.piskotki-gdpr-main-text');
        const title = document.querySelector('.piskotki-gdpr-title span');
        const btnSettings = document.querySelector('.piskotki-gdpr-settings');
        if (settings.style.display === 'none') {
          settings.style.display = 'flex';
          text.style.display = 'none';
          title.textContent = e.edit_txt + ' - ' + e.site_name;
          btnSettings.textContent = e.edit_btn_name_back;
          btnSettings.title = e.edit_btn_name_back;
        } else {
          settings.style.display = 'none';
          text.style.display = 'block';
          title.textContent = e.title_txt;
          btnSettings.textContent = e.edit_btn_name;
          btnSettings.title = e.edit_btn_title;
        }
      });


      /**
        * Nesprejeto soglasje
        */
      document.querySelector('.piskotki-gdpr-cancel')?.addEventListener('click', (event) => {
        event.preventDefault(); // Preprečitev osvežitve strani ali skoka na vrh

        setConsent({
          necessary: true,
          analytics: false,
          preferences: false,
          marketing: false,
          aduserdata: false,
        });

        // Skrij okno
        const consentBanner = mainWindow;
        if (consentBanner) {
          fadeOutEffect();
        }
      });
    }
  }


  /**
    * Takoj ko se stran naloži, preverite soglasja in posodobite UI
    */
  addFormListeners(); // Poslušalci za checkboxe
  syncUIWithConsents(); // Sinhronizacija stanja soglasja


  // Sliders - Oblikovanje
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const isChecked = checkbox.checked;
    const slider = checkbox.nextElementSibling;
    if (slider) slider.style.backgroundColor = isChecked ? e.slider_on_color : e.slider_off_color;
  });
  let popup = document.querySelector('#piskotki-gdpr-necessary-popup');
  if (popup) {
    popup.nextElementSibling.style.backgroundColor = e.slider_on_color;
  }
  let site = document.querySelector('#piskotki-gdpr-necessary-site');
  if (site) {
    site.nextElementSibling.style.backgroundColor = e.slider_on_color;
  }


  /**
    * Avtomatska sprememba pogojev z imenom strani
    */
  const siteName = document.querySelectorAll('.ime-strani');
  const domain = () => window.location.hostname || e.site_name;

  for (let i = 0; i < siteName.length; i++) {
    siteName[i].innerHTML = domain();
    siteName[i].style.fontWeight = 'bold';
  }
} // piskotkiGDPR