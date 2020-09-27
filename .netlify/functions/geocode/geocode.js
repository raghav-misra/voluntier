const axios = require("axios");

const targetURL = (key, location) =>
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(location)}&key=${key}`;

exports.handler = async(event, context) => {
    console.log('Called Geocode!')
    console.log(context)
    console.log(event)
        // Reading the context.clientContext will give us the current user
    const claims = context.clientContext && context.clientContext.user
    console.log('user claims', claims)
    const req = JSON.parse(event.body)

    if (!claims) {
        console.log('No claims! Begone!')
        return {
            statusCode: 401,
            body: JSON.stringify({
                success: false,
                error: "Not authenticated"
            }),
        }
    }

    try {
        const data = await axios.get(targetURL(process.env.GEOCODING_API_KEY, req.input));
        console.log(data.data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                data: data.data.results[0].geometry.location
            }),
        }
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: `${e}`
            }),
        }
    }

}