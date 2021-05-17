import WidgetSlideNavigation from './widgets/slide-navigation'

$(document).ready(() => {
  WidgetSlideNavigation()

  const mainHero = new Swiper('.c-main-hero__slider', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
    /* autoplay: {
      delay: 5000
    } */
  })
})
