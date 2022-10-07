import amqp from "amqplib";
import { ENV, sleep, now } from "./common.js";

(async function main() {
  const NAME = process.argv[2] || "NoName";

  // if the arguments for connect is not defined, default url is amqp://guest:guest@localhost:5672
  const connection = await amqp.connect("amqp://localhost:5672");

  const channel = await connection.createChannel();

  await channel.assertQueue(ENV.QUEUE);

  let count = 1;
  while (count <= 100) {
    const message = `${NAME}${count}`;

    // sending a message
    channel.sendToQueue(ENV.QUEUE, Buffer.from(message));

    console.log(now(), "Send", message);

    await sleep(1500, 1000);

    count++;
  }

  await channel.waitForConfirms();

  await channel.close();

  await connection.close();
})();
