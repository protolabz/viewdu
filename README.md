# NodeJsAngularJsES6Seed

## Table of Contents
<!-- toc -->
* [About](#about)
* [How to Download and Setup](#how-to-Download-and-Setup)
* [How to build](#how-to-build)
* [How to deploy to Heroku](#how-to-deploy-to-heroku)
* [Delete GIT History](#delete-git-history)
* [Author](#author)
* [License](#license)

<!-- toc stop -->

## About

This is a seeding project for a basic stub with authentication for Nodejs, AngularJs, ExpressJs, ES6, Passport, MongoDB and more items. 

## How to Download and Setup

1. Ensure you have downloaded and installed the following applications.
    a. Visual Studio Code (or other IDE: https://code.visualstudio.com/)
    b. Git (https://git-scm.com/downloads)
    c: Heroku CLI (https://devcenter.heroku.com/articles/heroku-cli)

2. Create a new folder on your computer and navigate to using Command Line Console.

3. Run the following commands to download the version of the code from the repository:
    ```sh
    git init
    git config user.name "[your username]"
    git config user.email "[your email]"
    git remote add origin https://wetware-dev.visualstudio.com/_git/viewdu-portal
    git pull --verbose origin master
    ```

4. If you make changes and want to push them to the server user command.
    ```sh
    git push origin master
    ```
5. To download latest changes use.
    ```sh
    git pull origin master
    ```

## How to build

Install dependencies:

```sh
npm run init
```

To run the application: 

```sh
npm run fullBuild
```

## How to deploy to Heroku

First you need to install the Heroku CLI program from the heroku website downloads page.
Then run the following codes:

```sh
npm run heroku-login
``` 
Enter the username and password for heroku
```sh
npm run heroku-setup
```

If this is a brand new heroku instance then
```sh
npm run heroku-env
```
Because projects need to be built into server from client you need to perform a full build and then check-in.
Then once we have checked in build changes you call deployment script.

```sh
npm run heroku-deploy
```

## Delete GIT History

1. Checkout
```sh
    git checkout --orphan latest_branch
```

2. Add all the files
```sh
    git add -A
```

3. Commit the changes
```sh
    git commit -am "commit message"
```

4. Delete the branch
```sh
    git branch -D master
```

5. Rename the current branch to master
```sh
    git branch -m master
```

6. Finally, force update your repository
```sh
    git push -f origin master
```


## Author

**Andrew Sofia**

## License

Copyleft © 2017 
# view2
# view2
