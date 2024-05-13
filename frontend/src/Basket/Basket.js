import Api from "@/Api/Api"

const Basket = {}


Basket.get = () => {
    let basketList = JSON.parse(localStorage.getItem('basket'))
    return basketList
}

Basket.set = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket))
}

Basket.getApi = (callback) => {
    let localBasket = Basket.get()
    let basket = []

    if (localBasket) {
        for(let i of localBasket) {
            basket.push(i.id)
        }
    }

    fetch(`${Api.url}api/product/basket/${JSON.stringify(basket)}`)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(error => console.log(error))
}

Basket.add = (el_id, price) => {
    let basketList = Basket.get()

    if(basketList) {
        let product = basketList.find(el => el.id === el_id)
        if (product) {
            product.count += 1
        } else {
            basketList.push({'id': el_id, 'count': 1, 'price': price})
        }
        Basket.set(basketList)
    } else {
        let list = [{'id': el_id, 'count': 1, 'price': price}]
        Basket.set(list)
    }
}

Basket.remove = (el_id) => {
    let basket = Basket.get()
    Basket.set(basket.filter(product => product.id !== el_id ))
}

Basket.clear = () => {
    localStorage.removeItem('basket')
}

Basket.plus = (el_id) => {
    let basket = Basket.get()
    let product = basket.find(el => el.id === el_id)
    product.count += 1
    Basket.set(basket)
}

Basket.minus = (el_id) => {
    let basket = Basket.get()
    let product = basket.find(el => el.id === el_id)

    if (product.count >= 1) {
        product.count -= 1
    } else {
        return false
    }
    
    Basket.set(basket)
}

Basket.count = () => {
    let basket = Basket.get()
    let count = 0

    for (let i of basket) {
        count += i.count
    }

    return count
}

Basket.totalPrice = () => {

    let localBasket = Basket.get()
    let total_price = 0

    for(let i of localBasket) {
        total_price += i.price * i.count
    }

    return total_price.toFixed(2)
}

export default Basket;