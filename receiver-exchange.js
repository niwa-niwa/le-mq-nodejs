import amqp from "amqplib";
import { ENV, sleep, now } from "./common.js";

(async function main() {
  const connection = await amqp.connect("");

  const channel = await connection.createChannel();

  // const resQueue = await channel.assertQueue(ENV.QUEUE);
  const resQueue = await channel.assertQueue("", { exclusive: true });

  // select an exchange fanout
  await channel.assertExchange(ENV.ex, "fanout");

  // bind a queue
  await channel.bindQueue(resQueue.queue, ENV.ex, "");

  await channel.consume(resQueue.queue, async function (msg) {
    console.log(new Date().getTime(), "Receive", msg.content.toString());

    channel.ack(msg);
  });
})();
