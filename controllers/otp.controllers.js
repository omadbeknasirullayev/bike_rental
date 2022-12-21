const {encode, decode} = require("../service/crypt")

const {v4: uuidv4} = require('uuid')

const otpGenerator = require('otp-generator')

const OTP = require("../models/OTP")
const client = require("../models/Client")
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}
//###############################################################################################
//###############################################################################################

const dates = { 
  convert: function (d) { 
    return d.constructor === Date 
      ? d 
      : d.constructor === Array 
      ? new Date(d[0], d[1], d[2]) 
      : d.constructor === Number 
      ? new Date(d) 
      : d.constructor === String 
      ? new Date(d) 
      : typeof d === "object" 
      ? new Date(d.year, d.month, d.date) 
      : NaN; 
  }, 
  compare: function (a, b) { 
    return isFinite((a = this.convert(a).valueOf())) && 
      isFinite((b = this.convert(b).valueOf())) 
      ? (a > b) - (a < b) 
      : NaN; 
  }, 
  inRange: function (d, start, end) { 
    return isFinite((d = this.convert(d).valueOf())) && 
      isFinite((start = this.convert(start).valueOf())) && 
      isFinite((end = this.convert(end).valueOf())) 
      ? start <= d && d <= end 
      : NaN; 
  }, 
};


//###############################################################################################
//###############################################################################################
const newOTP = async (ctx) => {
  const {phone_number} = ctx.request.body

  // Generate OTP
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  })
  const now = new Date()
  const expiration_time = AddMinutesToDate(now, 5)

  const newOtp = await OTP.create({ id: uuidv4(), otp, expiration_time })
  
  const details = {
    timesamp: now,
    check: phone_number,
    success: true,
    message: "OTP send to user",
    otp_id: newOtp.dataValues.id
  }
  console.log(details)
  const encoded = await encode(JSON.stringify(details))
 
  return ctx.body = {Status: "Success", Details: encoded}
}





//###############################################################################################
//###############################################################################################

const verifyOTP = async (ctx) => { 
  const { verification_key, otp, check } = ctx.request.body; 
  var currentdate = new Date(); 
  let decoded; 
  try { 
    decoded = await decode(verification_key); 
  } catch (err) { 
    const response = { Status: "Failure", Details: "Bad Request" }; 
    ctx.status = 400
    return ctx.body = response
  } 
 
  var obj = JSON.parse(decoded); 
  const check_obj = obj.check; 
 
  if (check_obj != check) { 
    const response = { 
      Status: "Failure", 
      Details: "OTP was not sent to this particular  phone number", 
    }; 
    ctx.status = 400
    return ctx.body = response 
  } 
  let params = { 
    id: obj.otp_id, 
  }; 
 
  const otpResult = await OTP.findOne({where: {id: params.id}}); 
  
  if (otpResult != null) { 
    const result = otpResult.dataValues; 
    //Check if OTP is already used or not 
    if (result.verified != true) { 
      //Check if OTP is expired or not 
      if (dates.compare(result.expiration_time, currentdate) == 1) { 
        //Check if OTP is equal to the OTP in the DB 
        if (otp === result.otp) { 
           

          await OTP.update({verified: true}, {where: {id: result.id}}); 
 
          const clientResult = await client.findOne({where: {contact_number: check}}); 

          if (!clientResult) { 
            const response = { 
              Status: "Success", 
              Details: "new", 
              Check: check, 
            }; 
            ctx.status = 200
            return ctx.body = response 
          } else { 
            const response = { 
              Status: "Success", 
              Details: "old", 
              Check: check, 
              ClientName: clientResult.dataValues.username, 
            }; 
            ctx.status = 200
            return ctx.body = response
          } 
        } else { 
          const response = { Status: "Failure", Details: "OTP NOT Matched" }; 
          ctx.status = 400
          return ctx.body = response
        } 
      } else { 
        const response = { Status: "Failure", Details: "OTP Expired" }; 
        ctx.status = 400
        return ctx.body = response 
      } 
    } else { 
      const response = { Status: "Failure", Details: "OTP Already Used" }; 
      ctx.status = 400
      return ctx.body = response 
    } 
  } else { 
    const response = { Status: "Failure", Details: "Bad Request" }; 
    ctx.status = 400
    return ctx.body = response
  } 
};



module.exports = {
  newOTP,
  verifyOTP,
}