import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";
import { getPayload } from "../services/payload";
import { AUTH_CONFIG } from "../lib/config";

type OneTimePasswordEmailProps = {
  email: string;
  code: string;
};

export const send = async ({ email, code }: OneTimePasswordEmailProps) => {
  const html = await render(<OneTimePasswordEmail code={code} />, {
    pretty: true,
  });
  const payload = await getPayload();
  const sent = await payload.sendEmail({
    to: email,
    subject: "Your login code for Payload Auth Starter",
    html,
  });
  if (!sent) {
    throw new Error("Failed to send email");
  }
};

export const OneTimePasswordEmail = ({ code }: { code: string }) => {
  return (
    <Tailwind config={{ theme: { extend: { colors: { brand: "#3D9D9F" } } } }}>
      <Html>
        <Head />
        <Body className="font-sans bg-zinc-50 box-border p-6">
          <Preview>Your login link for Learn Payload (with Colyn)</Preview>
          <Container className="box-border bg-white rounded-md p-6">
            <Img
              src={`https://learnpayload.nyc3.cdn.digitaloceanspaces.com/logos/authkit-400x400.png`}
              width="400"
              height="400"
              alt="Payload AuthKit"
              className="h-20 w-20 object-contain mx-auto"
            />
            <Heading className="text-black text-xl font-normal text-center">
              Your login code for Payload Auth Starter
            </Heading>
            <Section className="bg-zinc-50 p-8 rounded flex items-center justify-center text-3xl font-bold tracking-wider">
              {code}
            </Section>
            <Text className="p-0 py-2 m-0 opacity-40 w-full text-center">
              This code will only be valid for the next{" "}
              {AUTH_CONFIG.otpExpirationMinutes} minutes.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
