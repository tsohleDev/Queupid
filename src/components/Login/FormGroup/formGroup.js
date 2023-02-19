
function FormGroup(props) {
    const {handleChange, tag, label, alert} = props;
    const placeholders = {username:'Your name', firstname:'Your firstname', lastname: 'Your lastname',
                            cell:'Your cell number', email:'Your email',
                            gender: 'Your gender', dob:'Your date of birth',
                            secret:'Your password', confirmPassword:'Confirm your password'};
    
    const getPlaceholder = tag => placeholders[tag]
    const getHtmlType = (tag) => {
        switch (tag) {
            case 'secret':
            case 'confirmPassword':
                return 'password'
            default:
                return tag;
        }
    }
    const type = (tag) => {
        switch (tag) {
            case 'confirmPassword':
            case 'secret':
                return 'password'
            case 'dob':
                return 'date'
            default:
                return 'text'
        }
    }
    return (
        <div className="form-group">
            {alert && alert.type === tag && <p className="alert">{alert.message}</p>}
            <label htmlFor={tag}>{label}</label>
            {tag === 'secret' && <input type={type(tag)} autoComplete="new-password" placeholder={getPlaceholder(tag)} id={tag} name={tag} onChange={handleChange}/>}
            {tag !== 'secret' && <input type={type(tag)} autoComplete="new-password" placeholder={getPlaceholder(tag)} id={tag} name={tag} onChange={handleChange}/>}
        </div>
    )
}

export default FormGroup;