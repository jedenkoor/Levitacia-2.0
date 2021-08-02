import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'

import 'ilyabirman-likely/release/likely.min.js'

import Clipboard from 'clipboard/dist/clipboard.min.js'

import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'

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

    Fancybox.bind('[data-fancybox]', {
      infinite: false,
      closeButton: 'outside',
      dragToClose: false,
      Image: {
        zoom: false
      },
      Thumbs: {
        autoStart: false
      }
    })

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

    if (document.querySelectorAll('.accordion__text').length) {
      const accordionText = document.querySelectorAll('.accordion__text')
      accordionText.forEach((item) => {
        this.actions().initAccordion(item)
      })
    }

    if (
      document.querySelectorAll('.goodpage-gallery__wrapper').length &&
      document.documentElement.clientWidth < 1024
    ) {
      const goodpageSlider = document.querySelectorAll('.goodpage-gallery__wrapper')
      goodpageSlider.forEach((item) => {
        this.actions().initGoodpageSlider(item)
      })
    }

    if (document.querySelectorAll('.goodpage-socials__copy').length) {
      const url = document.location.href
      const clipboard = new Clipboard('.goodpage-socials__copy', {
        text: function () {
          return url
        }
      })
      clipboard.on('success', (e) => {
        e.trigger.classList.add('active')
        setTimeout(() => {
          e.trigger.classList.remove('active')
          e.trigger.focus()
        }, 1000)
      })
    }
  }

  events() {
    const _this = this

    const scrollBLocks = document.querySelectorAll('.scroll-block')
    scrollBLocks.forEach((item) => {
      document.addEventListener('scroll', () => {
        _this.actions().scrollBlock(item)
      })
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
      _this.actions().closeMenu()
      _this.actions().toggleSelect(this)
      if (this.classList.contains('header-menu__link')) {
        _this.actions().toggleHeader()
      }
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
        document.querySelector('.header').classList.remove('header--search')
      }
    })

    window.ap(document).on('click', '.accordion__open', function (e) {
      e.preventDefault()
      _this.actions().toggleAccordionText(this)
    })

    window.ap(document).on('click', '.tabs__btn', function (e) {
      e.preventDefault()
      _this.actions().tabChange(this)
    })

    window.ap(document).on('click', '.good__show', function (e) {
      e.preventDefault()
      _this.actions().showSizes(this)
    })
    document.addEventListener('click', (e) => {
      if (
        e.target !== document.querySelector('.good__hide--active') &&
        e.target.closest('.good__hide--active') === null &&
        e.target !== document.querySelector('.good__show') &&
        e.target.closest('.good__show') === null
      ) {
        document.querySelectorAll('.good__show').forEach((item) => {
          item.classList.remove('good__show--active')
        })
        document.querySelectorAll('.good__hide').forEach((item) => {
          item.classList.remove('good__hide--active')
        })
      }
    })

    window.ap(document).on('click', '.clear', function (e) {
      e.preventDefault()
      _this.actions().clearInput(this)
    })

    window.ap(document).on('click', '.header__burger', (e) => {
      e.preventDefault()
      _this.actions().toggleMenu()
    })

    window.ap(document).on('click', '.mobile-menu__link', (e) => {
      _this.actions().closeMenu()
    })
  }

  actions() {
    return {
      scrollBlock: (el) => {
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
        const prevArr = el.querySelector('.swiper-button-prev')
        const nextArr = el.querySelector('.swiper-button-next')
        const swiper = new Swiper(el, {
          spaceBetween: 22,
          slidesPerView: 1,
          resistanceRatio: 0,
          threshold: 5,
          navigation: {
            prevEl: prevArr,
            nextEl: nextArr
          },
          breakpoints: {
            768: {
              slidesPerView: 3
            },
            1200: {
              slidesPerView: 4
            }
          }
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
            },
            breakpoints: {
              768: {
                slidesPerView: 3
              },
              1024: {
                slidesPerView: 4
              }
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
      initAccordion(el) {
        setTimeout(() => {
          el.setAttribute('data-height', el.offsetHeight)
          if (el.closest('.accordion').classList.contains('accordion--active')) {
            el.style.height = `${el.offsetHeight}px`
          } else {
            el.style.height = '0px'
          }
        }, 100)
      },
      toggleAccordionText(el) {
        const info = el.closest('.accordion').querySelector('.accordion__text')
        el.closest('.accordion').classList.toggle('accordion--active')
        if (info.style.height === '0px') {
          info.style.height = `${info.dataset.height}px`
        } else {
          info.style.height = 0
        }
      },
      tabChange(el) {
        const tabDataAttr = el.getAttribute('data-tab')
        const tabContainers = el.closest('.tabs').querySelectorAll('.tabs__block')
        const tabNavigationItem = el.closest('.tabs').querySelectorAll('.tabs__btn')

        tabContainers.forEach((item) => {
          item.classList.remove('tabs__block--active')
          if (item.getAttribute('data-tab') === tabDataAttr) {
            item.classList.add('tabs__block--active')
          }
        })

        tabNavigationItem.forEach((item) => {
          if (item.getAttribute('data-tab') !== tabDataAttr) {
            item.classList.remove('tabs__btn--active')
          }
        })

        el.classList.add('tabs__btn--active')
      },
      showSizes(el) {
        document.querySelectorAll('.good__show').forEach((item) => {
          item.classList.remove('good__show--active')
        })
        document.querySelectorAll('.good__hide').forEach((item) => {
          item.classList.remove('good__hide--active')
        })
        el.classList.add('good__show--active')
        el.nextElementSibling.classList.add('good__hide--active')
      },
      initGoodpageSlider(el) {
        const pagination = el.querySelector('.swiper-pagination')
        ;(() =>
          new Swiper(el, {
            spaceBetween: 8,
            resistanceRatio: 0,
            threshold: 5,
            pagination: {
              el: pagination,
              type: 'bullets'
            }
          }))()
      },
      clearInput(el) {
        const input = el.closest('.input-block').querySelector('input')
        input.value = ''
      },
      toggleMenu() {
        document.querySelector('.header__mobmenu').classList.toggle('header__mobmenu--active')
        document.querySelector('.header').classList.toggle('header--active')
        document.querySelector('html').classList.toggle('fixed')
      },
      closeMenu() {
        document.querySelector('.header__mobmenu').classList.remove('header__mobmenu--active')
        document.querySelector('.header').classList.remove('header--active')
        document.querySelector('html').classList.remove('fixed')
      },
      toggleHeader() {
        document.querySelector('.header').classList.toggle('header--search')
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.controller = new Init()
})
