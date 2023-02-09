(function () {
	var button = document.querySelector('.sc-pyfCe')

	button.addEventListener('click', function (e) {
		e.preventDefault()
		gtag('event', 'nebula_page_product_overview_go_next')
		window.location.href = '/checkout.html' + window.location.search
	})
}())
