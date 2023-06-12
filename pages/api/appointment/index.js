import connect from 'database/connect'
import Users from 'database/schemas/users'
import Schedule from 'database/schemas/schedule'
import Services from 'database/schemas/services'
import Appointment from 'database/schemas/appointment'

export default async (req, res) => {
    const { method } = req
    await connect()

    switch (method) {
        case 'GET':
            try {
                const data = await Appointment.find({}).sort({ createdAt: -1 })
                res.status(200).send(data)
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'POST':
            try {
                const { data } = req.body

                console.log(data)

                await Users.findByIdAndUpdate(
                    { _id: data.id },
                    {
                        age: data.age,
                        gender: data.gender,
                        address: data.address
                    }
                )

                const results = (id, date, time) => {
                    let data = []

                    date.time.map((t) => {
                        if (t._id === time._id) {
                            data.push({
                                label: time.label,
                                user: id,
                                _id: t._id
                            })
                        } else {
                            data.push(t)
                        }
                    })

                    return data
                }

                await Schedule.findByIdAndUpdate(
                    { _id: data.date._id },
                    {
                        time: results(data.id, data.date, data.time),
                        created: new Date().toLocaleString('en-US', {
                            timeZone: 'Asia/Manila'
                        }),
                        updated: new Date().toLocaleString('en-US', {
                            timeZone: 'Asia/Manila'
                        })
                    }
                )

                const service = await Services.findById({ _id: data.service })

                await Appointment.create({
                    user: data.id,
                    service: {
                        name: service.name,
                        price: service.price
                    },
                    schedule: {
                        date: data.date.date,
                        time: data.time.label
                    },
                    proof_of_payment: data.proof_of_payment
                })

                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'PATCH':
            try {
                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'DELETE':
            try {
                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        default:
            res.status(400).send('request failed.')
            break
    }
}
