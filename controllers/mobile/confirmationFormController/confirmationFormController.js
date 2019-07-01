define({
	/*globals $router, $session*/
	preShow: function(){

		var amt = $session.getRequestedLoanAmount();
		if(typeof kony.i18n.getLocalizedString2 === "function"){
			this.view.loanConfirmationMessage.text = kony.i18n.getLocalizedString2(
				"message.loan_submitted",
				{ccy: "€", amt: amt} //TODO: The currency should not be hardcoded.
			);
		}

		this.view.goHometButton.onTouchEnd = () => {
			$router.goto("landing");
		};
	},

	postShow: function(){

		KNYMetricsService.sendCustomMetrics("requested-loan", [{
			"product": "Consumer Loan",
			"flow": KNYMetricsService.getFlowTag(),
			"amount": Number($session.getRequestedLoanAmount())
		}]);
		KNYMetricsService.flushEvents();
		KNYMetricsService.clearFlowTag();
	},

	onNavigate: function(){
		kony.mvc.patch(this);
	}
});
