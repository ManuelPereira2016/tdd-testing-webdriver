describe('login form', function() {

    it('should allow access with admin default creds', function*() {
        yield browser.url('/');
        yield browser.click('#login-btn');
        yield browser.waitForExist('#login', 10000);

        yield browser.isExisting('#login').then(function(isExisting) {
            expect(isExisting).toBe(true);
        });
        
        yield browser.setValue('#email', 'admin@123.com');
        yield browser.setValue('#password', '12345');
        yield browser.submitForm('#login');

        yield browser.waitForExist('#main-text', 10000);

        yield browser.isExisting('#main-text').then(function(isExisting) {
            expect(isExisting).toBe(true);
        });

        yield browser.getText('#main-text').then(function(text) {
            expect(text).toContain('You have successfully logged in!.');
        });

    });
});