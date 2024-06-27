class Slider {
  constructor(selector, config) {
    this.sliderEl = document.querySelector(selector);
    this.sliderWrapperEl = this.sliderEl.querySelector(".slider__wrapper");
    this.slideEls = this.sliderWrapperEl.querySelectorAll(".slider__slide");
    this.sliderBtnPrev = this.sliderEl.querySelector(".slider__btn-prev");
    this.sliderBtnNext = this.sliderEl.querySelector(".slider__btn-next");
    this.participantsCounterCurrent = this.sliderEl.querySelector(
      ".participants__counter-current"
    );
    this.participantsCounterTotal = this.sliderEl.querySelector(
      ".participants__counter-total"
    );

    this.position = 0;
    this.slidesCount = this.slideEls.length;
    this.spaceBetween = parseInt(config.spaceBetween); // Преобразуем в число
    this.slidesPerView = config.slidesPerView;
    this.slideWidth =
      (this.sliderWrapperEl.offsetWidth -
        (this.slidesPerView - 1) * this.spaceBetween) /
      this.slidesPerView;

    this.pages = Math.ceil(this.slidesCount / this.slidesPerView);
    this.currentPage = 1;

    this.#init();
    this.moveSliderPrev();
    this.moveSliderNext();
  }

  #init() {
    this.sliderWrapperEl.style.gridTemplateColumns = `repeat(${this.slidesCount}, ${this.slideWidth}px)`;
    this.sliderWrapperEl.style.gap = `${this.spaceBetween}px`;
    this.sliderWrapperEl.style.transform = "translateX(0%)";

    if (this.participantsCounterCurrent && this.participantsCounterTotal) {
      this.updateParticipantsCounter();
      this.participantsCounterTotal.textContent = this.slidesCount;
    }
  }

  setSliderWrapperPosition(position) {
    this.sliderWrapperEl.style.transform = `translateX(${position}px)`;
  }

  goNext() {
    if (this.currentPage < this.pages) {
      this.currentPage++;
      this.position -=
        (this.slideWidth + this.spaceBetween) * this.slidesPerView;
      this.setSliderWrapperPosition(this.position);
      this.updateParticipantsCounter();
    }
  }

  goPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.position +=
        (this.slideWidth + this.spaceBetween) * this.slidesPerView;
      this.setSliderWrapperPosition(this.position);
      this.updateParticipantsCounter();
    }
  }

  updateParticipantsCounter() {
    const currentCount = Math.min(
      this.currentPage * this.slidesPerView,
      this.slidesCount
    );
    this.participantsCounterCurrent.textContent = currentCount;
    this.participantsCounterTotal.textContent = this.slidesCount;
  }

  moveSliderPrev() {
    this.sliderBtnPrev.addEventListener("click", () => {
      this.goPrev();
    });
  }

  moveSliderNext() {
    this.sliderBtnNext.addEventListener("click", () => {
      this.goNext();
    });
  }
}

export default Slider;
