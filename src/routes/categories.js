const router = require("express").Router();
const Category = require("../models/Category");


router.post("/", async (req, res, next) => {
    console.log("requested");
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        return res.status(200).json(savedCat);
    } catch (err) {
        return next(err);
    }
});
router.get('/',async (req, res, next) => {
    try{
const cats = await Category.find();
return res.status(200).json(cats);
    }catch (err){
        return next(err);
    }
})


module.exports = router;
