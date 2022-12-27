import Input from './Input.js'
import Navigate from './Navigate.js'

import Logo from '../../images/logo.svg'

class LogIn{
    constructor(parent, register){
        this.parent = parent
        this.register = register
        this.node = document.createElement('section')
        this.node.setAttribute('id', 'register')
    }

    render() {
        const header = document.querySelector('header')
        header.style.display = 'none'

        const img = document.createElement('img')
        img.src = Logo
        this.node.append(img)

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

        console.log(form);
        
        
        const button = document.createElement('button')
        button.textContent = this.register ? 'register' : 'login'
        button.addEventListener('click', () => {
            //validate that all values are inputed
            let valid = true
            let password, confirm

            const data = form.reduce((client, input) => {
                let [key, value] = input.value

                if (this.register) {
                if (!valid) { return client }

                valid = this.#validate(key, value, input.alert)
                    if (key === 'confirm-password') { 
                        confirm = value
                        return client 
                    }
                    
                    if (key === 'cellphone') { key = 'cell' }
                    else if (key === 'password') { 
                        password = value
                        key = 'secret' 
                    }
                    else if (key === 'gender') { key = 'sex' }
                }
                client[key] = value

                return client
            }, {})

            if (valid) { 
                console.log('done');
                header.style.display = 'block'
                //this.#send(data) 
               
                this.remove()
                Navigate.toHome()
            }
        })

        this.node.appendChild(button)
        this.parent.appendChild(this.node)
    }

    remove() {
        Navigate.removeAllChildNodes(this.node)
        this.parent.removeChild(this.node);
    }

    #validate(label, input, callback) {
        console.log('hello');
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

    async #send (data) {
            const url = this.register ? '/register' : '/login'
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const text = await response.text()
            console.log(text);
    }
}

export default LogIn