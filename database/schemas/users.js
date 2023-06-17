import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
    {
        name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ''
        },
        age: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        contact: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: 'Patient'
        },
        status: {
            type: String,
            default: 'active'
        },
        created: {
            type: String,
            default: ''
        },
        updated: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
)

const Users = models.Users || model('Users', UserSchema)

export default Users
