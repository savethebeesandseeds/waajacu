(() => {
    const links = document.querySelectorAll(".resilient-project-link[data-live-url][data-fallback-url]");
    const timeoutMs = 3500;

    async function isReachable(url) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

        try {
            await fetch(url, {
                method: "HEAD",
                mode: "no-cors",
                cache: "no-store",
                signal: controller.signal,
            });
            return true;
        } catch {
            return false;
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    for (const link of links) {
        link.addEventListener("click", async (event) => {
            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            event.preventDefault();
            link.setAttribute("aria-busy", "true");

            const liveUrl = link.dataset.liveUrl;
            const fallbackUrl = link.dataset.fallbackUrl;
            const destination = await isReachable(liveUrl) ? liveUrl : fallbackUrl;

            window.location.assign(destination);
        });
    }
})();
