/*exported $router*/
var $router = (function(){
	
	function _goto(friendlyName, context){
		Logger.info("Routing to '" + friendlyName + "'");

		try{
			(new kony.mvc.Navigation(friendlyName)).navigate(context);
		}
		catch(e){
			let message = "Can't navigate to form ";
			message +=	`by friendly name '${friendlyName}'\nError: ${e}`;
			
			//alert(message);
			var toast = new kony.ui.Toast({
				text:message,
				duration: constants.TOAST_LENGTH_LONG
			});
			toast.show();
		}
	}

	return {
		goto: _goto
	};
})();
