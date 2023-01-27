(function () {
	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	var ErrorPopup = (function () {
		var closeElements = document.querySelectorAll('.ErrorPopup-close, .ErrorPopup-shadow, .ErrorPopup-button')
		var popup = document.querySelector('.ErrorPopup')

		function closePopup() {
			popup.classList.add('ErrorPopup--hidden')
		}

		on(closeElements, closePopup)
	}())

	var Faq = (function () {
		on(document.querySelectorAll('.faq-accordion_faqItem'), function () {
			this.classList.toggle('faq-accordion_faqItem__8PP8i')
			this.classList.toggle('faq-accordion_faqItemOpened__UZn8C')
		})
	}())

	var Form = (function () {
		var button = document.querySelector('.Form-button')
		var inputs = document.querySelectorAll('.Form-input')
		var popup = document.querySelector('.Popup')
		var errorPopup = document.querySelector('.ErrorPopup')

		button.addEventListener('click', function () {
			if (!document.querySelectorAll('.Form-input:invalid').length) {
				gtag('event', 'submit_credit_card')
				setTimeout(function() {
					popup.classList.add('Popup--hidden')
					errorPopup.classList.remove('ErrorPopup--hidden')
				}, 1000);
			}
		})

		on(inputs, function () {
			if (this.name === 'date' && /^\d\d$/.test(this.value)) {
				this.value += '/'
			}
			if (this.checkValidity() && !document.querySelectorAll('.Form-input:invalid').length) {
				button.classList.remove('Button--disabled')
			} else {
				button.classList.add('Button--disabled')
			}
		}, 'input')
	}())

	var Header = (function () {
		var mobileHeader = document.querySelector('.header_header__GQ14N')
		var image = mobileHeader.querySelector('.header_logo__kdBk4')
		var timer = mobileHeader.querySelector('.countdown-with-cta_container__ud_nT')

		var minScrollY = 200
		var isScrolledEnough = false

		function handleScroll() {
			if (window.scrollY > minScrollY && !isScrolledEnough) {
				isScrolledEnough = true
				image.classList.add('hidden')
				timer.classList.remove('hidden')
			}
			if (window.scrollY <= minScrollY && isScrolledEnough) {
				isScrolledEnough = false
				image.classList.remove('hidden')
				timer.classList.add('hidden')
			}
		}

		document.addEventListener('scroll', handleScroll)
	}())

	var PlanCards = (function () {
		var cards = document.querySelectorAll('.choose-plan-card-template-module_planCard__1zLoM')
		var classSelected = 'choose-plan-card-template-module_isSelected__bTfwV'

		on(cards, function () {
			if (this.classList.contains(classSelected)) return
			cards.forEach(function (node) {
				node.classList.remove(classSelected)
			})
			this.classList.add(classSelected)
		})
	}())

	var Popup = (function () {
		var buttons = document.querySelectorAll('[data-button="checkout-get-plan"]')
		var closeAndShadow = document.querySelectorAll('.Popup-close, .Popup-shadow')
		var popup = document.querySelector('.Popup')

		function closePopup() {
			popup.classList.add('Popup--hidden')
		}

		function openPopup() {
			popup.classList.remove('Popup--hidden')
		}

		on(buttons, openPopup)
		on(closeAndShadow, closePopup)
	}())

	var Timer = (function () {
		function initTimer(nodeTimer) {
			var nodeMinutes = nodeTimer.querySelector('.minutes')
			var nodeSeconds = nodeTimer.querySelector('.seconds')
			var minutes = 10
			var seconds = 0

			function setTimer() {
				if (minutes === 0 && seconds === 0) {
					clearInterval(interval)
					return
				}
				if (seconds) {
					seconds -= 1
				} else {
					minutes -= 1
					seconds = 59
				}
				nodeMinutes.textContent = minutes.toString().padStart(2, '0')
				nodeSeconds.textContent = seconds.toString().padStart(2, '0')
			}

			var interval = setInterval(setTimer, 1000);
		}

		var timers = document.querySelectorAll('.countdown-with-cta_timeNumbers__vHbE7, .sticky-countdown-with-cta_countdownTimeUnit__JEZa_')
		timers.forEach(function (timer) {
			initTimer(timer)
		})
	}())
}())
