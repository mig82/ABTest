define(function(){ 

	function goToSimulations(){
		$router.goto("simulations", {});
	}

	return {
		preShow: function(){
			amplify.publish("preShow", this.view);

			this.view.greetingLabel.text = kony.i18n.getLocalizedString2(
				"label.greeting",
				{name: "Miguel"}
			);
		},

		postShow: function(){
			amplify.publish("postShow", this.view);
			amplify.subscribe("Notifikation.onTouchEnd", goToSimulations);
		},

		onNavigate: function(){
			kony.mvc.patch(this);
		}
	};
});