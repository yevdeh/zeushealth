(function () {
	var button = document.querySelector('.button-module_container__C4518')
	var selectedOptionsCount = 0

	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	function toggleButton() {
		if (selectedOptionsCount) {
			button.classList.remove('button-module_disabled__l8nJ1')
			button.removeAttribute('disabled')
		} else {
			button.classList.add('button-module_disabled__l8nJ1')
			button.setAttribute('disabled', '')
		}
	}

	on(document.querySelectorAll('.horizontal-answer-option-module_container__-EvBR'), function () {
		if (this.className.indexOf('horizontal-answer-option-module_selected__1-cu9') > -1) {
			selectedOptionsCount -= 1
		} else {
			selectedOptionsCount += 1
		}
		this.classList.toggle('horizontal-answer-option-module_selected__1-cu9')
		var checkbox = this.querySelector('.horizontal-answer-option-module_checkbox__aT-GV')
		checkbox.classList.toggle('horizontal-answer-option-module_isCheckboxShown__zifUD')
		toggleButton()
	})

	button.addEventListener('click', function () {
		if (selectedOptionsCount) {
			window.location.href = '/quiz-2.html'
		}
	})
}())
