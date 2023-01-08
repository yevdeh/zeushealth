(function () {
	var activeSectionId = 0
	var classSectionIsActive = 'Section--isActive'
	var sections = [
		document.getElementById('SectionHome'),
		document.getElementById('SectionQuiz1'),
		document.getElementById('SectionQuiz2'),
		document.getElementById('SectionQuiz3'),
		document.getElementById('SectionAnalyzing'),
		document.getElementById('SectionDownload'),
	]

	function goNextPage() {
		sections[activeSectionId].classList.remove(classSectionIsActive)
		sections[activeSectionId + 1].classList.add(classSectionIsActive)
		activeSectionId += 1
	}

	function goPrevPage() {
		sections[activeSectionId].classList.remove(classSectionIsActive)
		sections[activeSectionId - 1].classList.add(classSectionIsActive)
		activeSectionId -= 1
	}

	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	on(document.querySelectorAll('.Navigation-back'), goPrevPage)

	on(document.querySelectorAll('#SectionHome .Button'), goNextPage)

	on(document.querySelectorAll('.Option'), goNextPage)

	on(document.querySelectorAll('#SectionQuiz3 .Option'), function () {
		setTimeout(function () {
			document.querySelector('.SectionAnalyzing-loader').play()
			document.querySelector('.ListWithCheckboxes').classList.add('ListWithCheckboxes--animated')
			setTimeout(goNextPage, 5000);
		}, 500);
	})
}())
