var $rules = (() => {
	"use strict";
	function _getAB(userId){
		return userId && /[a-m]/i.test(userId[0]);		
	}
	return {
		getAB: _getAB
	};
})();
