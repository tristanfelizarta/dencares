import { Schema, model, models } from 'mongoose'

const AppointmentSchema = Schema(
    {
        user: {
            type: String,
            default: ''
        },
        service: {
            name: {
                type: String,
                default: ''
            },
            price: {
                type: Number,
                default: 0
            }
        },
        schedule: {
            date: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            }
        },
        proof_of_payment: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'pending'
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

const Appointment =
    models.Appointment || model('Appointment', AppointmentSchema)

export default Appointment
