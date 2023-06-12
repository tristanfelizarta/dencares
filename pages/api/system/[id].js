import connect from 'database/connect'
import System from 'database/schemas/system'

export default async (req, res) => {
    await connect()
    const { id } = req.query

    try {
        const data = await System.findById({ _id: id })
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}
