$('input[type="tel"]').inputmask({
	mask: "+7(999)999-99-99",
	showMaskOnHover: false,
	showMaskOnFocus: true
})

var mySwiper1 = new Swiper("#stage-slider.swiper-container", {
	speed: 500,
	spaceBetween: 0
})

var mySwiper2 = new Swiper("#main-diploma-slider .diploma-block__container", {
	speed: 500,
	spaceBetween: 10,
	slidesPerView: 4,
	autoplay: false,
	noSwiping: true,
	onlyExternal: true,
	keyboard: false,
	simulateTouch: false,

	breakpoints: {
		1140: {
			slidesPerView: 3,
			spaceBetween: 10,
			noSwiping: false,
			onlyExternal: false,
			keyboard: true,
			simulateTouch: true
		},
		800: {
			slidesPerView: 2,
			spaceBetween: 0
		},

		700: {
			slidesPerView: 1,
			spaceBetween: 0
		}
	}
})

var mySwiper3 = new Swiper("#second-diploma-slider .diploma-block__container", {
	speed: 500,
	slidesPerView: 6,
	slidesPerColumn: 2,
	spaceBetween: 15,
	loop: false,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},

	breakpoints: {
		1500: {
			slidesPerView: 4
		},

		1024: {
			slidesPerView: 3
		},

		580: {
			slidesPerView: 2
		},

		450: {
			slidesPerView: 1,
			spaceBetween: 0
		}
	}
})

var clickItemMenu = function () {
	var menuItem = document.querySelectorAll(".header-menu__item")

	document.body.addEventListener("click", function (e) {
		for (var item of menuItem) {
			var submenu = item.querySelector(".header-submenu")

			if (submenu) {
				if (e.target == item.querySelector("a")) {
					if (
						!item
						.querySelector("a")
						.getAttribute("href")
						.substr(1)
					) {
						e.preventDefault()
						submenu.classList.add("open")
						item.querySelector("a").setAttribute('aria-expanded', 'true');
					}
				} else {
					submenu.classList.remove("open")
					item.querySelector("a").setAttribute('aria-expanded', 'false');
				}
			}
		}
	})
}

clickItemMenu()

var getOpenMenu = function () {
	var overlayMenu = document.getElementById("layout-menu")
	var btn = document.querySelector(".burger-menu")

	btn.addEventListener("click", function () {
		overlayMenu.classList.add("open")
		this.setAttribute('aria-expanded', 'true');
	})
}

getOpenMenu()

var getCloseMenu = function () {
	var overlayMenu = document.getElementById("layout-menu")
	var sectionsMenu = overlayMenu.querySelectorAll(".layout-menu__section")
	var mobileMenuWrapper = overlayMenu.querySelector(".layout-menu__mobile")
	var closeMobile = document.getElementById("close-mobile-menu")
	var layoutLogo = overlayMenu.querySelector(".layout-menu__logo")
	var btnOpen = document.querySelector(".burger-menu")
	var btn = document.getElementById("close-layout-menu")

	btn.addEventListener("click", function () {
		overlayMenu.classList.remove("open")
		closeMobile.classList.remove("open")
		layoutLogo.classList.remove("open")
		btnOpen.setAttribute('aria-expanded', 'false');
		mobileMenuWrapper.classList.remove("close")

		for (var sectionItem of sectionsMenu) {
			if (sectionItem.classList.contains("open")) {
				sectionItem.classList.remove("open")
			}
		}
	})

	overlayMenu.addEventListener("click", function (e) {
		if (e.target === this) {
			overlayMenu.classList.remove("open")
			btnOpen.setAttribute('aria-expanded', 'false');
		}
	})
}

getCloseMenu()

var getMobileMenu = function () {
	var overlayMenu = document.getElementById("layout-menu")
	var layoutLogo = overlayMenu.querySelector(".layout-menu__logo")
	var closeMobile = document.getElementById("close-mobile-menu")
	var mobileMenuWrapper = overlayMenu.querySelector(".layout-menu__mobile")
	var mobileMenu = document.querySelector(".mobile-menu")
	var mobileItem = mobileMenu.querySelectorAll(".mobile-menu__item")
	var sectionsMenu = overlayMenu.querySelectorAll(".layout-menu__section")

	for (var item of mobileItem) {
		item.addEventListener("click", function (e) {
			var link = this.querySelector("a");
			var numSectionMenu = link.hash.substr(1)

			for (var sectionItem of sectionsMenu) {
				var dataNum = sectionItem.dataset.sectionMenu

				if (numSectionMenu === dataNum) {
					e.preventDefault()
					closeMobile.classList.add("open")
					layoutLogo.classList.add("open")
					mobileMenuWrapper.classList.add("close")
					sectionItem.classList.add("open")
					link.setAttribute('aria-expanded', 'true')
				}
			}
		})
	}

	closeMobile.addEventListener("click", function () {
		this.classList.remove("open")
		layoutLogo.classList.remove("open")
		mobileMenuWrapper.classList.remove("close")

		for (var item of mobileItem) {
			item.querySelector("a").setAttribute('aria-expanded', 'false');
		}

		for (var sectionItem of sectionsMenu) {
			if (sectionItem.classList.contains("open")) {
				sectionItem.classList.remove("open")
			}
		}
	})
}

getMobileMenu()

var getOpenSearch = function () {
	var overlaySearch = document.getElementById("layout-search")
	var btn = document.getElementById("search-btn")

	btn.addEventListener("click", function () {
		overlaySearch.classList.add("open")
	})
}

getOpenSearch()

var getCloseSearch = function () {
	var overlaySearch = document.getElementById("layout-search")
	var btn = document.getElementById("close-layout-search")

	btn.addEventListener("click", function () {
		overlaySearch.classList.remove("open")
	})
}

getCloseSearch()

var getHeightSurgeryItem = function () {
	const surgeryItems = document.querySelectorAll(".surgery-list__item")

	for (const item of surgeryItems) {
		const itemContent = item.querySelector(".surgery-list__item-content")
		const btn = item.querySelector(".btn-arrow")

		item.addEventListener("click", function (e) {
			for (const item of surgeryItems) {
				item.querySelector(".surgery-list__item-content").style.height = 0 + "px"
				item.querySelector(".btn-arrow").classList.remove("active")
				item.classList.remove("open")
			}

			const ch = itemContent.clientHeight,
				sh = itemContent.scrollHeight,
				isCollapsed = !ch,
				noHeightSet = !itemContent.style.height

			if (isCollapsed || noHeightSet) {
				itemContent.style.height = sh + "px"
				item.classList.add("open")
				btn.classList.add("active")
			} else {
				itemContent.style.height = 0 + "px"
				item.classList.remove("open")
				btn.classList.remove("active")
			}
		})
	}
}

getHeightSurgeryItem()

var getAnchorText = function () {
	var articleBlock = document.querySelector(".article-block")
	if (articleBlock) {
		var articleSidebar = articleBlock.querySelector(".article-block__left")
		var articleSidebarBox = articleSidebar.getBoundingClientRect()
		var articleSidebarTop = articleSidebarBox.top
		var articleText = articleBlock.querySelector(".article-block__main-text")
		var articleTextParagraph = articleText.querySelectorAll("p")
		var listAnchorText = articleBlock.querySelectorAll(".article-block__anchor-block")

		for (var paragraph of articleTextParagraph) {
			if (paragraph.dataset.anchor) {
				var paragraphBox = paragraph.getBoundingClientRect()
				var paragraphTop = paragraphBox.top

				for (var text of listAnchorText) {
					if (paragraph.dataset.anchor === text.dataset.anchor) {
						text.style.top = paragraphTop - articleSidebarTop + "px"
					}
				}
			}
		}
	}
}
// window.addEventListener("scroll", getAnchorText)
window.addEventListener("load", getAnchorText)
window.addEventListener("resize", getAnchorText)

var getOpenQnA = function () {
	const quBlock = document.querySelector(".qa-block")
	if (quBlock) {
		const quItems = quBlock.querySelectorAll(".qa-block__item")

		for (const item of quItems) {
			const question = item.querySelector(".qa-block__question")

			question.addEventListener("click", function () {
				const answer = this.nextElementSibling

				const ch = answer.clientHeight,
					sh = answer.scrollHeight,
					isCollapsed = !ch,
					noHeightSet = !answer.style.height

				if (isCollapsed || noHeightSet) {
					item.classList.add("open")
					answer.style.height = sh + "px"
				} else {
					item.classList.remove("open")
					answer.style.height = 0 + "px"
				}
			})
		}
	}
}

getOpenQnA()

var getFocusValue = function () {
	var form = document.querySelector(".appointment-form")

	if (form) {
		var fieldiList = form.querySelectorAll(".appointment-form__field")

		for (var field of fieldiList) {
			var input = field.querySelector("input")

			if (input) {

				input.addEventListener("focus", function () {
					this.parentElement.classList.add("appointment-form__field_focus")
				})

				input.addEventListener("blur", function () {
					if (this.value !== "") {
						this.parentElement.classList.add("appointment-form__field_focus")
					} else {
						this.parentElement.classList.remove("appointment-form__field_focus")
					}
				})
			}
		}
	}
}

getFocusValue()

var scrollTo = function (element, to, duration) {
	if (duration < 0) return
	var difference = to - element.scrollTop
	var perTick = (difference / duration) * 2

	setTimeout(function () {
		element.scrollTop = element.scrollTop + perTick
		scrollTo(element, to, duration - 2)
	}, 10)
}

function scrollToTop(scrollDuration) {
	var scrollStep = -window.scrollY / (scrollDuration / 15),
		scrollInterval = setInterval(function () {
			if (window.scrollY != 0) {
				window.scrollBy(0, scrollStep)
			} else clearInterval(scrollInterval)
		}, 15)
}

var scrollToTop = function () {
	var btn = document.getElementById("scroll-to-top")

	btn.addEventListener("click", function () {
		window.scrollTo(0, 0)
	})
}

scrollToTop()
