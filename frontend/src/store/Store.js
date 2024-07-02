const listener = {}

const Store = {}

Store.useListener = (name, func) => {
    return listener[name]=func
}

Store.setListener = (name, data) => {
    if(name) {
        return listener[name](data)
    } else {
        return
    }
}

Store.sendMessage = (text) => {
    const p = document.createElement('p')
    let time2;
    p.textContent = text
    document.getElementById('main_message').append(p)

    const time1 = setTimeout(() => {
        p.classList.add('remove')
         time2 = setTimeout(() => {
            p.remove()
        }, 1500)
    }, 3000)

    return () => {
        clearTimeout(time1)
        if (time2) {
            clearTimeout(time2)
        }
    }
}

export default Store;