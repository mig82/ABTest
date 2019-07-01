/*exported $session*/
var $session = (function() {

	"use strict";
	//var user, requestedLoanAmount;

	function setUser(user){
		this.user = user;
	}
	function getUser(){
		return this.user;
	}

	function setRequestedLoanAmount(requestedLoanAmount){
		this.requestedLoanAmount = requestedLoanAmount;
	}
	function getRequestedLoanAmount(){
		return this.requestedLoanAmount;
	}

	return {
		getUser: getUser,
		setUser: setUser,
		getRequestedLoanAmount: getRequestedLoanAmount,
		setRequestedLoanAmount: setRequestedLoanAmount
	};
})();
