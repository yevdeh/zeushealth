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
		'SectionResults',
	]
	var quizType = document.body.dataset.quizType
	var sections = quizType === 'main' ? sectionsMain : sectionsHardcore
	var lastSectionSelector = quizType === 'main' ? '#SectionQuiz3' : '#SectionQuiz15'
	var $sections = sections.map(function (sectionId) { return document.getElementById(sectionId) })
	var activeSectionId = 0
	var classSectionActive = 'Section--active'

	function goNextPage() {
		setTimeout(() => {
			$sections[activeSectionId].classList.remove(classSectionActive)
			$sections[activeSectionId + 1].classList.add(classSectionActive)
			activeSectionId += 1
		}, 300);
	}

	function goPrevPage() {
		setTimeout(() => {
			$sections[activeSectionId].classList.remove(classSectionActive)
			$sections[activeSectionId - 1].classList.add(classSectionActive)
			activeSectionId -= 1
		}, 300);
	}

	function getRandomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function fillRisks() {
		var maxPoints = 58
		var points = 0
		document.querySelectorAll('.Option[data-is-selected="true"]').forEach(function ($option) {
			points += parseInt($option.dataset.points, 10)
		})
		var min = 25
		var max = 80
		var dispersion = 10
		var minMiddle = min + dispersion
		var maxMiddle = max - dispersion
		var percentPerPoint = (maxMiddle - minMiddle) / maxPoints
		var percentsToExtract = percentPerPoint * points
		var middle = maxMiddle - percentsToExtract
		document.querySelectorAll('.Risk').forEach(function ($risk) {
			percent = Math.round(middle - dispersion + getRandomInteger(0, dispersion * 2))
			$risk.querySelector('.Risk-percent').innerText = percent
			$risk.querySelector('.Risk-barFilled').style.width = percent + '%'
		})
	}

	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	on(document.querySelectorAll('.Navigation-back'), goPrevPage)

	on(document.querySelectorAll('#SectionHome .Button'), goNextPage)

	on(document.querySelectorAll('.Option'), function (e) {
		var $optionSelected = e.target
		var $options = $optionSelected.parentNode.querySelectorAll('.Option')
		$options.forEach(function ($option) {
			$option.dataset.isSelected = false
		});
		$optionSelected.dataset.isSelected = true
		goNextPage()
	})

	on(document.querySelectorAll(lastSectionSelector + ' .Option'), function () {
		setTimeout(function () {
			document.querySelector('.SectionAnalyzing-loader').play()
			document.querySelector('.ListWithCheckboxes').classList.add('ListWithCheckboxes--animated')
			setTimeout(function () {
				goNextPage()
				if (quizType === 'hardcore-with-risks') {
					fillRisks()
				}
				if (quizType === 'hardcore-with-images') {
					setTimeout(function () {
						document.querySelectorAll('.Images-image').forEach(function (e) {
							e.classList.add('Images-image--visible')
						})
					}, 100);
				}
			}, 5000);
		}, 500);
	})
}())
