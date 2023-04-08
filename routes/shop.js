const path = require('path')

const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

// router.get('/products/delete')

// 동적 라우트는 세부 라우터 뒤에 두어야함
router.get('/products/:productId', shopController.getProduct)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckout)

module.exports = router
