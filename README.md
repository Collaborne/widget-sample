# widget-sample
Example of a widget that connects to the NEXT platform

## Background

NEXT provides you with an sophistacted UI to manage innovation. Yet, some scenarios ask for a lighter, more integrated experience. Namely, organizations want to source innovation opportunities from a wide range of people who might - or might also not - have a NEXT account.

The NEXT widget solves this challenge: an easy to implement approach to post opportunities to NEXT from within your own application/intranet/etc. The widget creates a NEXT account for the user if no account exists so far.

The example uses JavaScript ES6, which runs a.o. in modern browers like Chrome and Firefox. If you use another programming language, you will have to convert the provided sample code accordingly.

## Integration

Execute these steps to create a NEXT widget:

1. Create a client token in the NEXT Administration app
2. Look up the theme IDs in the NEXT app (e.g. from browser URL)
3. Copy the [sample code](src/) to your application and adjust it according to your programming language
4. Send a REST call when the [Post] button is clicked. See the code sample for the required fields.
5. Show feedback to user that an opportunity was posted, if an account created, or potential errors

Tip: You might have to allow the browser to send requests from your page to NEXT (e.g. add <tenant>.nextapp.co to the Content Security Policy of your page).

## Security considerations

Please review the following consideration before activating the widget:

* New users are generated with access level "Full User".

* The opportunities creation respects the normal NEXT permissions. For example, creating an opportunity with a guest user will lead to an error. You therefore should show the widget only to users who can create opportunities.

* Sending the REST request from the frontend-side means that the NEXT token is exposed to everyone who can access your application. This means that users could capture the NEXT token, and later create new users even if they don't have any longer access to your application (or another person who receives the NEXT token).
  The risk can be avoided sending the REST request to NEXT from the backend part of your application.

## Support

You can file questions about the widget sample as a Github ticket. Please **do not include any private data** into Github tickets because they are visible to everybody. To include private data, please file a request with [NEXT Support](https://collaborne.zendesk.com/hc/en-us).

## FAQ

### Q: How can I show a themes selector?

NEXT doesn't allow to query for all existing themes via the integration API. You therefore need to look up the theme IDs in the NEXT application (e.g. browser URL) and then build a selector in your application accordingly.

### Q: Can users end up with multiple NEXT accounts?

Users might end up with additional accounts if they use a different email address in NEXT vs Sharepoint.

This can be avoided by using SAML/AD based authentication (SSEO). With SAML/AD, NEXT can match accounts based on the userID instead of the email.
