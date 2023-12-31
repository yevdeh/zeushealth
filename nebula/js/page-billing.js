(function () {
	var button = document.querySelector('.sc-pyfCe')
	var classButtonDisabled = 'kcFeJB'
	var classButtonEnabled = 'gmZNhX'
	var isButtonEnabled = false

	var options = document.querySelectorAll('.sc-jNAkjl')
	var classOptionNotSelected = 'fJCiSe'
	var classOptionSelected = 'ekgrCC'

	var selectedPrice = '13.67'

	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	function handleOptionClick() {
		var currentOption = this
		options.forEach(function (option) {
			if (option === currentOption) {
				option.classList.remove(classOptionNotSelected)
				option.classList.add(classOptionSelected)
				selectedPrice = currentOption.dataset.price
			} else {
				option.classList.remove(classOptionSelected)
				option.classList.add(classOptionNotSelected)
			}
		})
		if (!isButtonEnabled) {
			isButtonEnabled = true
			button.classList.remove(classButtonDisabled)
			button.classList.add(classButtonEnabled)
			button.removeAttribute('disabled')
		}
	}

	on(options, handleOptionClick)
	button.addEventListener('click', function () {
		if (!isButtonEnabled) return
		gtag('event', 'nebula_page_billing_go_next')
		window.location.href = '/product-overview.html?price=' + selectedPrice
	})
}())
