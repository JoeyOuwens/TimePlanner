# TimePlanner

https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/get-started


## Run Instructions

The default project works out-of-the-box for browsers. You can run everything by opening the 
`.sln` file in `Visual Studio 2017-2019` and run in the browser(with F5 or the run button).  
In order to let things work on android there is some more setup to be done. 

NOTE: If you want to run the code from the terminal, cmd or powershell you're able to do so  by 
running the following command `node run app`. If you want to run the server with hot reloading,  
reloading the server when a file changes, then you can run the server with the following command `npm run dev`

### Adding Android Emulator

For android what you have to do is link an existing android studio SDK with your project OR 
download a new sdk. For the usage of an existing SDK, you'll have to go to `tools > options > 
Xamarin > Android Settings > Android SDK Location` and then select the folder of your sdk.  
Overall the android sdk can be found at `C:\Users\{USER}\AppData\Local\Android\Sdk`.

NOTE: you have to download/install all node packages, this can be done by browsing to the project
root and then run `npm install`. 

### Using Android Emulator

After this you can just run the web server and with the android studio emulator you can 
navigate to your ip-address, e.g. http://192.168.1.2:1337 and then you're able to add the 
page to your home screen `settings > Add to Home screen`.


## Migrations

### Making migrations
For making migrations you have to be in the root folder and run the following command `node_modules\.bin\knex migrate:make <migration_name>`.
After creating the migration you'll have to create the fields, for more info you can take a look at `migrations/20191010102705_users.js`.

### Running migrations
Before you can use knexjs or any other db related changes you have to migrate the database to the latest version.  
This can be done with the following command that should be executed in the root of the project folder; `node_modules\.bin\knex migrate:latest`.  

## Running tests

In order to run a test for the code you've written, you have to write one. These tests can be added to the tests folder.  
After writing a test you're able to run the tests by running the following command `npm test`. 

NOTE: Before testing the code, the following command must be run `node_modules\.bin\knex migrate:latest --env test`.
