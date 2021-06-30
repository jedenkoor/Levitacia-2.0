import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'

class Init {
  constructor() {
    this.init()

    this.directionScroll = []
  }

  init() {
    this.events()

    setTimeout(() => {
      this.actions().showBody()
    }, 300)

    if (document.querySelectorAll('.goods-slider__list').length) {
      const goodsSliders = document.querySelectorAll('.goods-slider__list')
      goodsSliders.forEach((item) => {
        this.actions().initGoodsSlider(item)
      })
    }

    if (document.querySelectorAll('.good-hide__wrapper').length) {
      const sizesSliders = document.querySelectorAll('.good-hide__wrapper')
      sizesSliders.forEach((item) => {
        this.actions().initSizesSlider(item)
      })
    }
  }

  events() {
    // const _this = this
  }

  actions() {
    // const _this = this

    return {
      showBody() {
        document.querySelector('body').style.opacity = 1
      },
      initGoodsSlider(el) {
        ;(() =>
          new Swiper(el, {
            spaceBetween: 22,
            slidesPerView: 4,
            resistanceRatio: 0,
            threshold: 5
          }))()
      },
      initSizesSlider(el) {
        const slider = el.querySelector('.good-hide__slider')
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        ;(() =>
          new Swiper(slider, {
            spaceBetween: 8,
            slidesPerView: 4,
            resistanceRatio: 0,
            allowTouchMove: false,
            navigation: {
              prevEl: prevArr,
              nextEl: nextArr
            }
          }))()
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
