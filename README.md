# widget-sample

Example of a widget that connects to the NEXT platform using the NEXT integration API.

Sample widget | NEXT theme page
------------- | -------------
![Sample widget](img/widget-screenshot.png) | ![Opportunity posted from widget](img/theme-screenshot.png)

## Background

NEXT provides you with an sophisticated UI to manage innovation. Yet, some scenarios ask for a lighter, more integrated experience. Namely, organizations want to source innovation opportunities from a wide range of people, through a place that they feel comfortable with. One such place could be your existing intranet running on a Content Management System such as Microsoft SharePoint.

The NEXT widget demonstrates how to solve this challenge: an easy to implement approach to post opportunities to NEXT from a website. As the users of this website may not have a NEXT account yet the widget creates a NEXT account for the user automatically.

The example uses JavaScript ES6, which runs in modern browsers like Chrome and Firefox. If you use another programming language, you will have to convert the provided sample code accordingly.

## Integration

Execute these steps to create a NEXT widget:

1. Create a client token from the NEXT Administration app (https://_\<MY-TENANT\>_.nextapp.co/admin/)
2. Copy the [sample code](examples/) to your application and adjust it according to your programming language
3. Send a REST call when the [Post] button is clicked. See the code sample for the required fields.
4. Show feedback to user that an opportunity was posted, an account was created, or any errors that occurred

Tip: You might have to allow the browser to send requests from your page to NEXT (e.g. add _tenant_.nextapp.co to the Content Security Policy of your page).

## Examples

This repository contains different examples for widgets:
* [Minimal example](examples/minimal.html): Barebone widget that queries all themes and sends the minimal amount of fields
* [Theme page example](examples/theme-page.html): A styled theme page which contains a widget to submit opportunities for this theme.

To run the examples:
1. Download the HTML file to your computer
2. Adjust the constants on top of the HTML file
3. Open the HTML file in your browser (it's not necessary to run them on a server)

## API reference

The API requires to send the NEXT token in the `Authorization` header with each request:
```
Authorization: Bearer 12345678-9012-3456-7890-123456789012
```

The API is documented with JSON schemas that you can use to validate requests and responses:

### Create an opportunity

`POST https://${TENANT}.api.nextapp.co/v1/opportunities`
* [Request schema](https://collaborne.api.nextapp.co/v1/schema/create-opportunity.json)
* [Response schema](https://collaborne.api.nextapp.co/v1/schema/opportunity-created.json)
* [Error schema](https://collaborne.api.nextapp.co/v1/schema/create-opportunity-error.json)

### Fetch all themes

`GET https://${TENANT}.api.nextapp.co/v1/themes`
* [Response schema](https://collaborne.api.nextapp.co/v1/schema/themes-fetched.json)
* [Error schema](https://collaborne.api.nextapp.co/v1/schema/fetch-themes-error.json)

Example:
```sh
curl -H "Authorization: Bearer <YOUR TOKEN>" https://<YOUR TENANT>.api.nextapp.co/v1/themes
```

## Security considerations

Please review the following considerations before deploying this or a simple widget:

* Users are looked up by their email address, if no user with that email address exists a new user is created with access level "Full User".

* The creation of opportunities respects the normal NEXT permissions. For example, creating an opportunity with a guest user will lead to an error. You therefore should show the widget only to users who can create opportunities.

* The client token is exposed in the widget, and it allows anyone to trigger the creation of opportunities and new users. The widget should therefore be deployed into a trusted environment (intranet with authentication/authorization checks, not the public internet).
  You can additionally mitigate the risk by sending the REST request to NEXT from the backend part of your application, thereby not exposing the token to the browser.

## Support

You can file questions about the widget sample as a Github ticket. Please **do not include any private data** into Github tickets because they are visible to everybody. To include private data, please file a request with [NEXT Support](https://support.nextapp.co).

## Fair usage policy

The widget/Integration API is covered NEXT's fair usage policy. In a nutshell: Use it as it's intented to be used.

Please contact us beforehand in case you consider to:
* Mass-important existing opportunities
* Open the widget to the general public, expecting many opportunities to be created (more than 5 opportunities posted per seconds in average)

## FAQ

### Q: Can users end up with multiple NEXT accounts?

The widget needs to include an email address in the request for looking up/creating the user in NEXT. This email address _should not be entered by the user_, but rather it should be filled in automatically based on the authentication information in the Content Management System.

This may lead to issues when users use different email addresses for NEXT and the Content Management System. This can be avoided by using SAML/AD based authentication (SSEO). With SAML/AD, NEXT can match accounts based on the userID instead of the email.
