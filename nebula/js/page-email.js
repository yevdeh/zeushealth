(function () {
	var isError = false
	var form = document.querySelector('form')
	var input = document.querySelector('.sc-lgholE')
	var error = document.querySelector('.bwKcLQ')

	var classError = 'iqoCmP'
	var classNoError = 'jlUouP'

	function hideError() {
		if (!isError) return
		input.classList.remove(classError)
		input.classList.add(classNoError)
		error.style.display = 'none'
		isError = false
	}

	function showError() {
		if (isError) return
		input.classList.add(classError)
		input.classList.remove(classNoError)
		error.style.display = 'block'
		isError = true
	}

	function validate(value) {
		return value !== '' && /\S+@\S+\.\S+/.test(value)
	}

	input.addEventListener('input', function () {
		if (validate(input.value)) {
			hideError()
		} else {
			showError()
		}
	})

	form.addEventListener('submit', function (e) {
		e.preventDefault()
		if (validate(input.value)) {
			gtag('event', 'nebula_page_email_submit_email')
			window.location.href = '/billing.html'
		} else {
			showError()
		}
	})
}())
