# Ressource 1
https://www.architect.io/blog/2022-08-16/react-environment-variables-developers-guide/
https://www.linkedin.com/pulse/how-use-environment-files-env-react-app-muhammad-sameem
https://www.youtube.com/watch?v=H5o7h9DaVIg

# Variable d'enverenement

When working on the front-end portion of an application, you may need to interact with data from a back-end server at several locations within the codebase.

So:
    .The database used in the development/testing stage will be different from that used in production to prevent interference with production data.
    
    .The hostname for each domain will also vary (for example, production.example.com or dev.example.com) to maintain the separation of concerns.


EVs let you store globally scoped values to the environment your code is running in, making them available throughout the codebase. 

They enable you to:
    .Decouple configurations from your code and limit the need to modify and re-deploy an application when configuration data changes.

    .Set different configurations for different environments. For example, you could enable debugging logging and disable caching when in development — then enable caching and disable debug logging in production.

    .Enable your application to be deployed in any environment without code changes


# How environment variables work in React

Dans React, les EV sont écrits sous forme de paires clé-valeur à définir dans le shell avant le démarrage du processus qui exécute le serveur/l'application.

React enforces EVs to be prefixed with the word REACT_APP_ to enable the React engine to identify them as custom EVs. 

EX: 
//within a .env file
REACT_APP_YOUR_API_KEY = abxyz
(Any variable without the prefix is ignored during bundling to prevent you from accidentally)

React then loads the variables into process.env (a global object injected by Node.js at runtime)
For example, you can access an environment variable named "REACT_APP_MY_API_KEY" in your code as "process.env.REACT_APP_MY_API_KEY".

Note the standard naming convention for EVs can consist solely of uppercase letters, digits, and underscores (_) but can’t begin with a digit.


# How to set up environment variables
# Using a single .env file (.env file and check every time if we are on prod or on dev with `NODE_ENV`)

The most common approach to define EVs in a React application is to store them in a plain text file with a .env extension located at the root of your project

If you use Create React App (CRA) to set up your React application, 
it uses the dotenv library to read environment variables found in any .env file and loads them into the `process.env` object.

Node.js also offers a built-in environment variable called NODE_ENV(process.env.NODE_ENV) that represents our application’s environment. 
In React, its value changes based on the script that’s running. 
    Running "npm start" changes the environment value to “development.” 
    Running "npm test" changes it to “test,” 
    Running "npm run" build changes it to “production.”


# Using multiple .env files
As your application grows, you may adopt different databases, servers, and third-party APIs for different environments to prevent interference.

Rather than storing them all in a single .env file and using the NODE_ENV environment variable to include them in your code

you can create different .env files for each of these environments. 
    1. The main .env file usually contains all common/shared environment variables
    2. while other .env files with different suffixes (for example, .env.development, .env.production, .env.staging) contain variables for other environments.

At runtime, depending on the current environment your app is running in, dotenv loads the correct environment variables from the corresponding .env file and replaces the reference to each environment variable name within the codebase with its current value.

Additionally, you might want to use environment variables for environments other than development, test, and production — like staging or debugging. You need the `env-cmd` library to achieve this => `https://www.npmjs.com/package/env-cmd`

`env-cmd`
    1.In the command line, within the root directory of your React application, run the command below:
        npm install env-cmd
        // # This installs the env-cmd library to help in using/executing a selected .env file.
    
    2.Now, modify the script section in the package.json file to use the env-cmd command for the staging environment.
        "scripts": {
            "start:staging": "env-cmd -f .env.staging react-scripts start",
            ...
        }
    
    `Build`
        
    3.Then, running the command: npm run start:staging forces React to use the environment variables from the .env.staging file.
    
    4.Pour le `build`:
            "scripts": {
                "build:staging": "env-cmd -f .env.staging react-scripts build",
                "build:production": "env-cmd -f .env.production react-scripts build",
            },

    (Your build command in each environment is not npm run build any more its npm run build:staging , npm run build:production.)

# Best practices for using environment variables

1.Map environment variables to readable names
try to use descriptive, short, and readable names to define them.

# Avoid adding strings or space characters

By default, the values assigned to environment variables are enclosed in quotes when compiled at build time.


# Notes

One significant rule when using environment variables is to never commit your .env files with sensitive information (like your API key) to Git or upload to a public location like GitHub as this information can be abused or misused.


# Referencing Environment Variables in the HTML
<title>%REACT_APP_WEBSITE_NAME%</title>


# Adding Temporary Environment Variables In Your Shell
# Windows (cmd.exe)
`set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start`



# Important Notes:

1- Don't forget to add your all env files to git-ignore file if not already added to prevent tracking them after any modification.
2- After each modification in env file, stop the server and start it again, otherwise it wont read your new changes.
3- Env files :
`.env` we mention all variables that won't be changed between envirement: 
    `REACT_APP_NAME=AppName`
`Others`.env Files we will mention the `API URL` for each envirenement REACT_APP: 
    `REACT_APP_ENV=PRE-PRODUCTION`
    `REACT_APP_API_URL=https://preprod.cegidQuadra.api....`


# Question

1 .env c'est le locale est .env.development c'est l'enverement dev a distant
2 qu'est ce que je dois mettre dans ces .env fichiers(les variables) ? est ce que just le hostname ou encore d'autre chose?
3 quand je vais créer ces variables est ce je dois remplacer mon code avec ces variables?
4 pourquoi je dois mettre ces fichier dans .gitignore? et quand? apres que je termine? pour s'assurer qu'il vont pas etre modifier
5 pourquoi et quoi je dois créer comme variable sur AZUR
6 Manifest





