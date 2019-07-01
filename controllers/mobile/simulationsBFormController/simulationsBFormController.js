define({
	/*globals $router, $session*/
	postShow: function(){
		this.view.submitButton.onTouchEnd = () => {
			$session.setRequestedLoanAmount(this.view.AmountSlider1.selectedValue);
			$router.goto("confirmation");
		};
	},

	onNavigate: function(){
		kony.mvc.patch(this);
	}
});