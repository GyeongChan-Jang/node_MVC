const path = require('path')
const fs = require('fs')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const Cart = require('./cart')

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([])
    } else return cb(JSON.parse(fileContent))
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    // 새로운 상품을 등록할 때는 id가 null
    // 상품을 edit할 경우 id를 넣어줌
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile((products) => {
      // 이미 id가 있다면 edit 실행
      if (this.id) {
        const existingProductIndex = products.findIndex((prod) => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id)
      cb(product)
    })
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id)
      const updatedProducts = products.filter((prod) => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteById(id, product.price)
        }
      })
      cb(product)
    })
  }
}
