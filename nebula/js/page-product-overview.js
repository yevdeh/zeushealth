(function () {
	var button = document.querySelector('.sc-pyfCe')

	button.addEventListener('click', function (e) {
		e.preventDefault()
		window.location.href = '/checkout.html' + window.location.search
	})
}())
