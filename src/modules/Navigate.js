class Navigate{
    static from(parent) {
        parent.style.display = 'none'
    }

    static to(parent, child) {
        parent.appendChild(child)
        
    }
}

export default Navigate