import Input from './Input.js'
import Navigate from './Navigate.js'

import Logo from '../../images/logo.svg'

class LogIn{
    constructor(parent, register, injections){
        this.injections = injections
        this.parent = parent
        this.register = register
        this.node = document.createElement('section')
        this.node.setAttribute('id', 'register')
    }

    render() {
        this.parent.style.padding = '0'
        const header = document.querySelector('header')
        header.style.display = 'none'

        const img = document.createElement('img')
        img.src = Logo
        this.node.append(img)

        const p = document.createElement('p')
        this.node.appendChild(p)
        p.style.display = 'none'

        const inputs = this.register ? [
            [this.node, 'Username', 'username', 'Your name'],
            [this.node, 'First Name', 'firstname', 'Your firstname'],
            [this.node, 'Last Name', 'lastname', 'Your lastname'],
            [this.node, 'Gender', 'gender', 'Your gender'],
            [this.node, 'Age', 'age', 'Your age'],
            [this.node, 'Cellphone', 'cellphone', 'Your phone number'],
            [this.node, 'Email Adress', 'email', 'email adress'],
            [this.node, 'Password', 'password', 'Your password'],
            [this.node, 'Confirm Password', 'confirm-password', 'Confirm password'],
        ] : [
            [this.node, 'Username', 'username', 'Your name'],
            [this.node, 'PassWord', 'password', 'Your password'],
        ]

        const form = inputs.reduce((values, array) => {
            const input = new Input(array)
            input.render()

            values.push(input)
            return values
        }, [])
        
        const button = document.createElement('button')
        button.textContent = this.register ? 'register' : 'login'
        button.addEventListener('click', async () => {
            let valid = true
            let password, confirm, confirmNode
            let username = null

            let data = form.reduce((client, input) => {
                let [key, value] = input.value

                if (this.register) {
                    if (!valid) { return client }
                        valid = this.#validate(key, value, input.alert)
                        if (key === 'confirm-password') { 
                            confirm = value
                            confirmNode = input
                            return client 
                        }
                        
                        if (key === 'cellphone') { key = 'cell' }
                        else if (key === 'password') { 
                            password = value
                            key = 'secret' 
                        }
                        else if (key === 'gender') { 
                            key = 'sex' 
                            value = value.toLowerCase() === 'male' ? 1 : 0
                        } else if (key === 'username') {
                        username = [input, value]
                    }
                }
                client[key] = value

                return client
            }, {})


            console.log('check', data);

            if (this.register) {
                valid = password === confirm

                if (!valid) { confirmNode.alert('password doesn\'t match') }
                else { confirmNode.alert(null) }
            }

            if (valid) { 
                const res = await this.#send(data) 
               
                console.log('response', res);
                console.log(res.status);
                if (res.status === 200) {
                    if (!this.register) { data = await res.json()}
  
                    header.style.display = 'block'
                    this.#store(data)
                    this.remove()
                    Navigate.toHome()
                    this.injections['login']
                } else if (this.register) {
                    const n = Math.floor(Math.random() * 100000)
                    username[0].alert('username already taken try different one i.e ' + username[1]  + n)
                } else {
                    p.style.display = 'block'
                    p.innerText = 'Password username combination unrecognized'
                }
            }
        })

        this.node.appendChild(button)

        if (!this.register) {
            const link = document.createElement('a')
            link.innerText = 'create a new account'
            this.node.appendChild(link)

            link.addEventListener('click', () => {
                this.remove()   
                this.register = true
                this.render()
            })
        }

        this.parent.appendChild(this.node)
    }

    remove() {
        this.parent.style.padding = '15vh 0 0 0'
        Navigate.removeAllChildNodes(this.node)
        this.parent.removeChild(this.node);
    }

    #validate(label, input, callback) {
        if (!input) { 
            callback(`please fill in your ${label}`)
            return false 
        }

        if (label == 'password') {
            const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

            if (!input.match(passw)) { 
                callback('your password should be between 8 to 15 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
                return false
            }
        }  else  if (label == 'email') {
            const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            if (!input.match(mail)) { 
                callback('please enter a valid email e.g "myemail@mail.com')
                return false
            }
        }

        callback(null)
        return true
    }

    #store(data) {
        if (data.secret) { delete data.secret }

        localStorage.setItem('CE-user', JSON.stringify(data))
        this.injections['user'] = data
    }

    async #send (data) {
        const url = this.register ? '/register' : '/login'
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        console.log('status', response.status );
        return response
    }
}

export default LogIn