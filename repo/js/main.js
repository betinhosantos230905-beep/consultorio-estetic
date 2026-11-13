// ===== DADOS DA PROFISSIONAL (preencha quando tiver) =====
const CONFIG = {
  whatsapp: "",          // somente números com DDI+DDD, ex.: "5511999999999"
  mensagem: "Olá, Dra. Daniele! Gostaria de agendar uma avaliação.",
  endereco: ""           // endereço completo; se vazio, o Maps busca por Granja Viana, Cotia - SP
};

(function () {
  "use strict";
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s) { return document.querySelectorAll(s); };

  // WhatsApp: com número abre a conversa; sem número abre o WhatsApp com a mensagem pronta
  const texto = encodeURIComponent(CONFIG.mensagem);
  const waUrl = (CONFIG.whatsapp ? "https://wa.me/" + CONFIG.whatsapp : "https://wa.me/") + "?text=" + texto;
  $$("[data-wa]").forEach(function (a) { a.href = waUrl; a.target = "_blank"; a.rel = "noopener"; });

  // Google Maps
  const maps = $("#maps");
  if (maps) maps.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.endereco || "Granja Viana, Cotia - SP");

  // Menu responsivo
  const burger = $(".burger"), menu = $("#menu");
  function menuToggle(abre) {
    menu.classList.toggle("open", abre);
    burger.setAttribute("aria-expanded", String(abre));
    burger.setAttribute("aria-label", abre ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = abre ? "hidden" : "";
  }
  burger.addEventListener("click", function () { menuToggle(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) menuToggle(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") menuToggle(false); });

  // Cabeçalho, barra de progresso e botão de voltar ao topo
  const top = $(".top"), bar = $(".progress i"), subir = $(".to-top");
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const visiveis = new Set();
  let espera = false;
  function quadro() {
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    top.classList.toggle("scrolled", y > 24);
    subir.classList.toggle("show", y > 700);
    if (!reduz) {
      const meio = window.innerHeight / 2;
      visiveis.forEach(function (el) {
        const r = el.getBoundingClientRect();
        el.style.translate = "0 " + ((r.top + r.height / 2 - meio) * parseFloat(el.dataset.depth)).toFixed(1) + "px";
      });
    }
    espera = false;
  }
  function aoRolar() { if (!espera) { espera = true; requestAnimationFrame(quadro); } }
  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("resize", aoRolar);
  subir.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // Revelação ao rolar (entra e sai, descendo ou subindo) e profundidade sutil
  const alvos = $$(".reveal, .photo");
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (el) { el.classList.add("in"); });
    quadro();
    return;
  }
  const io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      en.target.classList.toggle("in", en.isIntersecting);
      if (en.target.dataset.depth) { en.isIntersecting ? visiveis.add(en.target) : visiveis.delete(en.target); }
    });
    aoRolar();
  }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
  alvos.forEach(function (el) { io.observe(el); });
  $$(".orb").forEach(function (el) { io.observe(el); });
  quadro();
})();
