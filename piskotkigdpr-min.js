var piskotkiGDPR={sencaOkna:"0 10px 20px 0 rgba(0, 0, 0, 0.15)",barvaOzadja:"rgba(0,0,0,.8)",animacija:!0,imeStrani:"Ta spletna stran",trajanjePiskotka:30,barvaPisave:"white",velikostPisave:"14px",naslov:"Spletno mesto uporablja piškotke.",barvaNaslova:"white",velikostNaslova:"16px",besediloEna:"Z njimi zagotavljamo spletno storitev, analizo uporabe, oglasnih sistemov in funkcionalnosti, ki jih brez piškotkov ne bi mogli nuditi.",besediloDva:"Z nadaljnjo uporabo spletnega mesta soglašate s piškotki.",barvaPovezave:"white",imePovezavePogoji:"Več o možnih nastavitvah piškotkov.",povezavaPogoji:"/piskotki/",velikostPovezave:"14px",besediloGumba:"V redu",barvaGumba:"#1be195",barvaGumbaPovezave:"white",velikostGumbaPovezave:"16px",zaobljenostGumba:"0",domenaStrani:function(){return""!==window.location.hostname?window.location.hostname:piskotkiGDPR.imeStrani},pridobi:function(i){if(0<document.cookie.length){var t=document.cookie.indexOf(i+"=");if(-1!=t){t=t+i.length+1;var o=document.cookie.indexOf(";",t);return-1==o&&(o=document.cookie.length),unescape(document.cookie.substring(t,o))}}return""},nastavi:function(i,t,o){var e=new Date;e.setDate(e.setDate()+o),document.cookie=i+"="+escape(t)+(null==o?"":"; expires="+e.toUTCString())+"; path=/;"},izbrisi:function(i){document.cookie=i+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",document.cookie=i+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=."+piskotkiGDPR.domenaStrani().replace(/\s/g,"")+";"},preglej:function(i){return null!=(i=piskotkiGDPR.pridobi(i))&&""!=i},accepted:document.getElementById("accepted"),social:document.getElementById("social"),remarketing:document.getElementById("remarketing"),okno:document.createElement("div")};piskotkiGDPR.okno.innerHTML='<p><a class="icon" href="https://piskotki-gdpr.pakt.si/"><img src="https://raw.githubusercontent.com/agencija-pakt/piskotki-gdpr/master/favicon.ico"></a><h1>'+piskotkiGDPR.naslov+"</h1></p><p>"+piskotkiGDPR.besediloEna+"</p><p>"+piskotkiGDPR.besediloDva+'</p><p><a href="'+piskotkiGDPR.povezavaPogoji+'">'+piskotkiGDPR.imePovezavePogoji+'</a></p><p><a href="#" class="btn">'+piskotkiGDPR.besediloGumba+"</a></p>",piskotkiGDPR.okno.setAttribute("id","piskotki"),!0===piskotkiGDPR.animacija&&piskotkiGDPR.okno.setAttribute("class","bounce"),document.body.appendChild(piskotkiGDPR.okno),setTimeout(function(){piskotkiGDPR.okno.classList.remove("bounce")},12e3),document.querySelector("#piskotki .btn").addEventListener("click",function(i){i.preventDefault(),piskotkiGDPR.nastavi("cookie-notice-accepted","true",piskotkiGDPR.trajanjePiskotka),piskotkiGDPR.nastavi("opt-in-social","true",piskotkiGDPR.trajanjePiskotka),piskotkiGDPR.nastavi("opt-in-remarketing","true",piskotkiGDPR.trajanjePiskotka),document.querySelector("#piskotki").style.display="none",setTimeout(function(){location.reload()},100)}),piskotkiGDPR.social&&piskotkiGDPR.social.addEventListener&&piskotkiGDPR.social.addEventListener("change",function(i){i.target.checked?piskotkiGDPR.nastavi("opt-in-social","true",piskotkiGDPR.trajanjePiskotka):(piskotkiGDPR.izbrisi("opt-in-social"),piskotkiGDPR.izbrisi("VISITOR_INFO1_LIVE"),piskotkiGDPR.izbrisi("LOGIN_INFO"),piskotkiGDPR.izbrisi("YSC"),piskotkiGDPR.izbrisi("GPS"),piskotkiGDPR.izbrisi("xs"),piskotkiGDPR.izbrisi("act"),piskotkiGDPR.izbrisi("c_user"),piskotkiGDPR.izbrisi("datr"),piskotkiGDPR.izbrisi("dpr"),piskotkiGDPR.izbrisi("pl"),piskotkiGDPR.izbrisi("sb"),piskotkiGDPR.izbrisi("wd"),piskotkiGDPR.izbrisi("fr"),piskotkiGDPR.izbrisi("presense"),piskotkiGDPR.izbrisi("SID"),piskotkiGDPR.izbrisi("OGPC"))},!1),piskotkiGDPR.remarketing&&piskotkiGDPR.remarketing.addEventListener&&piskotkiGDPR.remarketing.addEventListener("change",function(i){i.target.checked?piskotkiGDPR.nastavi("opt-in-remarketing","true",piskotkiGDPR.trajanjePiskotka):(piskotkiGDPR.izbrisi("opt-in-remarketing"),piskotkiGDPR.izbrisi("NID"),piskotkiGDPR.izbrisi("IDE"),piskotkiGDPR.izbrisi("DSID"),piskotkiGDPR.izbrisi("1P_JAR"),piskotkiGDPR.izbrisi("APISID"),piskotkiGDPR.izbrisi("HSID"),piskotkiGDPR.izbrisi("SAPISID"),piskotkiGDPR.izbrisi("SIDCC"),piskotkiGDPR.izbrisi("SSID"),piskotkiGDPR.izbrisi("CONSENT"),piskotkiGDPR.izbrisi("DV"),piskotkiGDPR.izbrisi("PREF"),piskotkiGDPR.izbrisi("test_cookie"))},!1),!0!==piskotkiGDPR.preglej("cookie-notice-accepted")&&(document.querySelector("#piskotki").style.display="block"),piskotkiGDPR.accepted&&!0===piskotkiGDPR.preglej("cookie-notice-accepted")&&(piskotkiGDPR.accepted.checked=!0),piskotkiGDPR.social&&!0===piskotkiGDPR.preglej("opt-in-social")&&(piskotkiGDPR.social.checked=!0),piskotkiGDPR.remarketing&&!0===piskotkiGDPR.preglej("opt-in-remarketing")&&(piskotkiGDPR.remarketing.checked=!0),document.getElementById("piskotki").style.background=piskotkiGDPR.barvaOzadja,document.getElementById("piskotki").style.boxShadow=piskotkiGDPR.sencaOkna,document.querySelector("#piskotki h1").style.cssText="color: "+piskotkiGDPR.barvaNaslova+"; font-size: "+piskotkiGDPR.velikostNaslova+";";var piskotkiGDPRp=document.querySelectorAll("#piskotki p"),i;for(i=0;i<piskotkiGDPRp.length;i++)piskotkiGDPRp[i].style.cssText="color: "+piskotkiGDPR.barvaPisave+"; font-size: "+piskotkiGDPR.velikostPisave+";";var piskotkiGDPRa=document.querySelectorAll("#piskotki a"),i,i;for(i=0;i<piskotkiGDPRa.length;i++)piskotkiGDPRa[i].style.cssText="color: "+piskotkiGDPR.barvaPovezave+"; font-size: "+piskotkiGDPR.velikostPovezave+";";for(document.querySelector("#piskotki .btn").style.cssText="background: "+piskotkiGDPR.barvaGumba+"; color:"+piskotkiGDPR.barvaGumbaPovezave+"; border-radius: "+piskotkiGDPR.zaobljenostGumba+"; font-size: "+piskotkiGDPR.velikostGumbaPovezave+";",piskotkiGDPRimeStrani=document.querySelectorAll(".ime-strani"),i=0;i<piskotkiGDPRimeStrani.length;i++)piskotkiGDPRimeStrani[i].innerHTML=piskotkiGDPR.domenaStrani(),piskotkiGDPRimeStrani[i].style.cssText="font-weight: bold;";