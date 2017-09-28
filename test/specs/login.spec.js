describe('login form', function() {

    it('should allow access with admin default creds', function*() {
        yield browser.url('/');

        // We want to click "login" on nav so the DOM change its content.
        yield browser.click('#login-btn');

        // Check if we are on Login, wait some seconds.
        yield browser.waitForExist('#login', 10000);

        yield browser.isExisting('#login').then(function(isExisting) {
            expect(isExisting).toBe(true);
        });

        // Set the required values on the Form. Test "ADMIN" default user.
        yield browser.setValue('#email', 'admin@123.com');
        yield browser.setValue('#password', '12345');
        yield browser.submitForm('#login');

        yield browser.waitForExist('#main-text', 10000);

        yield browser.isExisting('#main-text').then(function(isExisting) {
            expect(isExisting).toBe(true);
        });

        // We check if we are on main page already logged in.
        yield browser.getText('#main-text').then(function(text) {
            expect(text).toContain('You have successfully logged in!.');
        });

    });
});