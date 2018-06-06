module.exports = {
passwordReset:  { subject: 'Password reset for {{username}}!',
                  html:`
                    <!doctype html>
                    <html>

                    <body>
                        <h1>Hello!</h1>
                        <h2>This is your password reset email, due to you forgetting that overly complex password!!</h2>
                        <h3>Your new password: <b>{{newPassword}}</b></h3>
                    </body>

                    </html>

                    `},

welcome:  { subject: 'Welcome to Seed Test Online',
                  html:`
                    <!doctype html>
                    <html>

                    <body>
                        <h1>Hello There!</h1>
                        <h2>Welcome to Seed Test Online your new portal to a world of Awesomeness.</h2>
                        <h2>To ensure your account does not get locked, please click the link below to confirm your email address</h2>
                        <h3><a href="{{domain}}/api/users/emailverification/{{emailVeriId}}">Click to activate account</a></h3>
                        <h3>Thank you and welcome to Seed Test</h3>
                        <b><i>Seed Test Team</i></b>
                    </body>

                    </html>

                    `},
regEmailThankyou: { subject: 'Thank you from Seed Test Online',
                  html:`
                    <!doctype html>
                    <html>

                    <body>
                        <h1>Hello There!</h1>
                        <h2>Thank you for confirming your email address.</h2>
                        <b><i>Seed Test Team</i></b>
                    </body>

                    </html>

                    `},
}