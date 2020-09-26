const axios = require("axios")
exports.handler = async(event, context) => {
    console.log('Create User Called')
        // Reading the context.clientContext will give us the current user
    const endpoint = "https://graphql.fauna.com/graphql"
    const claims = context.clientContext && context.clientContext.user
    const req = event.body
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
              firstName
            }
          }
          `,

    }, { headers: { "Authorization": `Bearer ${process.env.DB}` } })

    if (res.data.data.getUser == null && req !== undefined) {
        //Create user entry in DB
        let newUser = await axios.post(endpoint, {
            query: `mutation{
              createUser(data:{
                netlifyID:"${claims.sub}" 
                firstName:"${req.firstName}",
                lastName:"${req.lastName}",
                city:"${req.city.toLowerCase()}",
                state:"${req.state.toLowerCase()}",
                hours: 0
                
              }),{
                _id
              }
            }`,

        }, { headers: { "Authorization": `Bearer ${process.env.DB}` } })


        //Check if It made DB entry
        if (newUser.data.data.createUser._id) {
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
                    error: "Unable to sign you up, please try again!"
                }),
            }
        }



    } else {
        //User already has entry in DB
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: false,
                error: (req !== undefined) ? "You already have an account setup" : "Invalid parameters"
            }),
        }
    }


}