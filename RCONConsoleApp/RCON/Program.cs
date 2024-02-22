using CoreRCON;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using RCON;
using CoreRCON.Parsers.Standard;

var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();


//setup
string ip = config.GetSection("IP").Value;
ushort port = ushort.Parse(config.GetSection("PORT").Value);
string password = config.GetSection("Password").Value;
string connectionStr = config.GetConnectionString("Database");
bool issueCommands = bool.Parse(config.GetSection("IssueCommands").Value);

var dbOptions = new DbContextOptionsBuilder<RCONDbContext>()
    .UseSqlServer(connectionStr, x => x.UseNetTopologySuite())
    .Options;



if (issueCommands)
{
    try
    {

        var rcon = new CoreRCON.RCON(IPAddress.Parse(ip), port, password);
        await rcon.ConnectAsync();
        string command = "";

        //get status
        string status = await rcon.SendCommandAsync("status");
        Console.WriteLine(status);

        //get human players from status
        int humans = GetHumans(status);
        Console.WriteLine(humans);

        //get map from status
        string map = GetMap(status);
        Console.WriteLine(map);


        while (command != "quit")
        {
            command = Console.ReadLine();
            if (command == "quit") continue;

            string response = await rcon.SendCommandAsync(command);

            Console.WriteLine(response);

        }

        return;
    }
    catch(Exception ex)
    {
        Console.WriteLine(ex.ToString());
    }

    return;
}


//get all servers from the db

using (var dbContext = new RCONDbContext(dbOptions))
{
    foreach(Server server in dbContext.Server)
    {
        Tuple<int, string> status = await GetStatus(server.IP);
        server.Players = status.Item1;
        server.Map = status.Item2;

    }

    dbContext.SaveChanges();

}


// Connect to a server and get it's status

async Task<Tuple<int, string>> GetStatus(string ip)
{

    try
    {
        var rcon = new CoreRCON.RCON(IPAddress.Parse(ip), port, password);
        await rcon.ConnectAsync();


        //get status
        string status = await rcon.SendCommandAsync("status");
        Console.WriteLine(status);

        //get human players from status
        int humans = GetHumans(status);
        Console.WriteLine(humans);

        //get map from status
        string map = GetMap(status);
        Console.WriteLine(map);

        //worst format
        //map     : workshop/koth_harvesttower.ugc2890349948 at: 0 x, 0 y, 0 z
        if (map.Contains("/"))
            map = map.Split("/")[1];

        if (map.Contains("."))
            map = map.Split(".")[0];

        return new Tuple<int, string>(humans, map);
    }
    catch (Exception ex)
    {
        string error = "\n--------------------------------------------------------------------------------------\n";
        error += DateTime.Now.ToString() + "\n";
        error += "Server IP: " + ip + "\n";
        error += ex.ToString() + "\n";
        File.AppendAllText("RCONErrorLog.txt", error);
        return new Tuple<int, string>(-1, "Uknown");
    }


}


int GetHumans(string status)
{
    string[] firstSplit = status.Split("players");

    return int.Parse(firstSplit[firstSplit.Length - 1].Trim().Split(":")[1].Trim().Split(" humans")[0]);
}

string GetMap(string status)
{
    return status.Split("map")[1].Trim().Split(":")[1].Trim().Split(" at")[0].Trim();
}