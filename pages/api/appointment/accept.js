import connect from 'database/connect'
import Users from 'database/schemas/users'
import Appointment from 'database/schemas/appointment'
import sgMail from '@sendgrid/mail'

export default async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const { method } = req
    await connect()

    switch (method) {
        case 'PATCH':
            try {
                const { id, data } = req.body
                const user = await Users.findById({ _id: data.user })

                await Appointment.findByIdAndUpdate(
                    { _id: id },
                    {
                        status: 'accepted'
                    }
                )

                const msg = {
                    to: user.email,
                    from: process.env.EMAIL_FROM,
                    subject:
                        'We have received your partial payment successfully.',
                    html: `<p>Dear Valued Customer,<br /><br />We have received your partial payment successfully through Gcash. Webform with the following details:<br /><br />Date filed: ${new Date().toLocaleString(
                        'en-US',
                        { timeZone: 'Asia/Manila' }
                    )}<br /><br />Date Schedule: ${
                        data.schedule.date
                    }<br /><br />Time of Schedule: ${
                        data.schedule.time
                    }<br /><br />Service: ${
                        data.service.name
                    }<br /><br />Amount of Service: ${
                        data.service.price
                    } Pesos<br/><br /><b>Note: Bring your vaccination card and wear your facemask on the day of your appointment.</b><br /><br /><b>Dencares Dental Clinic</b></p>`
                }

                await sgMail.send(msg)
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
