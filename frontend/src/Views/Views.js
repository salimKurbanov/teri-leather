import Api from "@/Api/Api"

const Views = {}

Views.get = () => {
    let local = JSON.parse(localStorage.getItem('views'))
    return local
}

Views.getApi = (callback) => {

    let views = localStorage.getItem('views')

    fetch(`${Api.url}api/product/views/${views}`)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(error => console.log(error))
}

Views.set = (views) => {
    localStorage.setItem('views', JSON.stringify(views))
}

Views.add = (id) => {
    let views = Views.get()

    if(views) {
        if (views.indexOf(id) != -1) {
            const i = views.indexOf(id)
            views.splice(i, 1)
        }
        if(views.length >= 20) {
            views.pop()
            views.unshift(id)
        } else {
            views.unshift(id)
        }
        Views.set(views)
    } else {
        let viewsList = [id]
        Views.set(viewsList)
    }
    
}

export default Views;