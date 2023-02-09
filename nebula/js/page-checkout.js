(function () {
	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	var nodesPriceFull = document.querySelectorAll('[data-price-full]')
	var nodesPriceTrial = document.querySelectorAll('[data-price-trial]')
	var nodeTimerMinutes = document.querySelector('[data-timer-minutes]')
	var nodeTimerSeconds = document.querySelector('[data-timer-seconds]')

	function getPriceTrialText() {
		var matching = window.location.search.match(/price=([\d.]+)/)
		var price = matching ? matching[1] : 13.67
		return '$' + price
	}

	var priceTrialText = getPriceTrialText()
	nodesPriceTrial.forEach(function (e) {
		e.textContent = priceTrialText
	})

	var ErrorPopup = (function () {
		var closeElements = document.querySelectorAll('.ErrorPopup-close, .ErrorPopup-shadow, .ErrorPopup-button')
		var popup = document.querySelector('.ErrorPopup')

		function closePopup() {
			popup.classList.add('ErrorPopup--hidden')
		}

		on(closeElements, closePopup)
	}())

	var Form = (function () {
		var button = document.querySelector('.Form-button')
		var inputs = document.querySelectorAll('.Form-input')
		var popup = document.querySelector('.Popup')
		var errorPopup = document.querySelector('.ErrorPopup')

		function handleButtonClick() {
			if (!document.querySelectorAll('.Form-input:invalid').length) {
				setTimeout(function() {
					popup.classList.add('Popup--hidden')
					errorPopup.classList.remove('ErrorPopup--hidden')
				}, 1000);
			}
		}

		function handleInputClick() {
			if (this.name === 'date' && /^\d\d$/.test(this.value)) {
				this.value += '/'
			}
			if (this.checkValidity() && !document.querySelectorAll('.Form-input:invalid').length) {
				button.removeAttribute('disabled')
				button.classList.remove('Button--disabled')
			} else {
				button.setAttribute('disabled', 'true')
				button.classList.add('Button--disabled')
			}
		}

		button.addEventListener('click', handleButtonClick)
		on(inputs, handleInputClick, 'input')
	}())

	var Popup = (function () {
		var button = document.querySelector('.sc-pyfCe')
		var closeAndShadow = document.querySelectorAll('.Popup-close, .Popup-shadow')
		var popup = document.querySelector('.Popup')

		function closePopup() {
			popup.classList.add('Popup--hidden')
		}

		function openPopup() {
			popup.classList.remove('Popup--hidden')
		}

		button.addEventListener('click', openPopup)
		on(closeAndShadow, closePopup)
	}())

	var Timer = (function () {
		var minutes = 9
		var seconds = 59

		function handleTimeout() {
			Array.from(nodesPriceFull).concat(Array.from(nodesPriceTrial)).forEach(function (e) {
				e.textContent = '$29'
			})
			document.querySelectorAll('[data-timeout-delete]').forEach(function (e) {
				e.style.display = 'none'
			})
		}

		function setTimer() {
			if (minutes === 0 && seconds === 0) {
				clearInterval(interval)
				handleTimeout()
				return
			}
			if (seconds) {
				seconds -= 1
			} else {
				minutes -= 1
				seconds = 59
			}
			nodeTimerMinutes.textContent = minutes
			nodeTimerSeconds.textContent = seconds.toString().padStart(2, '0')
		}

		var interval = setInterval(setTimer, 1000);
	}())
}())
