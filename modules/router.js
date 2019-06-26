/*exported $router*/
var $router = (function(){
	
	function _goto(friendlyName, context){
		/*global Logger*/
		Logger.info("Routing to '" + friendlyName + "'");

		try{
			(new kony.mvc.Navigation(friendlyName)).navigate(context);
		}
		catch(e){
			let message = "Can't navigate to form ";
			message +=	`by friendly name '${friendlyName}'\nError: ${e}`;
			
			//alert(message);
			if(typeof kony.ui.Toast === "undefined"){
				alert(message);
			}
			else{
				var toast = new kony.ui.Toast({
					text:message,
					duration: constants.TOAST_LENGTH_LONG
				});
				toast.show();
			}
		}
	}

	return {
		goto: _goto
	};
})();
