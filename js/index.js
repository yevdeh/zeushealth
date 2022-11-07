(function () {
	var classSectionIsActive = 'Section--isActive'

	var $sectionAnalyzing = document.getElementById('SectionAnalyzing')
	var $sectionDownload = document.getElementById('SectionDownload')
	var $sectionHome = document.getElementById('SectionHome')
	var $sectionStep1 = document.getElementById('SectionStep1')
	var $sectionStep2 = document.getElementById('SectionStep2')
	var $sectionStep3 = document.getElementById('SectionStep3')

	var $step1Options = document.querySelectorAll('#SectionStep1 .Option')
	var $step2Options = document.querySelectorAll('#SectionStep2 .Option')
	var $step3Options = document.querySelectorAll('#SectionStep3 .Option')

	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	document.querySelector('#SectionHome .Button').addEventListener('click', function () {
		$sectionHome.classList.remove(classSectionIsActive)
		$sectionStep1.classList.add(classSectionIsActive)
	})

	document.querySelector('#SectionStep1 .Progress-back').addEventListener('click', function () {
		$sectionStep1.classList.remove(classSectionIsActive)
		$sectionHome.classList.add(classSectionIsActive)
	})

	document.querySelector('#SectionStep2 .Progress-back').addEventListener('click', function () {
		$sectionStep2.classList.remove(classSectionIsActive)
		$sectionStep1.classList.add(classSectionIsActive)
	})

	document.querySelector('#SectionStep3 .Progress-back').addEventListener('click', function () {
		$sectionStep3.classList.remove(classSectionIsActive)
		$sectionStep2.classList.add(classSectionIsActive)
	})

	on($step1Options, function () {
		$sectionStep1.classList.remove(classSectionIsActive)
		$sectionStep2.classList.add(classSectionIsActive)
	})

	on($step2Options, function () {
		$sectionStep2.classList.remove(classSectionIsActive)
		$sectionStep3.classList.add(classSectionIsActive)
	})

	on($step3Options, function () {
		$sectionStep3.classList.remove(classSectionIsActive)
		$sectionAnalyzing.classList.add(classSectionIsActive)
		setTimeout(function () {
			document.querySelector('.ListWithCheckboxes').classList.add('ListWithCheckboxes--animated')
			setTimeout(function () {
				$sectionAnalyzing.classList.remove(classSectionIsActive)
				$sectionDownload.classList.add(classSectionIsActive)
			}, 5000);
		}, 500);
	})
}())
