const sharp = require('sharp');
const fs = require('fs');
module.exports = function(imagePath){
    try{
        if(fs.existsSync(imagePath)){
            sharp(imagePath)
            .resize({width:300, height:300})
            .toBuffer(function(err, buffer){
                if(err){
                    throw new Error(err);
                }
                else{
                    fs.writeFile(imagePath, buffer, function(e){
    
                    });
                }
            });
        }
        else{
            throw new Error('File does not exists');
        }
       
    }
    catch(err){
        return err;
    }
   
}