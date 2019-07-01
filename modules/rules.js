/*exported $rules*/
var $rules = (() => {
	"use strict";
	function _getLoanSimulationFlow(userId){

		/* Make up whatever business rule makes sense to discriminate which users get
		 * screen A, and which users get screen B. Ideally  you'd want to replace this
		 * with code that queries the server for the flow to use, so that if the rule
		 * changes you don't have to release a new app version, and so that you can
		 * eventually shut down the A/B Test by responding always with the winner flow.*/

		//User ID's starting with odd letters get flow B.
		if(userId && /[a,c,e,g,i,k,m,o,q,s,u,w,y]/i.test(userId[0])){
			return "simulationsB";
		}
		//User ID's starting with even letters or anything else get flow A
		else{
			return "simulationsA";
		}
	}
	return {
		getLoanSimulationFlow: _getLoanSimulationFlow
	};
})();
