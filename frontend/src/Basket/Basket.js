import Api from "@/Api/Api"
import Store from "@/store/Store"

const Basket = {}


Basket.get = () => {
    let basketList = JSON.parse(localStorage.getItem('basket'))
    return basketList
}

Basket.set = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket))
}

Basket.getApi = async () => {
    let localBasket = Basket.get()
    let basket = []

    if (localBasket) {
        for(let i of localBasket) {
            basket.push(i.id)
        }
    }
    try {
        let res = await fetch(`${Api.url}api/product/basket/${JSON.stringify(basket)}`, {cache: 'no-cache'})

        if(!res.ok) {
            return 'error'
        }

        res = await res.json()

        return res
    }
    catch(e) {
        console.log(e)
        return 'error'
    }
    
}

Basket.updateApi = async () => {
    let localBasket = Basket.get()
    let basket = []

    if (localBasket) {
        for(let i of localBasket) {
            basket.push(i.id)
        }
    }

    try {
        let res = await fetch(`${Api.url}api/product/basket/${JSON.stringify(basket)}`, {cache: 'no-cache'})

        if(!res.ok) {
            return 'error'
        }

        res = await res.json()
        
        Store.setListener('updateBasketMenu', res)

        return
    }
    catch(e) {
        console.log(e)
        return 'error'
    }

    
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

    if(basket) {
        for (let i of basket) {
            count += i.count
        }
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