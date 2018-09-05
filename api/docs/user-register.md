# User Register

- user send email, username, fullname, password
- check validity each field
- encrypt password with `bcrypt`
- save to `MongoDB`
- create jwt accessToken containing payload `{ id: userId }`, expiration: 1h
- create jwt refreshToken containing payload `{ id: userId, ua: UaString }`, expiration: 7d
- save refreshToken in `redis` with ttl 7d
- return data, with `accessToken` and `refreshToken` to User
