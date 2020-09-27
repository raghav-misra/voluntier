const axios = require("axios")
exports.handler = async(event, context, callback) => {
    console.log('Create Org Called')
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
            }
          }
          `,

    }, {
        headers: {
            "Authorization": `Bearer ${process.env.DB}`
        }
    })
    const user = res.data.data.getUser
    if (user !== null && typeof req.org == "object") {

        //Create org
        let createOrg = await axios.post(endpoint, {
            query: `mutation{
                createOrganization(data:{
                  name:"${req.org.name}",
                  desc:"${req.ord.desc}",
                  websiteUrl:"${req.ord.websiteUrl},
                  members:{connect:${user._id}}
                }){
                  _id
                }
              }`,

        }, {
            headers: {
                "Authorization": `Bearer ${process.env.DB}`,
                "X-Schema-Preview": "partial-update-mutation"
            }
        })


        if (createOrg.data.data.createOrganization !== null) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    data: createOrg.data.data.createOrganization._id
                }),
            }
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                    error: "Error In Creating Organization! Try another name?"
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