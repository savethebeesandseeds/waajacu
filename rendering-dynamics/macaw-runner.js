(() => {
    const canvas = document.getElementById("macaw_runner");

    if (!canvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const scoreElement = document.getElementById("macaw_score");
    const bestElement = document.getElementById("macaw_best");
    const stateElement = document.getElementById("macaw_state");
    const startButton = document.getElementById("macaw_runner_start");
    const stage = canvas.closest(".game_stage");
    const storageKey = "waajacu.macawRun.best";
    const scene = {
        width: 960,
        height: 320,
        ground: 248,
    };
    const colors = {
        paper: "#fffaf0",
        paperMuted: "#f5efe4",
        ink: "#18140f",
        muted: "#60594e",
        gold: "#c89b45",
        copper: "#8b3d2b",
        green: "#264f45",
        blue: "#254c63",
        red: "#b73c2f",
    };
    const macaw = {
        x: 124,
        y: 190,
        width: 74,
        height: 58,
        velocityY: 0,
        grounded: true,
    };
    const game = {
        mode: "idle",
        score: 0,
        best: readBestScore(),
        speed: 330,
        time: 0,
        groundOffset: 0,
        nextObstacle: 520,
        obstacles: [],
        clouds: [
            { x: 90, y: 62, size: 1.1, speed: 12 },
            { x: 360, y: 46, size: 0.8, speed: 16 },
            { x: 720, y: 78, size: 1, speed: 10 },
        ],
        animationFrame: 0,
        lastTime: 0,
    };

    if (!context) {
        return;
    }

    function readBestScore() {
        try {
            return Number.parseInt(localStorage.getItem(storageKey) || "0", 10) || 0;
        } catch (error) {
            return 0;
        }
    }

    function writeBestScore(value) {
        try {
            localStorage.setItem(storageKey, String(value));
        } catch (error) {
            // The score remains usable even when storage is blocked.
        }
    }

    function formatScore(value) {
        return String(Math.max(0, Math.floor(value))).padStart(3, "0");
    }

    function setHud(label) {
        if (scoreElement) {
            const score = formatScore(game.score);

            if (scoreElement.textContent !== score) {
                scoreElement.textContent = score;
            }
        }

        if (bestElement) {
            const best = formatScore(game.best);

            if (bestElement.textContent !== best) {
                bestElement.textContent = best;
            }
        }

        if (stateElement && stateElement.textContent !== label) {
            stateElement.textContent = label;
        }
    }

    function resizeCanvas() {
        const bounds = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(320, Math.round(bounds.width * ratio));
        const height = Math.max(180, Math.round(bounds.height * ratio));

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        draw();
    }

    function resetRun() {
        game.score = 0;
        game.speed = 330;
        game.time = 0;
        game.groundOffset = 0;
        game.nextObstacle = 520;
        game.obstacles = [];
        macaw.y = scene.ground - macaw.height;
        macaw.velocityY = 0;
        macaw.grounded = true;
    }

    function startRun() {
        resetRun();
        game.mode = "running";
        game.lastTime = performance.now();

        if (startButton) {
            startButton.textContent = "Restart";
        }

        setHud("Flying");
        requestTick();

        try {
            canvas.focus({ preventScroll: true });
        } catch (error) {
            canvas.focus();
        }
    }

    function endRun() {
        game.mode = "ended";
        game.best = Math.max(game.best, Math.floor(game.score));
        writeBestScore(game.best);

        if (startButton) {
            startButton.textContent = "Run again";
        }

        setHud("Complete");
        draw();
    }

    function flap() {
        if (game.mode !== "running") {
            return;
        }

        if (macaw.grounded) {
            macaw.velocityY = -720;
            macaw.grounded = false;
        }
    }

    function activateGame() {
        if (game.mode !== "running") {
            startRun();
        }

        flap();
    }

    function requestTick() {
        if (!game.animationFrame) {
            game.animationFrame = requestAnimationFrame(tick);
        }
    }

    function tick(now) {
        game.animationFrame = 0;

        if (game.mode !== "running") {
            return;
        }

        const delta = Math.min(0.034, Math.max(0, (now - game.lastTime) / 1000));
        game.lastTime = now;

        update(delta);
        draw();

        if (game.mode === "running") {
            requestTick();
        }
    }

    function update(delta) {
        game.time += delta;
        game.score += delta * game.speed * 0.028;
        game.speed = 330 + Math.min(260, game.score * 1.2);
        game.groundOffset = (game.groundOffset + game.speed * delta) % 48;
        game.nextObstacle -= delta * 1000;

        updateClouds(delta);
        updateMacaw(delta);
        updateObstacles(delta);

        if (game.mode === "running") {
            setHud("Flying");
        }
    }

    function updateClouds(delta) {
        game.clouds.forEach((cloud) => {
            cloud.x -= cloud.speed * delta;

            if (cloud.x < -110) {
                cloud.x = scene.width + 80 + Math.random() * 160;
                cloud.y = 38 + Math.random() * 56;
                cloud.size = 0.72 + Math.random() * 0.58;
            }
        });
    }

    function updateMacaw(delta) {
        macaw.velocityY += 1720 * delta;
        macaw.y += macaw.velocityY * delta;

        const floor = scene.ground - macaw.height;

        if (macaw.y >= floor) {
            macaw.y = floor;
            macaw.velocityY = 0;
            macaw.grounded = true;
        }
    }

    function updateObstacles(delta) {
        if (game.nextObstacle <= 0) {
            game.obstacles.push(createObstacle());
            game.nextObstacle = 820 + Math.random() * 680 - Math.min(280, game.score * 3.2);
        }

        game.obstacles.forEach((obstacle) => {
            obstacle.x -= game.speed * delta;
        });

        game.obstacles = game.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -40);

        if (game.obstacles.some((obstacle) => intersects(macawBounds(), obstacleBounds(obstacle)))) {
            endRun();
        }
    }

    function createObstacle() {
        const variants = [
            { width: 34, height: 70, color: colors.green, stripe: colors.gold },
            { width: 46, height: 54, color: colors.copper, stripe: colors.paper },
            { width: 28, height: 86, color: colors.blue, stripe: colors.gold },
            { width: 58, height: 44, color: colors.ink, stripe: colors.copper },
        ];
        const variant = variants[Math.floor(Math.random() * variants.length)];

        return {
            x: scene.width + 20,
            y: scene.ground - variant.height,
            width: variant.width,
            height: variant.height,
            color: variant.color,
            stripe: variant.stripe,
        };
    }

    function macawBounds() {
        return {
            x: macaw.x + 14,
            y: macaw.y + 10,
            width: macaw.width - 24,
            height: macaw.height - 16,
        };
    }

    function obstacleBounds(obstacle) {
        return {
            x: obstacle.x + 4,
            y: obstacle.y + 4,
            width: obstacle.width - 8,
            height: obstacle.height - 4,
        };
    }

    function intersects(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    function draw() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = colors.paper;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();

        const scale = Math.min(canvas.width / scene.width, canvas.height / scene.height);
        const offsetX = (canvas.width - scene.width * scale) / 2;
        const offsetY = (canvas.height - scene.height * scale) / 2;

        context.setTransform(scale, 0, 0, scale, offsetX, offsetY);
        drawBackground();
        drawObstacles();
        drawMacaw();
        drawOverlay();
    }

    function drawBackground() {
        const gradient = context.createLinearGradient(0, 0, 0, scene.height);
        gradient.addColorStop(0, colors.paper);
        gradient.addColorStop(1, colors.paperMuted);
        context.fillStyle = gradient;
        context.fillRect(0, 0, scene.width, scene.height);

        context.save();
        context.globalAlpha = 0.23;
        context.strokeStyle = colors.green;
        context.lineWidth = 2;

        for (let index = 0; index < 4; index += 1) {
            const y = 112 + index * 22;
            context.beginPath();
            context.moveTo(-40, y);
            context.bezierCurveTo(190, y - 38, 350, y + 34, 570, y - 4);
            context.bezierCurveTo(710, y - 28, 840, y + 26, 1020, y - 18);
            context.stroke();
        }

        context.restore();

        game.clouds.forEach(drawCloud);

        context.fillStyle = "rgba(38, 79, 69, 0.12)";
        context.fillRect(0, scene.ground + 2, scene.width, scene.height - scene.ground);

        context.strokeStyle = colors.ink;
        context.globalAlpha = 0.72;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(0, scene.ground);
        context.lineTo(scene.width, scene.ground);
        context.stroke();
        context.globalAlpha = 1;

        context.fillStyle = "rgba(24, 20, 15, 0.28)";
        for (let x = -48 + game.groundOffset; x < scene.width; x += 48) {
            context.fillRect(x, scene.ground + 18, 26, 3);
        }
    }

    function drawCloud(cloud) {
        context.save();
        context.globalAlpha = 0.45;
        context.fillStyle = colors.paper;
        context.strokeStyle = "rgba(24, 20, 15, 0.18)";
        context.lineWidth = 1.5;
        context.translate(cloud.x, cloud.y);
        context.scale(cloud.size, cloud.size);
        context.beginPath();
        context.ellipse(0, 10, 34, 16, 0, 0, Math.PI * 2);
        context.ellipse(34, 4, 28, 20, 0, 0, Math.PI * 2);
        context.ellipse(68, 12, 36, 15, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.restore();
    }

    function drawObstacles() {
        game.obstacles.forEach((obstacle) => {
            context.save();
            context.fillStyle = obstacle.color;
            context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            context.fillStyle = obstacle.stripe;
            context.fillRect(obstacle.x + 6, obstacle.y + 8, Math.max(8, obstacle.width - 12), 6);
            context.fillRect(obstacle.x + 6, obstacle.y + obstacle.height - 14, Math.max(8, obstacle.width - 12), 5);
            context.fillStyle = "rgba(255, 250, 240, 0.35)";
            context.fillRect(obstacle.x + obstacle.width - 9, obstacle.y + 5, 4, obstacle.height - 10);
            context.restore();
        });
    }

    function drawMacaw() {
        const x = macaw.x;
        const y = macaw.y + (macaw.grounded ? Math.sin(game.time * 16) * 1.4 : 0);
        const wingLift = macaw.grounded ? Math.sin(game.time * 18) * 3 : -10 + Math.sin(game.time * 28) * 7;

        context.save();
        context.translate(x, y);

        context.fillStyle = colors.blue;
        context.beginPath();
        context.moveTo(14, 38);
        context.lineTo(-34, 58);
        context.lineTo(8, 52);
        context.lineTo(34, 42);
        context.closePath();
        context.fill();

        context.fillStyle = colors.green;
        context.beginPath();
        context.moveTo(20, 42);
        context.lineTo(-20, 72);
        context.lineTo(30, 52);
        context.closePath();
        context.fill();

        context.fillStyle = colors.red;
        context.beginPath();
        context.ellipse(38, 34, 31, 21, -0.12, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = colors.gold;
        context.beginPath();
        context.moveTo(25, 32);
        context.quadraticCurveTo(45, 16 + wingLift, 70, 32);
        context.quadraticCurveTo(49, 42, 28, 49);
        context.closePath();
        context.fill();

        context.fillStyle = colors.blue;
        context.beginPath();
        context.moveTo(31, 35);
        context.quadraticCurveTo(48, 23 + wingLift, 64, 36);
        context.lineTo(46, 46);
        context.closePath();
        context.fill();

        context.fillStyle = colors.red;
        context.beginPath();
        context.arc(62, 20, 17, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = colors.paper;
        context.beginPath();
        context.ellipse(69, 20, 9, 8, 0.12, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = colors.ink;
        context.beginPath();
        context.arc(72, 18, 2.5, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = colors.gold;
        context.beginPath();
        context.moveTo(78, 22);
        context.lineTo(100, 29);
        context.lineTo(77, 35);
        context.closePath();
        context.fill();

        context.strokeStyle = colors.ink;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(80, 30);
        context.lineTo(95, 29);
        context.stroke();

        context.strokeStyle = colors.ink;
        context.lineWidth = 3;

        if (macaw.grounded) {
            context.beginPath();
            context.moveTo(38, 53);
            context.lineTo(33, 64);
            context.moveTo(50, 53);
            context.lineTo(55, 64);
            context.stroke();
        }

        context.restore();
    }

    function drawOverlay() {
        if (game.mode === "running") {
            return;
        }

        context.save();
        context.fillStyle = "rgba(255, 250, 240, 0.72)";
        context.fillRect(0, 0, scene.width, scene.height);
        context.fillStyle = colors.ink;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "700 34px Arial, Helvetica, sans-serif";
        context.fillText(game.mode === "ended" ? "Run complete" : "Macaw Run", scene.width / 2, scene.height / 2 - 14);
        context.font = "700 16px Arial, Helvetica, sans-serif";
        context.fillStyle = colors.gold;
        context.fillText(game.mode === "ended" ? `Score ${formatScore(game.score)}` : "Ready", scene.width / 2, scene.height / 2 + 28);
        context.restore();
    }

    if (startButton) {
        startButton.addEventListener("click", () => {
            startRun();
        });
    }

    canvas.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        activateGame();
    });

    if (stage) {
        stage.addEventListener("pointerdown", (event) => {
            if (event.target === startButton) {
                return;
            }

            if (event.target !== canvas) {
                activateGame();
            }
        });
    }

    window.addEventListener("keydown", (event) => {
        const actionKeys = ["Space", "ArrowUp", "KeyW"];

        if (actionKeys.includes(event.code)) {
            event.preventDefault();
            activateGame();
        }

        if (event.code === "Enter" && game.mode === "ended") {
            event.preventDefault();
            startRun();
        }
    });

    document.addEventListener("visibilitychange", () => {
        game.lastTime = performance.now();
    });

    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(canvas);
    } else {
        window.addEventListener("resize", resizeCanvas);
    }

    setHud("Ready");
    resizeCanvas();
})();
