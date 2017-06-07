# micro-screenshot
A Microservice for Taking Screenshots

Thanks to [@hugomd](https://github.com/hugomd/) for fixing a bug!!! :smile:

Current Base URL: `Online-Micro Service Currently Unavailable`

# How to Use
`GET base-url:3000/take/` with the following header(s):

| Header | Type     | Description         |
|--------|----------|---------------------|
| site   | _String_ | The site to capture |


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
* `npm install`
* Make your changes
* Open a pull request and ask for review ✌️
* Optional: use emoji in your commits 🔥

# License
This project is licensed under the `MIT` License. See `LICENSE` for more information.