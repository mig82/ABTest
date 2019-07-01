define(function(){ 

	/*global amplify, $router, $session*/
	function goToSimulations(){
		/*globals $rules*/
		var simulationFlow = $rules.getLoanSimulationFlow($session.getUser());
		KNYMetricsService.setFlowTag("Loan-" + simulationFlow);
		$router.goto(simulationFlow, {});
	}

	return {
		preShow: function(){
			amplify.publish("preShow", this.view);

			this.view.greetingLabel.text = kony.i18n.getLocalizedString2(
				"label.greeting",
				{name: $session.getUser()}
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