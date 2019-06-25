((definition) => {
	kony.mvc.patch = definition;
})((controller) => {

	const events = [
		"init",
		"preShow",
		"postShow",
		"onHide"
	];

	var view = controller.view;
	events.forEach((eventName) => {
		if(typeof controller[eventName] === "function"){
			view[eventName] = controller[eventName];
		}
	});
});
