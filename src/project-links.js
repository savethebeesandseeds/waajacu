(() => {
    const links = document.querySelectorAll(
        ".resilient-project-link[data-live-url][data-health-url][data-fallback-url]",
    );
    const timeoutMs = 8000;

    function checkImage(url) {
        // An image load exposes HTTP/DNS failure without requiring cross-origin
        // response access, unlike an opaque no-cors fetch.
        return new Promise((resolve) => {
            const image = new Image();
            const timeoutId = window.setTimeout(() => finish(null), timeoutMs);
            let settled = false;

            function finish(reachable) {
                if (settled) {
                    return;
                }

                settled = true;
                window.clearTimeout(timeoutId);
                image.onload = null;
                image.onerror = null;
                resolve(reachable);
            }

            image.onload = () => finish(true);
            image.onerror = () => finish(false);

            const healthUrl = new URL(url);
            healthUrl.searchParams.set("waajacu-health", Date.now().toString());
            image.src = healthUrl.href;
        });
    }

    async function checkCors(url) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, {
                cache: "no-store",
                credentials: "omit",
                mode: "cors",
                signal: controller.signal,
            });
            return response.ok;
        } catch (error) {
            return error.name === "AbortError" ? null : false;
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function isReachable(url, mode) {
        return mode === "cors" ? checkCors(url) : checkImage(url);
    }

    for (const link of links) {
        const liveUrl = link.dataset.liveUrl;
        const healthUrl = link.dataset.healthUrl;
        const healthMode = link.dataset.healthMode || "image";
        const fallbackUrl = link.dataset.fallbackUrl;
        const label = link.textContent.trim().replace(/\s*↗\s*$/, "");

        // The project site is the primary destination. A slow or blocked probe
        // must never send a healthy project to its source repository instead.
        link.href = liveUrl;
        link.dataset.linkState = "checking";

        isReachable(healthUrl, healthMode).then((reachable) => {
            if (reachable === null) {
                link.dataset.linkState = "unverified";
                return;
            }

            link.href = reachable ? liveUrl : fallbackUrl;
            link.dataset.linkState = reachable ? "live" : "source";

            if (reachable) {
                link.removeAttribute("aria-label");
                link.removeAttribute("title");
                return;
            }

            const fallbackLabel = `${label} source on GitHub; project site currently unavailable`;
            link.setAttribute("aria-label", fallbackLabel);
            link.title = fallbackLabel;
        });
    }
})();
