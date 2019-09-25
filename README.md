# TimePlanner

https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/get-started


## Run Instructions

The default project works out-of-the-box for browsers. You can run everything by opening the 
`.sln` file in `Visual Studio 2017-2019` and run in the browser(with F5 or the run button).  
In order to let things work on android there is some more setup to be done. 

For android what you have to do is link an existing android studio SDK with your project OR 
download a new sdk. For the usage of an existing SDK, you'll have to go to `tools > options > 
Xamarin > Android Settings > Android SDK Location` and then select the folder of your sdk. 

After this you can just run the web server and with the android studio emulator you can 
navigate to your ip-address, e.g. http://192.168.1.2:1337 and then you're able to add the 
page to your home screen `settings > Add to Home screen`