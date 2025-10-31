const multer=require("multer");
// const path=require("path");
// const storage=multer.diskStorage({
//     destination:function(req,res,cb){
//         cb(null,"uploads/")
//     },
//     filename:function(req,res,cb){
//         const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()+1E9);
//         cb(null,this.filename.fieldname+"-"+uniqueSuffix+path.extname(file.originalname))
//     }
// })
// const upload=multer({storage:storage});
// module.exports=upload;

const {CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary=require("../config/cloudinary.js");
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"blog_posts",
        allowedFormats:["jpeg","png","jpg",'gif']
    }
});
const upload=multer({storage:storage});
module.exports=upload;