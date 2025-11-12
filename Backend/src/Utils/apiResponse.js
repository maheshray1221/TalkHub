class apiResponse {
    constructor(
        statusCode,
        data,
        message,
        success = true
    ) {
        this.statusCode = statusCode,
            this, data = data,
            this.message = message,
            this.success = success < 400
    }
}

export { apiResponse }