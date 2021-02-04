const  multer= require('multer');
const path= require('path');
const{v4} =require( 'uuid');
const express= require('express');
const app= express();

app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/img/uploads'),
    filename:(req,file,cb,filename)=>{
        cb(null,v4()+path.extname(file.originalname));
      
    }
});
const upload=app.use(multer({storage}).single('image'));



module.exports=upload;