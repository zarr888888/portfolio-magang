import assert from "node:assert/strict";
import fs from "node:fs";
const tabs = await (await fetch("http://127.0.0.1:9223/json")).json();
const ws = new WebSocket(
  tabs.find((tab) => tab.type === "page").webSocketDebuggerUrl
);
await new Promise((resolve) =>
  ws.addEventListener("open", resolve, { once: true })
);
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const task = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) task.reject(message.error);
    else task.resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown")
    errors.push(message.params.exceptionDetails.text);
  if (
    message.method === "Network.responseReceived" &&
    message.params.response.status >= 400
  )
    errors.push(message.params.response.url);
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const requestId = ++id;
    pending.set(requestId, { resolve, reject });
    ws.send(JSON.stringify({ id: requestId, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails)
    throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
const pause = () => new Promise((resolve) => setTimeout(resolve, 800));
try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  for (const width of [1440, 768, 390, 320]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Page.navigate", {
      url: "http://127.0.0.1:4173/portfolio-magang/",
    });
    await pause();
    assert.equal(
      await evaluate("document.documentElement.scrollWidth <= innerWidth"),
      true,
      `Overflow at ${width}`
    );
    assert.equal(
      await evaluate(
        "[...document.querySelectorAll('a[href^=\"#\"]')].every(a => document.querySelector(a.getAttribute('href')))"
      ),
      true
    );
    assert.equal(
      await evaluate(
        "[...document.images].every(i => i.complete && i.naturalWidth > 0)"
      ),
      true
    );
    await evaluate("document.querySelector('summary').click()");
    assert.equal(
      await evaluate("document.querySelector('details').open"),
      true
    );
    const before = await evaluate(
      "document.documentElement.classList.contains('dark')"
    );
    await evaluate(
      "document.querySelector('[aria-label=\"Ganti tema terang atau gelap\"]').click()"
    );
    await pause();
    assert.notEqual(
      await evaluate("document.documentElement.classList.contains('dark')"),
      before
    );
    await send("Page.reload");
    await pause();
    assert.notEqual(
      await evaluate("document.documentElement.classList.contains('dark')"),
      before
    );
    if (width < 761) {
      await evaluate("document.querySelector('.menu-toggle').click()");
      assert.equal(
        await evaluate(
          "document.querySelector('.menu-toggle').getAttribute('aria-expanded')"
        ),
        "true"
      );
      await evaluate(
        "document.querySelector('.main-nav a[href=\"#projects\"]').click()"
      );
      await pause();
      assert.equal(await evaluate("location.hash"), "#projects");
      assert.equal(
        await evaluate(
          "document.querySelector('.menu-toggle').getAttribute('aria-expanded')"
        ),
        "false"
      );
    }
    await evaluate("scrollTo(0,0)");
    await pause();
    const screenshot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      `test-results/viewport-${width}.png`,
      Buffer.from(screenshot.data, "base64")
    );
    console.log(
      `PASS ${width}px: no overflow, anchors, theme toggle/persistence, project details, image integrity, mobile menu where applicable.`
    );
  }
  assert.deepEqual(errors, [], "Browser errors");
  console.log("PASS: no runtime exceptions or HTTP >=400 responses.");
} finally {
  ws.close();
}
