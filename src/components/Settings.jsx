import React, { Component } from 'react';

import './Settings.scss';

class Settings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showEmailOptions: window.innerWidth >= 767 ? true : false,
			showPasswordOptions: window.innerWidth >= 767 ? true : false
		}

		this.showExternalOptions = this.showExternalOptions.bind(this);
	}

	showExternalOptions(elem) {
		if(elem === 'email-settings') {
			this.setState({showEmailOptions: !this.state.showEmailOptions});
		} else {
			this.setState({showPasswordOptions: !this.state.showPasswordOptions});
		}
	}

  render() {
    return (
    	<article className="other-pages">
		    <main className="settings other-pages__block">
				<div className="main-header"><span className="main-header__text">Settings</span></div>
				<div className="settings__header">
					<span className="settings__info">Email address</span>
					<div className="settings__email">user@gmail.com</div>
				</div>

				<article className="options settings__options">
					<section className="option">
						<div onClick={this.showExternalOptions.bind(this.showExternalOptions, 'email-settings')} className={this.state.showEmailOptions ? "header option__header open-header" : "header option__header close-header"}><span className="header__text">Change email</span></div>
						<form ref="email_settings" name="email-settings" action="" method="POST" className={this.state.showEmailOptions ? "option__content settings__form" : "option__content settings__form_hide"}>
							<input type="email" name="email" className="field option__field" placeholder="new email address" required />
							<input type="password" name="password" className="field option__field" placeholder="current password" />
							<div className="option__buttons">
								<button className="button btn-clear" type="reset" onClick={this.showExternalOptions.bind(this.showExternalOptions, 'email-settings')}>Cancel</button>
								<button className="button btn-submit" type="submit">Save changes</button>
							</div>
						</form>
					</section>

					<section className="option">
						<div onClick={this.showExternalOptions.bind(this.showExternalOptions, 'password-settings')} className={this.state.showPasswordOptions ? "header option__header open-header" : "header option__header close-header"}><span className="header__text">Change password</span></div>
						<form ref="password_settings" name="password-settings" action="" method="POST"  className={this.state.showPasswordOptions ? "option__content settings__form" : "option__content settings__form_hide"}>
							<input type="password" name="old-pass" className="field option__field" placeholder="current password" required />
							<input type="password" name="new-pass" className="field option__field" placeholder="new password" />
							<input type="password" name="confirm-pass" className="field option__field" placeholder="confirm new password" />
							<div className="option__buttons">
								<button className="button btn-clear" type="reset" onClick={this.showExternalOptions.bind(this.showExternalOptions, 'password-settings')}>Cancel</button>
								<button className="button btn-submit" type="submit">Save changes</button>
							</div>
						</form>
					</section>
				</article>
			</main>
		</article>
    );
  }
}

export default Settings;
