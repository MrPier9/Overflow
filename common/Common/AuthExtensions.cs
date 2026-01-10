using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Common;

public static class AuthExtensions
{
    public static IServiceCollection AddKeyCloakAuthentication(this IServiceCollection services)
    {
        services.AddAuthentication()
            .AddKeycloakJwtBearer(serviceName: "keycloack", realm: "overflow", option =>
            {
                option.RequireHttpsMetadata = false;
                option.Audience = "overflow";
                option.Authority = "http://keycloak:6001/realms/overflow"; //for aspire 13 
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuers = [
                        "http://localhost:6001/realms/overflow",
                        "http://keycloak/realms/overflow",
                        "http://id.overflow.local/realms/overflow",
                        "https://id.overflow.local/realms/overflow",
                    ],
                    ClockSkew = TimeSpan.Zero
                };
            });

        services.AddAuthorizationBuilder();

        return services;
    }
}
