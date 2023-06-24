GrouchLand is a Team Fortress 2 server browser I developed for my brother, who owns 2 TF2 game servers.
This website implements React.js with leaflet to display various servers across the globe.
Using a C# API and a SQL Database, administrators are able to create, update, and delete servers using the editor mode.
Administrators are identified based on their google login credentials.
Administrators are also capable of updating the color schemes of both the light mode and dark mode color schemes.

To run:
1 - Restore the GrouchLand SQLServer Database from the back up file.
2 - Update the database connection string located in TF2ServerBrowserAPI/TF2ServerBrowserAPI/appsettings.json
3 - Open and run the .NET API project under TF2ServerBrowserAPI/TF2ServerBrowserAPI
4 - Open the React.js project under tf2_server_browser_react and issue the command "npm start"
