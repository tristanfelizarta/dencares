import connect from 'database/connect'
import System from 'database/schemas/system'

export default async (req, res) => {
    const { method } = req
    await connect()

    switch (method) {
        case 'GET':
            try {
                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'POST':
            try {
                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'PATCH':
            try {
                const { id, data } = req.body

                await System.findByIdAndUpdate(
                    { _id: id },
                    {
                        status: data.status
                    }
                )

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
