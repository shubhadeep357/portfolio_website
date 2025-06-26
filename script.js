// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('show');
                }
            });
        });
    }

    // === Contact Form Submission ===
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            emailjs.send("portproject", "template_nsmncep", {
                from_name: document.getElementById("name")?.value,
                from_email: document.getElementById("email")?.value,
                message: document.getElementById("message")?.value,
            })
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                alert("Oops! Something went wrong.");
            });
        });
    }

  });

document.addEventListener('DOMContentLoaded', function() {

    // === Typing Effect for Two Lines ===
    const typingLine1Span = document.getElementById('typing-line1');
    const typingLine2Span = document.getElementById('typing-line2');

    if (typingLine1Span && typingLine2Span) {
        const linesToType = [
            "I'm Shubhadeep Saha",
            "Learning Building Evolving"
        ];
        let currentLineIndex = 0; // 0 for line1, 1 for line2
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeedNormal = 100; // Speed when typing
        const typingSpeedDeleting = 60; // Speed when deleting
        const pauseAfterTypingLine = 5000; // Pause after a line is fully typed
        const pauseBeforeNextLoop = 0; // Pause before restarting the whole sequence

        function typeEffect() {
            const currentText = linesToType[currentLineIndex];
            const targetSpan = (currentLineIndex === 0) ? typingLine1Span : typingLine2Span;

            if (isDeleting) {
                targetSpan.textContent = currentText.substring(0, charIndex--);
                if (charIndex < 0) {
                    isDeleting = false;
                    // Remove cursor only from line 1 after it's fully deleted
                    if (currentLineIndex === 0) {
                        typingLine1Span.style.borderRight = 'none';
                        typingLine1Span.style.animation = 'none';
                        typingLine1Span.style.paddingRight = '0';
                    }

                    currentLineIndex++; // Move to the next line

                    if (currentLineIndex < linesToType.length) {
                        // Still more lines to type
                        setTimeout(typeEffect, typingSpeedNormal + 200); // Pause before typing next line
                    } else {
                        // All lines typed and deleted, restart the whole sequence
                        currentLineIndex = 0; // Reset to the first line
                        setTimeout(() => {
                            // Re-apply cursor to line 1 for the new loop
                            typingLine1Span.style.borderRight = '2px solid #00ffff';
                            typingLine1Span.style.animation = 'blinkCaret .75s step-end infinite';
                            typingLine1Span.style.paddingRight = '5px';
                            typeEffect(); // Start typing the first line again
                        }, pauseBeforeNextLoop);
                    }
                    return;
                }
            } else {
                targetSpan.textContent = currentText.substring(0, charIndex++);
                if (charIndex > currentText.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, pauseAfterTypingLine); // Pause after typing a full line
                    return;
                }
            }
            setTimeout(typeEffect, isDeleting ? typingSpeedDeleting : typingSpeedNormal);
        }

        typeEffect(); // Start the typing effect
    } else {
        console.warn("One or both typing spans not found ('typing-line1', 'typing-line2'). Typing effect will not run.");
    }

    // ... Your existing Robo-face Mouse Movement Effect code ...
    const roboFace = document.querySelector('.robo-face');
    if (roboFace) {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.addEventListener('mousemove', (e) => {
                const homeRect = homeSection.getBoundingClientRect();
                const mouseX = e.clientX - homeRect.left - (homeRect.width / 2);
                const mouseY = e.clientY - homeRect.top - (homeRect.height / 2);
                const sensitivityX = 0.03;
                const sensitivityY = 0.03;
                const translateX = mouseX * sensitivityX;
                const translateY = mouseY * sensitivityY;
                roboFace.style.transform = `translate(-50%, -50%) translate3d(${translateX}px, ${translateY}px, 0)`;
            });
            homeSection.addEventListener('mouseleave', () => {
                roboFace.style.transform = 'translate(-50%, -50%) translate3d(0px, 0px, 0)';
            });
        } else {
            console.warn("Element with ID 'home' not found. Robo-face movement will not work.");
        }
    } else {
        console.warn("Element with class 'robo-face' not found. Robo-face movement will not work.");
    }

    // ... Your existing Timeline Scroll Effects code ...
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineCar = document.querySelector('.timeline-car-icon');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline-line');

    if (!timelineContainer || !timelineCar || timelineItems.length === 0 || !timelineLine) {
        console.warn('Timeline elements not found. Skipping timeline JS.');
    } else {
        let lastScrollY = window.scrollY;
        let timelineLineHeight = 0;
        let timelineStartOffset = 0;

        function updateTimelineMetrics() {
            if (!timelineContainer || !timelineLine) return;
            const lineRect = timelineLine.getBoundingClientRect();
            timelineStartOffset = lineRect.top + window.scrollY;
            timelineLineHeight = timelineLine.offsetHeight;
        }

        function updateTimeline() {
            const scrollY = window.scrollY;
            const isScrollingDown = scrollY > lastScrollY;

            if (!isScrollingDown) {
                timelineCar.style.opacity = '0';
                setTimeout(() => {
                    timelineCar.style.display = 'none';
                }, 300);
                lastScrollY = scrollY;
                return;
            } else {
                timelineCar.style.display = 'block';
                timelineCar.style.opacity = '1';
            }

            const containerOffsetTop = timelineContainer.getBoundingClientRect().top + window.scrollY;
            const scrollRelativeToContainer = scrollY - containerOffsetTop + (window.innerHeight / 2);

            let carY = Math.max(0, Math.min(scrollRelativeToContainer, timelineLineHeight));
            timelineCar.style.top = `${carY}px`;

            timelineItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterAbs = itemRect.top + window.scrollY + itemRect.height / 2;
                const carAbsTop = timelineCar.getBoundingClientRect().top + window.scrollY + timelineCar.offsetHeight / 2;
                const carProximityRange = 120;

                if (carAbsTop > itemCenterAbs - carProximityRange && carAbsTop < itemCenterAbs + carProximityRange) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            lastScrollY = scrollY;
        }

        updateTimelineMetrics();
        updateTimeline();

        window.addEventListener('scroll', updateTimeline);
        window.addEventListener('resize', () => {
            updateTimelineMetrics();
            updateTimeline();
        });

        window.addEventListener('load', () => {
            updateTimelineMetrics();
            if (window.scrollY > timelineContainer.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2) {
                timelineCar.style.display = 'block';
                timelineCar.style.opacity = '1';
                updateTimeline();
            } else {
                timelineCar.style.display = 'none';
                timelineCar.style.opacity = '0';
            }
        });
    }

}); // End of DOMContentLoaded