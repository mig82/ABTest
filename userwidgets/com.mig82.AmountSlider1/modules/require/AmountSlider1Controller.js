define(function() {

	var thou, dec, ccy;

	function formatAmount(number, decPlaces, decSep, thouSep) {
		decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
		decSep = typeof decSep === "undefined" ? "." : decSep;
		thouSep = typeof thouSep === "undefined" ? "," : thouSep;
		var sign = number < 0 ? "-" : "";
		var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
		var j = (j = i.length) > 3 ? j % 3 : 0;

		return sign +
			(j ? i.substr(0, j) + thouSep : "") +
			i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
			(decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
	}

	return {
		setValue: function(){
			var amt = this.view.amountSlider.selectedValue;
			var fAmt = formatAmount(amt, 2, dec, thou);
			this.view.amountLabel.text = `${ccy} ${fAmt}`;
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			
			thou = this.view.thousandSeparatorLabel.text;
			dec = this.view.decimalSeparatorLabel.text;
			ccy = this.view.currencyLabel.text;

			this.view.currencyLabel.isVisible = false;
			this.view.noShowFlex.isVisible = false;

			this.view.amountSlider.onSlide = this.setValue;
			this.setValue();
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});