(() => {
    const links = document.querySelectorAll(
        ".resilient-project-link[data-live-url][data-health-url][data-fallback-url]",
    );
    const timeoutMs = 3500;

    function isReachable(url) {
        // An image load exposes HTTP/DNS failure without requiring cross-origin
        // response access, unlike an opaque no-cors fetch.
        return new Promise((resolve) => {
            const image = new Image();
            const timeoutId = window.setTimeout(() => finish(false), timeoutMs);
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

    for (const link of links) {
        const liveUrl = link.dataset.liveUrl;
        const healthUrl = link.dataset.healthUrl;
        const fallbackUrl = link.dataset.fallbackUrl;
        const label = link.textContent.trim().replace(/\s*↗\s*$/, "");

        link.href = fallbackUrl;

        isReachable(healthUrl).then((reachable) => {
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
