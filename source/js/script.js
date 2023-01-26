const mainnavElement = document.querySelector(".main-navigation");
const pagelistElement = document.querySelector(".page-list");
const userlistElement = document.querySelector(".user-list");
const togglerElement = document.querySelector(".main-navigation__toggle");
const pagemainElement = document.querySelector(".page__main");
mainnavElement.classList.remove("main-navigation--nojs");
pagemainElement.classList.remove("page__main--nojs");
pagelistElement.classList.add("page-list--closed", "page-list--opened");
userlistElement.classList.add("user-list--closed", "user-list--opened");
togglerElement.classList.add("main-navigation__toggle--closed");
togglerElement.classList.remove("main-navigation__toggle--nojs");

togglerElement.addEventListener("click", () => {
  pagelistElement.classList.toggle("page-list--closed");
  userlistElement.classList.toggle("user-list--closed");
  togglerElement.classList.toggle("main-navigation__toggle--opened");
});

/* Modal */
const modalElement = document.querySelector(".modal");
const modalOpeners = document.querySelectorAll(
  ".product-card__button, .price-block__link"
);

modalOpeners.forEach((opener) => {
  opener.addEventListener("click", () => {
    modalElement.classList.toggle("hidden");
  });
});

const mapElement = document.querySelector("#map");

if (mapElement) {
  const scriptElement = document.createElement("script");
  scriptElement.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

  scriptElement.addEventListener("load", () => {
    if (typeof ymaps !== "undefined") {
      ymaps.ready(() => {
        const map = new ymaps.Map("map", {
          center: [59.9387165, 30.3230474],
          controls: [],
          zoom: 17,
        });

        map.geoObjects.add(
          new ymaps.Placemark(
            map.getCenter(),
            {
              hintContent:
                "г. Санкт-Петербург<br>ул. Большая Конюшенная<br>д. 19/8, офис 101",
            },
            {
              iconImageHref: "img/sprite.svg#map-pin",
              iconImageOffset: [-22, -82],
              iconImageSize: [67, 100],
              iconLayout: "default#image",
              iconShadow: !1,
            }
          )
        );
        map.behaviors.disable("scrollZoom");

        mapElement.classList.add("contacts__map--ready");
      });
    }
  });
  document.body.append(scriptElement);
}
