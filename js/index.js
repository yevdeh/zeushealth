(function () {
	document.querySelector('#SectionHome .Button').addEventListener('click', function () {
		document.querySelector('#SectionHome').classList.remove('Section--isActive')
		document.querySelector('#SectionStep1').classList.add('Section--isActive')
	})
}())
