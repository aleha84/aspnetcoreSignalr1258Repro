using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace service
{
    public class TestHub : Hub
    {
        private static ConcurrentBag<Guid> connections = new ConcurrentBag<Guid>();

        public override Task OnConnected()
        {
            var guid = Guid.Parse(this.Context.ConnectionId);
            if (!connections.Contains(guid))
                connections.Add(guid);

            Clients.All.showCount(connections.Count);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var guid = Guid.Parse(this.Context.ConnectionId);
            if (connections.Contains(guid))
                connections.TryTake(out guid);

            Clients.All.showCount(connections.Count);
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            var guid = Guid.Parse(this.Context.ConnectionId);
            if (!connections.Contains(guid))
                connections.Add(guid);

            return base.OnReconnected();
        }
    }
}
