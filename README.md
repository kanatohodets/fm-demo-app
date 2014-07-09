## Style as a Service! (Failure Mode test application)

This is a very silly little node.js application: it provides an API for
wrapping text in `<strong>` or `<em>` tags, depending on which version of it is
running. It uses an external Redis to keep track of how many stylizations it has performed.

The principle strength of this app is that it is an API which talks to a DB:
this means Failure Mode can test it in the following ways:

1. API server rejecting (or silently dropping) packets from Redis.
2. Redis rejecting (or silently dropping) packets from the API server.
3. Latency or random packet loss between those hosts.
4. Any of the above between API client and API server.

So much potential for disaster! 

### License: 

Artistic License 2.0
