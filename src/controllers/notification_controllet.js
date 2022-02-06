import Notificatios from "../models/Notificatios"
export const sendNotification = async (req, res) => {
    const {
        title,
        message,
        type,
        userId
    } = req.body

    const notification = new Notificatios({
        title,
        message,
        type,
        userId
    })
    await notification.save()
    res.json({
        message: "notificacion enviada"
    })
}

export const getNotifications = async (req, res) => {
    const {status} = req.query
    if (status) {
        const notifications = await Notificatios.find({
            userId: req.userId,
            status
        })
        res.json(notifications)
    }
    const notifications = await Notificatios.find({
        userId: req.userId
    })
    res.json(notifications)
}   
