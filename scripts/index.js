function checkWidth() {
  $vWidth = $(window).width()

  //Check condition for screen width
  if ($vWidth < 768.02) {
    $('.nav__links').hide()

    $('.hamburger').click(function () {
      $(this).toggleClass('open')
      $('#nav__bar').toggleClass('blurBg')
      $('.nav__links').toggleClass('open')
      $('.nav__control').fadeIn(500).toggleClass('open')
      $('.nav__links').slideToggle(500)
    })
  } else {
    $('.nav__links').show()
  }
}

$(document).ready(function () {
  checkWidth()
})
$(window).on('resize', function () {
  checkWidth()
})

// $(window).scroll(function () {
//   var height = $(window).scrollTop()
//   console.log(height)
//   if (height > 0) {
//     $('#nav__bar').toggleClass('scrollBg')
//   }
// })

// $(document).ready(function () {
//   if ($(window).width() < 768.02) {
//     $('.nav__links').hide()

//     $('.hamburger').click(function () {
//       $(this).toggleClass('open')
//       $('#nav__bar').toggleClass('blurBg')
//       $('.nav__links').toggleClass('open')
//       $('.nav__control').fadeIn(500).toggleClass('open')
//       $('.nav__links').slideToggle(500)
//     })
//   } else {
//     $('.nav__links').show()
//   }
// })

// // A FUNCTION TO GET ELEMENT BY CLASSNAME
// function selectElementByClass(className) {
//   return document.querySelector(`.${className}`)
// }

// // BEGINING OF NAVBAR HAMBURGER MENU
// const overlayContent = selectElementByClass('overlay')
// const hamburger = selectElementByClass('hamburger')
// const navBar = selectElementByClass('nav__bar')
// const navBrand = selectElementByClass('nav__brand')
// const navLinks = selectElementByClass('nav__links')
// const homeNavItem = selectElementByClass('homeNavItem')
// const servicesNavItem = selectElementByClass('servicesNavItem')
// const contactNavItem = selectElementByClass('contactNavItem')
// const servicesPage = selectElementByClass('services')
// const navLinkItem = document.querySelectorAll('.nav__links .link__item')

// // ADD EVENT LISTENER TO HAMBURGER BUTTON & LIST ITEMS
// hamburger.addEventListener('click', openMenu)
// homeNavItem.addEventListener('click', closeMenu)
// servicesNavItem.addEventListener('click', closeMenu)
// contactNavItem.addEventListener('click', closeMenu)

// // DISCLAIMER PAGE
// const disclaimerPage = selectElementByClass('disclaimer')
// const showPage = () => {
//   if (window.localStorage.getItem('vincentpryce') === 'Yes') {
//     disclaimerPage.classList.add('display-none')
//   }
// }

// // REDIRECT TO GOOGLE
// const redirectPage = () => {
//   window.location.replace('https://google.com/')
// }

// // ADD OPEN CLASS TO BRING NAV LINKS INTO VIEWPORT
// function openMenu() {
//   navLinks.classList.toggle('open')
//   // ADD DARKER BACKGROUND TO THE NAV BRANDS & NAV LIST ITEMS
//   navBrand.classList.toggle('open')
//   overlayContent.classList.toggle('open')
// }

// // REMOVE OPEN CLASS TO CLOSE NAV LINKS MENU
// function closeMenu() {
//   navLinks.classList.remove('open')
//   // REMOVE DARK BACKGROUND ON THE NAV BRANDS & NAV LIST ITEMS
//   navBrand.classList.remove('open')
//   overlayContent.classList.remove('open')
// }
// // END OF NAVBAR HAMBURGER MENU

// // BEGINING OF NAVBAR INTERSECTION OBSERVER
// const sections = [
//   selectElementByClass('home'),
//   selectElementByClass('services'),
//   selectElementByClass('contact'),
// ]

// const navItems = {
//   home: selectElementByClass('homeNavItem'),
//   services: selectElementByClass('servicesNavItem'),
//   contact: selectElementByClass('contactNavItem'),
// }

// // intersection observer setup
// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.7,
// }

// function observerCallback(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // get the nav item corresponding to the id of the section
//       // that is currently in view
//       const navItem = navItems[entry.target.id]
//       // console.log(navItem)
//       // add 'active' class on the navItem
//       navItem.classList.add('active')

//       // remove 'active' class from any navItem that is not
//       // same as 'navItem' defined above
//       Object.values(navItems).forEach(item => {
//         if (item != navItem) {
//           item.classList.remove('active')
//         }
//       })
//     }
//   })
// }

// const observer = new IntersectionObserver(observerCallback, observerOptions)

// sections.forEach(sec => observer.observe(sec))

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
// // END OF NAVBAR INTERSECTION OBSERVER

// BEGINING OF SLIDER
let count = -1
let slides = jQuery.makeArray($('#slides article')), //base 0
  totalSlides = slides.length - 1
let startPos = { top: '100%', 'z-index': '0' },
  endPos = { top: '0px', 'z-index': '2' },
  prevPos = { top: '-100%', 'z-index': '0' },
  transit = { transition: 'top 800ms ease 0s', 'transition-delay': '0s' },
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
    timer = setTimeout(playSlides, 7500)
    unbindBtn()
  })
}

//next and prev buttons

function upDown() {
  $('.next').bind('click', function () {
    advance()
    selectDots()
    clearTimeout(timer)
    timer = setTimeout(playSlides, 7500)
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
    timer = setTimeout(playSlides, 7500)
    unbindBtn()
  })
}

function unbindBtn() {
  $('.next,.prev,.dot').unbind('click')
  setTimeout(upDown, 800)
  setTimeout(clickDots, 800)
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
