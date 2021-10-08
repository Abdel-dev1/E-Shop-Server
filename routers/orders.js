const {Order}=require('../models/order');
const express=require('express');
const { OrderItem } = require('../models/order item');
const router=express.Router();
const {User}= require('../models/user');

router.post('/', async (req, res)=>{
    const orderItemsIds=Promise.all(req.body.orderItems.map(async orderItem=>{
        let neworderItem= new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        neworderItem=await neworderItem.save();
        return neworderItem._id;
    }))
    const orderItemsIdsResolved= await orderItemsIds;
    //console.log(orderItemsIdsResolved);

    const totalPrices=await Promise.all(orderItemsIdsResolved.map(async (orderItemsId)=>{
        const orderItem=await OrderItem.findById(orderItemsId).populate('product','price');
        const totalPrice=orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))
    
    console.log(totalPrices);
    const totalPrice=totalPrices.reduce((a,b)=>a+b,0);

    let order=new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.zip,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:totalPrice,
        user:req.body.user,
        dataOrdered:req.body.dataOrdered,
    })
    order = await order.save();
    if(!order)
    return res.status(404).send('The order cannot be created');
    res.send(order);
})

router.get('/', async (req, res)=>{
    const orderList= await Order.find().populate('user', 'name');
    if(!orderList){
        res.status(500).json({success:false})
    }
    res.status(200).send(orderList);
})

router.put('/:id',async (req,res)=>{
    const order= await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        {new:true}
    )
    if(!order)
    return res.status(404).send('The order cannot be updated');
    res.send(order);
})

router.delete('/:id',(req,res)=>{
    Order.findByIdAndDelete(req.params.id).then(async order=>{
        if(order){
            await order.orderItems.map(async orderItem=>{
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success:true,message:'Rah sda9 lablan'})
        }
        else {
             return res.status(404).json({success :false ,message :'massda9ch lablan'})
        }})
    .catch(err=>{
        return res.status(400).json({sucess:false,message: 'hhhhhh'})
    })
})


module.exports=router;