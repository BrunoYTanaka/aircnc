// import Booking from '../modal/Booking'
const Booking = require('../modal/Booking')
module.exports = {
  async store (req, res) {
    const { booking_id } = req.params
    console.log(booking_id)
    const booking = await Booking.findById(booking_id).populate('spot')

    booking.approved = false

    await booking.save()

    const bookingUserSocket = req.connectedUsers[booking.user]

    if (bookingUserSocket) {
      req.io.to(bookingUserSocket).emit('booking_response', booking)
    }

    return res.json(booking)
  }
}
