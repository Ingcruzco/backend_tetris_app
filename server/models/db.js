const mongoose = require('mongoose');
const MONG0DB_URL=process.env.MONGO_CONNECTION;
mongoose.connect(MONG0DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,'The email is required'],
    },
    name:{
        type:String,
        require:[true,'The name is required'],
    },
    lastName:{
        type:String,
        require:[true,'The Last Name is required'],    
    },
    password:{
        type:String,
        require:[true,'The password is required'],
    },
    active:{
        type:Boolean,
        require:false,
    },
    role:{
        type:String,
        enum:['admin_role','user_role'],
        require:[false,'The rol is required'],
    }

});

UserSchema.methods.toJSON=function(){
    const obj=this.toObject();
    ["password","email","role","active","__v","_id"].forEach(property=> delete obj[property] );
    const uid=this.toObject()._id;
    obj.uid=uid;
    return obj;
}

const db = mongoose.connection;
const Users=db.model('Users',UserSchema);

module.exports={
    Users,
}