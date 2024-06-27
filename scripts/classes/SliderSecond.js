class Slidersecond {
  constructor(selector, config) {
    this.sliderEl = document.querySelector(selector);
    this.sliderWrapperEl = this.sliderEl.querySelector(".slider__wrapper");
    this.slideEls = this.sliderWrapperEl.querySelectorAll(".slider__slide");
    this.sliderBtnPrev = this.sliderEl.querySelector(".slider__btn-prev");
    this.sliderBtnNext = this.sliderEl.querySelector(".slider__btn-next");
    this.paginationEl = this.sliderEl.querySelector(".slider__pagination");

    this.position = 0; // Позиция слайдов
    this.slidesCount = this.slideEls.length; // Количество слайдов
    this.spaceBetween = parseInt(config.spaceBetween); // Расстояние между слайдами
    this.slidesPerView = config.slidesPerView; // Количество отображаемых слайдов
    this.slidesToScroll = config.slidesToScroll || 1; // Количество пролистываемых слайдов

    // Ширина слайда
    this.slideWidth =
      (this.sliderWrapperEl.offsetWidth -
        (this.slidesPerView - 1) * this.spaceBetween) /
      this.slidesPerView;

    this.pages = Math.ceil(
      (this.slidesCount - this.slidesPerView) / this.slidesToScroll
    );
    this.currentPage = 1;

    this.#init();
    this.#attachEventListeners();
    this.#createPagination();
  }

  #init() {
    this.sliderWrapperEl.style.gridTemplateColumns = `repeat(${this.slidesCount}, ${this.slideWidth}px)`;
    this.sliderWrapperEl.style.gap = `${this.spaceBetween}px`;
    this.sliderWrapperEl.style.transform = "translateX(0px)";
  }

  // Пролиствает слайды на нужную длину
  setSliderWrapperPosition(position) {
    this.sliderWrapperEl.style.transform = `translateX(${position}px)`;
  }

  // Метод промотки сладов вперед
  goNext() {
    if (this.currentPage >= this.pages) return;
    this.currentPage++;
    this.position -=
      (this.slideWidth + this.spaceBetween) * this.slidesToScroll;
    this.setSliderWrapperPosition(this.position);
    this.updatePagination();
  }

  // Метод промотки сладов назад
  goPrev() {
    if (this.currentPage <= 1) return;
    this.currentPage--;
    this.position +=
      (this.slideWidth + this.spaceBetween) * this.slidesToScroll;
    this.setSliderWrapperPosition(this.position);
    this.updatePagination();
  }

  // Создание пагинации
  #createPagination() {
    console.log(this.pages);
    this.paginationEl.innerHTML = ""; // Очистка контейнера пагинации
    for (let i = 1; i <= this.pages; i++) {
      const dot = document.createElement("span");
      console.log(dot);
      dot.classList.add("slider__pagination-item");
      if (i === 1) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToPage(i));
      this.paginationEl.appendChild(dot);
    }
  }

  // Обновление активной точки пагинации
  updatePagination() {
    const dots = this.paginationEl.querySelectorAll(".slider__pagination-item");
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === this.currentPage - 1) {
        dot.classList.add("active");
      }
    });
  }

  // Переход к определенной странице
  goToPage(page) {
    if (page < 1 || page > this.pages || page === this.currentPage) return;
    const newPosition = -(
      (page - 1) *
      this.slidesToScroll *
      (this.slideWidth + this.spaceBetween)
    );
    this.position = newPosition;
    this.setSliderWrapperPosition(this.position);
    this.currentPage = page;
    this.updatePagination();
  }

  #attachEventListeners() {
    this.sliderBtnPrev.addEventListener("click", () => this.goPrev());
    this.sliderBtnNext.addEventListener("click", () => this.goNext());
  }
}

export default Slidersecond;
