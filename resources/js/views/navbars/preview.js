document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('navbar-preview-bar');
    if (!bar) return;

    const updateBodyPadding = () => {
        document.body.style.paddingBottom = bar.offsetHeight + 'px';
    };

    updateBodyPadding();
    window.addEventListener('resize', updateBodyPadding);
});
