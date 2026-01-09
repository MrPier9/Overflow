import { authConfig } from "@/lib/config";
import { Button } from "@heroui/button";

export default function RegisterButton() {
  const clientId = "nextjs";
  const issuer =authConfig.kcIssuer;//process.env.AUTH_KEYCLOAK_ISSUER;
  const redirectUrl = authConfig.authUrl;//process.env.AUTH_URL;

  const registerUrl = `${issuer}/protocol/openid-connect/registrations?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUrl!
  )}&response_type=code&scope=openid`;

  return (
    <Button color="secondary" as="a" href={registerUrl}>
      Register
    </Button>
  );
}
