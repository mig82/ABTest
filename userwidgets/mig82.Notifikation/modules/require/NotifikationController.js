define(function() {

	return {
		preShow: function(form){
			//alert("Notifikation.preShow fired by:" + arguments.callee.caller.name);
			//TODO: Update this.view.countLabel.text
			var countLabel = this.view.countLabel;
			var notification = this.view.bubbleBorderFlex;
			
			if(!countLabel.text || countLabel.text === ""){
				countLabel.text = "0";
			}
			var count = parseInt(countLabel.text);
			notification.isVisible = count>0?true:false;
		},

		postShow: function(form){
			//alert("Notifikation.postShow fired by:" + arguments.callee.caller.name);
			this.view.onTouchEnd = () => {
				this.view.countLabel.text = "0";
				amplify.publish("Notifikation.onTouchEnd");
			};
		},

		constructor: function(baseConfig, layoutConfig, pspConfig) {
			amplify.subscribe("preShow", this.preShow);
			amplify.subscribe("postShow", this.postShow);
		},
		
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});