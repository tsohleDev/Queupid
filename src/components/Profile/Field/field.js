function Field(props) {
    const { label, value } = props;
    return (
        <div className="profile__info">
            <label >{label}</label>
            <input type="text" value={value} readOnly={true} />
        </div>
    )
}

export default Field;