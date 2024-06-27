import Slider from "./classes/Slider.js";
import Slidersecond from "./classes/SliderSecond.js";
const participantsSlider = new Slider(".participants__slider", {
  spaceBetween: "20",
  slidesPerView: 3,
});

function initSwiper() {
  if (window.innerWidth <= 1660) {
    const stagesSlider = new Slidersecond(".stages__slider", {
      spaceBetween: "20",
      slidesPerView: 3,
      slidesToScroll: 1,
    });
  }

  if (window.innerWidth <= 1480) {
    const participantsSlider = new Slider(".participants__slider", {
      spaceBetween: "20",
      slidesPerView: 2,
    });
  }

  if (window.innerWidth <= 1480) {
    const stagesSlider = new Slidersecond(".stages__slider", {
      spaceBetween: "20",
      slidesPerView: 2,
      slidesToScroll: 1,
    });
  }
  if (window.innerWidth <= 980) {
    const stagesSlider = new Slidersecond(".stages__slider", {
      spaceBetween: "20",
      slidesPerView: 1,
      slidesToScroll: 1,
    });
  }
  if (window.innerWidth <= 768) {
    const participantsSlider = new Slider(".participants__slider", {
      spaceBetween: "20",
      slidesPerView: 1,
    });
  }
}
initSwiper();
