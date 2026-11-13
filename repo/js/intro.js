// Abertura animada. Só roda se o <head> ligou html.intro-on
// (primeira visita na sessão, sem #âncora e sem "reduzir movimento"). Use ?intro para rever.
(function () {
  "use strict";
  var d = document.documentElement;
  var el = document.getElementById("intro");
  if (!el) return;
  if (!d.classList.contains("intro-on")) { el.parentNode.removeChild(el); return; }

  var atras = document.querySelectorAll("#topo, main, footer");
  var feito = false, t1, t2;
  atras.forEach(function (a) { a.setAttribute("inert", ""); });

  function fim() {
    if (feito) return;
    feito = true;
    clearTimeout(t1); clearTimeout(t2);
    try { sessionStorage.setItem("introVisto", "1"); } catch (e) {}
    el.classList.add("out");
    d.classList.remove("intro-on");
    atras.forEach(function (a) { a.removeAttribute("inert"); });
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1300);
  }

  function inicia() {
    if (feito) return;
    el.classList.add("go");
    t1 = setTimeout(fim, 3950);
  }

  // espera a fonte do nome (no máximo 1,2 s) para a escrita não trocar de fonte no meio
  var fonte = (document.fonts && document.fonts.load)
    ? Promise.race([document.fonts.load("400 52px Italiana"), new Promise(function (r) { setTimeout(r, 1200); })])
    : Promise.resolve();
  fonte.then(function () { requestAnimationFrame(inicia); }, inicia);

  el.querySelector(".intro-skip").addEventListener("click", fim);
  t2 = setTimeout(fim, 8000); // segurança: a abertura nunca trava o site
})();
