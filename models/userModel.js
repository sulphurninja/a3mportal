import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default: 'user'
    },
    groupId: {
        type: mongoose.Types.ObjectId,
        ref: 'InternGroup',
        required: true,
    },
    root:{
        type: Boolean,
        default:false
    },
  
});

userSchema.index({ userName: 1 });

let User = mongoose.models.user || mongoose.model('user', userSchema)
export default User
