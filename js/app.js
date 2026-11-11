let currentScreen = 'screen-intro';

function transitionTo(targetId) {
    if (currentScreen === targetId) return;

    const currentEl = document.getElementById(currentScreen);
    const targetEl = document.getElementById(targetId);

    if (!currentEl || !targetEl) return;

    closeModal();

    const playTargetVideos = () => {
        const videos = targetEl.querySelectorAll('video');
        videos.forEach(video => {
            video.muted = true;
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        });
    };

    if (typeof gsap !== 'undefined') {
        gsap.to(currentEl, {
            opacity: 0,
            scale: 0.98,
            duration: 0.25,
            onComplete: () => {
                currentEl.classList.remove('active');
                targetEl.classList.add('active');
                playTargetVideos();
                gsap.fromTo(targetEl, 
                    { opacity: 0, scale: 1.02 },
                    { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
                );
                currentScreen = targetId;
            }
        });
    } else {
        currentEl.style.opacity = '0';
        setTimeout(() => {
            currentEl.classList.remove('active');
            targetEl.classList.add('active');
            playTargetVideos();
            targetEl.style.opacity = '1';
            currentScreen = targetId;
        }, 200);
    }
}

/* SISTEMA MODAL POPUP */
function openModal(title, htmlContent) {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

/* APERTURA DE PLATAFORMA OCTONAR EN NUEVA PESTAÑA */
function openOctonarOnline() {
    window.open('https://qabackofficev2.octopus.com.ar', '_blank', 'noopener,noreferrer');
}

function closeOctonarOnline() {
    const modal = document.getElementById('modal-octonar-online');
    const iframe = document.getElementById('iframe-octonar-live');
    
    if (!modal || !iframe) return;

    modal.classList.remove('active');
    setTimeout(() => {
        iframe.src = '';
        modal.style.setProperty('display', 'none', 'important');
    }, 200);
}