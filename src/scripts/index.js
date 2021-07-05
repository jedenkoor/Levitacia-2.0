import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'

class Init {
  constructor() {
    this.init()

    this.directionScroll = [0]
    this.count = -24
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

    if (document.querySelectorAll('.goodpage-accordion__text').length) {
      const goodInfo = document.querySelectorAll('.goodpage-accordion__text')
      goodInfo.forEach((item) => {
        this.actions().initGoodInfo(item)
      })
    }
  }

  events() {
    const _this = this

    document.addEventListener('scroll', (e) => {
      _this.actions().scrollBlock()
    })

    const emailInput = document.querySelectorAll('input[data-type="email"]')
    emailInput.forEach((item) => {
      item.addEventListener('blur', function () {
        _this.actions().checkEmail(this)
      })
    })

    const noTelAndEmailInput = document.querySelectorAll(
      'input:not([data-type="tel"]):not([data-type="email"]), textarea'
    )
    noTelAndEmailInput.forEach((item) => {
      item.addEventListener('blur', function () {
        _this.actions().checkOtherInputs(this)
      })
    })

    const inputs = document.querySelectorAll('input')
    if (inputs.length) {
      inputs.forEach((item) => {
        item.addEventListener('focus', function () {
          this.select()
        })
      })
    }

    window.ap(document).on('click', '.select-open', function (e) {
      e.preventDefault()
      _this.actions().toggleSelect(this)
    })
    document.addEventListener('click', (e) => {
      if (
        e.target !== document.querySelector('.select-content') &&
        e.target.closest('.select-content') === null &&
        e.target !== document.querySelector('.select-open') &&
        e.target.closest('.select-open') === null
      ) {
        document.querySelectorAll('.select').forEach((item) => {
          item.classList.remove('select--active')
        })
      }
    })

    window.ap(document).on('click', '.goodpage-accordion__open', function (e) {
      e.preventDefault()
      _this.actions().toggleGoodInfo(this)
    })
  }

  actions() {
    const el = document.querySelector('.scroll-block')
    return {
      scrollBlock: () => {
        this.directionScroll.push(window.pageYOffset)
        if (
          this.directionScroll[0] < this.directionScroll[1] &&
          el.getBoundingClientRect().bottom > window.innerHeight - 30 &&
          el.getBoundingClientRect().top <= 24
        ) {
          this.count = this.count + (this.directionScroll[1] - this.directionScroll[0])
          if (this.count >= el.offsetHeight - window.innerHeight + 30) {
            this.count = el.offsetHeight - window.innerHeight + 30
          }
        } else if (
          this.directionScroll[0] >= this.directionScroll[1] &&
          el.getBoundingClientRect().top < 24
        ) {
          this.count = this.count - (this.directionScroll[0] - this.directionScroll[1])
          if (this.count <= -24) {
            this.count = -24
          }
        }
        el.style.top = `${-this.count}px`
        this.directionScroll.shift()
      },
      checkEmail(el) {
        const pattern = /^[a-z0-9_.-]+@[a-z0-9_.-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i
        if (el.value !== '') {
          if (el.value.search(pattern) === 0) {
            el.classList.add('input-border')
          } else {
            el.classList.remove('input-border')
          }
        } else {
          el.classList.remove('input-err')
          el.classList.remove('input-border')
        }
      },
      checkOtherInputs(el) {
        if (el.value !== '') {
          el.classList.add('input-border')
        } else {
          el.classList.remove('input-border')
        }
      },
      showBody() {
        document.querySelector('body').style.opacity = 1
      },
      initGoodsSlider(el) {
        const swiper = new Swiper(el, {
          spaceBetween: 22,
          slidesPerView: 4,
          resistanceRatio: 0,
          threshold: 5
        })
        setTimeout(function () {
          swiper.update()
        }, 300)
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
      },
      toggleSelect(el) {
        const select = el.closest('.select')
        if (select.classList.contains('select--active')) {
          select.classList.remove('select--active')
        } else {
          document.querySelectorAll('.select').forEach((item) => {
            item.classList.remove('select--active')
          })
          select.classList.add('select--active')
        }
      },
      initGoodInfo(el) {
        setTimeout(() => {
          el.setAttribute('data-height', el.offsetHeight)
          el.style.height = `${el.offsetHeight}px`
        }, 100)
      },
      toggleGoodInfo(el) {
        const info = el.closest('.goodpage__accordion').querySelector('.goodpage-accordion__text')
        el.closest('.goodpage__accordion').classList.toggle('goodpage__accordion--active')
        if (info.style.height === '0px') {
          info.style.height = `${info.dataset.height}px`
        } else {
          info.style.height = 0
        }
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
