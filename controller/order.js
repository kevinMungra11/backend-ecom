const { Order, ProductCart } = require('../models/order');

exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order) => {
        if(err){
            return res.status(400).json({
                error : "NO order found in DB!"
            })
        }
        req.order = order;
        next();
    })
}

// Read orders 
exports.getAllOrder = (req,res) => {
    Order.find()
    .populate("user","_id name")
    .exec((err,orders) => {
        if(err){
            return res.status(400).json({
                error : "No orders found in DB!"
            })
        }
        res.json(orders);
    });
}

exports.getOrderStatus = (req,res) => {
    res.json(Order.schema.path("status").enumValues);
}

// Update status
exports.updateStatus = (req,res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err,updatedOrder) => {
            if(err){
                return res.status(400).json({
                    error : "Cann't update order status"
                })
            }
            res.json(updatedOrder);
        }
    )
}
// Create order
exports.createOrder = (req,res) => {
    
    req.body.order.user = req.profile;

    const order = new Order(req.body.order);

    order.save((err,order) => {
        if(err){
            return res.status(400).json({
                error : "Failed to save in DB!"
            })
        }
        res.json(order)
    })
}