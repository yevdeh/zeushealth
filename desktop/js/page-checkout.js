(function () {
	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	var Faq = (function () {
		on(document.querySelectorAll('.faq-accordion_faqItem'), function () {
			this.classList.toggle('faq-accordion_faqItem__8PP8i')
			this.classList.toggle('faq-accordion_faqItemOpened__UZn8C')
		})
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

		function openPopup() {

		}

		on(buttons, openPopup)
	}())

	var Timer = (function () {
		var timer = document.querySelector('.countdown-with-cta_timeNumbers__vHbE7')
		var nodeMinutes = timer.querySelector('.minutes')
		var nodeSeconds = timer.querySelector('.seconds')
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
	}())
}())
