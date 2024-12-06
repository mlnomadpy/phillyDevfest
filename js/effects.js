
const VideoEffects = {
    effects: [
        "grayscale(100%)",
        "sepia(100%)",
        "invert(100%)",
        "blur(5px)",
        "brightness(0.5)",
        "contrast(200%)",
        "hue-rotate(90deg)",
        "saturate(200%)",
    ],

    applyRandomEffect() {
        const video = document.getElementById("bg-video");
        if (!video) return;
        
        const randomEffect = this.effects[Math.floor(Math.random() * this.effects.length)];
        video.style.filter = randomEffect;
    }
};

export default VideoEffects;