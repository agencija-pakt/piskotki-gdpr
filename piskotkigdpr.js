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
    * Izbriši piškot
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


  /**
    * HTML okno za piškotke
    */
  okno.innerHTML = '<p><a class="icon" href="https://piskotki-gdpr.pakt.si/"><svg enable-background="new 0 0 16 16" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">  <image width="16" height="16" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAAAChiWbXuILcvILc voLdv4LcvYHcvIHbu4DXtn+hiWXUtH7ZuX7fw4jlzJXhyI3ewIPat3vXtXt3ZEUUEQvSsXrXt3ra uHnVsngUEAvSsXTdwYTYuHfVsnSbgVm9nWzVtXTRrm3SrnLNqWvXuHbSrW3Go2TNqGS+mVm7mFi1 kVDBmletiEq7lFGkgEKviUqhf0ewiEW5kEqjfkJ3XjqkfEC7kUqogEB3XTWceUWfeTyXcTergT+b d0AOCweUcj6cdjqkezyyhUCkeTqYczxVQidvVTCWcTifdzqmezqlezmieDeedTabcziVbzdxVi4O CwXn0p3o05/jy5LZvIDiyI7o0p7p1KTp1qTo1aTRs3etkWDhzpjmzpbhxIjhyZDXvojn06Ho1KLo 06LSvIvn0Zzm0JrkypHbvoC+mFmVdEjUv4vo06Dm0Jziy5Xn0JzmzpfUt3u2jlHRt3uVeE6Mc0ze yZHjy5TKo1+0gz6qhEnbw43ly5LVu4GwlWHJqGrWuHTfxIXYwITXv4bkzJLkzJTApG2Yekyqjl/a wofix4vgxIbfwoHWtHDWt3LUtXHMsHLgxYbhxonhxYngxYnZv4PfxIbhxIbewoLewH/bvnq1llvP r2iwjlGsjlXYunjdvn3ev37ev33SsnDCmVTBnVvYuHLPqmXLqWHQsWjPsGnVs23OqWXUsm7ZuHPa uHO+m1uPYy6RZjG4lVbLpV6/mVPNq2HPrWO9lU+YZCmTcT/RrWbUsGfQrGSDZzqUdkK8mlbFnVXG oVfJpVvAnFaIaTqriUzLpVzPp17OqF7OqF3Hn1fCmlG6lU/EnlTIoFbIn1W4jUrEnFTHn1XFnVS+ k0yfez7BmE/Al07Bl067kkuSazW2j0rBl028kUm5jke7kUi2i0X///+m58f3AAAAUXRSTlMACECK 4fr12ow9CCm37/7+7rU6AQMe0+o6DZj++qUNJeT3WnD807n87v30/eP6ld1J8/xwB6j+2Rs9vOz2 WAERru7+5mQGCl3i/P7+++KHLgym0T/MAAAAAWJLR0TixgGeHAAAAAd0SU1FB+MKHgM5BdraPO0A AAEbSURBVBjTARAB7/4AAAAAAQIDBAUGBwgJCgAAAAAAAAsMDQ5RUlNUDxAREhMAABQVFlVWV1hZ WltcXV4XGAAAGRobX2BhYmNhZGVmZxwdHgAfIGhpamtsbW5vb3BxciEiACMkc3R1dnd4eXp7fH1+ fyUAJoCBgoOEhYaHiImKi4yNJwAojo+QkZKTlJWWl5iZmpspACqcnZ6foKGZmaKjpKWmpysALKip qqusra6vr7CxsrO0LQAutba3uLm6u7y8vb6/wMEvADAxwsPExcbHyMjJysfLMjMANDU2zM3Owc/Q 0dLT1NU3OAAAOTo71tfY2drb3N3ePD0+AAAAP0BB3+Dg3+HhQkNERQAAAAAARkdISUpLTE1OT1AA AOvsa6//fyfvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEwLTMwVDEwOjU3OjA1LTA3OjAw9d3f gwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMC0zMFQxMDo1NzowNS0wNzowMISAZz8AAAAASUVO RK5CYII="/></svg></a><h1>' + _pi.naslov +'</h1></p><p>'+ _pi.besediloEna +'</p><p>'+ _pi.besediloDva +'</p><p><a href="'+ _pi.povezavaPogoji +'">'+ _pi.imePovezavePogoji +'</a></p><p><a href="#" class="btn">'+ _pi.besediloGumba +'</a></p>';
  okno.setAttribute('id', 'piskotki');
  if (_pi.animacija === true) {
    okno.setAttribute('class', 'bounce');
  }
  document.body.appendChild(okno);


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

  // Oblikovanje naslova
  document.querySelector('#piskotki h1').style.cssText = 'color: '+ _pi.barvaNaslova +'; font-size: '+ _pi.velikostNaslova +';';

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