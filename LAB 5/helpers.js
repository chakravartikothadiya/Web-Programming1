//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const validateID = (id) =>{
    let reg=/^[0-9]+$/
    if(reg.test(id)===false || id==0)
      {
        throw "invalid_id";
      }
}

module.exports = validateID;