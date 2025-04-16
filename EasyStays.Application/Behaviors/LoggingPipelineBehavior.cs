using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using EasyStays.Domain;

namespace EasyStays.Application.Behaviors
{
    public class LoggingPipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
        where TResponse : Result 
    {
        private readonly ILogger<LoggingPipelineBehavior<TRequest, TResponse>> _logger;

        public LoggingPipelineBehavior(ILogger<LoggingPipelineBehavior<TRequest, TResponse>> logger)
        {
            _logger = logger;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            var start = DateTime.UtcNow;

            _logger.LogInformation("Starting request {@RequestName} at {@DateTimeUtc}", requestName, start);

            var result = await next();

            if (result.IsFailure)
            {
                _logger.LogError("Request failure {@RequestName}, {@Error}, {@DateTimeUtc}",
                    requestName,
                    result.Error,
                    DateTime.UtcNow);
            }

            _logger.LogInformation("Completed request {@RequestName} at {@DateTimeUtc}", requestName, DateTime.UtcNow);

            return result;
        }
    }
}
