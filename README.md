# micro-screenshot
A Microservice for Taking Screenshots

<b> ATTENTION: v0.3.0 takes arguments into the body </b>

## Contributors

|<img src="https://avatars3.githubusercontent.com/u/5687681?v=4&s=460" height="96px"/> | <img src="https://avatars1.githubusercontent.com/u/1646536?v=4&s=460" height="96px"> |
|-|-|
| [@lorderikir](https://github.com/lorderikir/)| [@hugomd](https://github.com/hugomd/) |


Current Base URL: `Online-Micro Service Currently Unavailable`

# How to Use
`POST base-url:3000/take` with the following body(s):

| Header   | Type     | Description                               |
|----------|----------|-------------------------------------------|
| site     | _String_ | **COMPULSORY**: The site to capture       |
| height   | _Int_    | **OPTIONAL**: The height in pixels        |
| width    | _Int_    | **OPTIONAL**: The width in pixels         | 
| duration | _Int_    | **OPTIONAL**: The duration to wait for in ms    |

# Response
The following response is recieved

```
{
  "url": "http://i.imgur.com/xZEO3Zt.png"
}
```

| Attribute | Type     | Description         |
|-----------|----------|---------------------|
| url       | _String_ | The Imgur URL       |

# Contributing
* Fork this repo to your account
* `git clone git@github.com:<your-account-name>/micro-screenshot.git`
* `yarn` to install dependencies
  - `yarn start` to start the server
* Make your changes
* Open a pull request and ask for review ✌️
* Optional: use emoji in your commits 🔥

# License
This project is licensed under the `MIT` License. See `LICENSE` for more information.

For commericial uses please contact the original author.