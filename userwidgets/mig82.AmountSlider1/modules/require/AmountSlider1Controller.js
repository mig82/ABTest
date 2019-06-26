define(function() {

	var slider, label;

	function setValue(){
		label.text = `${slider.selectedValue},00`;
	}

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			slider = this.view.amountSlider;
			label = this.view.amountLabel;
			setValue();
			this.view.amountSlider.onSlide = setValue;
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});