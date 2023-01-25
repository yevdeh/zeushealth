(function () {
	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	var page = parseInt(window.location.pathname.match(/\d+/)[0], 10)
	var nextPage = page + 1

	if (page === 1 || page === 13) {
		var button = document.querySelector('.button-module_container__C4518')
		var selectedOptionsCount = 0

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
				window.location.href = '/quiz-' + nextPage + '.html'
			}
		})
	} else {
		on(document.querySelectorAll('[data-card-id]'), function () {
			this.classList.add('selectable-card_isSelected__JQwCx')
			this.querySelector('article > span').classList.remove('quiz_isTransparent__3uLMZ')
			setTimeout(function () {
				href = page === 15 ? '/analyzing.html' : '/quiz-' + nextPage + '.html'
				window.location.href = href
			}, 500);
		})
	}
}())
