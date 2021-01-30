(function () {

  // Funkcja odpowiadająca za aktywację menu w trybie mobilnym
  function activateMenu() {
    const menu = document.querySelector('#top .menu');
    const subMenu = document.querySelector('#top .menu .expand');

    // rozwinięcie menu głównego po kliknięciu ikony burgera oraz zmiana ikony burgera
    document.querySelector('#top .burger').addEventListener('click', function () {
      const burgerIcon = this.childNodes[0];
      const banner = document.getElementById('banner');
      // przełączanie ikony burgera
      if (burgerIcon.classList.contains('fa-bars')) {
        burgerIcon.classList.replace('fa-bars', 'fa-times')
      } else {
        burgerIcon.classList.replace('fa-times', 'fa-bars')
      }
      // aktywacja/dezaktywacja menu
      menu.classList.toggle('active');
      // dezaktywacja/aktywacja tła po rozwinięciu menu
      if (banner.classList.contains('disabled')) {
        setTimeout(() => banner.classList.remove('disabled'), 400);
      } else banner.classList.add('disabled');
      banner.classList.toggle('blurred');
      // zablokowanie możliwości scrollowania gdy menu jest aktywne
      document.body.classList.toggle('no-scroll');
    })

    // rozwinięcie dodatkowego menu po kliknięciu odpowiedniej pozycji
    document.querySelector('.roll').addEventListener('click', function () {
      console.log('dupa');
      if (menu.classList.contains('active') || innerWidth >= 760) {
        const expandIcon = document.querySelector('.expand-btn i');
        if (expandIcon.classList.contains('fa-chevron-down')) {
          expandIcon.classList.replace('fa-chevron-down', 'fa-chevron-up')
        } else {
          expandIcon.classList.replace('fa-chevron-up', 'fa-chevron-down')
        }
        subMenu.classList.toggle('active');
      }
    })

  }

  // Funkcja odpowiadająca za przełączanie między slajdami w bannerze
  function banner() {
    const slides = document.querySelectorAll('#banner .slide-wrap .slide-bg');
    const dots = generateDots();
    let currentSlideIndex = 0;
    let autoChange = slideAuto();

    // Funckcja odpowiadająca za zmianę indeksu elementu, który ma być wyświetlany oraz zwracająca wartość indeksu elementu wyświetlanego wcześniej
    function indexChange(dir, totalSlides) {
      if (dir === "right") {
        currentSlideIndex++;
        if (currentSlideIndex > totalSlides) currentSlideIndex = 0;
      } else if (dir === "left") {
        currentSlideIndex--;
        if (currentSlideIndex < 0) currentSlideIndex = totalSlides;
      } else {
        throw new Error('Inproper function parameter. Only valid parameters are "right" and "left"')
      }
      return currentSlideIndex;
    }

    // Funnkcja wyświetlająca odpowiedni slajd na podstawie indeksu
    function slideChange(previousSlideIndex, currentSlideIndex) {
      slides[currentSlideIndex].classList.add('current');
      slides[previousSlideIndex].classList.remove('current');
      dots[currentSlideIndex].classList.add('current');
      dots[previousSlideIndex].classList.remove('current');
    }

    // Funkcja generująca kropki w ilości równej ilości slajdów
    function generateDots() {
      const dotsDiv = document.querySelector('#banner .dots');
      slides.forEach((item, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('current');
        dotsDiv.appendChild(dot);
      });
      return document.querySelectorAll('#banner .dots .dot')
    }

    // Zmiana indeksu oraz wyświetlenie slajdu po kliknięciu przycisku
    document.querySelectorAll('#banner .arrow').forEach(arrow => arrow.addEventListener('click', function () {
      clearInterval(autoChange);
      slideChange(currentSlideIndex, indexChange(this.dataset['direction'], slides.length - 1));
      autoChange = setInterval(() => {
        slideChange(currentSlideIndex, indexChange("right", slides.length - 1));
      }, 5000);
    }))

    // Zmiana slajdu co określoną ilość czasu
    function slideAuto() {
      const autoChange = setInterval(() => {
        slideChange(currentSlideIndex, indexChange("right", slides.length - 1));
      }, 5000);
      return autoChange
    }
  }

  activateMenu();
  banner();

})();