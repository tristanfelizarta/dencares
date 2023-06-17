import { Schema, model, models } from 'mongoose'

const SystemSchema = new Schema(
    {
        status: {
            type: Boolean,
            default: true
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

const System = models.Systems || model('Systems', SystemSchema)

export default System
