const axios = require("axios")
exports.handler = async(event, context, callback) => {
    console.log('Create Shift Called')
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
    if (user !== null && org !== null && typeof req.id == "string" && typeof req.shift == "object") {

        //Make sure user in the org
        if (org.members.data.map(e => e._id).includes(user._id)) {

            let createShift = await axios.post(endpoint, {
                query: `mutation{
                    createShift(data:{
                      title:"${req.shift.title}"
                      desc:"${req.shift.desc}"
                      qualifications:"${req.shift.qualifications}",
                      state:"${req.shift.state.toLowerCase()}",
                      city:"${req.shift.city.toLowerCase()}",
                      lat:${req.shift.lat},
                      lng:	${req.shift.lng},
                      starts:"${req.shift.starts}",
                      ends:"${req.shift.ends}",
                      address:"${req.shift.address}",
                      max:${req.shift.max},
                      organization:{connect:${req.id}},
                      organizationID:"${req.id}"
                      
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


            if (createShift.data.data.createShift !== null) {
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
                        error: "Error In Creating Shift"
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