import { Schema, model, models } from 'mongoose'

const ServicesSchema = new Schema(
    {
        name: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
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

const Services = models.Services || model('Services', ServicesSchema)

export default Services
