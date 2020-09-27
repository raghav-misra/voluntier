const axios = require("axios")
exports.handler = async(event, context, callback) => {
    console.log('Add Access Called')
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
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
            getUser(netlifyID:"${claims.sub}"){
              _id
              organizations{
                data{
                  name
                  _id
                }
              }
            }
            findOrganizationByID(id:${req.id}){
                    _id
                  members{
                  data{
                    _id
                  }
                }
            }
          }
          `,

    }, {
        headers: {
            "Authorization": `Bearer ${process.env.DB}`
        }
    })
    const user = res.data.data.getUser
    const org = res.data.data.findOrganizationByID
    if (user !== null && org !== null && typeof req.email == "string" && typeof req.id == "string") {

        //Make sure user in the org
        if (org.members.data.map(e => e._id).includes(user._id)) {

            let userToAdd = await axios.post(endpoint, {
                query: `{
                    getUserByEmail(email: "${req.email}") {
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


            if (userToAdd.data.data.getUserByEmail !== null) {
                let addToOrg = await axios.post(endpoint, {
                    query: `mutation{
                        partialUpdateOrganization(id:${org._id},data:{
                          members:{connect:${userToAdd.data.data.getUserByEmail._id}}
                        }){
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
                if (addToOrg.data.data.partialUpdateOrganization !== null) {
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
                            error: "Could not add user to Organization"
                        }),
                    }
                }


            } else {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        success: false,
                        error: "Could not find a user with that email!"
                    }),
                }
            }

        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    error: "No access"
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