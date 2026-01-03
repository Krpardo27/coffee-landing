import { useCallback, useEffect, useRef, useState } from "react";

export function useAmbientAudio({ maxVolume = 0.35 } = {}) {
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const analyserRef = useRef(null);
  const dataRef = useRef(null);
  const rafRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [levels, setLevels] = useState([0, 0, 0]);

  const initContext = () => {
    if (ctxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const audio = audioRef.current;
    if (!audio) return;

    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();

    analyser.fftSize = 64;
    gain.gain.value = 0;

    source.connect(analyser);
    analyser.connect(gain);
    gain.connect(ctx.destination);

    ctxRef.current = ctx;
    gainRef.current = gain;
    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(analyser.frequencyBinCount);
  };

  const animate = () => {
    const analyser = analyserRef.current;
    const data = dataRef.current;
    if (!analyser || !data) return;

    analyser.getByteFrequencyData(data);
    setLevels([data[2] / 255, data[6] / 255, data[12] / 255]);

    rafRef.current = requestAnimationFrame(animate);
  };

  const fadeTo = (value, duration = 600) => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) return;

    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.linearRampToValueAtTime(value, ctx.currentTime + duration / 1000);
  };

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    initContext();

    if (audio.paused) {
      try {
        await audio.play();
        fadeTo(maxVolume);
        setIsPlaying(true);
        localStorage.setItem("audio-enabled", "true");
        animate();
      } catch {
        setIsPlaying(false);
      }
    } else {
      fadeTo(0);
      setTimeout(() => audio.pause(), 650);
      setIsPlaying(false);
      localStorage.setItem("audio-enabled", "false");
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [maxVolume]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioRef.current?.pause();
    };
  }, []);

  return { audioRef, isPlaying, levels, toggle };
}
