# User Register

- user send email/username, password
- check validity each field
- check user exists, if not exists then return error `user not exists`
- then encrypt password with `bcrypt` and compare it with database, if password not match then return error `wrong password`
- create jwt accessToken containing payload `{ id: userId }`, expiration: 1h
- create jwt refreshToken containing payload `{ id: userId, ua: UaString }`, expiration: 7d
- save refreshToken in `redis` with ttl 7d
- return data, with `accessToken` and `refreshToken`
