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
    let localBasket = localStorage.getItem('basket')

    fetch(`${Api.url}api/product/basket/${localBasket}`)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(error => console.log(error))
}

Basket.add = (id) => {
    let basketList = Basket.get()

    if(basketList) {
        if (basketList.hasOwnProperty(id)) {
            console.log(basketList[id])
            basketList[id]++
        } else {
            basketList[id] = 1
        }
        Basket.set(basketList)
    } else {
        let list = {}
        list[id] = 1
        Basket.set(list)
    }
}

Basket.remove = (id) => {
    let basket = Basket.get()
    delete basket[id]
    Basket.set(basket)
}

Basket.clear = () => {
    localStorage.removeItem('basket')
}

Basket.plus = (id) => {
    let basket = Basket.get()
    basket[id] += 1
    Basket.set(basket)
}

Basket.minus = (id) => {
    let basket = Basket.get()

    if (basket[id] >= 1) {
        basket[id] -= 1
    } else {
        return false
    }
    
    Basket.set(basket)
}

Basket.count = () => {
    let basket = Basket.get()
    let count = 0

    for (const [key, value] of Object.entries(basket)) {
        count += value
    }

    return count
}

Basket.totalPrice = (callback, basket) => {

    let localBasket = Basket.get()
    let total_price = 0

    for(let i of basket) {
        console.log(localBasket[i.id])
        total_price += i.total_price * localBasket[i.id]
    }

    callback(total_price)
}

export default Basket;