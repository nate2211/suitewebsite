// src/resizeObserverFix.js

const resizeObserverMessages = [
    "ResizeObserver loop completed with undelivered notifications.",
    "ResizeObserver loop limit exceeded",
];

function isResizeObserverError(message) {
    return resizeObserverMessages.some((item) =>
        String(message || "").includes(item)
    );
}

if (typeof window !== "undefined") {
    window.addEventListener(
        "error",
        (event) => {
            if (isResizeObserverError(event.message)) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        },
        true
    );

    window.addEventListener(
        "unhandledrejection",
        (event) => {
            const message =
                event.reason?.message ||
                event.reason?.toString?.() ||
                "";

            if (isResizeObserverError(message)) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        },
        true
    );
}