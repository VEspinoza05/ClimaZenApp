export class EventModel {
    constructor({id, title, date, time, user_id, latitude, longitude, radius}) {
        this.id = id,
        this.title = title,
        this.date = date,
        this.time = time,
        this.user_id = user_id,
        this.latitude = latitude,
        this.longitude = longitude,
        this.radius = radius
    }
}
