export const ENV = Object.freeze({
  QUEUE: "queue-test",
});

export function sleep(ms, random = 0) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms + Math.random() * random)
  );
}

export function now(){
  return new Date().toLocaleString("sv")
}