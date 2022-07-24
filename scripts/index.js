function checkWidth() {
  if ($(window).width() < 768.02) {
    $('.nav__links').hide()
    $('.hamburger').click(function () {
      $('.hamburger').toggleClass('open')
      $('#nav__bar').toggleClass('blurBg')
      $('.nav__links').toggleClass('open')
      $('.nav__control').toggleClass('open')
      $('.nav__links').slideToggle(500)
    })
  } else if ($(window).width() >= 768.02) {
    $('.nav__links').show()
  }
}

$(document).ready(function () {
  checkWidth()
})
$(window).on('resize', function () {
  checkWidth()
  location.reload()
})

// A FUNCTION TO GET ELEMENT BY CLASSNAME
function selectElementByClass(className) {
  return document.querySelector(`.${className}`)
}

// BEGINING OF NAVBAR HAMBURGER MENU
// const overlayContent = selectElementByClass('overlay')
// const hamburger = selectElementByClass('hamburger')
// const navBar = selectElementByClass('nav__bar')
// const navBrand = selectElementByClass('nav__brand')
// const navLinks = selectElementByClass('nav__links')
const homeNavItem = selectElementByClass('homeNavItem')
const servicesNavItem = selectElementByClass('servicesNavItem')
const aboutNavItem = selectElementByClass('aboutNavItem')
const contactNavItem = selectElementByClass('contactNavItem')
const servicesPage = selectElementByClass('services')
const navLinkItem = document.querySelectorAll('.nav__links .link__item')

// // BEGINING OF NAVBAR INTERSECTION OBSERVER
const sections = [
  selectElementByClass('home'),
  selectElementByClass('about'),
  selectElementByClass('services'),
  selectElementByClass('contact'),
]

const navItems = {
  home: selectElementByClass('homeNavItem'),
  about: selectElementByClass('aboutNavItem'),
  services: selectElementByClass('servicesNavItem'),
  contact: selectElementByClass('contactNavItem'),
}
// console.log(navItems)
// intersection observer setup
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // get the nav item corresponding to the id of the section
      // that is currently in view
      // console.log(navItems)
      console.log(entry.target.id)
      const navItem = navItems[entry.target.id]
      // console.log(navItem)
      // add 'active' class on the navItem
      navItem.classList.add('active')

      // remove 'active' class from any navItem that is not
      // same as 'navItem' defined above
      Object.values(navItems).forEach(item => {
        if (item != navItem) {
          item.classList.remove('active')
        }
      })
    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)

sections.forEach(sec => observer.observe(sec))

// // ADD DARK BACKGROUND COLOR TO NAVBAR WHEN CONTACT PAGE IS IN VIEW
// window.addEventListener('wheel', () => {
//   // console.log('Wheel')
//   if (contactNavItem.classList.contains('active')) {
//     // if (contactNavItem.classList.length > 2) {
//     // console.log('Yes')
//     navBar.classList.add('open')
//   } else {
//     navBar.classList.remove('open')
//   }
// })
// END OF NAVBAR INTERSECTION OBSERVER

// BEGINING OF SLIDER
let count = -1
let slides = jQuery.makeArray($('#slides article')), //base 0
  totalSlides = slides.length - 1
let startPos = { top: '100%', 'z-index': '0' },
  endPos = { top: '0px', 'z-index': '1' },
  prevPos = { top: '-100%', 'z-index': '0' },
  transit = {
    transition: 'top 1s ease-in 0s',
    // transition: 'top 800ms ease-in 0s',
    'transition-delay': '0s',
  },
  nonetrans = { transition: 'none' },
  timer = null

function advance() {
  if (count == totalSlides) {
    $(slides[count]).animate(startPos, 0).css(transit)
    count = 0
    $(slides[count]).css(prevPos).css(nonetrans)
    $(slides[count]).animate(endPos, 0).css(transit)
  } else {
    $(slides[count]).animate(startPos, 0).css(transit)
    count++
    $(slides[count]).css(prevPos).css(nonetrans)
    $(slides[count]).animate(endPos, 0).css(transit)
  }
}

function rewind() {
  if (count === 0) {
    $(slides[count]).animate(prevPos, 0).css(transit)
    count = totalSlides
    $(slides[count]).css(startPos).css(nonetrans)
    $(slides[count]).animate(endPos, 0).css(transit)
  } else {
    $(slides[count]).prev().css(startPos).css(nonetrans)
    $(slides[count]).animate(prevPos, 0).css(transit)
    count = count - 1
    $(slides[count]).animate(endPos, 0).css(transit)
  }
}

//Dots functions
function selectDots() {
  n = count + 1
  $('.dot:nth-child(' + n + ')').addClass('selected')
  $('.dot:nth-child(' + n + ')')
    .siblings()
    .removeClass('selected')
}

function clickDots() {
  $('.dot').bind('click', function () {
    let index = $(this).index()
    if (count > index) {
      $(slides[count]).animate(prevPos, 0).css(transit)
      count = index
      $(slides[count]).css(startPos).css(nonetrans)
      $(slides[count]).animate(endPos, 0).css(transit)
    } else if (count < index) {
      $(slides[count]).animate(startPos, 0).css(transit)
      count = index
      $(slides[count]).css(prevPos).css(nonetrans)
      $(slides[count]).animate(endPos, 0).css(transit)
    } else {
      return false
    }
    selectDots()
    clearTimeout(timer)
    timer = setTimeout(playSlides, 9000)
    // timer = setTimeout(playSlides, 7500)
    unbindBtn()
  })
}

//next and prev buttons

function upDown() {
  $('.next').bind('click', function () {
    advance()
    selectDots()
    clearTimeout(timer)
    timer = setTimeout(playSlides, 9000)
    // timer = setTimeout(playSlides, 7500)
    unbindBtn()
  })

  $('.prev').bind('click', function () {
    if (count == -1) {
      count = 0
    } else {
      rewind()
    }

    selectDots()
    clearTimeout(timer)
    timer = setTimeout(playSlides, 9000)
    // timer = setTimeout(playSlides, 7500)
    unbindBtn()
  })
}

function unbindBtn() {
  $('.next,.prev,.dot').unbind('click')
  setTimeout(upDown, 1000)
  setTimeout(clickDots, 1000)
  // setTimeout(upDown, 800)
  // setTimeout(clickDots, 800)
}

// Slideshow automatic slide function
function playSlides() {
  clickDots()
  upDown()
  function loop() {
    advance()
    selectDots()
    timer = setTimeout(loop, 5000)
    unbindBtn()
  }
  loop()
}

$(document).ready(function () {
  playSlides()
})
// END OF SLIDER

// // REMOVE FIXED HEADING TITLE ON SCROLL
// const removeFixed = () => {
//   if (window.scrollY > 0) {
//     title.forEach(element => {
//       element.classList.remove('fixed')
//       element.classList.add('absolute')
//     })
//   } else {
//     title.forEach(element => {
//       element.classList.remove('absolute')
//       element.classList.add('fixed')
//     })
//   }
// }
// const title = document.querySelectorAll('.caption__container')
// window.addEventListener('scroll', removeFixed)
