export default () => {
  $('[data-sn-next]').click((e) => {
    e.preventDefault()

    let nextItemValue = $(this).data('sn-next')

    // push the current item
    let $currentItem = $(this).parent('.w-sn__item')
    $currentItem.css('transform', 'translateX(-100%)')
    $currentItem.removeClass('w-sn__item--activated')

    // pull the next item
    let $nextItem = $currentItem.siblings(
      '.w-sn__item[data-sn-item="' + nextItemValue + '"]'
    )
    $nextItem.css('transform', 'none')
    $nextItem.addClass('w-sn__item--activated')

    // solving click animation bug
    $currentItem.parent('.w-sn__wrapper').css('pointer-events', 'none')
    $currentItem.one(
      'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      () => {
        $currentItem.parent('.w-sn__wrapper').css('pointer-events', '')
      }
    )

    // set the height of wrapper
    $currentItem.parent('.w-sn__wrapper').css('height', $nextItem.outerHeight())
  })

  $('[data-sn-prev]').click((e) => {
    e.preventDefault()

    let prevItemValue = $(this).data('sn-prev')

    // push the current item
    let $currentItem = $(this).parent('.w-sn__item')
    $currentItem.css('transform', '')
    $currentItem.removeClass('w-sn__item--activated')

    // pull the previous item
    let $prevItem = $currentItem.siblings(
      '.w-sn__item[data-sn-item="' + prevItemValue + '"]'
    )
    $prevItem.css('transform', 'none')
    $prevItem.addClass('w-sn__item--activated')

    // solving click animation bug
    $currentItem.parent('.w-sn__wrapper').css('pointer-events', 'none')
    $currentItem.one(
      'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      () => {
        $currentItem.parent('.w-sn__wrapper').css('pointer-events', '')
      }
    )

    // set the height of wrapper
    $currentItem.parent('.w-sn__wrapper').css('height', $prevItem.outerHeight())
  })
}
