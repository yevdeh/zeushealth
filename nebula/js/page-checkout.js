(function () {
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
