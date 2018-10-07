using System;
using System.Collections.Generic;
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

			app.Run(async (context) =>
			{
				if(!context.WebSockets.IsWebSocketRequest)
				{
					context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
					return;
				}

				var webSocket = await context.WebSockets.AcceptWebSocketAsync();
				await Time(context, webSocket);
			});
		}

		public async Task Time(HttpContext context, WebSocket webSocket)
		{
			var receiveBuffer = new byte[1024];

			var receiveResult = await webSocket.ReceiveAsync(receiveBuffer, CancellationToken.None);

			var sendBuffer = Encoding.UTF8.GetBytes(DateTimeOffset.Now.ToString("o"));
			await webSocket.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);

			await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Bye", CancellationToken.None);
		}
	}
}
