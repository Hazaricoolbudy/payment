const cors= require('cors')
const express= require('express')
const port= process.env.PORT || 8000

// TODO add a stripe key

const stripe=require('stripe')('sk_test_51KmNqmSDZAQp6joFveP8kDRk8Vv9LTFGNvFxn0chfXAYvXxFCTrLOOrDiQ3Ch5ZWBVxf9QOD0izlYGl63a8oseyV00ykRyIRiL')
const uuid=require('uuid')

const app=express()



// middle ware 

app.use(express.json());
app.use(cors())

// ROUTES

app.get("/",(req,res)=>{
    res.send("hello from the other side");
})

app.post('payment',(req,res)=>{
    const  {product,token}=req.body
    console.log("productt",product);
    console.log("price",product.price);
    const idempotencyKey=uuid()

    return stripe.customers.create({
        email: token.email,
        source:token.id
    }).then(customer=>{
        stripe.charge.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            discription: product.name,
            shipping:{
                name: token.card.name,
                address:{
                    country:token.card.adress_country
                }
            }
        },{idempotencyKey})
    }).then(result=>res.status(200).json(result)).catch(err=>{
        console.log(err);
    })
})






app.listen(port, ()=>{
    console.log(`listing at port no ${port}`);
})