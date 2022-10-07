import amqp from "amqplib";
import { ENV, sleep, now } from "./common.js";

(async function main() {
  // if the arguments for connect is not defined, default url is amqp://guest:guest@localhost:5672
  const connection = await amqp.connect("");

  const channel = await connection.createChannel();

  // the argument is max number of retrieving messages
  await channel.prefetch(1);

  await channel.assertQueue(ENV.QUEUE);

  //
  await channel.consume(ENV.QUEUE, async function (msg) {
    console.log(now(), "Receive", msg.content.toString());

    await sleep(1000, 1000);

    channel.ack(msg);
  });
})();
