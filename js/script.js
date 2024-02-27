(function ($) {
  "use strict";

  // init Isotope
  var initIsotope = function () {
    $(".grid").each(function () {
      // $('.grid').imagesLoaded( function() {
      // images have loaded
      var $buttonGroup = $(".button-group");
      var $checked = $buttonGroup.find(".is-checked");
      var filterValue = $checked.attr("data-filter");

      var $grid = $(".grid").isotope({
        itemSelector: ".portfolio-item",
        // layoutMode: 'fitRows',
        filter: filterValue,
      });

      // bind filter button click
      $(".button-group").on("click", "a", function (e) {
        e.preventDefault();
        filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });

      // change is-checked class on buttons
      $(".button-group").each(function (i, buttonGroup) {
        $buttonGroup.on("click", "a", function () {
          $buttonGroup.find(".is-checked").removeClass("is-checked");
          $(this).addClass("is-checked");
        });
      });
      // });
    });
  };

  var initTexts = function () {
    // Wrap every letter in a span
    $(".txt-fx").each(function () {
      this.innerHTML = this.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    });

    anime.timeline().add({
      targets: ".txt-fx .letter",
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 100,
      delay: (el, i) => 0,
    });
  };
  var animateTexts = function () {
    anime.timeline().add({
      targets: ".slick-current .txt-fx .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 30 * i,
    });
  };

  var hideTexts = function () {
    anime.timeline().add({
      targets: ".slick-current .txt-fx .letter",
      translateX: [0, -30],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 30 * i,
    });
  };

  // initialize all the sliders
  var initSlider = function () {
    // homepage slider | slick slider
    $(".main-slider").slick({
      autoplay: false,
      autoplaySpeed: 4000,
      fade: true,
      prevArrow: $(".prev"),
      nextArrow: $(".next"),
    });

    $(".main-slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        hideTexts();
        console.log("beforeChange");
      }
    );

    $(".main-slider").on(
      "afterChange",
      function (event, slick, currentSlide, nextSlide) {
        animateTexts();
        console.log("afterChange");
      }
    );

    initTexts();
    animateTexts();
  };

  // animate search box
  var searchButton = function () {
    // search box toggle
    $("#header-wrap").on("click", ".search-toggle", function (e) {
      var selector = $(this).data("selector");

      $(selector).toggleClass("show").find(".search-input").focus();
      $(this).toggleClass("active");

      e.preventDefault();
    });

    // close when click off of container
    $(document).on("click touchstart", function (e) {
      if (
        !$(e.target).is(
          ".search-toggle, .search-toggle *, #header-wrap, #header-wrap *"
        )
      ) {
        $(".search-toggle").removeClass("active");
        $("#header-wrap").removeClass("show");
      }
    });
  };

  // initialize tabs
  var jsTabs = function () {
    // portfolio tabs
    const tabs = document.querySelectorAll("[data-tab-target]");
    const tabContents = document.querySelectorAll("[data-tab-content]");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach((tabContent) => {
          tabContent.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        tab.classList.add("active");
        target.classList.add("active");
      });
    });
  };

  // stick header on the top
  var stickyHeader = function () {
    // header menu
    var StickyHeader = new hcSticky("#header.fixed", {
      stickTo: "body",
      top: 0,
      bottomEnd: 200,
      responsive: {
        1024: {
          disable: true,
        },
      },
    });
  };

  //Overlay Menu Navigation
  var overlayMenu = function () {
    if (!$(".nav-overlay").length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector("body");
      menu = document.querySelector(".menu-btn");
      menuItems = document.querySelectorAll(".nav__list-item");
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener("click", function () {
        return toggleClass(body, "nav-active");
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass))
        element.classList.remove(stringClass);
      else element.classList.add(stringClass);
    };
    init();
  };

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });
  };

  $(document).ready(function () {
    stickyHeader();
    searchButton();
    initSlider();
    jsTabs();
    initChocolat();
    overlayMenu();

    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }); // End of document ready

  // preloader
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  });
})(jQuery);
window.onscroll = function () {
  var header = document.getElementById("header");
  if (window.scrollY > 150) {
    header.style.padding = "10px";
  } else {
    header.style.padding = "30px";
  }

  if (document.documentElement.scrollTop > 100) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
window.onload = function () {
  if (window.location.href.indexOf("index.html") > -1) {
    document
      .querySelector('#navbar a[href="index.html"]')
      .classList.add("active");
  }
  if (window.location.href.indexOf("prodotti.html") > -1) {
    document
      .querySelector('#navbar a[href="prodotti.html"]')
      .classList.add("active");
  }
  if (window.location.href.indexOf("test3.html") > -1) {
    document
      .querySelector('#navbar a[href="test3.html"]')
      .classList.add("active");
  }
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target;
      img.src = img.getAttribute("data-src");
      img.classList.remove("lazy");
      img.closest(".img-wrapper").classList.add("aos-animate"); // Добавляем класс для анимации
      console.log("пересек");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".lazy").forEach((img) => {
  observer.observe(img);
});

var menuBtn = document.querySelector(".menu-btn");

// Добавьте обработчик события клика на кнопку
menuBtn.addEventListener("click", function () {
  // Переключите класс active на кнопке
  menuBtn.classList.toggle("active");
});
const allLangs = ["it", "de"];

const langButtons = document.querySelectorAll("[data-btn]");
const currentPathName = window.location.pathname;

const locationLang = window.location.href.slice(window.location.href.length - 2, window.location.href.length);

if (locationLang === 'de' || locationLang === 'it')  currentLang = locationLang
else if(localStorage.getItem("language")) currentLang = localStorage.getItem("language")
else currentLang = 'de'

let currentText = {};
function checkPagePathName() {
  switch (currentPathName) {
    case "/index.html":
      currentText = langArr;
      break;
    case "prodotti.html":
      currentText = langArrProdotti;
      break;
    case "chi-siamo":
      currentText = langArrChiSiamo;
      break;
    default:
      currentText = langArr;
      break;
  }
}
checkPagePathName();

function changeLang() {
  for (let key in currentText) {
    let element = document.querySelector(`[data-lang=${key}]`);
    if (element) {
      element.textContent = currentText[key][currentLang];
    }
  }
}

changeLang();

langButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    currentLang = event.target.dataset.btn;
    localStorage.setItem("language", event.target.dataset.btn);
    resetActiveLangClass(langButtons, "nav-btn-active");
    btn.classList.add("nav-btn-active");
    changeLang();
  });
});

function resetActiveLangClass(arr, activeClass) {
  arr.forEach((elem) => {
    elem.classList.remove(activeClass);
  });
}
