(function () {
	var sectionsMain = [
		'SectionHome',
		'SectionQuiz1',
		'SectionQuiz2',
		'SectionQuiz3',
		'SectionAnalyzing',
		'SectionDownload',
	]
	var sectionsHardcore = [
		'SectionHome',
		'SectionQuiz1',
		'SectionQuiz2',
		'SectionQuiz3',
		'SectionQuiz4',
		'SectionQuiz5',
		'SectionQuiz6',
		'SectionQuiz7',
		'SectionQuiz8',
		'SectionQuiz9',
		'SectionQuiz10',
		'SectionQuiz11',
		'SectionQuiz12',
		'SectionQuiz13',
		'SectionQuiz14',
		'SectionQuiz15',
		'SectionAnalyzing',
		'SectionDownload',
	]
	var quizType = document.body.dataset.quizType
	var sections = quizType === 'main' ? sectionsMain : sectionsHardcore
	var lastSectionSelector = quizType === 'main' ? '#SectionQuiz3' : '#SectionQuiz15'
	var $sections = sections.map(function(sectionId) { return document.getElementById(sectionId) })
	var activeSectionId = 0
	var classSectionIsActive = 'Section--isActive'

	function goNextPage() {
		$sections[activeSectionId].classList.remove(classSectionIsActive)
		$sections[activeSectionId + 1].classList.add(classSectionIsActive)
		activeSectionId += 1
	}

	function goPrevPage() {
		$sections[activeSectionId].classList.remove(classSectionIsActive)
		$sections[activeSectionId - 1].classList.add(classSectionIsActive)
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

	on(document.querySelectorAll(lastSectionSelector + ' .Option'), function () {
		setTimeout(function () {
			document.querySelector('.SectionAnalyzing-loader').play()
			document.querySelector('.ListWithCheckboxes').classList.add('ListWithCheckboxes--animated')
			setTimeout(goNextPage, 5000);
		}, 500);
	})
}())
