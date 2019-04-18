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
  _pi.domenaStrani = function() {
    if (window.location.hostname !== '') {
      return window.location.hostname;
    } else {
      return _pi.imeStrani;
    }
  };


  /* Pridobitev piškotov in vrnitev rezultata vsebine piškotkov, če vsebine ni podamo prazno vsebino */
  _pi.pridobi = function(ime) {
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
  _pi.nastavi = function(ime, vsebina, cas) {
    var datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + cas);
    document.cookie = ime + '=' + escape(vsebina) + ((cas == null) ? '' : '; expires=' + datumPoteka.toUTCString()) + '; path=/;';
  };
 
  
  /* Izbriši piškot */
	_pi.izbrisi = function(ime) {
    document.cookie = ime + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = ime + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=.'+ _pi.domenaStrani().replace(/\s/g, '') +';';
	};
 
  
  /* Če piškot obstaja, vrnemo "true" ali "false" */
	_pi.preglej = function(ime) {
		ime = _pi.pridobi(ime);
		if (ime != null && ime != '') {
			return true;
		} else {
			return false;
		}
  };
  
  /* Potrditveno polje (checkboxes) */
  _pi.accepted = document.getElementById('accepted');
  _pi.social = document.getElementById('social');
  _pi.remarketing = document.getElementById('remarketing');

  /* HTML okno za piškotke */
  _pi.okno = document.createElement('div');


  /* Izvedi vtičnik šele, ko je coloten dokument pripravljen */
  document.addEventListener('DOMContentLoaded', function() {

    /* HTML okno za piškotke */
    _pi.okno.innerHTML = '<p><a class="icon" href="https://piskotki-gdpr.pakt.si/"><img src="https://raw.githubusercontent.com/agencija-pakt/piskotki-gdpr/master/favicon.ico" alt="piskotki gdpr skripta"></a><h1>' + _pi.naslov + '</h1></p>' + '<p>' + _pi.besediloEna + '</p>' + '<p>' + _pi.besediloDva + '</p>' + '<p><a href="' + _pi.povezavaPogoji + '">' + _pi.imePovezavePogoji + '</a></p>' + '<p><a href="#" class="btn">' + _pi.besediloGumba + '</a></p>';
    _pi.okno.setAttribute('id', 'piskotki');
    if (_pi.animacija === true) {
      _pi.okno.setAttribute('class', 'bounce');
    }
    document.body.appendChild(_pi.okno);


    /* Odstranitev animacije (bounce) */
    setTimeout(function() {
      _pi.okno.classList.remove('bounce');
    }, 12000);


    /* Piškot - cookie-notice-accepted */
    document.querySelector("#piskotki .btn").addEventListener('click', function(e) {
      e.preventDefault();
      _pi.nastavi('cookie-notice-accepted', 'true', _pi.trajanjePiskotka);
      _pi.nastavi('opt-in-social', 'true', _pi.trajanjePiskotka);
      _pi.nastavi('opt-in-remarketing', 'true', _pi.trajanjePiskotka);
      document.querySelector('#piskotki').style.display = 'none';

      /* Osvežitev spletne strani */
      setTimeout(function () {
        location.reload();
      }, 100);
    });


    /* Piškot - opt-in-social */
    if (_pi.social) {
      if (_pi.social.addEventListener) {
        _pi.social.addEventListener('change', function(event) {
          if (event.target.checked) {
            _pi.nastavi('opt-in-social', 'true', _pi.trajanjePiskotka);
          } else {
            _pi.izbrisi('opt-in-social');
            _pi.izbrisi('VISITOR_INFO1_LIVE');
            _pi.izbrisi('LOGIN_INFO');
            _pi.izbrisi('YSC');
            _pi.izbrisi('GPS');
            _pi.izbrisi('xs');
            _pi.izbrisi('act');
            _pi.izbrisi('c_user');
            _pi.izbrisi('datr');
            _pi.izbrisi('dpr');
            _pi.izbrisi('pl');
            _pi.izbrisi('sb');
            _pi.izbrisi('wd');
            _pi.izbrisi('fr');
            _pi.izbrisi('presense');
            _pi.izbrisi('SID');
            _pi.izbrisi('OGPC');
          }
        }, false);
      }
    }


    /* Piškot - opt-in-remarketing */
    if (_pi.remarketing) {
      if (_pi.remarketing.addEventListener) {
        _pi.remarketing.addEventListener('change', function(event) {
          if (event.target.checked) {
            _pi.nastavi('opt-in-remarketing', 'true', _pi.trajanjePiskotka);
          } else {
            _pi.izbrisi('opt-in-remarketing');
            _pi.izbrisi('NID');
            _pi.izbrisi('IDE');
            _pi.izbrisi('DSID');
            _pi.izbrisi('1P_JAR');
            _pi.izbrisi('APISID');
            _pi.izbrisi('HSID');
            _pi.izbrisi('SAPISID');
            _pi.izbrisi('SIDCC');
            _pi.izbrisi('SSID');
            _pi.izbrisi('CONSENT');
            _pi.izbrisi('DV');
            _pi.izbrisi('PREF');
            _pi.izbrisi('test_cookie');
          }
        }, false);
      }
    }


    /* Če piškot "cookie-notice-accepted" ni nastavljen, prikažemo okno */
    if (_pi.preglej('cookie-notice-accepted') !== true) {
      document.querySelector('#piskotki').style.display = 'block';
    }


    /* _pi piškotkov (checkboxes) */
    if (_pi.accepted) {
      if (_pi.preglej('cookie-notice-accepted') === true) {
        _pi.accepted.checked = true;
      }
    }

    if (_pi.social) {
      if (_pi.preglej('opt-in-social') === true) {
        _pi.social.checked = true;
      }
    }

    if (_pi.remarketing) {
      if (_pi.preglej('opt-in-remarketing') === true) {
        _pi.remarketing.checked = true;
      }
    }


    /* Osnovno oblikovanje */
    document.getElementById('piskotki').style.background = _pi.barvaOzadja;
    document.getElementById('piskotki').style.boxShadow = _pi.sencaOkna;

    /* Oblikovanje naslova */
    document.querySelector('#piskotki h1').style.cssText = 'color: ' + _pi.barvaNaslova + '; font-size: ' + _pi.velikostNaslova + ';';

    /* Oblikovanje pisave */
    var _pip = document.querySelectorAll('#piskotki p');
    var i;
    for (i = 0; i < _pip.length; i++) {
      _pip[i].style.cssText = 'color: ' + _pi.barvaPisave + '; font-size: ' + _pi.velikostPisave + ';';
    }

    /* Oblikovanje povezave */
    var _pia = document.querySelectorAll('#piskotki a');
    var i;
    for (i = 0; i < _pia.length; i++) {
      _pia[i].style.cssText = 'color: ' + _pi.barvaPovezave + '; font-size: ' + _pi.velikostPovezave + ';';
    }

    /* Oblikovanje gumba */
    document.querySelector('#piskotki .btn').style.cssText = 'background: ' + _pi.barvaGumba + '; color:' + _pi.barvaGumbaPovezave + '; border-radius: ' + _pi.zaobljenostGumba + '; font-size: ' + _pi.velikostGumbaPovezave + ';';


    /* Avtomatska sprememba pogojev z imenom strani */
    _piimeStrani = document.querySelectorAll('.ime-strani');
    var i;
    for (i = 0; i < _piimeStrani.length; i++) {
      _piimeStrani[i].innerHTML = _pi.domenaStrani();
      _piimeStrani[i].style.cssText = 'font-weight: bold;';
    }

  }); // Pripravljen dokument
} // Vtičnik piskotkiGDPR