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
                        status: 'rejected'
                    }
                )

                const msg = {
                    to: user.email,
                    from: process.env.EMAIL_FROM,
                    subject: 'We have rejected your partial payment!',
                    html: `<p>We have rejected your partial payment due to insufficient amount of moneu you sent. Your money will be refunded to your Gcash account right away.<br /><br /><b>Note: Please send an amount of exact partial payment to your next transaction.</b><br/><br/><b>Dencares Dental Clinic.</b></p>`
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
