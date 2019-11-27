let elemNext = document.querySelector(".slider__next-btn");
let elemPrev = document.querySelector(".slider__prev-btn");
let slide = document.querySelectorAll(".slider__slide");
let sliderDots = document.querySelector(".slider__dots-dot");
let sliderImage = document.querySelectorAll(".slider__slide-image");
let currentSlide = 0;
let offset = 620;
let width = 620;
let slidePosition = 0;
let prevSlidePosition = 0;

const insertSlides = () => {
  for (let i = 0; i < slide.length - 1; i++) {
    sliderDots.insertAdjacentHTML("afterend", '<div class="slider__dots-dot"></div>');
  }

  sliderDots = document.querySelectorAll(".slider__dots-dot");
  slide[sliderImage.length - 1].insertAdjacentHTML(
    "afterend",
    "<div class='slider__slide'><img src='" + sliderImage[0].src + "'></div>"
  );
  slide[0].insertAdjacentHTML(
    "beforebegin",
    "<div class='slider__slide'><img src='" +
      sliderImage[sliderImage.length - 1].src +
      "'></div>"
  );
  slide = document.querySelectorAll(".slider__slide");
}
insertSlides();

const animationHandler = ({ duration, draw, timing }) => {
  let startTime = performance.now();
  requestAnimationFrame(
    (animate = time => {
      let timeFraction = (time - startTime) / duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    })
  );
};

const changeSlideHandler = (type, dotNum, prevSlide) => {
  animationHandler({
    duration: 500,
    timing: timeFraction => timeFraction,
    draw: progress => {
      if (type == "dots") {
        for (let i = 0; i < slide.length; i++) {
          slidePosition =
            prevSlide - (dotNum - currentSlide) * offset * progress;
          slide[i].style.transform =
            "translate3d(" + slidePosition + "px, 0 ,0)";
        }
      } else {
        for (let i = 0; i < slide.length; i++) {
          slidePosition = width + offset * progress;
          slide[i].style.transform =
            "translate3d(" + slidePosition + "px, 0 ,0)";
        }
      }
    }
  });
};

const dotColorHandler = () => {
  sliderDots.forEach(
    element => (element.style.backgroundColor = "rgba(0, 0, 0, 0.7)")
  );
  sliderDots[currentSlide].style.backgroundColor = "rgb(85, 84, 84)";
};

const whileAnimationHandler = ( callback ) => {
  elemNext.style.cursor = "not-allowed";
  elemNext.style.pointerEvents = "none";
  elemPrev.style.cursor = "not-allowed";
  elemPrev.style.pointerEvents = "none";
  sliderDots.forEach(element => (element.style.pointerEvents = "none"));
  setTimeout(() => {
    elemNext.style.cursor = "pointer";
    elemNext.style.pointerEvents = "auto";
    elemPrev.style.cursor = "pointer";
    elemPrev.style.pointerEvents = "auto";
    sliderDots.forEach(element => (element.style.pointerEvents = "auto"));
  }, 600);
};

const initSliderDots = () => {
  sliderDots.forEach((element, key) => {
    element.addEventListener("click", () => {
      offset = 620;
      changeSlideHandler("dots", key, prevSlidePosition);
      whileAnimationHandler();
      setTimeout(() => {
        currentSlide = key;
        dotColorHandler();
        prevSlidePosition = slidePosition;
      }, 530);
    });
  });
}
initSliderDots();

const sideControlHandler = offsetBuff => {
  offset = offsetBuff;
  width = slidePosition;
  setTimeout(() => {
    prevSlidePosition = slidePosition;
  }, 530);
  changeSlideHandler("sideControl");
  whileAnimationHandler();
};

const initControlButtons = () => {
  elemNext.onclick = () => {
    if (currentSlide >= slide.length - 3) {
      slidePosition = 620;
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    sideControlHandler(-620);
    dotColorHandler();
  };

  elemPrev.onclick = () => {
    if (currentSlide <= 0) {
      slidePosition = 620 * -(slide.length - 2);
      currentSlide = slide.length - 3;
    } else {
      currentSlide--;
    }
    sideControlHandler(620);
    dotColorHandler();
  };
}
initControlButtons();

