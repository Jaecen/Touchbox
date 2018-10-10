using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Touchbox.Service
{
	public class Startup
	{
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if(env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app
				.UseWebSockets()
				.Run(async (context) =>
				{
					if(!context.WebSockets.IsWebSocketRequest)
					{
						context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
						return;
					}

					var webSocket = await context.WebSockets.AcceptWebSocketAsync("events");
					await ProcessCommands(context, webSocket);
				});
		}

		public async Task ProcessCommands(HttpContext context, WebSocket webSocket)
		{
			int value = 0;

			while(true)
			{
				JObject @event;
				using(var ms = new MemoryStream())
				{
					WebSocketReceiveResult result;
					var buffer = new ArraySegment<byte>(new byte[4096]);

					do
					{
						result = await webSocket.ReceiveAsync(buffer, CancellationToken.None);
						ms.Write(buffer.Array, buffer.Offset, result.Count);
					}
					while(!result.EndOfMessage && ms.Length <= 65535);

					if(result.MessageType != WebSocketMessageType.Text)
						break;

					ms.Seek(0, SeekOrigin.Begin);
					using(var textReader = new StreamReader(ms, Encoding.UTF8))
					using(var jsonReader = new JsonTextReader(textReader))
						@event = await JObject.LoadAsync(jsonReader);
				}

				var command = (string)@event["command"];
				switch(command)
				{
					case "INCREMENT_VALUE":
						value++;
						break;

					case "DECREMENT_VALUE":
						value--;
						break;

					case "CLEAR_VALUE":
						value = 0;
						break;

					default:
						await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Bye", CancellationToken.None);
						return;
				}

				var sendBuffer = Encoding.UTF8.GetBytes(JObject.FromObject(new
				{
					value
				}).ToString());
				await webSocket.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
			};
		}
	}
}
