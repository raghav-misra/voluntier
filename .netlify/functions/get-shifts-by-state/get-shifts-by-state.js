const axios = require("axios")
exports.handler = async (event, context) => {
  console.log('Get User Called')
  // Reading the context.clientContext will give us the current user
  const endpoint = "https://graphql.fauna.com/graphql"
  const claims = context.clientContext && context.clientContext.user
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
  if (typeof req.state == "string") {
    const res = await axios.post(endpoint, {
      query: `
            {
                shiftsByState(_size:500,state:"${req.state}"){
                  data{
                    organization{
                      name
                    }
                    lat
                    lng
                    qualifications
                    title
                    desc
                    address
                    starts
                    ends
                    city
                    state
                    max
                    _id
                    signedUp{
                      data{
                        hoursWorked
                        _id
                      }
                    }
                  }
                }
              }
          `,

    }, { headers: { "Authorization": `Bearer ${process.env.DB}` } })
    console.log(res.data)
    const shifts = res.data.data.shiftsByState.data
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: shifts

      }),
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