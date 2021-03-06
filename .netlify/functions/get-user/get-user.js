const axios = require("axios")
exports.handler = async(event, context) => {
    console.log('Get User Called')
        // Reading the context.clientContext will give us the current user
    const endpoint = "https://graphql.fauna.com/graphql"
    console.log(event, context);
    const claims = context.clientContext && context.clientContext.user
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
    const res = await axios.post(endpoint, {
        query: `{
            getUser(netlifyID: "${claims.sub}") {
                firstName
                lastName
                city
                state
                hoursWorked
                lat
                lng
                shiftsWorked
                organizations{
                  data{
                    name
                    websiteUrl
                    desc
                    _id
                    members{
                        data{
                        _id
                        firstName
                        lastName
                        email
                        }
                    }
                    shifts{
                        data{
                            title
                            desc
                            qualifications
                            state
                            city
                            lat
                            lng
                            starts
                            ends
                            address
                            max
                            signedUp{
                                data{
                                    firstName
                                    lastName
                                    email
                                    _id
                                }
                            }
                        }
                    }
                  }
                }
                shifts(_size:500){
                    data{
                       title
                       starts
                       ends
                       desc
                       _id
                    }
                }
                _id
            }
            
          }
          `,

    }, { headers: { "Authorization": `Bearer ${process.env.DB}` } })
    console.log(res.data)
    const user = res.data.data.getUser

    if (user == null) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: false,

            }),
        }
    } else {
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                data: user
            })
        }
    }
}