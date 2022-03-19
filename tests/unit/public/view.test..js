// import { beforeEach, test } from '@jest/globals'
// import { JSDOM } from 'jsdom'
// import View from '../../../public/controller/js/view.js'
// describe('#View - test suite for presentation layer', () => {
// 	const dom = new JSDOM()
// 	global.document = dom.window.document
// 	global.window = dom.window

// 	function makeBtnElement(
// 		{ text, classList } = {
// 			text: '',
// 			classList: {
// 				add: jest.fn(),
// 				remove: jest.fn(),
// 			},
// 		}
// 	) {
// 		return {
// 			onClick: jest.fn(),
// 			classList,
// 			innerText: text,
// 		}
// 	}

// 	beforeEach(() => {
// 		jest.resetAllMocks()
// 		jest.clearAllmocks()

// 		jest
// 			.spyOn(document, document.getElementById.name)
// 			.mockReturnValue(makeBtnElement())
// 	})

// 	test('#changeCommandButtonsVisibility - given hide=true it should add unassigned class and reset onClick', () => {
// 		const view = new View()
// 		const btn = makeBtnElement()
// 		jest.spyOn(document, document.querySelectorAll.name).mockReturnValue([btn])

// 		view.changeCommandButtonsVisibility()
// 		expect(btn.classList.add).toHaveBeenCalledWith('unassigne2d')
// 	})
// 	test.todo(
// 		'#changeCommandButtonsVisibility - given hide=false it should remove unassigned class and reset onClick'
// 	)
// 	test.todo('#onLoad')
// })
