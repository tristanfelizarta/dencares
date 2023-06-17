import { Schema, model, models } from 'mongoose'

const ScheduleSchema = new Schema(
    {
        date: {
            type: String,
            default: ''
        },
        time: [
            {
                label: String,
                user: String
            }
        ],
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

const Schedule = models.Schedule || model('Schedule', ScheduleSchema)

export default Schedule
