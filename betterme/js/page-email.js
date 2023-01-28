(function () {
	var isError = false
	var input = document.querySelector('.email-generated_input__7R1C7')
	var error = document.querySelector('.email-generated_error__KU1KC')
	var button = document.querySelector('[data-button="email-form-submit"]')

	function hideError() {
		if (!isError) return
		input.classList.remove('utilities_isInvalid__CAG4e')
		error.style.opacity = 0
		isError = false
	}

	function showError() {
		if (isError) return
		input.classList.add('utilities_isInvalid__CAG4e')
		error.style.opacity = 1
		isError = true
	}

	input.addEventListener('input', hideError)

	button.addEventListener('click', function () {
		var value = input.value
		if (value === '' || !/\S+@\S+\.\S+/.test(value)) {
			showError()
		} else {
			gtag('event', 'page_email_submit')
			window.location.href = '/checkout.html'
		}
	})
}())
