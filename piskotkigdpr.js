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
function piskotkiGDPR(_pi) {


  /**
    * Pridobitev domene strani iz URL naslova
    */
  domenaStrani = function() {
    if (window.location.hostname !== '') {
      return window.location.hostname;
    } else {
      return imeStrani;
    }
  };


  /**
    * Pridobitev piškotov in vrnitev rezultata vsebine piškotkov, če vsebine ni, podamo prazno vsebino
    */
  pridobi = function(ime) {
		if (document.cookie.length > 0) {
			var zacetek = document.cookie.indexOf(ime +'=');
			if (zacetek !== -1) {
				zacetek = zacetek + ime.length + 1;
				var konec = document.cookie.indexOf(';', zacetek);
				if (konec === -1) {
					konec = document.cookie.length;
				}
				return unescape(document.cookie.substring(zacetek, konec));
			}
		}
		return '';
  };
  

  /**
    * Nastavitev piškota glede na ('ime piškotka', 'vsebina piškotka', 'čas trajanja piškotka - glede na dan')
    */
  nastavi = function(ime, vsebina, cas) {
    var datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + cas);
    document.cookie = ime +'='+ escape(vsebina) + ((cas === null) ? '' : '; expires=' + datumPoteka.toUTCString()) +'; path=/;';
  };
 
  
  /**
    * Izbris piškotka
    */
	izbrisi = function(ime) {
    document.cookie = ime +'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = ime +'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.'+ domenaStrani().replace(/\s/g, '') +';';
	};
 
  
  /**
    * Če piškot obstaja, vrnemo "true" ali "false"
    */
	preglej = function(ime) {
		ime = pridobi(ime);
		if (ime !== null && ime !== '') {
			return true;
		} else {
			return false;
		}
  };
  

  /**
    * Potrditveno polje (checkboxes)
    */
  accepted = document.getElementById('accepted');
  social = document.getElementById('social');
  remarketing = document.getElementById('remarketing');


  /** 
    * HTML okno za piškotke
    */
  okno = document.createElement('div');
  zavesa = document.createElement('div');


  /**
    * HTML okno za piškotke
    */
  okno.innerHTML = '<a class="icon" href="https://piskotki-gdpr.pakt.si/"><svg fill="'+ _pi.barvaIkone +'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M494.6 255.9c-65.63-.8203-118.6-54.14-118.6-119.9c-65.74 0-119.1-52.97-119.8-118.6c-25.66-3.867-51.8 .2346-74.77 12.07L116.7 62.41C93.35 74.36 74.36 93.35 62.41 116.7L29.6 181.2c-11.95 23.44-16.17 49.92-12.07 75.94l11.37 71.48c4.102 25.9 16.29 49.8 34.81 68.32l51.36 51.39C133.6 466.9 157.3 479 183.2 483.1l71.84 11.37c25.9 4.101 52.27-.1172 75.59-11.95l64.81-33.05c23.32-11.84 42.31-30.82 54.14-54.14l32.93-64.57C494.3 307.7 498.5 281.4 494.6 255.9zM176 367.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S193.6 367.1 176 367.1zM208 208c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S225.6 208 208 208zM368 335.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S385.6 335.1 368 335.1z"/></svg></a><p><strong>'+ _pi.naslov +'</strong> '+ _pi.besedilo +' <a href="'+ _pi.povezavaPogoji +'">'+ _pi.imePovezavePogoji +'</a></p><a href="#" class="btn">'+ _pi.besediloGumba +'</a>';
  
  // Nastavitev ID
  okno.setAttribute('id', 'piskotki');
  zavesa.setAttribute('id', 'zavesa');

  // Nastavitev Class - Lokacija
  okno.classList.add(_pi.lokacija);

  // Če je animacija omogočena
  if (_pi.animacija === true) {
    okno.classList.add('bounce');
  }
  document.body.appendChild(okno);

  // Če je zavesa omogočena
  if (_pi.zavesa === true) {
    document.body.appendChild(zavesa);
  }

  /**
    * Odstranitev animacije (bounce)
    */
  setTimeout(function() {
    okno.classList.remove('bounce');
  }, 12000);


  /**
    * Piškot - cookie-notice-accepted
    */
  document.querySelector('#piskotki .btn').addEventListener('click', function(e) {
    e.preventDefault();
    nastavi('cookie-notice-accepted', 'true', _pi.trajanjePiskotka);
    nastavi('opt-in-social', 'true', _pi.trajanjePiskotka);
    nastavi('opt-in-remarketing', 'true', _pi.trajanjePiskotka);
    document.querySelector('#piskotki').style.display = 'none';

    // Če je zavesa omogočena
    if (_pi.zavesa === true) {
      document.querySelector('#zavesa').style.display = 'none';
    }

    // Osvežitev spletne strani
    setTimeout(function () {
      location.reload();
    }, 100);
  });


  /**
    * Piškot - opt-in-social
    */
  if (social) {
    if (social.addEventListener) {
      social.addEventListener('change', function(event) {
        if (event.target.checked) {
          nastavi('opt-in-social', 'true', _pi.trajanjePiskotka);
        } else {
          izbrisi('opt-in-social');
          izbrisi('VISITOR_INFO1_LIVE');
          izbrisi('LOGIN_INFO');
          izbrisi('YSC');
          izbrisi('GPS');
          izbrisi('xs');
          izbrisi('act');
          izbrisi('c_user');
          izbrisi('datr');
          izbrisi('dpr');
          izbrisi('pl');
          izbrisi('sb');
          izbrisi('wd');
          izbrisi('fr');
          izbrisi('presense');
          izbrisi('SID');
          izbrisi('OGPC');
        }
      }, false);
    }
  }


  /**
    * Piškot - opt-in-remarketing
    */
  if (remarketing) {
    if (remarketing.addEventListener) {
      remarketing.addEventListener('change', function(event) {
        if (event.target.checked) {
          nastavi('opt-in-remarketing', 'true', _pi.trajanjePiskotka);
        } else {
          izbrisi('opt-in-remarketing');
          izbrisi('NID');
          izbrisi('IDE');
          izbrisi('DSID');
          izbrisi('1P_JAR');
          izbrisi('APISID');
          izbrisi('HSID');
          izbrisi('SAPISID');
          izbrisi('SIDCC');
          izbrisi('SSID');
          izbrisi('CONSENT');
          izbrisi('DV');
          izbrisi('PREF');
          izbrisi('test_cookie');
        }
      }, false);
    }
  }


  /**
    * Če piškot - cookie-notice-accepted ni nastavljen, prikažemo okno
    */
  if (preglej('cookie-notice-accepted') !== true) {
    document.querySelector('#piskotki').style.display = 'block';
    
    // Če je zavesa omogočena
    if (_pi.zavesa === true) {
      document.querySelector('#zavesa').style.display = 'block';
    }
  }


  /**
    * Checkboxes
    */
  if (accepted) {
    if (preglej('cookie-notice-accepted') === true) {
      accepted.checked = true;
    }
  }

  if (social) {
    if (preglej('opt-in-social') === true) {
      social.checked = true;
    }
  }

  if (remarketing) {
    if (preglej('opt-in-remarketing') === true) {
      remarketing.checked = true;
    }
  }


  /**
    * Osnovno oblikovanje
    */
  document.getElementById('piskotki').style.background = _pi.barvaOzadja;
  document.getElementById('piskotki').style.boxShadow = _pi.sencaOkna;
  document.getElementById('piskotki').style.borderRadius = _pi.zaobljenostOkna;

  // Če je zavesa omogočena
  if (_pi.zavesa === true) {
    document.getElementById('zavesa').style.background = _pi.barvaZavese;
  }

  // Oblikovanje pisave
  var p = document.querySelectorAll('#piskotki p');
  var i;
  for (i = 0; i < p.length; i++) {
    p[i].style.cssText = 'color: '+ _pi.barvaPisave +'; font-size: '+ _pi.velikostPisave +';';
  }

  // Oblikovanje povezave
  var a = document.querySelectorAll('#piskotki a');
  var i;
  for (i = 0; i < a.length; i++) {
    a[i].style.cssText = 'color: '+ _pi.barvaPovezave +'; font-size: '+ _pi.velikostPovezave +';';
  }

  // Oblikovanje gumba
  document.querySelector('#piskotki .btn').style.cssText = 'background: '+ _pi.barvaGumba +'; color:'+ _pi.barvaGumbaPovezave +'; border-radius: '+ _pi.zaobljenostGumba +'; font-size: '+ _pi.velikostGumbaPovezave +';';


  // Avtomatska sprememba pogojev z imenom strani
  imeStrani = document.querySelectorAll('.ime-strani');
  var i;
  for (i = 0; i < imeStrani.length; i++) {
    imeStrani[i].innerHTML = domenaStrani();
    imeStrani[i].style.cssText = 'font-weight: bold;';
  }
} // piskotkiGDPR