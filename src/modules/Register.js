class Register {
    constructor() {

    }


    render() {

    }

    async d () {
        const data = { name: 'John', age: 30 };

            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const text = await response.text()
            console.log(text);
    }
}

export default Register