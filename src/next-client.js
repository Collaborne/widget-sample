// Constants
const TENANT = 'example';
const TOKEN = 'my-next-token';
const API_ENDPOINT = `https://api.${TENANT}.nextapp.co/v1/opportunities`;

/**
 * Posts an opportunity
 *
 * @param {string} themeId
 * @param {string} email
 * @param {string} opportunity
 * @returns {Promise}
 */
function postOpportunity(themeId, email, opportunity) {
	// Create payload for NEXT request
	const data = {
		email,
		opportunity,
		tenant: TENANT,
		theme_id: themeId,
		token: TOKEN,
	};

	// Send request to NEXT
	return Promise.resolve().then(async () => {
		const response = await fetch(API_ENDPOINT, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const json = await response.json();
		return {
			isNewUser: json.is_new_user,
			link: `https://${TENANT}.nextapp.co/app/theme/${json.theme_id}/opportunities`,
		};
	});
}
