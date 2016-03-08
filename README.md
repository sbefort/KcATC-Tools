# KcATC-Tools

How to clone this project for your own use:

1.  Make sure you have <a href="https://help.github.com/articles/set-up-git/">git installed on your machine</a>.
2.  <a href="https://www.meteor.com/install">Install meteor</a>.
3.  From command prompt, type <code>git clone https://github.com/sbefort/KcATC-Tools.git your_new_directory_name</code>
4.  Type <code>cd your_new_directory_name</code> to move inside the newly created directory.
5.  Type <code>meteor</code> to run the project locally.
6.  Visit http://localhost:3000 in a web browser to make sure that your project is running fine on your local machine.
7.  Go back to the command prompt and type CTRL-C to cancel running meteor.  Now you should be back in <code>your_new_directory_name</code>.
8.  Type <code>meteor deploy yourcoolname.meteor.com</code>.
9.  Your project should be up and running at <code>yourcoolname.meteor.com</code>.

Important note!

There is one file missing from this project because it contains an email password.  If you want email to run correctly (for example, to get a forgotten password link), you need to add the file <code>/server/smtp.js</code> before deploying.  You will also need an email account with SMTP settings for the project to send email.  You can use Gmail for this.

```javascript
Meteor.startup(function () {
  var smtp = {
    username: 'myusername@gmail.com',
    password: 'mypassword',
    server:   'smtp.gmail.com',
    port: 465
  }
  
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
```
