/*exported $rules*/
var $rules = (() => {
	"use strict";
	function _getLoanSimulationFlow(userId){

		/* Make up whatever business rule makes sense to discriminate which users get
		 * screen A, and which users get screen B. Ideally  you'd want to replace this
		 * with code that queries the server for the flow to use, so that if the rule
		 * changes you don't have to release a new app version, and so that you can
		 * eventually shut down the A/B Test by responding always with the winner flow.*/
		
		//User ID's starting with a-m get flow B, users ID's starting with n-z get flow A.
		if(userId && /[a-m]/i.test(userId[0])){
			return "simulationsB";
		}
		else{
			return "simulationsA";
		}		
	}
	return {
		getLoanSimulationFlow: _getLoanSimulationFlow
	};
})();
