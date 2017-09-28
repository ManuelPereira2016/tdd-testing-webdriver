describe('register form', function() {
    it('should redirect user to login page', function*() {
        yield browser.url('/');
        yield browser.setValue('#name', 'Manuel Pereira');
        yield browser.setValue('#email', 'manuelpereiralds@gmail.com');
        yield browser.setValue('#password', '12345');
        yield browser.setValue('#password-confirm', '12345');
        yield browser.submitForm('#form');

        yield browser.waitForExist('#login', 10000);
        yield browser.isExisting('#login').then(function(isExisting) {
            expect(isExisting).toBe(true);
        });

        yield browser.getText('#panel-heading').then(function(msg) {
            expect(msg).toContain('Login');
        });

    });
});