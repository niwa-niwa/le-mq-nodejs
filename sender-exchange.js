import amqp from "amqplib";
import { ENV, sleep } from "./common.js";

const NAME = process.argv[2] || "NoName";

(async function main() {
  const connection = await amqp.connect("");

  const channel = await connection.createChannel();

  // select an exchange of "fanout"
  await channel.assertExchange(ENV.ex, "fanout");

  let count = 1;

  while (count <= 100) {
    const message = `${NAME}${count}`;

    // send a message
    channel.publish(ENV.ex, "", Buffer.from(message));

    console.log(new Date().getTime(), "Send", message);

    await sleep(1500, 1000);

    count++;
  }

  await channel.close();

  await connection.close();
})();
