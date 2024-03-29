const {Category}=require('../models/category');
const express=require('express');
const router=express.Router();

router.get('/', async (req, res)=>{
    const categoryList= await Category.find();
    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList);
})

router.get('/:id', async (req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({success:false,message:'the category with the given id dosnt exist'})
    }
    res.status(200).send(category);
})

router.post('/', async (req, res)=>{
    let category=new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    })
    category = await category.save();
    if(!category)
    return res.status(404).send('The category cannot be created');
    res.send(category);
})

router.put('/:id',async (req,res)=>{
    const category= await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon: req.body.icon,
            color:req.body.color
        },
        {new:true}
    )
    if(!category)
    return res.status(404).send('The category cannot be updated');
    res.send(category);
})

//api/v1/kdkdnkndk525dikd
router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id).then(category=>{
        if(category){
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