define(function() {

	//TODO: Expose fields or function to allow the developer to set the password regex.
	const userRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /^([a-zA-Z0-9@!#+%&$]{3,})$/;
	const minUserLength = 5;
	const minPasswordLength = 3;

	var messageLabelWidth;
	var loginButtonWidth;

	return {
		togglePasswordVisibility: function _togglePasswordVisibility(/*widget, x, y*/){
			//alert(`w: ${widget.id}\nx: ${x}\ny: ${y}`);

			//l=eye icon -> show
			if(this.view.showPasswordButton.text === 'l'){
				this.view.showPasswordButton.text = 'm';
				this.view.passwordTextBox.secureTextEntry = false;
			}
			//m=cancelled eye icon -> hide
			else{
				this.view.showPasswordButton.text = 'l';
				this.view.passwordTextBox.secureTextEntry = true;
			}
		},

		toggleMessageLabel: function _toggleMessageLabel(makeVisible){
			//TODO: Do this with an animation to fade in or out.
			if(makeVisible){
				this.view.messageLabel.width = messageLabelWidth;
			}
			else{
				this.view.messageLabel.width = "0%";
			}
			this.view.forceLayout();
		},

		toggleLoginButton: function _toggleLoginButton(makeVisible){
			//TODO: Do this with an animation to fade in or out.
			if(makeVisible){
				this.view.loginButton.width = loginButtonWidth;
			}
			else{
				this.view.loginButton.width = "0%";
			}
			this.view.forceLayout();
		},

		//We also expose this function for the parent form to set a message resulted from the authentication attempt.
		showMessage: function _showMessage(message){
			if(typeof kony.i18n.getLocalizedString2 === "function"){
				this.view.messageLabel.text = kony.i18n.getLocalizedString2(message);
			}
			else{
				this.view.messageLabel.text = kony.i18n.getLocalizedString(message);
			}
			this.toggleMessageLabel(true);
		},

		validateInputs: function _validateInputs(){
			this.toggleMessageLabel(false);
			let user = this.view.userTextBox.text;
			let password = this.view.passwordTextBox.text;

			//If both the user and password fields have more than 4 characters each.
			if(!userRegex.test(user)){
				//TODO: Expose field for invalid password i18n.
				if(user.length >= minUserLength){
					this.showMessage(this._invalidUserMessage);
					amplify.publish("Login.invalidUser");
				}
				this.toggleLoginButton(false);
			}
			else if(!passwordRegex.test(password)){
				//TODO: Expose field for invalid password i18n.
				if(password.length >= minPasswordLength){
					this.showMessage(this._invalidPasswordMessage);
					amplify.publish("Login.invalidPassword");
				}
				this.toggleLoginButton(false);
			}
			else if(userRegex.test(user) & passwordRegex.test(password)){
				/*global amplify*/
				amplify.publish("Login.valid", user, password);
				this.toggleLoginButton(true);
			}
		},

		preShow: function(){
			//Hide the message and the login button. They're visible for design purposes only.
			messageLabelWidth = this.view.messageLabel.width;
			this.toggleMessageLabel(false);
			loginButtonWidth = this.view.loginButton.width;
			this.toggleLoginButton(false);
		},

		postShow: function(){
			//Bind the eye icon to show or hide the password.
			this.view.showPasswordButton.onTouchEnd = this.togglePasswordVisibility;

			//Bind user and password fields to attempt login once both are filled.
			this.view.userTextBox.onTextChange = this.validateInputs;
			this.view.passwordTextBox.onTextChange = this.validateInputs;
			this.view.onKeyboardDidHide = this.validateInputs;

			this.view.loginButton.onTouchEnd = () => {
				//kony.print("Clicked to sign in");
				amplify.publish(
					"Login.onLogin",
					this.view.userTextBox.text,
					this.view.passwordTextBox.text
				);
			};
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

			kony.mvc.genAccessors(this, [
				"invalidUserMessage",
				"invalidPasswordMessage"
			]);
		}
	};
});