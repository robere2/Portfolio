import 'a11y-dialog';
import './PrivacyPolicy.css';

class PrivacyPolicy extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
			<a data-a11y-dialog-show="privacy-dialog" class="privacy-policy-link">Privacy Policy</a>
			
			<div data-a11y-dialog="privacy-dialog" id="privacy-dialog" aria-hidden="true" aria-labelledby="privacy-dialog-title">
			  <div class="privacy-dialog-background" data-a11y-dialog-hide></div>
			  <div role="document">
			    <button type="button" data-a11y-dialog-hide aria-label="Close dialog">
			      <i class="fas fa-xmark"></i>
			    </button>
			    <h1 id="privacy-dialog-title">Privacy Policy</h1>
			    <div>
			    	<p>Hello, world!</p>
				</div>
			  </div>
			</div>
		`;
	}

}

export { PrivacyPolicy };
