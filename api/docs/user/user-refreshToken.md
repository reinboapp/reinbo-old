# User Refresh Token

- user send refreshToken (containing userId and userAgent)
- check userId:refreshToken in redis if not found return error `refreshToken not found`
- compare userId and userAgent, if not match return error `unauthorized`
- delete refreshToken in `redis`
- create a NEW jwt accessToken containing payload `{ id: userId }`, expiration: 1h
- create a NEW jwt refreshToken containing payload `{ id: userId, ua: UaString }`, expiration: 7d
- save refreshToken in `redis` with ttl 7d
- return data, with a NEW `accessToken` and a NEW `refreshToken` to User
