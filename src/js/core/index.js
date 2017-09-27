window.html = `
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div id="panel-heading" class="panel-heading">Login</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" id="login">
                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="" required autofocus>
                                    <span class="help-block">
                                        <strong></strong>
                                    </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>
                                    <span class="help-block">
                                        <strong></strong>
                                    </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" /> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                                <a class="btn btn-link" href="#">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
`

window.Test = class Test {
  constructor(){
    this.link = document.querySelector('[href="login.html"]')
    this.target = document.querySelector('#target')
    this.loginFrm = null
    this.registerDOM = null
    this.exit = document.querySelector('#exit-item')
    this.form = document.querySelector('#form')
    this.checkAuth()
    this.adminSampleAccount()
    this.customEvents()
  }

  adminSampleAccount(){
    if(!window.localStorage.getItem('admin')){
      window.localStorage.setItem('admin', JSON.stringify(
        { name: 'Admin', email: 'admin@123.com', password: '12345' }
      ))
    }
  }

  authMiddleware(){
    this.exit.style.display = 'block'
    this.link.style.display = 'none'
  }

  checkAuth(){
    let logged = JSON.parse(window.localStorage.getItem('is_logged'))
    let auth = JSON.parse(window.localStorage.getItem('auth'))

    if(logged){
      document.querySelector('#brand').innerHTML = `Welcome ${auth.name}`
      this.target.innerHTML = '<p id="main-text">You have successfully logged in!.</p>'
      this.authMiddleware()
    }
  }

  submit(){
    let data = {}

    for(let i=0; i < this.form.elements.length; i++){
      data[`${this.form.elements[i].name}`] = this.form.elements[i].value
    }

    this.registerOnStorage(data)
  }

  registerOnStorage(data){
    if(data.password == data.password_confirmation){
      window.localStorage.setItem('auth', JSON.stringify(data))
      this.replacePage()
    } else {
      alert('Sorry the password doesnt match!')
    }
  }

  loginAsAdmin(admin, email, password){
    if(admin.email == email){
      if(admin.password == password){
        window.localStorage.setItem('is_logged', 'true')
        document.querySelector('#brand').innerHTML = `Welcome ${admin.name}`
        this.target.innerHTML = '<p id="main-text">You have successfully logged in!.</p>'
        this.resetHash()
      }
    } else {
      alert('Non existent user!')
      this.target.innerHTML = this.registerDOM
      this.resetHash()
    }
    
    new Test()
  }

  login(){
    let auth = JSON.parse(window.localStorage.getItem('auth'))
    let admin = JSON.parse(window.localStorage.getItem('admin'))
    let password = document.querySelector('#password').value
    let email = document.querySelector('#email').value
    if(auth){
      if(auth.email == email ){
        if(auth.password == password ){
          window.localStorage.setItem('is_logged', 'true')
          document.querySelector('#brand').innerHTML = `Welcome ${auth.name}`
          this.target.innerHTML = '<p id="main-text">You have successfully logged in!.</p>'
          this.resetHash()
        }
      } else if(admin){
        this.loginAsAdmin(admin, email, password)
      }
    } else if(admin){
      this.loginAsAdmin(admin, email, password)
    } else {
      alert('Non existent user!')
      this.target.innerHTML = this.registerDOM
      this.resetHash()
    }
    
    new Test()
  }

  isLogin(){
    if (window.location.hash.match(/login/gi)){
      return true
    } else {
      return false
    }
  }

  resetHash(){
    window.location.hash = ''
  }

  replacePage(){
    if (this.isLogin()) { return false }

    window.location.hash = 'login'
    this.registerDOM = this.target.innerHTML
    this.target.innerHTML = window.html
    this.loginFrm = document.querySelector('#login')

    this.loginFrm.addEventListener('submit', (e)=> {
      e.preventDefault()
      this.login()
    })
  }

  customEvents(){
    if(this.form){
      this.form.addEventListener('submit', (e)=>{
        e.preventDefault()

        this.submit()
      })
    }

    this.exit.addEventListener('click', (e)=>{
      e.preventDefault()

      window.localStorage.removeItem('is_logged')
      window.location.reload()
    })

    this.link.addEventListener('click', (e)=>{
      e.preventDefault()

      this.replacePage()
    })
  }
}

new Test()