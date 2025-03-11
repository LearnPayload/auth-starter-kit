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
import { AUTH_CONFIG } from "../lib/config";
import { getPayload } from "../services/payload";

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
        <Body className="box-border bg-zinc-50 p-6 font-sans">
          <Preview>Your login link for Learn Payload (with Colyn)</Preview>
          <Container className="box-border rounded-md bg-white p-6">
            <Img
              src={`https://learnpayload.nyc3.cdn.digitaloceanspaces.com/logos/authkit-400x400.png`}
              width="400"
              height="400"
              alt="Payload AuthKit"
              className="mx-auto h-20 w-20 object-contain"
            />
            <Heading className="text-center text-xl font-normal text-black">
              Your login code for Payload Auth Starter
            </Heading>
            <Section className="flex items-center justify-center rounded bg-zinc-50 p-8 text-3xl font-bold tracking-wider">
              {code}
            </Section>
            <Text className="m-0 w-full p-0 py-2 text-center opacity-40">
              This code will only be valid for the next{" "}
              {AUTH_CONFIG.otpExpirationMinutes} minutes.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
