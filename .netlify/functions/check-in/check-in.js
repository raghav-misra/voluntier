const axios = require("axios")
exports.handler = async(event, context, callback) => {
    console.log('Check In Called')
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
    // Reading the context.clientContext will give us the current user
    const endpoint = "https://graphql.fauna.com/graphql"
    const claims = context.clientContext && context.clientContext.user
    console.log(event)
    const req = JSON.parse(event.body);
    console.log('user claims', claims)


    if (!claims) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                data: 'NOT ALLOWED',
            }),
        }
    }

    //USER IS AUTH - Get Data -------------------------
    let res = await axios.post(endpoint, {
        query: `{
            getUser(netlifyID: "${claims.sub}") {
              _id
              shiftsWorked
              hours
              shifts{
                data{
                  _id
                }
              }
            }
            findShiftByID(id:${req.id}){
                ends
                starts
                _id
                signedUp{
                  data{
                    _id
                  }
                }
              }
          }
          
          `,

    }, { headers: { "Authorization": `Bearer ${process.env.DB}` } })
    const user = res.data.data.getUser
    const shiftRequested = res.data.data.findShiftByID
    if (user !== undefined && typeof req.id == "string") {

        //Make sure user is signed up for them
        if (shiftRequested.signedUp.data.map(e => e._id).includes(user._id)) {
            //Confrim that the event is over
            const now = new Date().getTime()
            const ends = new Date(parseInt(shiftRequested.ends) * 1000)
            const starts = parseInt(shiftRequested.starts)
            const endsInt = parseInt(shiftRequested.ends)
            if (Math.sign(now.getTime() - ends.getTime())) {
                let updateShift = await axios.post(endpoint, {
                    query: `
                        mutation {
                            partialUpdateShift(
                              id: ${shiftRequested._id}
                              data: { signedUp: { disconnect: "${user._id}" } }
                            ) {
                              _id
                            }
                          }
                          
                          `,

                }, {
                    headers: {
                        "Authorization": `Bearer ${process.env.DB}`,
                        "X-Schema-Preview": "partial-update-mutation"
                    }
                })

                let updateUser = await axios.post(endpoint, {
                    query: `
                        mutation {
                            partialUpdateUser(
                              id: ${user._id}
                              data: { hours:${user.hoursWorked + parseFloat(((ends - starts) / 3600).toString().slice(0, 3))},shiftsWorked:${user.shiftsWorked + 1} }
                            ) {
                              _id
                            }
                          }
                          
                          `,

                }, {
                    headers: {
                        "Authorization": `Bearer ${process.env.DB}`,
                        "X-Schema-Preview": "partial-update-mutation"
                    }
                })
                if (updateUser.data.data.partialUpdateUser !== null) {
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            success: true,
                        }),
                    }
                } else {
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            success: false,
                            error: "Unknown Error"
                        }),
                    }
                }
            } else {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        success: false,
                        error: "Your shift is not over yet!"
                    }),
                }
            }


        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    error: "You have not signed up for this slot"
                }),
            }
        }





    } else {

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: false,
                error: "Invalid parameters"
            }),
        }
    }


}
Flo