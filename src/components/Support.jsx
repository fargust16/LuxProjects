import React, { Component } from 'react';

import './Support.scss';

class Support extends Component {

  render() {
    return (
	    <article className="other-pages">
				<main className="support other-pages__block">
					<div className="main-header"><span className="main-header__text">Support</span></div>
					<form ref="support-email" action="" method="POST" className="support__form">
						<section className="support__form-content">
							<h2 className="support__form-info">Please try to include as much detail
				as possible about the situation you encountered and the platform you use.</h2>
							<input type="text" name="email" className="field support__form-subject" placeholder="subject" required />
							<textarea className="field support__form-message" placeholder="your message" rows="5" required></textarea>
							<div className="support__buttons">
								<button className="button btn-clear" type="reset">Cancel</button>
								<button className="button btn-submit" type="submit">Send email</button>
							</div>
						</section>
					</form>
				</main>
			</article>
    );
  }
}

export default Support;
