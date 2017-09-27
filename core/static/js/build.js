/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.html = '\n<div class="container">\n    <div class="row">\n        <div class="col-md-8 col-md-offset-2">\n            <div class="panel panel-default">\n                <div class="panel-heading">Login</div>\n                <div class="panel-body">\n                    <form class="form-horizontal" role="form" id="login">\n                        <div class="form-group">\n                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>\n                            <div class="col-md-6">\n                                <input id="email" type="email" class="form-control" name="email" value="" required autofocus>\n                                    <span class="help-block">\n                                        <strong></strong>\n                                    </span>\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label for="password" class="col-md-4 control-label">Password</label>\n\n                            <div class="col-md-6">\n                                <input id="password" type="password" class="form-control" name="password" required>\n                                    <span class="help-block">\n                                        <strong></strong>\n                                    </span>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <div class="col-md-6 col-md-offset-4">\n                                <div class="checkbox">\n                                    <label>\n                                        <input type="checkbox" name="remember" /> Remember Me\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="form-group">\n                            <div class="col-md-8 col-md-offset-4">\n                                <button type="submit" class="btn btn-primary">\n                                    Login\n                                </button>\n                                <a class="btn btn-link" href="#">\n                                    Forgot Your Password?\n                                </a>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n';

	window.Test = function () {
	  function Test() {
	    _classCallCheck(this, Test);

	    this.link = document.querySelector('[href="login.html"]');
	    this.target = document.querySelector('#target');
	    this.loginFrm = null;
	    this.registerDOM = null;
	    this.exit = document.querySelector('#exit-item');
	    this.form = document.querySelector('#form');
	    this.checkAuth();
	    this.adminSampleAccount();
	    this.customEvents();
	  }

	  _createClass(Test, [{
	    key: 'adminSampleAccount',
	    value: function adminSampleAccount() {
	      if (!window.localStorage.getItem('admin')) {
	        window.localStorage.setItem('admin', JSON.stringify({ name: 'Admin', email: 'admin@123.com', password: '12345' }));
	      }
	    }
	  }, {
	    key: 'authMiddleware',
	    value: function authMiddleware() {
	      this.exit.style.display = 'block';
	      this.link.style.display = 'none';
	    }
	  }, {
	    key: 'checkAuth',
	    value: function checkAuth() {
	      var logged = JSON.parse(window.localStorage.getItem('is_logged'));
	      var auth = JSON.parse(window.localStorage.getItem('auth'));

	      if (logged) {
	        document.querySelector('#brand').innerHTML = 'Welcome ' + auth.name;
	        this.target.innerHTML = '';
	        this.authMiddleware();
	      }
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var data = {};

	      for (var i = 0; i < this.form.elements.length; i++) {
	        data['' + this.form.elements[i].name] = this.form.elements[i].value;
	      }

	      this.registerOnStorage(data);
	    }
	  }, {
	    key: 'registerOnStorage',
	    value: function registerOnStorage(data) {
	      if (data.password == data.password_confirmation) {
	        window.localStorage.setItem('auth', JSON.stringify(data));
	        this.replacePage();
	      } else {
	        alert('Sorry the password doesnt match!');
	      }
	    }
	  }, {
	    key: 'loginAsAdmin',
	    value: function loginAsAdmin(admin, email, password) {
	      if (admin.email == email) {
	        if (admin.password == password) {
	          window.localStorage.setItem('is_logged', 'true');
	          document.querySelector('#brand').innerHTML = 'Welcome ' + admin.name;
	          this.target.innerHTML = '';
	          this.resetHash();
	        }
	      } else {
	        alert('Non existent user!');
	        this.target.innerHTML = this.registerDOM;
	        this.resetHash();
	      }

	      new Test();
	    }
	  }, {
	    key: 'login',
	    value: function login() {
	      var auth = JSON.parse(window.localStorage.getItem('auth'));
	      var admin = JSON.parse(window.localStorage.getItem('admin'));
	      var password = document.querySelector('#password').value;
	      var email = document.querySelector('#email').value;
	      if (auth) {
	        if (auth.email == email) {
	          if (auth.password == password) {
	            window.localStorage.setItem('is_logged', 'true');
	            document.querySelector('#brand').innerHTML = 'Welcome ' + auth.name;
	            this.target.innerHTML = '';
	            this.resetHash();
	          }
	        } else if (admin) {
	          this.loginAsAdmin(admin, email, password);
	        }
	      } else if (admin) {
	        this.loginAsAdmin(admin, email, password);
	      } else {
	        alert('Non existent user!');
	        this.target.innerHTML = this.registerDOM;
	        this.resetHash();
	      }

	      new Test();
	    }
	  }, {
	    key: 'isLogin',
	    value: function isLogin() {
	      if (window.location.hash.match(/login/gi)) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'resetHash',
	    value: function resetHash() {
	      window.location.hash = '';
	    }
	  }, {
	    key: 'replacePage',
	    value: function replacePage() {
	      var _this = this;

	      if (this.isLogin()) {
	        return false;
	      }

	      window.location.hash = 'login';
	      this.registerDOM = this.target.innerHTML;
	      this.target.innerHTML = window.html;
	      this.loginFrm = document.querySelector('#login');

	      this.loginFrm.addEventListener('submit', function (e) {
	        e.preventDefault();
	        _this.login();
	      });
	    }
	  }, {
	    key: 'customEvents',
	    value: function customEvents() {
	      var _this2 = this;

	      if (this.form) {
	        this.form.addEventListener('submit', function (e) {
	          e.preventDefault();

	          _this2.submit();
	        });
	      }

	      this.exit.addEventListener('click', function (e) {
	        e.preventDefault();

	        window.localStorage.removeItem('is_logged');
	        window.location.reload();
	      });

	      this.link.addEventListener('click', function (e) {
	        e.preventDefault();

	        _this2.replacePage();
	      });
	    }
	  }]);

	  return Test;
	}();

	new Test();

/***/ })
/******/ ]);