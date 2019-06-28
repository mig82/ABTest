define(function() {

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

	function setValue(view){
		//TODO: Format thousand and decimal separators depending on locale.
		var thou = view.thousandSeparatorLabel.text;
		var dec = view.decimalSeparatorLabel.text;
		var amt = view.amountSlider.selectedValue;
		var ccy = view.currencyLabel.text;
		var fAmt = formatAmount(amt, 2, dec, thou);
		view.amountLabel.text = `${ccy} ${fAmt}`;
		kony.print(view.amountLabel.frame.width);
	}

	return {
		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			
			this.view.currencyLabel.isVisible = false;
			this.view.noShowFlex.isVisible = false;
			this.view.amountSlider.onSlide = () =>{
				setValue(this.view);
			};
			setValue(this.view);
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});