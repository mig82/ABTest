/*exported Logger*/
var Logger = (function(){
	var prefix = appConfig?(appConfig.appId || appConfig.appName):"";

	function print(level, caller, message){
		kony.print(prefix + " [" + caller + "] " + level + ": " + message );
	}

	return{
		log: function(message){
			var caller = arguments.callee.caller.name;
			print("FINE", caller, message);
		},
		info: function(message){
			var caller = arguments.callee.caller.name;
			print("INFO", caller, message);
		},
		warn: function(message){
			var caller = arguments.callee.caller.name;
			print("WARN", caller, message);
		},
		error: function(message){
			var caller = arguments.callee.caller.name;
			print("ERROR", caller, message);
		}
	};
})();
if(typeof console === "undefined"){
	var console = Logger;
}
