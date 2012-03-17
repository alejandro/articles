
# Common problems and questions that you can find deploying to nodester


I heard that you have a problem, let me say this clear, when you create an app in our platform, you can run into a pile of problems, mostly because bad configuration of your environment, or our cli tool doesn't read them correctly. But most of them are not related to our platform. 

### Git issues
Nodester runs a `git` server, so by default you need to have installed git locally. To add the remote repo you need to do this:

    > nodester app create APPNAME index.js
    ... logs
    # for a clean installation
    > nodester app init APPNAME
    # for a local app; cd path/to/app;
    > nodester app info APPNAME
    .... logs
     git-repo url: git@nodester.com:/node/git/alejandromg/APP_ID.git
    > git remote add nodester git@nodester.com:/node/git/alejandromg/APP_ID.git

Then you need to commit your changes and finally:

    > git push nodester master

This command is going to push your changes and to restart the app. If you have dependencies run `nodester npm install APPNAME`. And that's all.

Wait but what about:

    fatal: The remote end hung up unexpectedly

Many things can be causing this error, but it's more often because your [RSA keys](#a)


### The port is already in use
Well this is a easy one, just add the next param to your listen method in your server. Nodester creates a global variable for each app, where resides the port that we assign to your app. This key-value is `process.env['app_port']`. You can fix it doing this:

    http.createServer(function(req,res){
    ...
    }).listen(process.env['app_port'] || 3000);

In this case, you don't need to be worried about running locally or in nodester. It'll just work.

**Tip**: use `nodester env get APPNAME` to know what are your environment variables
<a name="a">
### RSA problems

One of the most interesting and recurrent problems is because of your RSA public key. You need to setup your key with our server in order to have access to it. 
There is no better explanation than this:
 
 -  [unix setup](http://help.github.com/mac-set-up-git/)
 -  [windows Setup](http://help.github.com/win-set-up-git)

Windows users are going to have a bad time using git, we recommend you to install PowerShell or something alike, since we have reports saying that it works fine. Also would be a great adition that you have installed `CURL` just to have access to the RESP API in case that our cli tool, won't work as expected.
 
### File doesn't exists

Usually when you are reading a file you need to use absolute paths.

**Incorrect:**

    fs.readFileSync('./file')
    fs.readFileSync('../file')
    fs.readFileSync('../')
and more...

**Correct**:

    fs.readFileSync(__dirname+'/file')
    fs.readFileSync(__dirname + '/../file')
    fs.readFileSync(__dirname + '/../')

e.g: Assumming that you have a code like this:

    var file = path.normalize('./db/test.json');
    fs.readFile(file, toWrite,'utf8', function (err) {
      ....
    });

You need to change it the first line by:

    var file = path.normalize(__dirname, '/db/test.json');

nodester needs absolute paths to work correctly.


### Websockets and nodester

Yes you can have websockets on nodester, but we recommend you to read this article:
[Running websockets on nodester](http://blog.nodester.com/post/3634535277/running-websockets-on-nodester)

### node.js versions

If you didn't know we are running 0.4.9, 0.4.12 and 0.6.12. But by default all the apps are going to run under 0.4.9 at least that you especified the version:

    {
      "name": "myAwesomeAPPName",
      "description": "Description about it",
      "version": "0...",
      "dependencies":{
        "dependency1":"0.1.1"
        "dependency2":"0.1.2"
      },
      "node":"0.6.12"
    }

The key is `node` and the available values are: '0.4.9','0.4.12','0.6.12'
If you want to stay updated about which versions we are running:

    > curl -XGET http://nodester.com/env/versions 

It'll print the correct versions values.

### About Databases
nodester is a Open Source Node.js Hosting Platform and that's all. No CouchDB, no Redis, no MySQL, no mongoDB, we try to offer you the best node.js hosting by free and all our efforts goes to that. 

But you can get db hosting for free with these amazing services: [iriscouch](http://iriscouch.com), [cloudant](http://cloudant.com), [redistogo](http://redistogo.com), [mongoLab](http://mongolab.com) & [mongoHQ](http://mongohq.com) and many more. 

Then your database setup is easy, just read the documentation of the module that you are using to connect to your database.

### Native modules

You're not allowed to install native modules, but you can request it on freenode#nodester, or @nodester. Currently we have installed `Cairo`, `libpng` and others (unity is on the way)

### nodester-cli

Our cli utility is way to useful and let you go more quickly in the deployment flow.

Basic commands are:

    nodester app create APPNAME <init_file.js>

Most people don't pass the `<init_file.js>` param, so after when you try to deploy you'll get a error saying that there is no a init_file, by default nodester set it up to `server.js` in which is your server code.

    nodester app logs APPNAME

Show the logs or every `console.log` that you put in your code, jf no APPNAME is passed a verbose error, will be show it up.

    nodester app create|restart|delete|info|stop|start|clone <params>

Basically this is the most important command in the tool. This is where you lunch, delete, restart, create apps. Enough said.

If you want more info about nodester-cli just put:`nodester` in your CLI and all the available information is going to be show it up.

**Protip:** If you didn't init your app ( via `nodester app init APPNAME`), because you had it already. You can avoid all the APPNAME params echoing this in your app root dir

    > echo "appname=APPNAME" > .nodester.appconfig

In this case you don't need anymore to be specifing  your appname in every nodester-cli call.



### Limits

Since this is a free service, we need to keep the quality of it. The standard for the apps limit are given my the RAM and storage in use, we give you 25MB of each. Rarely and app reach the limits, if your app has memory leaks or something like that, you better fix your code. Remember it's a free and shared instance, so don't abuse our resources. We host almost 5000 apps and there are running nearly 2500 apps. Also if you have empty or helloworld apps please delete them. 

### Buggy nodester is buggy
Do you think that maybe the problem is a bug or a major problem with the nodester core? [Fill a issue](https://github.com/nodester/nodester/issues).


## Personal support
None of this is your problem? Contact us at:

- freenode#nodester or [irc.nodester.com](http://irc.nodester.com), the fastest and "face to face" solution (depends on who is on the channel)
- [@nodester](http://twitter.com/nodester)
- You can also ask questions and provide feedback in our google group at [google#nodester](http://groups.google.com/group/nodester)


We are glad to help you out.

### Known problems
- Until today, we are tracking some `EACCESS` errors, for those trying to write files to the server you better wait for it.

- node-v0.7.x shows `path.existsSync is deprecated. It is now called fs.existsSync`, we are going to fix this until a stable 0.7.x version. Because it's just a warning. Everything else works fine.

## Hack the Planet \m/
If this project inspires you, please feel free to help out by forking this project and sending us pull requests! \m/ http://github.com/nodester