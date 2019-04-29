/*
  Copyright (c) Agencija Pakt d.o.o.</strong> (vse pravice pridržane)

  Dovoljenje je brezplačno podeljeno vsaki osebi, ki prejme kopijo. Ta programska oprema in povezane datoteke, je treba obravnavati brez omejitev, vključno s pravicami do neomejene uporabe, kopiranja, spreminjanja, združevanja, objavljanja, distributiranja, licenciranja in/ali prodajanja programske opreme. Osebam, ki jim je programska oprema zagotovljena morajo upoštevati naslednje pogoje:
    
  Zgornje (copywrite) obvestilo in obvestilu o dovoljenju je potrebno vključiti v vse kopije programske opreme. Prav tako je obvezno pustiti vse povezave, ki vodijo do uradne spletne strani avtorja te programske opreme.
    
	PROGRAMSKA OPREMA JE PREDSTAVLJENA "KOT JE", BREZ KAKRŠNEGAKOLI JAMSTVA, IMPLICITNEGA ALI EKSPLICITNEGA. V NOBENEM PRIMERU AVTORJI, DOBAVITELJI IN DISTRIBUTERJI NE PREVZEMAMO NOBENE ODGOVORNOSTI O ŠKODI, IZGUBI DOBIČKA, PRIHODKOV ALI PODATKOV, FINANČNE IZGUBE IN DRUGIH ODGOVORNOSTI ALI POSREDNO, POSEBNO, POSLEDIČNO, EKSEMPLARIČNO ALI KAZNOVALNO ODŠKODNINO.

  Licenca MIT
*/


/* Piskotki GDPR */
function piskotkiGDPR(_pi) {

  /* Pridobitev domene strani iz URL naslova */
  domenaStrani = function() {
    if (window.location.hostname !== '') {
      return window.location.hostname;
    } else {
      return imeStrani;
    }
  };


  /* Pridobitev piškotov in vrnitev rezultata vsebine piškotkov, če vsebine ni podamo prazno vsebino */
  pridobi = function(ime) {
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
  };
  

  /* Nastavitev piškota glede na ('ime piškotka', 'vsebina piškotka', 'čas trajanja piškotka - glede na dan') */
  nastavi = function(ime, vsebina, cas) {
    var datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + cas);
    document.cookie = ime + '=' + escape(vsebina) + ((cas == null) ? '' : '; expires=' + datumPoteka.toUTCString()) + '; path=/;';
  };
 
  
  /* Izbriši piškot */
	izbrisi = function(ime) {
    document.cookie = ime + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = ime + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.'+ domenaStrani().replace(/\s/g, '') +';';
	};
 
  
  /* Če piškot obstaja, vrnemo "true" ali "false" */
	preglej = function(ime) {
		ime = pridobi(ime);
		if (ime != null && ime != '') {
			return true;
		} else {
			return false;
		}
  };
  
  /* Potrditveno polje (checkboxes) */
  accepted = document.getElementById('accepted');
  social = document.getElementById('social');
  remarketing = document.getElementById('remarketing');

  /* HTML okno za piškotke */
  okno = document.createElement('div');

  /* HTML okno za piškotke */
  okno.innerHTML = '<p><a class="icon" href="https://piskotki-gdpr.pakt.si/"><img src="https://raw.githubusercontent.com/agencija-pakt/piskotki-gdpr/master/favicon.ico" alt="piskotki gdpr skripta"></a><h1>' + _pi.naslov + '</h1></p>' + '<p>' + _pi.besediloEna + '</p>' + '<p>' + _pi.besediloDva + '</p>' + '<p><a href="' + _pi.povezavaPogoji + '">' + _pi.imePovezavePogoji + '</a></p>' + '<p><a href="#" class="btn">' + _pi.besediloGumba + '</a></p>';
  okno.setAttribute('id', 'piskotki');
  if (_pi.animacija === true) {
    okno.setAttribute('class', 'bounce');
  }
  document.body.appendChild(okno);


  /* Odstranitev animacije (bounce) */
  setTimeout(function() {
    okno.classList.remove('bounce');
  }, 12000);


  /* Piškot - cookie-notice-accepted */
  document.querySelector("#piskotki .btn").addEventListener('click', function(e) {
    e.preventDefault();
    nastavi('cookie-notice-accepted', 'true', _pi.trajanjePiskotka);
    nastavi('opt-in-social', 'true', _pi.trajanjePiskotka);
    nastavi('opt-in-remarketing', 'true', _pi.trajanjePiskotka);
    document.querySelector('#piskotki').style.display = 'none';

    /* Osvežitev spletne strani */
    setTimeout(function () {
      location.reload();
    }, 100);
  });


  /* Piškot - opt-in-social */
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


  /* Piškot - opt-in-remarketing */
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


  /* Če piškot "cookie-notice-accepted" ni nastavljen, prikažemo okno */
  if (preglej('cookie-notice-accepted') !== true) {
    document.querySelector('#piskotki').style.display = 'block';
  }


  /* (checkboxes) */
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


  /* Osnovno oblikovanje */
  document.getElementById('piskotki').style.background = _pi.barvaOzadja;
  document.getElementById('piskotki').style.boxShadow = _pi.sencaOkna;

  /* Oblikovanje naslova */
  document.querySelector('#piskotki h1').style.cssText = 'color: ' + _pi.barvaNaslova + '; font-size: ' + _pi.velikostNaslova + ';';

  /* Oblikovanje pisave */
  var p = document.querySelectorAll('#piskotki p');
  var i;
  for (i = 0; i < p.length; i++) {
    p[i].style.cssText = 'color: ' + _pi.barvaPisave + '; font-size: ' + _pi.velikostPisave + ';';
  }

  /* Oblikovanje povezave */
  var a = document.querySelectorAll('#piskotki a');
  var i;
  for (i = 0; i < a.length; i++) {
    a[i].style.cssText = 'color: ' + _pi.barvaPovezave + '; font-size: ' + _pi.velikostPovezave + ';';
  }

  /* Oblikovanje gumba */
  document.querySelector('#piskotki .btn').style.cssText = 'background: ' + _pi.barvaGumba + '; color:' + _pi.barvaGumbaPovezave + '; border-radius: ' + _pi.zaobljenostGumba + '; font-size: ' + _pi.velikostGumbaPovezave + ';';


  /* Avtomatska sprememba pogojev z imenom strani */
  imeStrani = document.querySelectorAll('.ime-strani');
  var i;
  for (i = 0; i < imeStrani.length; i++) {
    imeStrani[i].innerHTML = domenaStrani();
    imeStrani[i].style.cssText = 'font-weight: bold;';
  }
} /* Vtičnik piskotkiGDPR */