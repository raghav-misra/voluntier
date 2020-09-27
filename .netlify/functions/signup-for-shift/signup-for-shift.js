const axios = require("axios")
exports.handler = async (event, context, callback) => {
  console.log('Sign Up For Shift Called')
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
              shifts{
                data{
                  _id
                }
              }
            }
            findShiftByID(id:${req.id}){
                max
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

    //Make sure user is not already signed up AND that slots are not maxed
        if (shiftRequested.signedUp.data.map(e => e._id).includes(user._id) == false && shiftRequested.max > shiftRequested.signedUp.data.length) {

            let updateUser = await axios.post(endpoint, {
                query: `mutation{
                        partialUpdateUser(id:${user._id},data:{
                          shifts:{connect:"${shiftRequested._id}"}
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

            let updateShift = await axios.post(endpoint, {
                query: `
                    mutation {
                        partialUpdateShift(
                          id: ${user._id}
                          data: { signedUp: { disconnect: "${shiftRequested._id}" } }
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
            if (updateUser.data.data.partialUpdateUser !== undefined && updateShift.data.data.partialUpdateShift !== undefined) {
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
                    error: "This shift is full or you have already signed up."
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