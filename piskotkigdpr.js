/*
  Copyright (c) Agencija Pakt d.o.o.</strong> (vse pravice pridržane)

  Dovoljenje je brezplačno podeljeno vsaki osebi, ki prejme kopijo. Ta programska oprema in povezane datoteke, je treba obravnavati brez omejitev, vključno s pravicami do neomejene uporabe, kopiranja, spreminjanja, združevanja, objavljanja, distributiranja, licenciranja in/ali prodajanja programske opreme. Osebam, ki jim je programska oprema zagotovljena morajo upoštevati naslednje pogoje:
    
  Zgornje (copywrite) obvestilo in obvestilu o dovoljenju je potrebno vključiti v vse kopije programske opreme. Prav tako je obvezno pustiti vse povezave, ki vodijo do uradne spletne strani avtorja te programske opreme.
    
	PROGRAMSKA OPREMA JE PREDSTAVLJENA "KOT JE", BREZ KAKRŠNEGAKOLI JAMSTVA, IMPLICITNEGA ALI EKSPLICITNEGA. V NOBENEM PRIMERU AVTORJI, DOBAVITELJI IN DISTRIBUTERJI NE PREVZEMAMO NOBENE ODGOVORNOSTI O ŠKODI, IZGUBI DOBIČKA, PRIHODKOV ALI PODATKOV, FINANČNE IZGUBE IN DRUGIH ODGOVORNOSTI ALI POSREDNO, POSEBNO, POSLEDIČNO, EKSEMPLARIČNO ALI KAZNOVALNO ODŠKODNINO.

  Licenca MIT
*/

/* Piskotki GDPR */
var piskotkiGDPR = {

  /* -------------------- NASTAVITVE -------------------- */


  sencaOkna             : '0 10px 20px 0 rgba(0, 0, 0, 0.15)',
  barvaOzadja           : 'rgba(0,0,0,.8)',
  animacija             : true,

  imeStrani             : 'Ta spletna stran',
  trajanjePiskotka      : 30, // V dnevih

  barvaPisave           : 'white',
  velikostPisave        : '14px',

  naslov                : 'Spletno mesto uporablja piškotke.',
  barvaNaslova          : 'white',
  velikostNaslova       : '16px',

  besediloEna           : 'Z njimi zagotavljamo spletno storitev, analizo uporabe, oglasnih sistemov in funkcionalnosti, ki jih brez piškotkov ne bi mogli nuditi.',
  besediloDva           : 'Z nadaljnjo uporabo spletnega mesta soglašate s piškotki.',

  barvaPovezave         : 'white',
  imePovezavePogoji     : 'Več o možnih nastavitvah piškotkov.',
  povezavaPogoji        : '/piskotki/',
  velikostPovezave      : '14px',

  besediloGumba         : 'V redu',
  barvaGumba            : '#1be195',
  barvaGumbaPovezave    : 'white',
  velikostGumbaPovezave : '16px',
  zaobljenostGumba      : '0',

  

  /* -------------------- NE UREJAJ NAPREJ --------------------


  /* Pridobitev domene strani iz URL naslova */
  domenaStrani: function() {
    if (window.location.hostname !== '') {
      return window.location.hostname;
    } else {
      return piskotkiGDPR.imeStrani;
    }
  },

  /* Pridobitev piškotov in vrnitev rezultata vsebine piškotkov, če vsebine ni podamo prazno vsebino */
	pridobi: function(ime) {
		if (document.cookie.length > 0) {
			var zacetek = document.cookie.indexOf(ime + '=');
			if (zacetek != -1) {
				zacetek = zacetek + ime.length + 1;
				var konec = document.cookie.indexOf(';', zacetek);
				if (konec == -1) {
					konec = document.cookie.length;
				}
				return unescape(document.cookie.substring(zacetek, konec));
			}
		}
		return '';
	},
 
  /* Nastavitev piškota glede na ('ime piškotka', 'vsebina piškotka', 'čas trajanja piškotka - glede na dan') */
	nastavi: function(ime, vsebina, cas) {
		var datumPoteka = new Date();
		datumPoteka.setDate(datumPoteka.setDate() + cas);
    document.cookie = ime + '=' + escape(vsebina) + ((cas == null) ? '' : '; expires=' + datumPoteka.toUTCString()) + '; path=/;';
  },
  
	izbrisi: function(ime) {
    document.cookie = ime + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = ime + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.'+ piskotkiGDPR.domenaStrani().replace(/\s/g, '') +';';
	},
 
  /* Če piškot obstaja, vrnemo "true" ali "false" */
	preglej: function(ime) {
		ime = piskotkiGDPR.pridobi(ime);
		if (ime != null && ime != '') {
			return true;
		} else {
			return false;
		}
  },
  
  /* Potrditveno polje (checkboxes) */
  accepted: document.getElementById('accepted'),
  social: document.getElementById('social'),
  remarketing: document.getElementById('remarketing'),

  /* HTML okno za piškotke */
  okno: document.createElement('div')
};


/* HTML okno za piškotke */
piskotkiGDPR.okno.innerHTML = '<p><a class="icon" href="https://piskotki-gdpr.pakt.si/"><img src="https://piskotki-gdpr.pakt.si/favicon.ico"></a><h1>' + piskotkiGDPR.naslov + '</h1></p>' + '<p>' + piskotkiGDPR.besediloEna + '</p>' + '<p>' + piskotkiGDPR.besediloDva + '</p>' + '<p><a href="' + piskotkiGDPR.povezavaPogoji + '">' + piskotkiGDPR.imePovezavePogoji + '</a></p>' + '<p><a href="#" class="btn">' + piskotkiGDPR.besediloGumba + '</a></p>';
piskotkiGDPR.okno.setAttribute('id', 'piskotki');
if (piskotkiGDPR.animacija === true) {
  piskotkiGDPR.okno.setAttribute('class', 'bounce');
}
document.body.appendChild(piskotkiGDPR.okno);

/* Odstranitev animacije (bounce) */
setTimeout(function() {
  piskotkiGDPR.okno.classList.remove('bounce');
}, 12000);


/* Piškot - cookie-notice-accepted */
document.querySelector("#piskotki .btn").addEventListener('click', function(e) {
  e.preventDefault();
  piskotkiGDPR.nastavi('cookie-notice-accepted', 'true', piskotkiGDPR.trajanjePiskotka);
  piskotkiGDPR.nastavi('opt-in-social', 'true', piskotkiGDPR.trajanjePiskotka);
  piskotkiGDPR.nastavi('opt-in-remarketing', 'true', piskotkiGDPR.trajanjePiskotka);
  document.querySelector('#piskotki').style.display = 'none';

  /* Osvežitev spletne strani */
  setTimeout(function () {
    location.reload();
  }, 100);
});


/* Piškot - opt-in-social */
if (piskotkiGDPR.social) {
  if (piskotkiGDPR.social.addEventListener) {
    piskotkiGDPR.social.addEventListener('change', function(event) {
      if (event.target.checked) {
        piskotkiGDPR.nastavi('opt-in-social', 'true', piskotkiGDPR.trajanjePiskotka);
      } else {
        piskotkiGDPR.izbrisi('opt-in-social');
        piskotkiGDPR.izbrisi('VISITOR_INFO1_LIVE');
        piskotkiGDPR.izbrisi('LOGIN_INFO');
        piskotkiGDPR.izbrisi('YSC');
        piskotkiGDPR.izbrisi('GPS');
        piskotkiGDPR.izbrisi('xs');
        piskotkiGDPR.izbrisi('act');
        piskotkiGDPR.izbrisi('c_user');
        piskotkiGDPR.izbrisi('datr');
        piskotkiGDPR.izbrisi('dpr');
        piskotkiGDPR.izbrisi('pl');
        piskotkiGDPR.izbrisi('sb');
        piskotkiGDPR.izbrisi('wd');
        piskotkiGDPR.izbrisi('fr');
        piskotkiGDPR.izbrisi('presense');
        piskotkiGDPR.izbrisi('SID');
        piskotkiGDPR.izbrisi('OGPC');
      }
    }, false);
  }
}


/* Piškot - opt-in-remarketing */
if (piskotkiGDPR.remarketing) {
  if (piskotkiGDPR.remarketing.addEventListener) {
    piskotkiGDPR.remarketing.addEventListener('change', function(event) {
      if (event.target.checked) {
        piskotkiGDPR.nastavi('opt-in-remarketing', 'true', piskotkiGDPR.trajanjePiskotka);
      } else {
        piskotkiGDPR.izbrisi('opt-in-remarketing');
        piskotkiGDPR.izbrisi('NID');
        piskotkiGDPR.izbrisi('IDE');
        piskotkiGDPR.izbrisi('DSID');
        piskotkiGDPR.izbrisi('1P_JAR');
        piskotkiGDPR.izbrisi('APISID');
        piskotkiGDPR.izbrisi('HSID');
        piskotkiGDPR.izbrisi('SAPISID');
        piskotkiGDPR.izbrisi('SIDCC');
        piskotkiGDPR.izbrisi('SSID');
        piskotkiGDPR.izbrisi('CONSENT');
        piskotkiGDPR.izbrisi('DV');
        piskotkiGDPR.izbrisi('PREF');
        piskotkiGDPR.izbrisi('test_cookie');
      }
    }, false);
  }
}


/* Če piškot "cookie-notice-accepted" ni nastavljen, prikažemo okno */
if (piskotkiGDPR.preglej('cookie-notice-accepted') !== true) {
  document.querySelector('#piskotki').style.display = 'block';
}


/* Nastavitve piškotkov (checkboxes) */
if (piskotkiGDPR.accepted) {
  if (piskotkiGDPR.preglej('cookie-notice-accepted') === true) {
    piskotkiGDPR.accepted.checked = true;
  }
}

if (piskotkiGDPR.social) {
  if (piskotkiGDPR.preglej('opt-in-social') === true) {
    piskotkiGDPR.social.checked = true;
  }
}

if (piskotkiGDPR.remarketing) {
  if (piskotkiGDPR.preglej('opt-in-remarketing') === true) {
    piskotkiGDPR.remarketing.checked = true;
  }
}


/* Osnovno oblikovanje */
document.getElementById('piskotki').style.background = piskotkiGDPR.barvaOzadja;
document.getElementById('piskotki').style.boxShadow = piskotkiGDPR.sencaOkna;

/* Oblikovanje naslova */
document.querySelector('#piskotki h1').style.cssText = 'color: ' + piskotkiGDPR.barvaNaslova + '; font-size: ' + piskotkiGDPR.velikostNaslova + ';';

/* Oblikovanje pisave */
var piskotkiGDPRp = document.querySelectorAll('#piskotki p');
var i;
for (i = 0; i < piskotkiGDPRp.length; i++) {
  piskotkiGDPRp[i].style.cssText = 'color: ' + piskotkiGDPR.barvaPisave + '; font-size: ' + piskotkiGDPR.velikostPisave + ';';
}

/* Oblikovanje povezave */
var piskotkiGDPRa = document.querySelectorAll('#piskotki a');
var i;
for (i = 0; i < piskotkiGDPRa.length; i++) {
  piskotkiGDPRa[i].style.cssText = 'color: ' + piskotkiGDPR.barvaPovezave + '; font-size: ' + piskotkiGDPR.velikostPovezave + ';';
}

/* Oblikovanje gumba */
document.querySelector('#piskotki .btn').style.cssText = 'background: ' + piskotkiGDPR.barvaGumba + '; color:' + piskotkiGDPR.barvaGumbaPovezave + '; border-radius: ' + piskotkiGDPR.zaobljenostGumba + '; font-size: ' + piskotkiGDPR.velikostGumbaPovezave + ';';


/* Avtomatska sprememba pogojev z imenom strani */
piskotkiGDPRimeStrani = document.querySelectorAll('.ime-strani');
var i;
for (i = 0; i < piskotkiGDPRimeStrani.length; i++) {
  piskotkiGDPRimeStrani[i].innerHTML = piskotkiGDPR.domenaStrani();
  piskotkiGDPRimeStrani[i].style.cssText = 'font-weight: bold;';
}