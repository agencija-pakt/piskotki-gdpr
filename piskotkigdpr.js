/**
  Copyright (c) Agencija Pakt d.o.o.</strong> (vse pravice pridržane)

  Dovoljenje je brezplačno podeljeno vsaki osebi, ki prejme kopijo. Ta programska oprema in povezane datoteke, je treba obravnavati brez omejitev, vključno s pravicami do neomejene uporabe, kopiranja, spreminjanja, združevanja, objavljanja, distributiranja, licenciranja in/ali prodajanja programske opreme. Osebam, ki jim je programska oprema zagotovljena morajo upoštevati naslednje pogoje:
    
  Zgornje (copywrite) obvestilo in obvestilu o dovoljenju je potrebno vključiti v vse kopije programske opreme. Prav tako je obvezno pustiti vse povezave, ki vodijo do uradne spletne strani avtorja te programske opreme.
    
	PROGRAMSKA OPREMA JE PREDSTAVLJENA "KOT JE", BREZ KAKRŠNEGAKOLI JAMSTVA, IMPLICITNEGA ALI EKSPLICITNEGA. V NOBENEM PRIMERU AVTORJI, DOBAVITELJI IN DISTRIBUTERJI NE PREVZEMAMO NOBENE ODGOVORNOSTI O ŠKODI, IZGUBI DOBIČKA, PRIHODKOV ALI PODATKOV, FINANČNE IZGUBE IN DRUGIH ODGOVORNOSTI ALI POSREDNO, POSEBNO, POSLEDIČNO, EKSEMPLARIČNO ALI KAZNOVALNO ODŠKODNINO.

  Licenca MIT
*/


/**
  * Piskotki GDPR
  */
function piskotkiGDPR(e) {


  /**
    * Pridobitev domene strani iz URL naslova
    */
  const domena = () => {
    return window.location.hostname || imeStrani;
  };




  /**
    * Pridobitev piškotov in vrnitev rezultata vsebine piškotkov, če vsebine ni, podamo prazno vsebino
    */
  pridobi = (ime) => {
    const cookies = document.cookie.split(';')
      .map(cookie => cookie.trim())
      .reduce((cookieMap, cookie) => {
        const [name, value] = cookie.split('=');
        cookieMap[name] = decodeURIComponent(value);
        return cookieMap;
      }, {});
    
    return cookies[ime] || '';
  };
  

  /**
    * Nastavitev piškota glede na ('ime piškotka', 'vsebina piškotka', 'čas trajanja piškotka - glede na dan')
    */
  nastavi = (ime, vrednost, trajanje) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + trajanje);
    const cookie = `${ime}=${encodeURIComponent(vrednost)}${(trajanje ? `; expires=${expires.toUTCString()}` : '')}; path=/;`;
    document.cookie = cookie;
  };
 
  
  /**
    * Izbris piškotka
    */
  izbrisi = (ime) => {
    document.cookie = `${ime}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${ime}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domena().replace(/\s/g, '')};`;
  };
 
  
  /**
    * Če piškot obstaja, vrnemo "true" ali "false"
    */
  preglej = (ime) => {
    return !!pridobi(ime);
  };
  

  /**
    * Potrditveno polje (checkboxes)
    */
  const accepted = document.getElementById('accepted');
  const social = document.getElementById('social');
  const remarketing = document.getElementById('remarketing');


  /** 
    * HTML okno za piškotke
    */
  const okno = document.createElement('div');
  const zavesa = document.createElement('div');


  /**
    * HTML okno za piškotke
    */

  okno.innerHTML = `
    <p>
      <a class="icon" title="Piškotki GDPR" href="https://piskotki-gdpr.pakt.si/">
        <svg aria-label="Povezava do lastnika skripte (piškotki GDPR)" fill="${e.barvaIkone}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M494.6 255.9c-65.63-.8203-118.6-54.14-118.6-119.9c-65.74 0-119.1-52.97-119.8-118.6c-25.66-3.867-51.8 .2346-74.77 12.07L116.7 62.41C93.35 74.36 74.36 93.35 62.41 116.7L29.6 181.2c-11.95 23.44-16.17 49.92-12.07 75.94l11.37 71.48c4.102 25.9 16.29 49.8 34.81 68.32l51.36 51.39C133.6 466.9 157.3 479 183.2 483.1l71.84 11.37c25.9 4.101 52.27-.1172 75.59-11.95l64.81-33.05c23.32-11.84 42.31-30.82 54.14-54.14l32.93-64.57C494.3 307.7 498.5 281.4 494.6 255.9zM176 367.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S193.6 367.1 176 367.1zM208 208c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S225.6 208 208 208zM368 335.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S385.6 335.1 368 335.1z"/>
        </svg>
      </a> <strong>${e.naslov}</strong>
    </p>

    <p>${e.besedilo} <a href="${e.povezavaPogoji}">${e.imePovezavePogoji}</a></p>
    
    <a class="btn" href="#" title="Dovoli vse piškotke">${e.besediloGumba}</a> <a class="cancel" href="#" title="Dovoli samo nujne piškotke"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg></a>
  `;
  
  okno.setAttribute('id', 'piskotki');
  zavesa.setAttribute('id', 'zavesa');
  

  // Nastavitev Class - Lokacija
  okno.classList.add(e.lokacija);

  // Če je animacija omogočena
  if (e.animacija) {
    okno.classList.add('bounce');
  }
  document.body.appendChild(okno);

  // Če je zavesa omogočena
  if (e.zavesa) {
    document.body.appendChild(zavesa);
  }

  /**
    * Odstranitev animacije (bounce)
    */
  setTimeout(() => {
    okno.classList.remove('bounce');
  }, 12000);


  /**
    * Piškot - cookie-notice-accepted
    */
  document.querySelector('#piskotki .btn').addEventListener('click', (event) => {
    event.preventDefault();
    nastavi('cookie-notice-accepted', 'true', e.trajanjePiskotka);
    nastavi('opt-in-social', 'true', e.trajanjePiskotka);
    nastavi('opt-in-remarketing', 'true', e.trajanjePiskotka);
    document.querySelector('#piskotki').style.display = 'none';

    // Če je zavesa omogočena
    if (e.zavesa) {
      document.querySelector('#zavesa').style.display = 'none';
    }

    // Osvežitev spletne strani
    setTimeout(() => {
      location.reload();
    }, 100)
  });


  /**
    * Piškot - cookie-notice-accepted (cancel btn)
    */
  document.querySelector('#piskotki .cancel').addEventListener('click', (event) => {
    event.preventDefault();
    nastavi('cookie-notice-accepted', 'true', e.trajanjePiskotka);
    document.querySelector('#piskotki').style.display = 'none';

    // Če je zavesa omogočena
    if (e.zavesa) {
      document.querySelector('#zavesa').style.display = 'none';
    }

    // Osvežitev spletne strani
    setTimeout(() => {
      location.reload();
    }, 100)
  });


  /**
    * Piškot - opt-in-social
    */
  if (social && social.addEventListener) {
    social.addEventListener('change', (event) => {
      if (event.target.checked) {
        nastavi('opt-in-social', 'true', e.trajanjePiskotka);
      } else {
        izbrisi('opt-in-social');
        // Izbris drugih piškotkov povezanih s družbenimi omrežji
        //
      }
    }, false);
  }


  /**
    * Piškot - opt-in-remarketing
    */
  if (remarketing && remarketing.addEventListener) {
    remarketing.addEventListener('change', (event) => {
      if (event.target.checked) {
        nastavi('opt-in-remarketing', 'true', e.trajanjePiskotka);
      } else {
        izbrisi('opt-in-remarketing');
        // Izbris drugih remarketing piškotkov
        //
      }
    }, false);
  }


  /**
    * Če piškot - cookie-notice-accepted ni nastavljen, prikažemo okno
    */
  if (!preglej('cookie-notice-accepted')) {
    document.querySelector('#piskotki').style.display = 'block';

    if (e.zavesa) {
      document.querySelector('#zavesa').style.display = 'block';
    }
  }


  /**
    * Checkboxes
    */
  if (accepted && preglej('cookie-notice-accepted')) {
    accepted.checked = true;
  }

  if (social && preglej('opt-in-social')) {
    social.checked = true;
  }

  if (remarketing && preglej('opt-in-remarketing')) {
    remarketing.checked = true;
  }


  /**
    * Osnovno oblikovanje
    */
  document.getElementById('piskotki').style.background = e.barvaOzadja;
  document.getElementById('piskotki').style.boxShadow = e.sencaOkna;
  document.getElementById('piskotki').style.borderRadius = e.zaobljenostOkna;

  // Oblikovanje pisave
  const pisave = document.querySelectorAll('#piskotki p');
  for (let i = 0; i < pisave.length; i++) {
    pisave[i].style.color = e.barvaPisave;
    pisave[i].style.fontSize = e.velikostPisave;
  }

  // Oblikovanje povezave
  const povezave = document.querySelectorAll('#piskotki a');
  for (let i = 0; i < povezave.length; i++) {
    povezave[i].style.color = e.barvaPovezave;
    povezave[i].style.fontSize = e.velikostPovezave;
  }

  // Oblikovanje gumba
  document.querySelector('#piskotki .btn').style.background = e.barvaGumba;
  document.querySelector('#piskotki .btn').style.color = e.barvaGumbaPovezave;
  document.querySelector('#piskotki .btn').style.borderRadius = e.zaobljenostGumba;
  document.querySelector('#piskotki .btn').style.fontSize = e.velikostGumbaPovezave;

  document.querySelector('#piskotki .cancel').style.borderColor = e.barvaPisave;
  document.querySelector('#piskotki .cancel svg').style.fill = e.barvaPisave;

  // Avtomatska sprememba pogojev z imenom strani
  const imeStrani = document.querySelectorAll('.ime-strani');
  for (let i = 0; i < imeStrani.length; i++) {
    imeStrani[i].innerHTML = domena();
    imeStrani[i].style.fontWeight = 'bold';
  }
} // piskotkiGDPR