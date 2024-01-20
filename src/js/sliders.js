import Swiper, { Autoplay, EffectCreative, Pagination } from 'swiper'

class InitSlider {
  classSlider = ''
  settingsSlider = {}
  slider = null

  constructor(props) {
    this.classSlider = props.classSlider
    this.settingsSlider = props.settingsSlider

    this.checkSlider()

    if (this.settingsSlider.destroySize) {
      this.checkResizeSlider()
    }
  }

  checkSlider() {
    if (window.matchMedia(this.settingsSlider.destroySize).matches && this.settingsSlider.destroySize) {
      if (this.slider) {
        try {
          this.destroySlider()
        } catch (e) {
          console.log(e)
        }
      }
      return 1
    } else {
      if (!this.slider) {
        this.initSlider()
      }
    }
  }

  checkResizeSlider() {
    window.addEventListener('resize', () => {
      this.checkSlider()
    })
  }

  initSlider() {
    this.slider = new Swiper(this.classSlider, this.settingsSlider) || null
  }

  destroySlider() {
    this.slider.destroy()
    this.slider = null
    document.querySelectorAll(`${this.classSlider}__slider`)?.forEach((i) => {
      i.removeAttribute('style')
    })
    document.querySelector(`${this.classSlider}__wrapper`)?.removeAttribute('style')
  }
}

const listSliders = [
  {
    classSlider: '.tmpl-hh-header__ticker',
    settingsSlider: {
      modules: [Autoplay],
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      loop: true,
      speed: 12000,
      allowTouchMove: false,
      spaceBetween: 20,
      centeredSlides: true,
      slidesPerView: 'auto',
      breakpoints: {
        699: {
          autoplay: false
        }
      }
    }
  },
  {
    classSlider: ".tmpl-hh-footer__slider-desktop",
    settingsSlider: {
      modules: [Autoplay, EffectCreative],
      parallax: true,
      centeredSlides: true,
      loop: true,
      slideToClickedSlide: true,
      spaceBetween: 4,
      grabCursor: true,
      slidesPerView: 1.92,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      effect: "creative",
      creativeEffect: {
        limitProgress: 2,
        prev: {
          scale: 0.775,
          translate: ["-91%", 0, 0],
        },
        next: {
          scale: 0.775,
          translate: ["91%", 0, 0],
        },
      },
      breakpoints: {
        700: {
          slidesPerView: 1.8,
          spaceBetween: 8,
          creativeEffect: {
            limitProgress: 2,
            prev: {
              scale: 0.775,
              translate: ["-91%", 0, 0],
            },
            next: {
              scale: 0.775,
              translate: ["91%", 0, 0],
            },
          },
        }
      }
    },
  },
]

export const initSliders = () => {
  listSliders.map((i) => {
    new InitSlider(i)
  })
}
