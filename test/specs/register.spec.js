describe('register form', function() {
    it('should redirect user to login page', function*() {
        yield browser.url('/');

        // Set name field value on the form.
        yield browser.setValue('#name', 'Manuel Pereira');

        // Set email field value on the form.
        yield browser.setValue('#email', 'manuelpereiralds@gmail.com');

        // Now set the password and confirm it.
        yield browser.setValue('#password', '12345');
        yield browser.setValue('#password-confirm', '12345');

        // Now submit the form and trigger "submit" event.
        yield browser.submitForm('#form');

        // I think 10000 is enough
        yield browser.waitForExist('#login', 10000);
        yield browser.isExisting('#login').then(function(isExisting) {
            expect(isExisting).toBe(true);
        });

        // Lets check if we are now on Login page!
        yield browser.getText('#panel-heading').then(function(msg) {
            expect(msg).toContain('Login');
        });

    });
});