// Constants
const TENANT = 'my-tenant';
const TOKEN = 'my-token';
const API_ENDPOINT = `https://${TENANT}.api.nextapp.co/v1/opportunities`;
const APP_ENDPOINT = `https://${TENANT}.nextapp.co/app/`;

/**
 * Posts an opportunity
 *
 * @param {string} themeId
 * @param {string} email
 * @param {string} name
 * @param {string} description
 * @param {string} labelsStr Comma-separated list of labels
 * @returns {Promise}
 */
async function postOpportunity(themeId, email, name, description, labelsStr) {
	// Extract list of labels from comma-separated list of labels
	const labels = labelsStr ? labelsStr.split(',').map(label => label.trim()) : undefined;

	// Create payload for NEXT request
	const data = {
		email,
		opportunity: {
			name,
			description,
			labels,
		},
		tenant: TENANT,
		theme_id: themeId,
		token: TOKEN,
	};

	// Send request to NEXT
	const response = await fetch(API_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const json = await response.json();
	if (!response.ok) {
		throw new Error(`${json.reason} (${json.details || '-'})`);
	}
	return {
		isNewUser: json.is_new_user,
		link: `${APP_ENDPOINT}theme/${json.theme_id}/opportunities`,
	};
}
